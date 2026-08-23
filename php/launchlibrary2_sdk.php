<?php
declare(strict_types=1);

// LaunchLibrary2 SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

// Features record diagnostic state on the client as dynamic properties
// (_retry, _cache, _metrics, ...); allow them explicitly (PHP 8.2+
// deprecates implicit dynamic properties).
#[\AllowDynamicProperties]
class LaunchLibrary2SDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new LaunchLibrary2Utility();
        $this->_utility = $utility;

        $config = LaunchLibrary2Config::shared_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Feature INSTANCES supplied at construction (the station adopt
        // path) are read from the RAW construction options - extend is
        // consumed exactly once, here; make_options strips it from the
        // processed map so options_map() stays clean data.
        $extend_val = is_array($options["extend"] ?? null) ? $options["extend"] : [];

        // Add features in the resolved order (make_options puts an explicit
        // list order first, else defaults to test-first). Ordering matters: the
        // `test` feature installs the base mock transport and the transport
        // features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        // current, so `test` must be added before them to sit at the base.
        $feature_opts = LaunchLibrary2Helpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $featureorder = Struct::getpath($this->options, "__derived__.featureorder");
            if (is_array($featureorder)) {
                foreach ($featureorder as $fname) {
                    $fopts = LaunchLibrary2Helpers::to_map($feature_opts[$fname] ?? null);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        // An active name with no generated feature class is
                        // legal when an extend-supplied instance carries that
                        // name (station's adopt path): the instance is added
                        // below, positioned by its own __after__ entry, so
                        // skip it here rather than add a BaseFeature stray
                        // that would silently shift feature positions.
                        if (!LaunchLibrary2Features::has_feature($fname)) {
                            foreach ($extend_val as $ef) {
                                if (is_object($ef) && method_exists($ef, 'get_name')
                                    && $fname === $ef->get_name()) {
                                    continue 2;
                                }
                            }
                        }
                        ($utility->feature_add)($this->_rootctx, LaunchLibrary2Features::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        foreach ($extend_val as $f) {
            if (is_object($f) && method_exists($f, 'get_name')) {
                ($utility->feature_add)($this->_rootctx, $f);
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return LaunchLibrary2Utility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = LaunchLibrary2Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = LaunchLibrary2Helpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = LaunchLibrary2Helpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new LaunchLibrary2Spec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    // Raw endpoint access is operator-controllable, like every entity op.
    // Blocking it means denying BOTH the 'direct' and 'graphql' tokens,
    // since either one reaches the same endpoint.
    public function direct(array $fetchargs = []): mixed
    {
        if (!$this->op_allowed("direct")) {
            return $this->op_denied("direct");
        }

        return $this->raw_request($fetchargs);
    }

    // Is this raw-access op permitted by the SDK's allow.op option?
    private function op_allowed(string $op): bool
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return is_string($allow_op) && str_contains($allow_op, $op);
    }

    private function op_denied(string $op): array
    {
        $allow_op = Struct::getpath($this->options, "allow.op");
        return [
            "ok" => false,
            "err" => new LaunchLibrary2Error($op . "_allow",
                "LaunchLibrary2SDK: " . $op . ": operation not allowed by" .
                " SDK option allow.op value: \"" . (string)$allow_op . "\""),
        ];
    }

    // Ungated request path shared by direct and graphql, each of which
    // checks its own allow.op token first. Private, rather than a flag on
    // fetchargs: a caller-supplied marker would let anyone opt straight back
    // out of the gate by passing it.
    private function raw_request(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = LaunchLibrary2Helpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = LaunchLibrary2Helpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }

    // Raw GraphQL access: the pressure valve that makes the generated
    // surface's deliberate omissions (per-call selection sets, typed filter
    // builders, batching, subscriptions) livable — the whole schema stays
    // reachable.
    //
    // Thin wrapper over the same prepare/fetch path direct uses, with the
    // one thing raw direct cannot do for GraphQL: a GraphQL failure rides
    // HTTP 200 as a top-level `errors` array, so status alone would report
    // a failed query as ok.
    //
    // NOTE: like direct, this bypasses the feature pipeline — no retry,
    // ratelimit or paging features apply.
    public function graphql(string $query, ?array $variables = null, ?array $ctrl = null): mixed
    {
        if (!$this->op_allowed("graphql")) {
            return $this->op_denied("graphql");
        }

        $res = $this->raw_request([
            "method" => "POST",
            "headers" => ["content-type" => "application/json"],
            "body" => ["query" => $query, "variables" => $variables ?? []],
            "ctrl" => $ctrl ?? [],
        ]);

        if (!is_array($res)) {
            return $res;
        }

        // Errors are read BEFORE any status check: a GraphQL parse or
        // validation failure comes back as HTTP 400 carrying the standard
        // { errors: [...] } body, and the raw path represents a non-2xx as
        // ok:false with no err — so returning early on status would discard
        // the server's own diagnostics, which are the only useful part of
        // that response.
        $errors = Struct::getpath($res, "data.errors");

        if (is_array($errors) && 0 < count($errors)) {
            $first = is_array($errors[0]) ? $errors[0] : [];
            $msg = $first["message"] ?? "";
            if (!is_string($msg) || "" === $msg) {
                $msg = "graphql error";
            }
            $res["ok"] = false;
            $res["err"] = new LaunchLibrary2Error("graphql_error",
                "LaunchLibrary2SDK: graphql: " . $msg);
            $res["graphql"] = $errors;
        }

        return $res;
    }


    private $_agency = null;

    // Canonical facade: $client->Agency()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->agency()
    // resolves here too.
    public function Agency($data = null)
    {
        require_once __DIR__ . '/entity/agency_entity.php';
        if ($data === null) {
            if ($this->_agency === null) {
                $this->_agency = new AgencyEntity($this, null);
            }
            return $this->_agency;
        }
        return new AgencyEntity($this, $data);
    }


    private $_astronaut = null;

    // Canonical facade: $client->Astronaut()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->astronaut()
    // resolves here too.
    public function Astronaut($data = null)
    {
        require_once __DIR__ . '/entity/astronaut_entity.php';
        if ($data === null) {
            if ($this->_astronaut === null) {
                $this->_astronaut = new AstronautEntity($this, null);
            }
            return $this->_astronaut;
        }
        return new AstronautEntity($this, $data);
    }


    private $_docking = null;

    // Canonical facade: $client->Docking()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->docking()
    // resolves here too.
    public function Docking($data = null)
    {
        require_once __DIR__ . '/entity/docking_entity.php';
        if ($data === null) {
            if ($this->_docking === null) {
                $this->_docking = new DockingEntity($this, null);
            }
            return $this->_docking;
        }
        return new DockingEntity($this, $data);
    }


    private $_docking_event = null;

    // Canonical facade: $client->DockingEvent()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->docking_event()
    // resolves here too.
    public function DockingEvent($data = null)
    {
        require_once __DIR__ . '/entity/docking_event_entity.php';
        if ($data === null) {
            if ($this->_docking_event === null) {
                $this->_docking_event = new DockingEventEntity($this, null);
            }
            return $this->_docking_event;
        }
        return new DockingEventEntity($this, $data);
    }


    private $_event = null;

    // Canonical facade: $client->Event()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->event()
    // resolves here too.
    public function Event($data = null)
    {
        require_once __DIR__ . '/entity/event_entity.php';
        if ($data === null) {
            if ($this->_event === null) {
                $this->_event = new EventEntity($this, null);
            }
            return $this->_event;
        }
        return new EventEntity($this, $data);
    }


    private $_expedition = null;

    // Canonical facade: $client->Expedition()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->expedition()
    // resolves here too.
    public function Expedition($data = null)
    {
        require_once __DIR__ . '/entity/expedition_entity.php';
        if ($data === null) {
            if ($this->_expedition === null) {
                $this->_expedition = new ExpeditionEntity($this, null);
            }
            return $this->_expedition;
        }
        return new ExpeditionEntity($this, $data);
    }


    private $_first_stage = null;

    // Canonical facade: $client->FirstStage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->first_stage()
    // resolves here too.
    public function FirstStage($data = null)
    {
        require_once __DIR__ . '/entity/first_stage_entity.php';
        if ($data === null) {
            if ($this->_first_stage === null) {
                $this->_first_stage = new FirstStageEntity($this, null);
            }
            return $this->_first_stage;
        }
        return new FirstStageEntity($this, $data);
    }


    private $_launch = null;

    // Canonical facade: $client->Launch()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->launch()
    // resolves here too.
    public function Launch($data = null)
    {
        require_once __DIR__ . '/entity/launch_entity.php';
        if ($data === null) {
            if ($this->_launch === null) {
                $this->_launch = new LaunchEntity($this, null);
            }
            return $this->_launch;
        }
        return new LaunchEntity($this, $data);
    }


    private $_launch_vehicle = null;

    // Canonical facade: $client->LaunchVehicle()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->launch_vehicle()
    // resolves here too.
    public function LaunchVehicle($data = null)
    {
        require_once __DIR__ . '/entity/launch_vehicle_entity.php';
        if ($data === null) {
            if ($this->_launch_vehicle === null) {
                $this->_launch_vehicle = new LaunchVehicleEntity($this, null);
            }
            return $this->_launch_vehicle;
        }
        return new LaunchVehicleEntity($this, $data);
    }


    private $_launcher = null;

    // Canonical facade: $client->Launcher()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->launcher()
    // resolves here too.
    public function Launcher($data = null)
    {
        require_once __DIR__ . '/entity/launcher_entity.php';
        if ($data === null) {
            if ($this->_launcher === null) {
                $this->_launcher = new LauncherEntity($this, null);
            }
            return $this->_launcher;
        }
        return new LauncherEntity($this, $data);
    }


    private $_location = null;

    // Canonical facade: $client->Location()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->location()
    // resolves here too.
    public function Location($data = null)
    {
        require_once __DIR__ . '/entity/location_entity.php';
        if ($data === null) {
            if ($this->_location === null) {
                $this->_location = new LocationEntity($this, null);
            }
            return $this->_location;
        }
        return new LocationEntity($this, $data);
    }


    private $_pad = null;

    // Canonical facade: $client->Pad()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->pad()
    // resolves here too.
    public function Pad($data = null)
    {
        require_once __DIR__ . '/entity/pad_entity.php';
        if ($data === null) {
            if ($this->_pad === null) {
                $this->_pad = new PadEntity($this, null);
            }
            return $this->_pad;
        }
        return new PadEntity($this, $data);
    }


    private $_reusable_first_stage = null;

    // Canonical facade: $client->ReusableFirstStage()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->reusable_first_stage()
    // resolves here too.
    public function ReusableFirstStage($data = null)
    {
        require_once __DIR__ . '/entity/reusable_first_stage_entity.php';
        if ($data === null) {
            if ($this->_reusable_first_stage === null) {
                $this->_reusable_first_stage = new ReusableFirstStageEntity($this, null);
            }
            return $this->_reusable_first_stage;
        }
        return new ReusableFirstStageEntity($this, $data);
    }


    private $_space_station = null;

    // Canonical facade: $client->SpaceStation()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->space_station()
    // resolves here too.
    public function SpaceStation($data = null)
    {
        require_once __DIR__ . '/entity/space_station_entity.php';
        if ($data === null) {
            if ($this->_space_station === null) {
                $this->_space_station = new SpaceStationEntity($this, null);
            }
            return $this->_space_station;
        }
        return new SpaceStationEntity($this, $data);
    }


    private $_spacecraft = null;

    // Canonical facade: $client->Spacecraft()->list() / ->load(["id" => ...]).
    // PHP method names are case-insensitive, so lowercase $client->spacecraft()
    // resolves here too.
    public function Spacecraft($data = null)
    {
        require_once __DIR__ . '/entity/spacecraft_entity.php';
        if ($data === null) {
            if ($this->_spacecraft === null) {
                $this->_spacecraft = new SpacecraftEntity($this, null);
            }
            return $this->_spacecraft;
        }
        return new SpacecraftEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new LaunchLibrary2SDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
