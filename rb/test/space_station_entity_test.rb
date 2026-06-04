# SpaceStation entity test

require "minitest/autorun"
require "json"
require_relative "../LaunchLibrary2_sdk"
require_relative "runner"

class SpaceStationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = LaunchLibrary2SDK.test(nil, nil)
    ent = testsdk.SpaceStation(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = space_station_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "space_station." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set LAUNCHLIBRARY__TEST_SPACE_STATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    space_station_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.space_station")))
    space_station_ref01_data = nil
    if space_station_ref01_data_raw.length > 0
      space_station_ref01_data = Helpers.to_map(space_station_ref01_data_raw[0][1])
    end

    # LIST
    space_station_ref01_ent = client.SpaceStation(nil)
    space_station_ref01_match = {}

    space_station_ref01_list_result, err = space_station_ref01_ent.list(space_station_ref01_match, nil)
    assert_nil err
    assert space_station_ref01_list_result.is_a?(Array)

    # LOAD
    space_station_ref01_match_dt0 = {
      "id" => space_station_ref01_data["id"],
    }
    space_station_ref01_data_dt0_loaded, err = space_station_ref01_ent.load(space_station_ref01_match_dt0, nil)
    assert_nil err
    space_station_ref01_data_dt0_load_result = Helpers.to_map(space_station_ref01_data_dt0_loaded)
    assert !space_station_ref01_data_dt0_load_result.nil?
    assert_equal space_station_ref01_data_dt0_load_result["id"], space_station_ref01_data["id"]

  end
end

def space_station_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "space_station", "SpaceStationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LaunchLibrary2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["space_station01", "space_station02", "space_station03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["LAUNCHLIBRARY__TEST_SPACE_STATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LAUNCHLIBRARY__TEST_SPACE_STATION_ENTID" => idmap,
    "LAUNCHLIBRARY__TEST_LIVE" => "FALSE",
    "LAUNCHLIBRARY__TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["LAUNCHLIBRARY__TEST_SPACE_STATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LAUNCHLIBRARY__TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = LaunchLibrary2SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LAUNCHLIBRARY__TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LAUNCHLIBRARY__TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
