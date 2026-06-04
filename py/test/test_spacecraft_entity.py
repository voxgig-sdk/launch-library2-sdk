# Spacecraft entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from launchlibrary2_sdk import LaunchLibrary2SDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestSpacecraftEntity:

    def test_should_create_instance(self):
        testsdk = LaunchLibrary2SDK.test(None, None)
        ent = testsdk.Spacecraft(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _spacecraft_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "spacecraft." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LAUNCHLIBRARY__TEST_SPACECRAFT_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        spacecraft_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.spacecraft")))
        spacecraft_ref01_data = None
        if len(spacecraft_ref01_data_raw) > 0:
            spacecraft_ref01_data = helpers.to_map(spacecraft_ref01_data_raw[0][1])

        # LIST
        spacecraft_ref01_ent = client.Spacecraft(None)
        spacecraft_ref01_match = {}

        spacecraft_ref01_list_result, err = spacecraft_ref01_ent.list(spacecraft_ref01_match, None)
        assert err is None
        assert isinstance(spacecraft_ref01_list_result, list)

        # LOAD
        spacecraft_ref01_match_dt0 = {
            "id": spacecraft_ref01_data["id"],
        }
        spacecraft_ref01_data_dt0_loaded, err = spacecraft_ref01_ent.load(spacecraft_ref01_match_dt0, None)
        assert err is None
        spacecraft_ref01_data_dt0_load_result = helpers.to_map(spacecraft_ref01_data_dt0_loaded)
        assert spacecraft_ref01_data_dt0_load_result is not None
        assert spacecraft_ref01_data_dt0_load_result["id"] == spacecraft_ref01_data["id"]



def _spacecraft_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/spacecraft/SpacecraftTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LaunchLibrary2SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["spacecraft01", "spacecraft02", "spacecraft03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "LAUNCHLIBRARY__TEST_SPACECRAFT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LAUNCHLIBRARY__TEST_SPACECRAFT_ENTID": idmap,
        "LAUNCHLIBRARY__TEST_LIVE": "FALSE",
        "LAUNCHLIBRARY__TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LAUNCHLIBRARY__TEST_SPACECRAFT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LAUNCHLIBRARY__TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = LaunchLibrary2SDK(helpers.to_map(merged_opts))

    _live = env.get("LAUNCHLIBRARY__TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("LAUNCHLIBRARY__TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
