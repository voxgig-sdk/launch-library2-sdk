<?php
declare(strict_types=1);

// Astronaut entity test

require_once __DIR__ . '/../launchlibrary2_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AstronautEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LaunchLibrary2SDK::test(null, null);
        $ent = $testsdk->Astronaut(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = astronaut_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "astronaut." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LAUNCHLIBRARY__TEST_ASTRONAUT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $astronaut_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.astronaut")));
        $astronaut_ref01_data = null;
        if (count($astronaut_ref01_data_raw) > 0) {
            $astronaut_ref01_data = Helpers::to_map($astronaut_ref01_data_raw[0][1]);
        }

        // LIST
        $astronaut_ref01_ent = $client->Astronaut(null);
        $astronaut_ref01_match = [];

        $astronaut_ref01_list_result = $astronaut_ref01_ent->list($astronaut_ref01_match, null);
        $this->assertIsArray($astronaut_ref01_list_result);

        // LOAD
        $astronaut_ref01_match_dt0 = [
            "id" => $astronaut_ref01_data["id"],
        ];
        $astronaut_ref01_data_dt0_loaded = $astronaut_ref01_ent->load($astronaut_ref01_match_dt0, null);
        $astronaut_ref01_data_dt0_load_result = Helpers::to_map($astronaut_ref01_data_dt0_loaded);
        $this->assertNotNull($astronaut_ref01_data_dt0_load_result);
        $this->assertEquals($astronaut_ref01_data_dt0_load_result["id"], $astronaut_ref01_data["id"]);

    }
}

function astronaut_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/astronaut/AstronautTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LaunchLibrary2SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["astronaut01", "astronaut02", "astronaut03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LAUNCHLIBRARY__TEST_ASTRONAUT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LAUNCHLIBRARY__TEST_ASTRONAUT_ENTID" => $idmap,
        "LAUNCHLIBRARY__TEST_LIVE" => "FALSE",
        "LAUNCHLIBRARY__TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LAUNCHLIBRARY__TEST_ASTRONAUT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["LAUNCHLIBRARY__TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new LaunchLibrary2SDK(Helpers::to_map($merged_opts));
    }

    $live = $env["LAUNCHLIBRARY__TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["LAUNCHLIBRARY__TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
