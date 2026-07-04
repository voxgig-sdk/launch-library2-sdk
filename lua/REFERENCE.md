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
local agency = client:agency(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | ``$STRING`` | No |  |
| `administrator` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `founding_year` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `logo_url` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:agency():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:agency():load({ id = "agency_id" })
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
local astronaut = client:astronaut(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | ``$STRING`` | No |  |
| `date_of_birth` | ``$STRING`` | No |  |
| `date_of_death` | ``$STRING`` | No |  |
| `flights_count` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nationality` | ``$STRING`` | No |  |
| `profile_image` | ``$STRING`` | No |  |
| `spacewalks_count` | ``$INTEGER`` | No |  |
| `status` | ``$OBJECT`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:astronaut():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:astronaut():load({ id = "astronaut_id" })
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
local docking = client:docking(nil)
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
local docking_event = client:docking_event(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | ``$STRING`` | No |  |
| `docking` | ``$STRING`` | No |  |
| `docking_location` | ``$OBJECT`` | No |  |
| `flight_vehicle` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:docking_event():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:docking_event():load({ id = "docking_event_id" })
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
local event = client:event(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `feature_image` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `news_url` | ``$STRING`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |
| `video_url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:event():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:event():load({ id = "event_id" })
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
local expedition = client:expedition(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | ``$ARRAY`` | No |  |
| `end` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `spacestation` | ``$OBJECT`` | No |  |
| `start` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:expedition():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:expedition():load({ id = "expedition_id" })
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
local first_stage = client:first_stage(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `flight` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `launcher_config` | ``$OBJECT`` | No |  |
| `serial_number` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:first_stage():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:first_stage():load({ id = "first_stage_id" })
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
local launch = client:launch(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `launch_service_provider` | ``$OBJECT`` | No |  |
| `mission` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `net` | ``$STRING`` | No |  |
| `pad` | ``$OBJECT`` | No |  |
| `probability` | ``$INTEGER`` | No |  |
| `rocket` | ``$OBJECT`` | No |  |
| `status` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |
| `webcast_live` | ``$BOOLEAN`` | No |  |
| `window_end` | ``$STRING`` | No |  |
| `window_start` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:launch():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:launch():load({ id = "launch_id" })
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
local launch_vehicle = client:launch_vehicle(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | ``$INTEGER`` | No |  |
| `consecutive_successful_launch` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `diameter` | ``$NUMBER`` | No |  |
| `failed_launch` | ``$INTEGER`` | No |  |
| `family` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `gto_capacity` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `launch_mass` | ``$INTEGER`` | No |  |
| `length` | ``$NUMBER`` | No |  |
| `leo_capacity` | ``$INTEGER`` | No |  |
| `maiden_flight` | ``$STRING`` | No |  |
| `manufacturer` | ``$OBJECT`` | No |  |
| `max_stage` | ``$INTEGER`` | No |  |
| `min_stage` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `pending_launch` | ``$INTEGER`` | No |  |
| `successful_launch` | ``$INTEGER`` | No |  |
| `to_thrust` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |
| `variant` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:launch_vehicle():list()
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
local launcher = client:launcher(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | ``$INTEGER`` | No |  |
| `consecutive_successful_launch` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `diameter` | ``$NUMBER`` | No |  |
| `failed_launch` | ``$INTEGER`` | No |  |
| `family` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `gto_capacity` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `launch_mass` | ``$INTEGER`` | No |  |
| `length` | ``$NUMBER`` | No |  |
| `leo_capacity` | ``$INTEGER`` | No |  |
| `maiden_flight` | ``$STRING`` | No |  |
| `manufacturer` | ``$OBJECT`` | No |  |
| `max_stage` | ``$INTEGER`` | No |  |
| `min_stage` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `pending_launch` | ``$INTEGER`` | No |  |
| `successful_launch` | ``$INTEGER`` | No |  |
| `to_thrust` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |
| `variant` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:launcher():load({ id = "launcher_id" })
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
local location = client:location(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `map_image` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `total_landing_count` | ``$INTEGER`` | No |  |
| `total_launch_count` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:location():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:location():load({ id = "location_id" })
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
local pad = client:pad(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency_id` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `info_url` | ``$STRING`` | No |  |
| `latitude` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `longitude` | ``$STRING`` | No |  |
| `map_image` | ``$STRING`` | No |  |
| `map_url` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `total_launch_count` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |
| `wiki_url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:pad():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:pad():load({ id = "pad_id" })
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
local reusable_first_stage = client:reusable_first_stage(nil)
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
local space_station = client:space_station(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deorbited` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `founded` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image_url` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `orbit` | ``$STRING`` | No |  |
| `owner` | ``$ARRAY`` | No |  |
| `status` | ``$OBJECT`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:space_station():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:space_station():load({ id = "space_station_id" })
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
local spacecraft = client:spacecraft(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | ``$OBJECT`` | No |  |
| `capability` | ``$STRING`` | No |  |
| `crew_capacity` | ``$INTEGER`` | No |  |
| `detail` | ``$STRING`` | No |  |
| `diameter` | ``$NUMBER`` | No |  |
| `height` | ``$NUMBER`` | No |  |
| `history` | ``$STRING`` | No |  |
| `human_rated` | ``$BOOLEAN`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image_url` | ``$STRING`` | No |  |
| `in_use` | ``$BOOLEAN`` | No |  |
| `maiden_flight` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:spacecraft():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:spacecraft():load({ id = "spacecraft_id" })
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

