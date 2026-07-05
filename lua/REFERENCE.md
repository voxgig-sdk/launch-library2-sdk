# LaunchLibrary2 Lua SDK Reference

Complete API reference for the LaunchLibrary2 Lua SDK.


## LaunchLibrary2SDK

### Constructor

```lua
local sdk = require("launch-library2_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Agency(data)`

Create a new `Agency` entity instance. Pass `nil` for no initial data.

#### `Astronaut(data)`

Create a new `Astronaut` entity instance. Pass `nil` for no initial data.

#### `Docking(data)`

Create a new `Docking` entity instance. Pass `nil` for no initial data.

#### `DockingEvent(data)`

Create a new `DockingEvent` entity instance. Pass `nil` for no initial data.

#### `Event(data)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Expedition(data)`

Create a new `Expedition` entity instance. Pass `nil` for no initial data.

#### `FirstStage(data)`

Create a new `FirstStage` entity instance. Pass `nil` for no initial data.

#### `Launch(data)`

Create a new `Launch` entity instance. Pass `nil` for no initial data.

#### `LaunchVehicle(data)`

Create a new `LaunchVehicle` entity instance. Pass `nil` for no initial data.

#### `Launcher(data)`

Create a new `Launcher` entity instance. Pass `nil` for no initial data.

#### `Location(data)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Pad(data)`

Create a new `Pad` entity instance. Pass `nil` for no initial data.

#### `ReusableFirstStage(data)`

Create a new `ReusableFirstStage` entity instance. Pass `nil` for no initial data.

#### `SpaceStation(data)`

Create a new `SpaceStation` entity instance. Pass `nil` for no initial data.

#### `Spacecraft(data)`

Create a new `Spacecraft` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AgencyEntity

