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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `number` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Agency():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Agency():load({ id = 1 })
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
| `bio` | `string` | No | Biographical information |
| `date_of_birth` | `string` | No | Date of birth |
| `date_of_death` | `string` | No | Date of death if applicable |
| `flights_count` | `number` | No | Number of flights |
| `id` | `number` | No | Astronaut ID |
| `name` | `string` | No | Name of the astronaut |
| `nationality` | `string` | No | Astronaut nationality |
| `profile_image` | `string` | No | URL to profile image |
| `spacewalks_count` | `number` | No | Number of spacewalks |
| `status` | `table` | No |  |
| `type` | `table` | No |  |
| `url` | `string` | No | API URL for this astronaut |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Astronaut():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Astronaut():load({ id = 1 })
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
| `departure` | `string` | No | Departure time |
| `docking` | `string` | No | Docking time |
| `docking_location` | `table` | No |  |
| `flight_vehicle` | `table` | No |  |
| `id` | `number` | No | Docking event ID |
| `url` | `string` | No | API URL for this docking event |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:DockingEvent():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:DockingEvent():load({ id = 1 })
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
| `date` | `string` | No | Event date and time |
| `description` | `string` | No | Description of the event |
| `feature_image` | `string` | No | URL to feature image |
| `id` | `number` | No | Event ID |
| `location` | `string` | No | Event location |
| `name` | `string` | No | Name of the event |
| `news_url` | `string` | No | URL to news article |
| `type` | `table` | No |  |
| `url` | `string` | No | API URL for this event |
| `video_url` | `string` | No | URL to video |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Event():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Event():load({ id = 1 })
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
| `end` | `string` | No | End date of the expedition |
| `id` | `number` | No | Expedition ID |
| `name` | `string` | No | Name of the expedition |
| `spacestation` | `table` | No |  |
| `start` | `string` | No | Start date of the expedition |
| `url` | `string` | No | API URL for this expedition |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Expedition():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Expedition():load({ id = 1 })
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
| `apogee` | `number` | No | Apogee in km |
| `consecutive_successful_launches` | `number` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `number` | No | Diameter in meters |
| `failed_launches` | `number` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `flights` | `number` | No | Number of flights |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `number` | No | GTO capacity in kg |
| `id` | `number` | No | Configuration ID |
| `launch_mass` | `number` | No | Launch mass in kg |
| `launcher_config` | `table` | No |  |
| `length` | `number` | No | Length in meters |
| `leo_capacity` | `number` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `table` | No |  |
| `max_stage` | `number` | No | Maximum number of stages |
| `min_stage` | `number` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `number` | No | Number of pending launches |
| `serial_number` | `string` | No | Serial number of the first stage |
| `status` | `string` | No | Current status |
| `successful_launches` | `number` | No | Number of successful launches |
| `to_thrust` | `number` | No | Takeoff thrust in kN |
| `type` | `string` | No | Type of first stage |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:FirstStage():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:FirstStage():load({ id = 1 })
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
| `id` | `string` | No | UUID of the launch |
| `image` | `string` | No | URL to launch image |
| `launch_service_provider` | `table` | No |  |
| `mission` | `table` | No |  |
| `name` | `string` | No | Name of the launch |
| `net` | `string` | No | Net Earliest Time (NET) for launch |
| `pad` | `table` | No |  |
| `probability` | `number` | No | Launch probability percentage |
| `rocket` | `table` | No |  |
| `status` | `table` | No |  |
| `url` | `string` | No | API URL for this launch |
| `webcast_live` | `boolean` | No | Whether the webcast is currently live |
| `window_end` | `string` | No | End of launch window |
| `window_start` | `string` | No | Start of launch window |

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
| `apogee` | `number` | No | Apogee in km |
| `consecutive_successful_launches` | `number` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `number` | No | Diameter in meters |
| `failed_launches` | `number` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `number` | No | GTO capacity in kg |
| `id` | `number` | No | Configuration ID |
| `launch_mass` | `number` | No | Launch mass in kg |
| `length` | `number` | No | Length in meters |
| `leo_capacity` | `number` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `table` | No |  |
| `max_stage` | `number` | No | Maximum number of stages |
| `min_stage` | `number` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `number` | No | Number of pending launches |
| `successful_launches` | `number` | No | Number of successful launches |
| `to_thrust` | `number` | No | Takeoff thrust in kN |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `number` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Launcher():load({ id = 1 })
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
| `country_code` | `string` | No | ISO country code |
| `id` | `number` | No | Location ID |
| `map_image` | `string` | No | URL to map image |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `number` | No | Total number of landings at this location |
| `total_launch_count` | `number` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Location():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Location():load({ id = 1 })
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
| `agency_id` | `number` | No | ID of the agency that operates this pad |
| `country_code` | `string` | No | ISO country code |
| `id` | `number` | No | Location ID |
| `info_url` | `string` | No | URL to more information |
| `latitude` | `string` | No | Latitude coordinate |
| `location` | `table` | No |  |
| `longitude` | `string` | No | Longitude coordinate |
| `map_image` | `string` | No | URL to map image |
| `map_url` | `string` | No | URL to map |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `number` | No | Total number of landings at this location |
| `total_launch_count` | `number` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |
| `wiki_url` | `string` | No | Wikipedia URL |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Pad():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Pad():load({ id = 1 })
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
| `deorbited` | `string` | No | Date the space station was deorbited |
| `description` | `string` | No | Description of the space station |
| `founded` | `string` | No | Date the space station was founded |
| `id` | `number` | No | Space station ID |
| `image_url` | `string` | No | URL to space station image |
| `name` | `string` | No | Name of the space station |
| `orbit` | `string` | No | Orbital information |
| `owners` | `table` | No |  |
| `status` | `table` | No |  |
| `type` | `table` | No |  |
| `url` | `string` | No | API URL for this space station |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:SpaceStation():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:SpaceStation():load({ id = 1 })
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
| `capability` | `string` | No | Spacecraft capability |
| `crew_capacity` | `number` | No | Crew capacity |
| `details` | `string` | No | Detailed information |
| `diameter` | `number` | No | Diameter in meters |
| `height` | `number` | No | Height in meters |
| `history` | `string` | No | Historical information |
| `human_rated` | `boolean` | No | Whether the spacecraft is human-rated |
| `id` | `number` | No | Spacecraft configuration ID |
| `image_url` | `string` | No | URL to spacecraft image |
| `in_use` | `boolean` | No | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `name` | `string` | No | Name of the spacecraft |
| `type` | `table` | No |  |
| `url` | `string` | No | API URL for this configuration |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Spacecraft():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Spacecraft():load({ id = 1 })
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

