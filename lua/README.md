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
local agency, err = client:Agency():load({ id = "example_id" })
if err then error(err) end
print(agency)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local agencys, err = client:Agency():list()
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

local result, err = client:Agency():list()
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
| `abbrev` |  |
| `administrator` |  |
| `country_code` |  |
| `description` |  |
| `founding_year` |  |
| `id` |  |
| `logo_url` |  |
| `name` |  |
| `type` |  |
| `url` |  |

Operations: List, Load.

API path: `/agencies`

#### Astronaut

| Field | Description |
| --- | --- |
| `bio` |  |
| `date_of_birth` |  |
| `date_of_death` |  |
| `flights_count` |  |
| `id` |  |
| `name` |  |
| `nationality` |  |
| `profile_image` |  |
| `spacewalks_count` |  |
| `status` |  |
| `type` |  |
| `url` |  |

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
| `departure` |  |
| `docking` |  |
| `docking_location` |  |
| `flight_vehicle` |  |
| `id` |  |
| `url` |  |

Operations: List, Load.

API path: `/docking_event`

#### Event

| Field | Description |
| --- | --- |
| `date` |  |
| `description` |  |
| `feature_image` |  |
| `id` |  |
| `location` |  |
| `name` |  |
| `news_url` |  |
| `type` |  |
| `url` |  |
| `video_url` |  |

Operations: List, Load.

API path: `/event`

#### Expedition

| Field | Description |
| --- | --- |
| `crew` |  |
| `end` |  |
| `id` |  |
| `name` |  |
| `spacestation` |  |
| `start` |  |
| `url` |  |

Operations: List, Load.

API path: `/expedition`

#### FirstStage

| Field | Description |
| --- | --- |
| `flight` |  |
| `id` |  |
| `launcher_config` |  |
| `serial_number` |  |
| `status` |  |
| `type` |  |
| `url` |  |

Operations: List, Load.

API path: `/firststage`

#### Launch

| Field | Description |
| --- | --- |
| `id` |  |
| `image` |  |
| `launch_service_provider` |  |
| `mission` |  |
| `name` |  |
| `net` |  |
| `pad` |  |
| `probability` |  |
| `rocket` |  |
| `status` |  |
| `url` |  |
| `webcast_live` |  |
| `window_end` |  |
| `window_start` |  |

Operations: List, Load.

API path: `/launch`

#### LaunchVehicle

| Field | Description |
| --- | --- |
| `apogee` |  |
| `consecutive_successful_launch` |  |
| `description` |  |
| `diameter` |  |
| `failed_launch` |  |
| `family` |  |
| `full_name` |  |
| `gto_capacity` |  |
| `id` |  |
| `launch_mass` |  |
| `length` |  |
| `leo_capacity` |  |
| `maiden_flight` |  |
| `manufacturer` |  |
| `max_stage` |  |
| `min_stage` |  |
| `name` |  |
| `pending_launch` |  |
| `successful_launch` |  |
| `to_thrust` |  |
| `url` |  |
| `variant` |  |

Operations: List.

API path: `/config/launcher`

#### Launcher

| Field | Description |
| --- | --- |
| `apogee` |  |
| `consecutive_successful_launch` |  |
| `description` |  |
| `diameter` |  |
| `failed_launch` |  |
| `family` |  |
| `full_name` |  |
| `gto_capacity` |  |
| `id` |  |
| `launch_mass` |  |
| `length` |  |
| `leo_capacity` |  |
| `maiden_flight` |  |
| `manufacturer` |  |
| `max_stage` |  |
| `min_stage` |  |
| `name` |  |
| `pending_launch` |  |
| `successful_launch` |  |
| `to_thrust` |  |
| `url` |  |
| `variant` |  |

Operations: Load.

API path: `/config/launcher/{id}`

#### Location

| Field | Description |
| --- | --- |
| `country_code` |  |
| `id` |  |
| `map_image` |  |
| `name` |  |
| `total_landing_count` |  |
| `total_launch_count` |  |
| `url` |  |

Operations: List, Load.

API path: `/location`

#### Pad

| Field | Description |
| --- | --- |
| `agency_id` |  |
| `id` |  |
| `info_url` |  |
| `latitude` |  |
| `location` |  |
| `longitude` |  |
| `map_image` |  |
| `map_url` |  |
| `name` |  |
| `total_launch_count` |  |
| `url` |  |
| `wiki_url` |  |

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
| `deorbited` |  |
| `description` |  |
| `founded` |  |
| `id` |  |
| `image_url` |  |
| `name` |  |
| `orbit` |  |
| `owner` |  |
| `status` |  |
| `type` |  |
| `url` |  |

Operations: List, Load.

API path: `/spacestation`

#### Spacecraft

