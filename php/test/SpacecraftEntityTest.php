<?php
declare(strict_types=1);

// Spacecraft entity test

require_once __DIR__ . '/../launchlibrary2_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SpacecraftEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LaunchLibrary2SDK::test(null, null);
        $ent = $testsdk->Spacecraft(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "spacecraft" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = LaunchLibrary2SDK::test($seed, null);
        $seen = iterator_to_array($base->Spacecraft(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = LaunchLibrary2Config::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = LaunchLibrary2SDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Spacecraft(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = spacecraft_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "spacecraft." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $spacecraft_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.spacecraft")));
        $spacecraft_ref01_data = null;
        if (count($spacecraft_ref01_data_raw) > 0) {
            $spacecraft_ref01_data = Helpers::to_map($spacecraft_ref01_data_raw[0][1]);
        }

        // LIST
        $spacecraft_ref01_ent = $client->Spacecraft(null);
        $spacecraft_ref01_match = [];

        $spacecraft_ref01_list_result = $spacecraft_ref01_ent->list($spacecraft_ref01_match, null);
        $this->assertIsArray($spacecraft_ref01_list_result);

        // LOAD
        $spacecraft_ref01_match_dt0 = [
            "id" => $spacecraft_ref01_data["id"],
        ];
        $spacecraft_ref01_data_dt0_loaded = $spacecraft_ref01_ent->load($spacecraft_ref01_match_dt0, null);
        $spacecraft_ref01_data_dt0_load_result = Helpers::to_map(is_object($spacecraft_ref01_data_dt0_loaded) && method_exists($spacecraft_ref01_data_dt0_loaded, 'data_get') ? $spacecraft_ref01_data_dt0_loaded->data_get() : $spacecraft_ref01_data_dt0_loaded);
        $this->assertNotNull($spacecraft_ref01_data_dt0_load_result);
        $this->assertEquals($spacecraft_ref01_data_dt0_load_result["id"], $spacecraft_ref01_data["id"]);

    }
}

function spacecraft_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/spacecraft/SpacecraftTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LaunchLibrary2SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["spacecraft01", "spacecraft02", "spacecraft03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID" => $idmap,
        "LAUNCH_LIBRARY2_TEST_LIVE" => "FALSE",
        "LAUNCH_LIBRARY2_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LAUNCH_LIBRARY2_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new LaunchLibrary2SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LAUNCH_LIBRARY2_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LAUNCH_LIBRARY2_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
