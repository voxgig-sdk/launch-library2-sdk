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

# Load typed models (Struct value objects).
require_relative 'LaunchLibrary2_types'


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
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue LaunchLibrary2Error => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = LaunchLibrary2Helpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
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
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.agency.list / client.agency.load({ "id" => ... })
  def agency
    require_relative 'entity/agency_entity'
    @agency ||= AgencyEntity.new(self, nil)
  end

  # Deprecated: use client.agency instead.
  def Agency(data = nil)
    require_relative 'entity/agency_entity'
    AgencyEntity.new(self, data)
  end


  # Idiomatic facade: client.astronaut.list / client.astronaut.load({ "id" => ... })
  def astronaut
    require_relative 'entity/astronaut_entity'
    @astronaut ||= AstronautEntity.new(self, nil)
  end

  # Deprecated: use client.astronaut instead.
  def Astronaut(data = nil)
    require_relative 'entity/astronaut_entity'
    AstronautEntity.new(self, data)
  end


  # Idiomatic facade: client.docking.list / client.docking.load({ "id" => ... })
  def docking
    require_relative 'entity/docking_entity'
    @docking ||= DockingEntity.new(self, nil)
  end

  # Deprecated: use client.docking instead.
  def Docking(data = nil)
    require_relative 'entity/docking_entity'
    DockingEntity.new(self, data)
  end


  # Idiomatic facade: client.docking_event.list / client.docking_event.load({ "id" => ... })
  def docking_event
    require_relative 'entity/docking_event_entity'
    @docking_event ||= DockingEventEntity.new(self, nil)
  end

  # Deprecated: use client.docking_event instead.
  def DockingEvent(data = nil)
    require_relative 'entity/docking_event_entity'
    DockingEventEntity.new(self, data)
  end


  # Idiomatic facade: client.event.list / client.event.load({ "id" => ... })
  def event
    require_relative 'entity/event_entity'
    @event ||= EventEntity.new(self, nil)
  end

  # Deprecated: use client.event instead.
  def Event(data = nil)
    require_relative 'entity/event_entity'
    EventEntity.new(self, data)
  end


  # Idiomatic facade: client.expedition.list / client.expedition.load({ "id" => ... })
  def expedition
    require_relative 'entity/expedition_entity'
    @expedition ||= ExpeditionEntity.new(self, nil)
  end

  # Deprecated: use client.expedition instead.
  def Expedition(data = nil)
    require_relative 'entity/expedition_entity'
    ExpeditionEntity.new(self, data)
  end


  # Idiomatic facade: client.first_stage.list / client.first_stage.load({ "id" => ... })
  def first_stage
    require_relative 'entity/first_stage_entity'
    @first_stage ||= FirstStageEntity.new(self, nil)
  end

  # Deprecated: use client.first_stage instead.
  def FirstStage(data = nil)
    require_relative 'entity/first_stage_entity'
    FirstStageEntity.new(self, data)
  end


  # Idiomatic facade: client.launch.list / client.launch.load({ "id" => ... })
  def launch
    require_relative 'entity/launch_entity'
    @launch ||= LaunchEntity.new(self, nil)
  end

  # Deprecated: use client.launch instead.
  def Launch(data = nil)
    require_relative 'entity/launch_entity'
    LaunchEntity.new(self, data)
  end


  # Idiomatic facade: client.launch_vehicle.list / client.launch_vehicle.load({ "id" => ... })
  def launch_vehicle
    require_relative 'entity/launch_vehicle_entity'
    @launch_vehicle ||= LaunchVehicleEntity.new(self, nil)
  end

  # Deprecated: use client.launch_vehicle instead.
  def LaunchVehicle(data = nil)
    require_relative 'entity/launch_vehicle_entity'
    LaunchVehicleEntity.new(self, data)
  end


  # Idiomatic facade: client.launcher.list / client.launcher.load({ "id" => ... })
  def launcher
    require_relative 'entity/launcher_entity'
    @launcher ||= LauncherEntity.new(self, nil)
  end

  # Deprecated: use client.launcher instead.
  def Launcher(data = nil)
    require_relative 'entity/launcher_entity'
    LauncherEntity.new(self, data)
  end


  # Idiomatic facade: client.location.list / client.location.load({ "id" => ... })
  def location
    require_relative 'entity/location_entity'
    @location ||= LocationEntity.new(self, nil)
  end

  # Deprecated: use client.location instead.
  def Location(data = nil)
    require_relative 'entity/location_entity'
    LocationEntity.new(self, data)
  end


  # Idiomatic facade: client.pad.list / client.pad.load({ "id" => ... })
  def pad
    require_relative 'entity/pad_entity'
    @pad ||= PadEntity.new(self, nil)
  end

  # Deprecated: use client.pad instead.
  def Pad(data = nil)
    require_relative 'entity/pad_entity'
    PadEntity.new(self, data)
  end


  # Idiomatic facade: client.reusable_first_stage.list / client.reusable_first_stage.load({ "id" => ... })
  def reusable_first_stage
    require_relative 'entity/reusable_first_stage_entity'
    @reusable_first_stage ||= ReusableFirstStageEntity.new(self, nil)
  end

  # Deprecated: use client.reusable_first_stage instead.
  def ReusableFirstStage(data = nil)
    require_relative 'entity/reusable_first_stage_entity'
    ReusableFirstStageEntity.new(self, data)
  end


  # Idiomatic facade: client.space_station.list / client.space_station.load({ "id" => ... })
  def space_station
    require_relative 'entity/space_station_entity'
    @space_station ||= SpaceStationEntity.new(self, nil)
  end

  # Deprecated: use client.space_station instead.
  def SpaceStation(data = nil)
    require_relative 'entity/space_station_entity'
    SpaceStationEntity.new(self, data)
  end


  # Idiomatic facade: client.spacecraft.list / client.spacecraft.load({ "id" => ... })
  def spacecraft
    require_relative 'entity/spacecraft_entity'
    @spacecraft ||= SpacecraftEntity.new(self, nil)
  end

  # Deprecated: use client.spacecraft instead.
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
