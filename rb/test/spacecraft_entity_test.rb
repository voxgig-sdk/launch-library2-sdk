# Spacecraft entity test

require "minitest/autorun"
require "json"
require_relative "../LaunchLibrary2_sdk"
require_relative "runner"

class SpacecraftEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = LaunchLibrary2SDK.test(nil, nil)
    ent = testsdk.Spacecraft(nil)
    assert !ent.nil?
  end

  def test_list_entities
    seed = {
      "entity" => {
        "spacecraft" => {
          "l1" => { "id" => "l1" },
          "l2" => { "id" => "l2" },
        },
      },
    }
    items = LaunchLibrary2SDK.test(seed, nil).Spacecraft(nil).list(nil, nil)
    # list resolves to one entity per record; data_get reads the record.
    assert_equal 2, items.length
    items.each do |item|
      assert item.respond_to?(:data_get)
      assert item.data_get.is_a?(Hash)
    end
  end

  # Feature #4: the entity stream(action, ...) method runs the op pipeline and
  # returns an Enumerator over result items. With the streaming feature active
  # it yields the feature's incremental output; otherwise it falls back to the
  # materialised list so stream always yields.
  def test_stream
    seed = {
      "entity" => {
        "spacecraft" => {
          "s1" => { "id" => "s1" },
          "s2" => { "id" => "s2" },
          "s3" => { "id" => "s3" },
        },
      },
    }

    # Fallback: streaming inactive -> yields the materialised list items.
    base = LaunchLibrary2SDK.test(seed, nil)
    seen = base.Spacecraft(nil).stream("list", nil, nil).to_a
    assert_equal 3, seen.length

    # Inbound: streaming active -> yields each item from the feature.
    cfg = LaunchLibrary2Config.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("streaming")
      sdk = LaunchLibrary2SDK.test(seed, { "feature" => { "streaming" => { "active" => true } } })
      got = []
      sdk.Spacecraft(nil).stream("list", nil, nil).each do |item|
        if item.is_a?(Array)
          got.concat(item)
        else
          got << item
        end
      end
      assert_equal 3, got.length
    end
  end

  class FailHook < LaunchLibrary2BaseFeature
    attr_reader :unexpected

    def initialize
      super()
      @name = "failhook"
      @unexpected = 0
    end

    def PreSpec(ctx)
      raise "spacecraft hook failed"
    end

    def PreUnexpected(ctx)
      @unexpected += 1
    end
  end

  def test_stream_error
    offline = { "net" => { "offline" => true } }
    err = assert_raises(StandardError) do
      LaunchLibrary2SDK.test(offline, nil).Spacecraft(nil).stream("list", nil, nil).to_a
    end
    assert_match(/offline/, err.message)

    LaunchLibrary2SDK.test(offline, nil).Spacecraft(nil)
      .stream("list", nil, { "ctrl" => { "throw" => false } }).to_a

    cfg = LaunchLibrary2Config.shared_config
    if cfg["feature"].is_a?(Hash) && cfg["feature"].key?("rbac")
      denied = LaunchLibrary2SDK.test(nil, { "feature" => { "rbac" => { "active" => true, "deny" => true } } })
      err = assert_raises(StandardError) do
        denied.Spacecraft(nil).stream("list", nil, nil).to_a
      end
      assert_equal "rbac_denied", err.code
    end
  end

  def test_stream_ctrl
    explain = {}
    ctrl = { "explain" => explain }
    LaunchLibrary2SDK.test(nil, nil).Spacecraft(nil).stream("list", nil, { "ctrl" => ctrl }).to_a
    assert_equal ["explain"], ctrl.keys
    assert_same explain, ctrl["explain"]
    refute_empty explain
  end

  def test_unexpected
    hook = FailHook.new
    client = LaunchLibrary2SDK.new({ "feature" => { "test" => { "active" => true } }, "extend" => [hook] })

    err = assert_raises(StandardError) do
      client.Spacecraft(nil).list(nil, nil)
    end
    assert_match(/hook failed/, err.message)
    assert_operator hook.unexpected, :>, 0

    fired = hook.unexpected
    assert_nil client.Spacecraft(nil).list(nil, { "throw" => false })
    assert_operator hook.unexpected, :>, fired
  end

  def test_validate
    cfg = LaunchLibrary2Config.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = LaunchLibrary2SDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Spacecraft(nil).list({ "limit" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = spacecraft_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "spacecraft." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]
    if setup[:live]
      Runner.live_existing(setup, LIVE_STRICT, "spacecraft") do
        client.Spacecraft(nil).list({}, nil)
      end
    end

    # Bootstrap entity data from existing test data.
    spacecraft_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.spacecraft")))
    spacecraft_ref01_data = nil
    if spacecraft_ref01_data_raw.length > 0
      spacecraft_ref01_data = Helpers.to_map(spacecraft_ref01_data_raw[0][1])
    end

    # LIST
    spacecraft_ref01_ent = client.Spacecraft(nil)
    spacecraft_ref01_match = {}

    spacecraft_ref01_list_result = spacecraft_ref01_ent.list(spacecraft_ref01_match, nil)
    assert spacecraft_ref01_list_result.is_a?(Array)

    # LOAD
    spacecraft_ref01_match_dt0 = {
      "id" => spacecraft_ref01_data["id"],
    }
    spacecraft_ref01_data_dt0_loaded = spacecraft_ref01_ent.load(spacecraft_ref01_match_dt0, nil)
    spacecraft_ref01_data_dt0_load_result = Helpers.to_map(spacecraft_ref01_data_dt0_loaded.respond_to?(:data_get) ? spacecraft_ref01_data_dt0_loaded.data_get : spacecraft_ref01_data_dt0_loaded)
    assert !spacecraft_ref01_data_dt0_load_result.nil?
    assert_equal spacecraft_ref01_data_dt0_load_result["id"], spacecraft_ref01_data["id"]

  end
end

def spacecraft_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "spacecraft", "SpacecraftTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = LaunchLibrary2SDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["spacecraft01", "spacecraft02", "spacecraft03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID" => idmap,
    "LAUNCH_LIBRARY2_TEST_LIVE" => "FALSE",
    "LAUNCH_LIBRARY2_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["LAUNCH_LIBRARY2_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = LaunchLibrary2SDK.new(Helpers.to_map(merged_opts))
  end

  live = env["LAUNCH_LIBRARY2_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["LAUNCH_LIBRARY2_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