| Field | Description |
| --- | --- |
| `agency` |  |
| `capability` |  |
| `crew_capacity` |  |
| `detail` |  |
| `diameter` |  |
| `height` |  |
| `history` |  |
| `human_rated` |  |
| `id` |  |
| `image_url` |  |
| `in_use` |  |
| `maiden_flight` |  |
| `name` |  |
| `type` |  |
| `url` |  |

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
| `abbrev` | `string` |  |
| `administrator` | `string` |  |
| `country_code` | `string` |  |
| `description` | `string` |  |
| `founding_year` | `string` |  |
| `id` | `number` |  |
| `logo_url` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local agency, err = client:Agency():load({ id = "agency_id" })
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
| `bio` | `string` |  |
| `date_of_birth` | `string` |  |
| `date_of_death` | `string` |  |
| `flights_count` | `number` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `nationality` | `string` |  |
| `profile_image` | `string` |  |
| `spacewalks_count` | `number` |  |
| `status` | `table` |  |
| `type` | `table` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local astronaut, err = client:Astronaut():load({ id = "astronaut_id" })
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
| `departure` | `string` |  |
| `docking` | `string` |  |
| `docking_location` | `table` |  |
| `flight_vehicle` | `table` |  |
| `id` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local docking_event, err = client:DockingEvent():load({ id = "docking_event_id" })
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
| `date` | `string` |  |
| `description` | `string` |  |
| `feature_image` | `string` |  |
| `id` | `number` |  |
| `location` | `string` |  |
| `name` | `string` |  |
| `news_url` | `string` |  |
| `type` | `table` |  |
| `url` | `string` |  |
| `video_url` | `string` |  |

#### Example: Load

```lua
local event, err = client:Event():load({ id = "event_id" })
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
| `end` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `spacestation` | `table` |  |
| `start` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local expedition, err = client:Expedition():load({ id = "expedition_id" })
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
| `flight` | `number` |  |
| `id` | `number` |  |
| `launcher_config` | `table` |  |
| `serial_number` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local first_stage, err = client:FirstStage():load({ id = "first_stage_id" })
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
| `id` | `string` |  |
| `image` | `string` |  |
| `launch_service_provider` | `table` |  |
| `mission` | `table` |  |
| `name` | `string` |  |
| `net` | `string` |  |
| `pad` | `table` |  |
| `probability` | `number` |  |
| `rocket` | `table` |  |
| `status` | `table` |  |
| `url` | `string` |  |
| `webcast_live` | `boolean` |  |
| `window_end` | `string` |  |
| `window_start` | `string` |  |

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
| `apogee` | `number` |  |
| `consecutive_successful_launch` | `number` |  |
| `description` | `string` |  |
| `diameter` | `number` |  |
| `failed_launch` | `number` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `number` |  |
| `id` | `number` |  |
| `launch_mass` | `number` |  |
| `length` | `number` |  |
| `leo_capacity` | `number` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `table` |  |
| `max_stage` | `number` |  |
| `min_stage` | `number` |  |
| `name` | `string` |  |
| `pending_launch` | `number` |  |
| `successful_launch` | `number` |  |
| `to_thrust` | `number` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

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
| `apogee` | `number` |  |
| `consecutive_successful_launch` | `number` |  |
| `description` | `string` |  |
| `diameter` | `number` |  |
| `failed_launch` | `number` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `number` |  |
| `id` | `number` |  |
| `launch_mass` | `number` |  |
| `length` | `number` |  |
| `leo_capacity` | `number` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `table` |  |
| `max_stage` | `number` |  |
| `min_stage` | `number` |  |
| `name` | `string` |  |
| `pending_launch` | `number` |  |
| `successful_launch` | `number` |  |
| `to_thrust` | `number` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

#### Example: Load

```lua
local launcher, err = client:Launcher():load({ id = "launcher_id" })
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
| `country_code` | `string` |  |
| `id` | `number` |  |
| `map_image` | `string` |  |
| `name` | `string` |  |
| `total_landing_count` | `number` |  |
| `total_launch_count` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local location, err = client:Location():load({ id = "location_id" })
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
| `agency_id` | `number` |  |
| `id` | `number` |  |
| `info_url` | `string` |  |
| `latitude` | `string` |  |
| `location` | `table` |  |
| `longitude` | `string` |  |
| `map_image` | `string` |  |
| `map_url` | `string` |  |
| `name` | `string` |  |
| `total_launch_count` | `number` |  |
| `url` | `string` |  |
| `wiki_url` | `string` |  |

#### Example: Load

```lua
local pad, err = client:Pad():load({ id = "pad_id" })
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
| `deorbited` | `string` |  |
| `description` | `string` |  |
| `founded` | `string` |  |
| `id` | `number` |  |
| `image_url` | `string` |  |
| `name` | `string` |  |
| `orbit` | `string` |  |
| `owner` | `table` |  |
| `status` | `table` |  |
| `type` | `table` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local space_station, err = client:SpaceStation():load({ id = "space_station_id" })
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
| `capability` | `string` |  |
| `crew_capacity` | `number` |  |
| `detail` | `string` |  |
| `diameter` | `number` |  |
| `height` | `number` |  |
| `history` | `string` |  |
| `human_rated` | `boolean` |  |
| `id` | `number` |  |
| `image_url` | `string` |  |
| `in_use` | `boolean` |  |
| `maiden_flight` | `string` |  |
| `name` | `string` |  |
| `type` | `table` |  |
| `url` | `string` |  |

#### Example: Load

```lua
local spacecraft, err = client:Spacecraft():load({ id = "spacecraft_id" })
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
local agency = client:Agency()
agency:list()

-- agency:data_get() now returns the agency data from the last list
-- agency:match_get() returns the last match criteria
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
