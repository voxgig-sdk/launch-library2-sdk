<?php
declare(strict_types=1);

// Launcher entity test

require_once __DIR__ . '/../launchlibrary2_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class LauncherEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = LaunchLibrary2SDK::test(null, null);
        $ent = $testsdk->Launcher(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = launcher_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "launcher." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $launcher_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.launcher")));
        $launcher_ref01_data = null;
        if (count($launcher_ref01_data_raw) > 0) {
            $launcher_ref01_data = Helpers::to_map($launcher_ref01_data_raw[0][1]);
        }

        // LOAD
        $launcher_ref01_ent = $client->Launcher(null);
        $launcher_ref01_match_dt0 = [
            "id" => $launcher_ref01_data["id"],
        ];
        $launcher_ref01_data_dt0_loaded = $launcher_ref01_ent->load($launcher_ref01_match_dt0, null);
        $launcher_ref01_data_dt0_load_result = Helpers::to_map(is_object($launcher_ref01_data_dt0_loaded) && method_exists($launcher_ref01_data_dt0_loaded, 'data_get') ? $launcher_ref01_data_dt0_loaded->data_get() : $launcher_ref01_data_dt0_loaded);
        $this->assertNotNull($launcher_ref01_data_dt0_load_result);
        $this->assertEquals($launcher_ref01_data_dt0_load_result["id"], $launcher_ref01_data["id"]);

    }
}

function launcher_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/launcher/LauncherTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = LaunchLibrary2SDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["launcher01", "launcher02", "launcher03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID" => $idmap,
        "LAUNCH_LIBRARY2_TEST_LIVE" => "FALSE",
        "LAUNCH_LIBRARY2_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID"]);
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
