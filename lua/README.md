# LaunchLibrary2 Lua SDK



The Lua SDK for the LaunchLibrary2 API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Agency()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/launch-library2-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("launch-library2_sdk")

local client = sdk.new()
```

### 2. List agency records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local agencys, err = client:Agency():list()
if err then error(err) end

for _, item in ipairs(agencys) do
  print(item["id"], item["abbrev"])
end
```

### 3. Load an agency

```lua
local agency, err = client:Agency():load({ id = 1 })
if err then error(err) end
print(agency)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local astronauts, err = client:Astronaut():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Astronaut():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAUNCH_LIBRARY2_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### LaunchLibrary2SDK

```lua
local sdk = require("launch-library2_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LaunchLibrary2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Agency` | `(data) -> AgencyEntity` | Create an Agency entity instance. |
| `Astronaut` | `(data) -> AstronautEntity` | Create an Astronaut entity instance. |
| `Docking` | `(data) -> DockingEntity` | Create a Docking entity instance. |
| `DockingEvent` | `(data) -> DockingEventEntity` | Create a DockingEvent entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `Expedition` | `(data) -> ExpeditionEntity` | Create an Expedition entity instance. |
| `FirstStage` | `(data) -> FirstStageEntity` | Create a FirstStage entity instance. |
| `Launch` | `(data) -> LaunchEntity` | Create a Launch entity instance. |
| `LaunchVehicle` | `(data) -> LaunchVehicleEntity` | Create a LaunchVehicle entity instance. |
| `Launcher` | `(data) -> LauncherEntity` | Create a Launcher entity instance. |
| `Location` | `(data) -> LocationEntity` | Create a Location entity instance. |
| `Pad` | `(data) -> PadEntity` | Create a Pad entity instance. |
| `ReusableFirstStage` | `(data) -> ReusableFirstStageEntity` | Create a ReusableFirstStage entity instance. |
| `SpaceStation` | `(data) -> SpaceStationEntity` | Create a SpaceStation entity instance. |
| `Spacecraft` | `(data) -> SpacecraftEntity` | Create a Spacecraft entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local agency, err = client:Agency():load({ id = "example_id" })
    if err then error(err) end
    -- agency is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Agency

| Field | Description |
| --- | --- |
| `abbrev` | Agency abbreviation |
| `administrator` | Agency administrator |
| `country_code` | ISO country code |
| `description` | Agency description |
| `founding_year` | Year agency was founded |
| `id` | Agency ID |
| `logo_url` | URL to agency logo |
| `name` | Name of the agency |
| `type` | Type of agency |
| `url` | API URL for this agency |

Operations: List, Load.

API path: `/agencies`

#### Astronaut

| Field | Description |
| --- | --- |
| `bio` | Biographical information |
| `date_of_birth` | Date of birth |
| `date_of_death` | Date of death if applicable |
| `flights_count` | Number of flights |
| `id` | Astronaut ID |
| `name` | Name of the astronaut |
| `nationality` | Astronaut nationality |
| `profile_image` | URL to profile image |
| `spacewalks_count` | Number of spacewalks |
| `status` |  |
| `type` |  |
| `url` | API URL for this astronaut |

Operations: List, Load.

API path: `/astronaut`

#### Docking

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### DockingEvent

| Field | Description |
| --- | --- |
| `departure` | Departure time |
| `docking` | Docking time |
| `docking_location` |  |
| `flight_vehicle` |  |
| `id` | Docking event ID |
| `url` | API URL for this docking event |

Operations: List, Load.

API path: `/docking_event`

#### Event

| Field | Description |
| --- | --- |
| `date` | Event date and time |
| `description` | Description of the event |
| `feature_image` | URL to feature image |
| `id` | Event ID |
| `location` | Event location |
| `name` | Name of the event |
| `news_url` | URL to news article |
| `type` |  |
| `url` | API URL for this event |
| `video_url` | URL to video |

Operations: List, Load.

API path: `/event`

#### Expedition

| Field | Description |
| --- | --- |
| `crew` |  |
| `end` | End date of the expedition |
| `id` | Expedition ID |
| `name` | Name of the expedition |
| `spacestation` |  |
| `start` | Start date of the expedition |
| `url` | API URL for this expedition |

Operations: List, Load.

API path: `/expedition`

#### FirstStage

| Field | Description |
| --- | --- |
| `apogee` | Apogee in km |
| `consecutive_successful_launches` | Number of consecutive successful launches |
| `description` | Description of the launcher |
| `diameter` | Diameter in meters |
| `failed_launches` | Number of failed launches |
| `family` | Launcher family |
| `flights` | Number of flights |
| `full_name` | Full name of the launcher |
| `gto_capacity` | GTO capacity in kg |
| `id` | Configuration ID |
| `launch_mass` | Launch mass in kg |
| `launcher_config` |  |
| `length` | Length in meters |
| `leo_capacity` | LEO capacity in kg |
| `maiden_flight` | Date of maiden flight |
| `manufacturer` |  |
| `max_stage` | Maximum number of stages |
| `min_stage` | Minimum number of stages |
| `name` | Name of the launcher configuration |
| `pending_launches` | Number of pending launches |
| `serial_number` | Serial number of the first stage |
| `status` | Current status |
| `successful_launches` | Number of successful launches |
| `to_thrust` | Takeoff thrust in kN |
| `type` | Type of first stage |
| `url` | API URL for this configuration |
| `variant` | Variant of the launcher |

Operations: List, Load.

API path: `/firststage`

#### Launch

| Field | Description |
| --- | --- |
| `id` | UUID of the launch |
| `image` | URL to launch image |
| `launch_service_provider` |  |
| `mission` |  |
| `name` | Name of the launch |
| `net` | Net Earliest Time (NET) for launch |
| `pad` |  |
| `probability` | Launch probability percentage |
| `rocket` |  |
| `status` |  |
| `url` | API URL for this launch |
| `webcast_live` | Whether the webcast is currently live |
| `window_end` | End of launch window |
| `window_start` | Start of launch window |

Operations: List, Load.

API path: `/launch`

#### LaunchVehicle

| Field | Description |
| --- | --- |
| `apogee` | Apogee in km |
| `consecutive_successful_launches` | Number of consecutive successful launches |
| `description` | Description of the launcher |
| `diameter` | Diameter in meters |
| `failed_launches` | Number of failed launches |
| `family` | Launcher family |
| `full_name` | Full name of the launcher |
| `gto_capacity` | GTO capacity in kg |
| `id` | Configuration ID |
| `launch_mass` | Launch mass in kg |
| `length` | Length in meters |
| `leo_capacity` | LEO capacity in kg |
| `maiden_flight` | Date of maiden flight |
| `manufacturer` |  |
| `max_stage` | Maximum number of stages |
| `min_stage` | Minimum number of stages |
| `name` | Name of the launcher configuration |
| `pending_launches` | Number of pending launches |
| `successful_launches` | Number of successful launches |
| `to_thrust` | Takeoff thrust in kN |
| `url` | API URL for this configuration |
| `variant` | Variant of the launcher |

Operations: List.

API path: `/config/launcher`

#### Launcher

| Field | Description |
| --- | --- |
| `abbrev` | Agency abbreviation |
| `administrator` | Agency administrator |
| `country_code` | ISO country code |
| `description` | Agency description |
| `founding_year` | Year agency was founded |
| `id` | Agency ID |
| `logo_url` | URL to agency logo |
| `name` | Name of the agency |
| `type` | Type of agency |
| `url` | API URL for this agency |

Operations: Load.

API path: `/config/launcher/{id}`

#### Location

| Field | Description |
| --- | --- |
| `country_code` | ISO country code |
| `id` | Location ID |
| `map_image` | URL to map image |
| `name` | Name of the location |
| `total_landing_count` | Total number of landings at this location |
| `total_launch_count` | Total number of launches from this location |
| `url` | API URL for this location |

Operations: List, Load.

API path: `/location`

#### Pad

| Field | Description |
| --- | --- |
| `agency_id` | ID of the agency that operates this pad |
| `country_code` | ISO country code |
| `id` | Location ID |
| `info_url` | URL to more information |
| `latitude` | Latitude coordinate |
| `location` |  |
| `longitude` | Longitude coordinate |
| `map_image` | URL to map image |
| `map_url` | URL to map |
| `name` | Name of the location |
| `total_landing_count` | Total number of landings at this location |
| `total_launch_count` | Total number of launches from this location |
| `url` | API URL for this location |
| `wiki_url` | Wikipedia URL |

Operations: List, Load.

API path: `/pad`

#### ReusableFirstStage

| Field | Description |
| --- | --- |

Operations: .

API path: ``

#### SpaceStation

| Field | Description |
| --- | --- |
| `deorbited` | Date the space station was deorbited |
| `description` | Description of the space station |
| `founded` | Date the space station was founded |
| `id` | Space station ID |
| `image_url` | URL to space station image |
| `name` | Name of the space station |
| `orbit` | Orbital information |
| `owners` |  |
| `status` |  |
| `type` |  |
| `url` | API URL for this space station |

Operations: List, Load.

API path: `/spacestation`

#### Spacecraft

| Field | Description |
| --- | --- |
| `agency` |  |
| `capability` | Spacecraft capability |
| `crew_capacity` | Crew capacity |
| `details` | Detailed information |
| `diameter` | Diameter in meters |
| `height` | Height in meters |
| `history` | Historical information |
| `human_rated` | Whether the spacecraft is human-rated |
| `id` | Spacecraft configuration ID |
| `image_url` | URL to spacecraft image |
| `in_use` | Whether the spacecraft is currently in use |
| `maiden_flight` | Date of maiden flight |
| `name` | Name of the spacecraft |
| `type` |  |
| `url` | API URL for this configuration |

Operations: List, Load.

API path: `/config/spacecraft`



## Entities


### Agency

Create an instance: `local agency = client:Agency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbrev` | `string` | Agency abbreviation |
| `administrator` | `string` | Agency administrator |
| `country_code` | `string` | ISO country code |
| `description` | `string` | Agency description |
| `founding_year` | `string` | Year agency was founded |
| `id` | `number` | Agency ID |
| `logo_url` | `string` | URL to agency logo |
| `name` | `string` | Name of the agency |
| `type` | `string` | Type of agency |
| `url` | `string` | API URL for this agency |

#### Example: Load

```lua
local agency, err = client:Agency():load({ id = 1 })
```

#### Example: List

```lua
local agencys, err = client:Agency():list()
```


### Astronaut

Create an instance: `local astronaut = client:Astronaut(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `string` | Biographical information |
| `date_of_birth` | `string` | Date of birth |
| `date_of_death` | `string` | Date of death if applicable |
| `flights_count` | `number` | Number of flights |
| `id` | `number` | Astronaut ID |
| `name` | `string` | Name of the astronaut |
| `nationality` | `string` | Astronaut nationality |
| `profile_image` | `string` | URL to profile image |
| `spacewalks_count` | `number` | Number of spacewalks |
| `status` | `table` |  |
| `type` | `table` |  |
| `url` | `string` | API URL for this astronaut |

#### Example: Load

```lua
local astronaut, err = client:Astronaut():load({ id = 1 })
```

#### Example: List

```lua
local astronauts, err = client:Astronaut():list()
```


### Docking

Create an instance: `local docking = client:Docking(nil)`


### DockingEvent

Create an instance: `local docking_event = client:DockingEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departure` | `string` | Departure time |
| `docking` | `string` | Docking time |
| `docking_location` | `table` |  |
| `flight_vehicle` | `table` |  |
| `id` | `number` | Docking event ID |
| `url` | `string` | API URL for this docking event |

#### Example: Load

```lua
local docking_event, err = client:DockingEvent():load({ id = 1 })
```

#### Example: List

```lua
local docking_events, err = client:DockingEvent():list()
```


### Event

Create an instance: `local event = client:Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `string` | Event date and time |
| `description` | `string` | Description of the event |
| `feature_image` | `string` | URL to feature image |
| `id` | `number` | Event ID |
| `location` | `string` | Event location |
| `name` | `string` | Name of the event |
| `news_url` | `string` | URL to news article |
| `type` | `table` |  |
| `url` | `string` | API URL for this event |
| `video_url` | `string` | URL to video |

#### Example: Load

```lua
local event, err = client:Event():load({ id = 1 })
```

#### Example: List

```lua
local events, err = client:Event():list()
```


### Expedition

Create an instance: `local expedition = client:Expedition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `table` |  |
| `end` | `string` | End date of the expedition |
| `id` | `number` | Expedition ID |
| `name` | `string` | Name of the expedition |
| `spacestation` | `table` |  |
| `start` | `string` | Start date of the expedition |
| `url` | `string` | API URL for this expedition |

#### Example: Load

```lua
local expedition, err = client:Expedition():load({ id = 1 })
```

#### Example: List

```lua
local expeditions, err = client:Expedition():list()
```


### FirstStage

Create an instance: `local first_stage = client:FirstStage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `number` | Apogee in km |
| `consecutive_successful_launches` | `number` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `number` | Diameter in meters |
| `failed_launches` | `number` | Number of failed launches |
| `family` | `string` | Launcher family |
| `flights` | `number` | Number of flights |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `number` | GTO capacity in kg |
| `id` | `number` | Configuration ID |
| `launch_mass` | `number` | Launch mass in kg |
| `launcher_config` | `table` |  |
| `length` | `number` | Length in meters |
| `leo_capacity` | `number` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `table` |  |
| `max_stage` | `number` | Maximum number of stages |
| `min_stage` | `number` | Minimum number of stages |
| `name` | `string` | Name of the launcher configuration |
| `pending_launches` | `number` | Number of pending launches |
| `serial_number` | `string` | Serial number of the first stage |
| `status` | `string` | Current status |
| `successful_launches` | `number` | Number of successful launches |
| `to_thrust` | `number` | Takeoff thrust in kN |
| `type` | `string` | Type of first stage |
| `url` | `string` | API URL for this configuration |
| `variant` | `string` | Variant of the launcher |

#### Example: Load

```lua
local first_stage, err = client:FirstStage():load({ id = 1 })
```

#### Example: List

```lua
local first_stages, err = client:FirstStage():list()
```


### Launch

Create an instance: `local launch = client:Launch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | UUID of the launch |
| `image` | `string` | URL to launch image |
| `launch_service_provider` | `table` |  |
| `mission` | `table` |  |
| `name` | `string` | Name of the launch |
| `net` | `string` | Net Earliest Time (NET) for launch |
| `pad` | `table` |  |
| `probability` | `number` | Launch probability percentage |
| `rocket` | `table` |  |
| `status` | `table` |  |
| `url` | `string` | API URL for this launch |
| `webcast_live` | `boolean` | Whether the webcast is currently live |
| `window_end` | `string` | End of launch window |
| `window_start` | `string` | Start of launch window |

#### Example: Load

```lua
local launch, err = client:Launch():load({ id = "launch_id" })
```

#### Example: List

```lua
local launchs, err = client:Launch():list()
```


### LaunchVehicle

Create an instance: `local launch_vehicle = client:LaunchVehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `number` | Apogee in km |
| `consecutive_successful_launches` | `number` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `number` | Diameter in meters |
| `failed_launches` | `number` | Number of failed launches |
| `family` | `string` | Launcher family |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `number` | GTO capacity in kg |
| `id` | `number` | Configuration ID |
| `launch_mass` | `number` | Launch mass in kg |
| `length` | `number` | Length in meters |
| `leo_capacity` | `number` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `table` |  |
| `max_stage` | `number` | Maximum number of stages |
| `min_stage` | `number` | Minimum number of stages |
| `name` | `string` | Name of the launcher configuration |
| `pending_launches` | `number` | Number of pending launches |
| `successful_launches` | `number` | Number of successful launches |
| `to_thrust` | `number` | Takeoff thrust in kN |
| `url` | `string` | API URL for this configuration |
| `variant` | `string` | Variant of the launcher |

#### Example: List

```lua
local launch_vehicles, err = client:LaunchVehicle():list()
```


### Launcher

Create an instance: `local launcher = client:Launcher(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbrev` | `string` | Agency abbreviation |
| `administrator` | `string` | Agency administrator |
| `country_code` | `string` | ISO country code |
| `description` | `string` | Agency description |
| `founding_year` | `string` | Year agency was founded |
| `id` | `number` | Agency ID |
| `logo_url` | `string` | URL to agency logo |
| `name` | `string` | Name of the agency |
| `type` | `string` | Type of agency |
| `url` | `string` | API URL for this agency |

#### Example: Load

```lua
local launcher, err = client:Launcher():load({ id = 1 })
```


### Location

Create an instance: `local location = client:Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `string` | ISO country code |
| `id` | `number` | Location ID |
| `map_image` | `string` | URL to map image |
| `name` | `string` | Name of the location |
| `total_landing_count` | `number` | Total number of landings at this location |
| `total_launch_count` | `number` | Total number of launches from this location |
| `url` | `string` | API URL for this location |

#### Example: Load

```lua
local location, err = client:Location():load({ id = 1 })
```

#### Example: List

```lua
local locations, err = client:Location():list()
```


### Pad

Create an instance: `local pad = client:Pad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency_id` | `number` | ID of the agency that operates this pad |
| `country_code` | `string` | ISO country code |
| `id` | `number` | Location ID |
| `info_url` | `string` | URL to more information |
| `latitude` | `string` | Latitude coordinate |
| `location` | `table` |  |
| `longitude` | `string` | Longitude coordinate |
| `map_image` | `string` | URL to map image |
| `map_url` | `string` | URL to map |
| `name` | `string` | Name of the location |
| `total_landing_count` | `number` | Total number of landings at this location |
| `total_launch_count` | `number` | Total number of launches from this location |
| `url` | `string` | API URL for this location |
| `wiki_url` | `string` | Wikipedia URL |

#### Example: Load

```lua
local pad, err = client:Pad():load({ id = 1 })
```

#### Example: List

```lua
local pads, err = client:Pad():list()
```


### ReusableFirstStage

Create an instance: `local reusable_first_stage = client:ReusableFirstStage(nil)`


### SpaceStation

Create an instance: `local space_station = client:SpaceStation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deorbited` | `string` | Date the space station was deorbited |
| `description` | `string` | Description of the space station |
| `founded` | `string` | Date the space station was founded |
| `id` | `number` | Space station ID |
| `image_url` | `string` | URL to space station image |
| `name` | `string` | Name of the space station |
| `orbit` | `string` | Orbital information |
| `owners` | `table` |  |
| `status` | `table` |  |
| `type` | `table` |  |
| `url` | `string` | API URL for this space station |

#### Example: Load

```lua
local space_station, err = client:SpaceStation():load({ id = 1 })
```

#### Example: List

```lua
local space_stations, err = client:SpaceStation():list()
```


### Spacecraft

Create an instance: `local spacecraft = client:Spacecraft(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `table` |  |
| `capability` | `string` | Spacecraft capability |
| `crew_capacity` | `number` | Crew capacity |
| `details` | `string` | Detailed information |
| `diameter` | `number` | Diameter in meters |
| `height` | `number` | Height in meters |
| `history` | `string` | Historical information |
| `human_rated` | `boolean` | Whether the spacecraft is human-rated |
| `id` | `number` | Spacecraft configuration ID |
| `image_url` | `string` | URL to spacecraft image |
| `in_use` | `boolean` | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | Date of maiden flight |
| `name` | `string` | Name of the spacecraft |
| `type` | `table` |  |
| `url` | `string` | API URL for this configuration |

#### Example: Load

```lua
local spacecraft, err = client:Spacecraft():load({ id = 1 })
```

#### Example: List

```lua
local spacecrafts, err = client:Spacecraft():list()
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── launch-library2_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`launch-library2_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local astronaut = client:Astronaut()
astronaut:list()

-- astronaut:data_get() now returns the astronaut data from the last list
-- astronaut:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
