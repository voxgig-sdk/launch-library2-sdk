# Pad entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from launchlibrary2_sdk import LaunchLibrary2SDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPadEntity:

    def test_should_create_instance(self):
        testsdk = LaunchLibrary2SDK.test(None, None)
        ent = testsdk.Pad(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _pad_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "pad." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set LAUNCHLIBRARY__TEST_PAD_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        pad_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.pad")))
        pad_ref01_data = None
        if len(pad_ref01_data_raw) > 0:
            pad_ref01_data = helpers.to_map(pad_ref01_data_raw[0][1])

        # LIST
        pad_ref01_ent = client.Pad(None)
        pad_ref01_match = {}

        pad_ref01_list_result, err = pad_ref01_ent.list(pad_ref01_match, None)
        assert err is None
        assert isinstance(pad_ref01_list_result, list)

        # LOAD
        pad_ref01_match_dt0 = {
            "id": pad_ref01_data["id"],
        }
        pad_ref01_data_dt0_loaded, err = pad_ref01_ent.load(pad_ref01_match_dt0, None)
        assert err is None
        pad_ref01_data_dt0_load_result = helpers.to_map(pad_ref01_data_dt0_loaded)
        assert pad_ref01_data_dt0_load_result is not None
        assert pad_ref01_data_dt0_load_result["id"] == pad_ref01_data["id"]



def _pad_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/pad/PadTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = LaunchLibrary2SDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["pad01", "pad02", "pad03"],
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
        "LAUNCHLIBRARY__TEST_PAD_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "LAUNCHLIBRARY__TEST_PAD_ENTID": idmap,
        "LAUNCHLIBRARY__TEST_LIVE": "FALSE",
        "LAUNCHLIBRARY__TEST_EXPLAIN": "FALSE",
        "LAUNCHLIBRARY__APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("LAUNCHLIBRARY__TEST_PAD_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("LAUNCHLIBRARY__TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("LAUNCHLIBRARY__APIKEY"),
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