```lua
local agency = client:Agency(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `string` | No |  |
| `administrator` | `string` | No |  |
| `country_code` | `string` | No |  |
| `description` | `string` | No |  |
| `founding_year` | `string` | No |  |
| `id` | `number` | No |  |
| `logo_url` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Agency():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Agency():load({ id = "agency_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgencyEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## AstronautEntity

```lua
local astronaut = client:Astronaut(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `date_of_birth` | `string` | No |  |
| `date_of_death` | `string` | No |  |
| `flights_count` | `number` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `profile_image` | `string` | No |  |
| `spacewalks_count` | `number` | No |  |
| `status` | `table` | No |  |
| `type` | `table` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Astronaut():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Astronaut():load({ id = "astronaut_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AstronautEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DockingEntity

```lua
local docking = client:Docking(nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DockingEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DockingEventEntity

```lua
local docking_event = client:DockingEvent(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `string` | No |  |
| `docking` | `string` | No |  |
| `docking_location` | `table` | No |  |
| `flight_vehicle` | `table` | No |  |
| `id` | `number` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:DockingEvent():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:DockingEvent():load({ id = "docking_event_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DockingEventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventEntity

```lua
local event = client:Event(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `description` | `string` | No |  |
| `feature_image` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `string` | No |  |
| `name` | `string` | No |  |
| `news_url` | `string` | No |  |
| `type` | `table` | No |  |
| `url` | `string` | No |  |
| `video_url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Event():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Event():load({ id = "event_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ExpeditionEntity

```lua
local expedition = client:Expedition(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `table` | No |  |
| `end` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `spacestation` | `table` | No |  |
| `start` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Expedition():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Expedition():load({ id = "expedition_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExpeditionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FirstStageEntity

```lua
local first_stage = client:FirstStage(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `flight` | `number` | No |  |
| `id` | `number` | No |  |
| `launcher_config` | `table` | No |  |
| `serial_number` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:FirstStage():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FirstStage():load({ id = "first_stage_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FirstStageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LaunchEntity

```lua
local launch = client:Launch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launch_service_provider` | `table` | No |  |
| `mission` | `table` | No |  |
| `name` | `string` | No |  |
| `net` | `string` | No |  |
| `pad` | `table` | No |  |
| `probability` | `number` | No |  |
| `rocket` | `table` | No |  |
| `status` | `table` | No |  |
| `url` | `string` | No |  |
| `webcast_live` | `boolean` | No |  |
| `window_end` | `string` | No |  |
| `window_start` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Launch():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Launch():load({ id = "launch_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LaunchVehicleEntity

```lua
local launch_vehicle = client:LaunchVehicle(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `number` | No |  |
| `consecutive_successful_launch` | `number` | No |  |
| `description` | `string` | No |  |
| `diameter` | `number` | No |  |
| `failed_launch` | `number` | No |  |
| `family` | `string` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `number` | No |  |
| `id` | `number` | No |  |
| `launch_mass` | `number` | No |  |
| `length` | `number` | No |  |
| `leo_capacity` | `number` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `table` | No |  |
| `max_stage` | `number` | No |  |
| `min_stage` | `number` | No |  |
| `name` | `string` | No |  |
| `pending_launch` | `number` | No |  |
| `successful_launch` | `number` | No |  |
| `to_thrust` | `number` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LaunchVehicle():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchVehicleEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LauncherEntity

```lua
local launcher = client:Launcher(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `number` | No |  |
| `consecutive_successful_launch` | `number` | No |  |
| `description` | `string` | No |  |
| `diameter` | `number` | No |  |
| `failed_launch` | `number` | No |  |
| `family` | `string` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `number` | No |  |
| `id` | `number` | No |  |
| `launch_mass` | `number` | No |  |
| `length` | `number` | No |  |
| `leo_capacity` | `number` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `table` | No |  |
| `max_stage` | `number` | No |  |
| `min_stage` | `number` | No |  |
| `name` | `string` | No |  |
| `pending_launch` | `number` | No |  |
| `successful_launch` | `number` | No |  |
| `to_thrust` | `number` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Launcher():load({ id = "launcher_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LauncherEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LocationEntity

```lua
local location = client:Location(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `id` | `number` | No |  |
| `map_image` | `string` | No |  |
| `name` | `string` | No |  |
| `total_landing_count` | `number` | No |  |
| `total_launch_count` | `number` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Location():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Location():load({ id = "location_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PadEntity

```lua
local pad = client:Pad(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency_id` | `number` | No |  |
| `id` | `number` | No |  |
| `info_url` | `string` | No |  |
| `latitude` | `string` | No |  |
| `location` | `table` | No |  |
| `longitude` | `string` | No |  |
| `map_image` | `string` | No |  |
| `map_url` | `string` | No |  |
| `name` | `string` | No |  |
| `total_launch_count` | `number` | No |  |
| `url` | `string` | No |  |
| `wiki_url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Pad():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Pad():load({ id = "pad_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReusableFirstStageEntity

```lua
local reusable_first_stage = client:ReusableFirstStage(nil)
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReusableFirstStageEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SpaceStationEntity

```lua
local space_station = client:SpaceStation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deorbited` | `string` | No |  |
| `description` | `string` | No |  |
| `founded` | `string` | No |  |
| `id` | `number` | No |  |
| `image_url` | `string` | No |  |
| `name` | `string` | No |  |
| `orbit` | `string` | No |  |
| `owner` | `table` | No |  |
| `status` | `table` | No |  |
| `type` | `table` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:SpaceStation():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:SpaceStation():load({ id = "space_station_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpaceStationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SpacecraftEntity

```lua
local spacecraft = client:Spacecraft(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `table` | No |  |
| `capability` | `string` | No |  |
| `crew_capacity` | `number` | No |  |
| `detail` | `string` | No |  |
| `diameter` | `number` | No |  |
| `height` | `number` | No |  |
| `history` | `string` | No |  |
| `human_rated` | `boolean` | No |  |
| `id` | `number` | No |  |
| `image_url` | `string` | No |  |
| `in_use` | `boolean` | No |  |
| `maiden_flight` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `table` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Spacecraft():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Spacecraft():load({ id = "spacecraft_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpacecraftEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

