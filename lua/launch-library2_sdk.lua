-- LaunchLibrary2 SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local LaunchLibrary2SDK = {}
LaunchLibrary2SDK.__index = LaunchLibrary2SDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

LaunchLibrary2SDK._make_feature = _make_feature


function LaunchLibrary2SDK.new(options)
  local self = setmetatable({}, LaunchLibrary2SDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function LaunchLibrary2SDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function LaunchLibrary2SDK:get_utility()
  return Utility.copy(self._utility)
end


function LaunchLibrary2SDK:get_root_ctx()
  return self._rootctx
end


function LaunchLibrary2SDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function LaunchLibrary2SDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:Agency():list() / client:Agency():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Agency(data)
  local EntityMod = require("entity.agency_entity")
  if data == nil then
    if self._agency == nil then
      self._agency = EntityMod.new(self, nil)
    end
    return self._agency
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Astronaut():list() / client:Astronaut():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Astronaut(data)
  local EntityMod = require("entity.astronaut_entity")
  if data == nil then
    if self._astronaut == nil then
      self._astronaut = EntityMod.new(self, nil)
    end
    return self._astronaut
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Docking():list() / client:Docking():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Docking(data)
  local EntityMod = require("entity.docking_entity")
  if data == nil then
    if self._docking == nil then
      self._docking = EntityMod.new(self, nil)
    end
    return self._docking
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:DockingEvent():list() / client:DockingEvent():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:DockingEvent(data)
  local EntityMod = require("entity.docking_event_entity")
  if data == nil then
    if self._docking_event == nil then
      self._docking_event = EntityMod.new(self, nil)
    end
    return self._docking_event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Event():list() / client:Event():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Event(data)
  local EntityMod = require("entity.event_entity")
  if data == nil then
    if self._event == nil then
      self._event = EntityMod.new(self, nil)
    end
    return self._event
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Expedition():list() / client:Expedition():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Expedition(data)
  local EntityMod = require("entity.expedition_entity")
  if data == nil then
    if self._expedition == nil then
      self._expedition = EntityMod.new(self, nil)
    end
    return self._expedition
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:FirstStage():list() / client:FirstStage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:FirstStage(data)
  local EntityMod = require("entity.first_stage_entity")
  if data == nil then
    if self._first_stage == nil then
      self._first_stage = EntityMod.new(self, nil)
    end
    return self._first_stage
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Launch():list() / client:Launch():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Launch(data)
  local EntityMod = require("entity.launch_entity")
  if data == nil then
    if self._launch == nil then
      self._launch = EntityMod.new(self, nil)
    end
    return self._launch
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:LaunchVehicle():list() / client:LaunchVehicle():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:LaunchVehicle(data)
  local EntityMod = require("entity.launch_vehicle_entity")
  if data == nil then
    if self._launch_vehicle == nil then
      self._launch_vehicle = EntityMod.new(self, nil)
    end
    return self._launch_vehicle
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Launcher():list() / client:Launcher():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Launcher(data)
  local EntityMod = require("entity.launcher_entity")
  if data == nil then
    if self._launcher == nil then
      self._launcher = EntityMod.new(self, nil)
    end
    return self._launcher
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Location():list() / client:Location():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Location(data)
  local EntityMod = require("entity.location_entity")
  if data == nil then
    if self._location == nil then
      self._location = EntityMod.new(self, nil)
    end
    return self._location
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Pad():list() / client:Pad():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Pad(data)
  local EntityMod = require("entity.pad_entity")
  if data == nil then
    if self._pad == nil then
      self._pad = EntityMod.new(self, nil)
    end
    return self._pad
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:ReusableFirstStage():list() / client:ReusableFirstStage():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:ReusableFirstStage(data)
  local EntityMod = require("entity.reusable_first_stage_entity")
  if data == nil then
    if self._reusable_first_stage == nil then
      self._reusable_first_stage = EntityMod.new(self, nil)
    end
    return self._reusable_first_stage
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:SpaceStation():list() / client:SpaceStation():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:SpaceStation(data)
  local EntityMod = require("entity.space_station_entity")
  if data == nil then
    if self._space_station == nil then
      self._space_station = EntityMod.new(self, nil)
    end
    return self._space_station
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Spacecraft():list() / client:Spacecraft():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function LaunchLibrary2SDK:Spacecraft(data)
  local EntityMod = require("entity.spacecraft_entity")
  if data == nil then
    if self._spacecraft == nil then
      self._spacecraft = EntityMod.new(self, nil)
    end
    return self._spacecraft
  end
  return EntityMod.new(self, data)
end




function LaunchLibrary2SDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = LaunchLibrary2SDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return LaunchLibrary2SDK
