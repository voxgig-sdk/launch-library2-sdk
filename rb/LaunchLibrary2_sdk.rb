# LaunchLibrary2 SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'


class LaunchLibrary2SDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = LaunchLibrary2Utility.new
    @_utility = utility

    config = LaunchLibrary2Config.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = LaunchLibrary2Helpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = LaunchLibrary2Helpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, LaunchLibrary2Features.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    LaunchLibrary2Utility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = LaunchLibrary2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = LaunchLibrary2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = LaunchLibrary2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = LaunchLibrary2Spec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    return nil, err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    fetchdef, err = prepare(fetchargs)
    return { "ok" => false, "err" => err }, nil if err

    fetchargs ||= {}
    ctrl = LaunchLibrary2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err }, nil if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }, nil
    end

    if fetched.is_a?(Hash)
      status = LaunchLibrary2Helpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }, nil
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }, nil
  end


  def Agency(data = nil)
    require_relative 'entity/agency_entity'
    AgencyEntity.new(self, data)
  end


  def Astronaut(data = nil)
    require_relative 'entity/astronaut_entity'
    AstronautEntity.new(self, data)
  end


  def Docking(data = nil)
    require_relative 'entity/docking_entity'
    DockingEntity.new(self, data)
  end


  def DockingEvent(data = nil)
    require_relative 'entity/docking_event_entity'
    DockingEventEntity.new(self, data)
  end


  def Event(data = nil)
    require_relative 'entity/event_entity'
    EventEntity.new(self, data)
  end


  def Expedition(data = nil)
    require_relative 'entity/expedition_entity'
    ExpeditionEntity.new(self, data)
  end


  def FirstStage(data = nil)
    require_relative 'entity/first_stage_entity'
    FirstStageEntity.new(self, data)
  end


  def Launch(data = nil)
    require_relative 'entity/launch_entity'
    LaunchEntity.new(self, data)
  end


  def LaunchVehicle(data = nil)
    require_relative 'entity/launch_vehicle_entity'
    LaunchVehicleEntity.new(self, data)
  end


  def Launcher(data = nil)
    require_relative 'entity/launcher_entity'
    LauncherEntity.new(self, data)
  end


  def Location(data = nil)
    require_relative 'entity/location_entity'
    LocationEntity.new(self, data)
  end


  def Pad(data = nil)
    require_relative 'entity/pad_entity'
    PadEntity.new(self, data)
  end


  def ReusableFirstStage(data = nil)
    require_relative 'entity/reusable_first_stage_entity'
    ReusableFirstStageEntity.new(self, data)
  end


  def SpaceStation(data = nil)
    require_relative 'entity/space_station_entity'
    SpaceStationEntity.new(self, data)
  end


  def Spacecraft(data = nil)
    require_relative 'entity/spacecraft_entity'
    SpacecraftEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = LaunchLibrary2SDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
