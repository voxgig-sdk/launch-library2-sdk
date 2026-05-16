# LaunchLibrary2 Golang SDK Reference

Complete API reference for the LaunchLibrary2 Golang SDK.


## LaunchLibrary2SDK

### Constructor

```go
func NewLaunchLibrary2SDK(options map[string]any) *LaunchLibrary2SDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *LaunchLibrary2SDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `Agency(data map[string]any) LaunchLibrary2Entity`

Create a new `Agency` entity instance. Pass `nil` for no initial data.

#### `Astronaut(data map[string]any) LaunchLibrary2Entity`

Create a new `Astronaut` entity instance. Pass `nil` for no initial data.

#### `Docking(data map[string]any) LaunchLibrary2Entity`

Create a new `Docking` entity instance. Pass `nil` for no initial data.

#### `DockingEvent(data map[string]any) LaunchLibrary2Entity`

Create a new `DockingEvent` entity instance. Pass `nil` for no initial data.

#### `Event(data map[string]any) LaunchLibrary2Entity`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Expedition(data map[string]any) LaunchLibrary2Entity`

Create a new `Expedition` entity instance. Pass `nil` for no initial data.

#### `FirstStage(data map[string]any) LaunchLibrary2Entity`

Create a new `FirstStage` entity instance. Pass `nil` for no initial data.

#### `Launch(data map[string]any) LaunchLibrary2Entity`

Create a new `Launch` entity instance. Pass `nil` for no initial data.

#### `LaunchVehicle(data map[string]any) LaunchLibrary2Entity`

Create a new `LaunchVehicle` entity instance. Pass `nil` for no initial data.

#### `Launcher(data map[string]any) LaunchLibrary2Entity`

Create a new `Launcher` entity instance. Pass `nil` for no initial data.

#### `Location(data map[string]any) LaunchLibrary2Entity`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Pad(data map[string]any) LaunchLibrary2Entity`

Create a new `Pad` entity instance. Pass `nil` for no initial data.

#### `ReusableFirstStage(data map[string]any) LaunchLibrary2Entity`

Create a new `ReusableFirstStage` entity instance. Pass `nil` for no initial data.

#### `SpaceStation(data map[string]any) LaunchLibrary2Entity`

Create a new `SpaceStation` entity instance. Pass `nil` for no initial data.

#### `Spacecraft(data map[string]any) LaunchLibrary2Entity`

Create a new `Spacecraft` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AgencyEntity

```go
agency := client.Agency(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Agency(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Agency(nil).Load(map[string]any{"id": "agency_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AgencyEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## AstronautEntity

```go
astronaut := client.Astronaut(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Astronaut(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Astronaut(nil).Load(map[string]any{"id": "astronaut_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AstronautEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DockingEntity

```go
docking := client.Docking(nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DockingEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DockingEventEntity

```go
docking_event := client.DockingEvent(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DockingEvent(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DockingEvent(nil).Load(map[string]any{"id": "docking_event_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DockingEventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventEntity

```go
event := client.Event(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Event(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Event(nil).Load(map[string]any{"id": "event_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ExpeditionEntity

```go
expedition := client.Expedition(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Expedition(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Expedition(nil).Load(map[string]any{"id": "expedition_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ExpeditionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FirstStageEntity

```go
first_stage := client.FirstStage(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.FirstStage(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FirstStage(nil).Load(map[string]any{"id": "first_stage_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FirstStageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LaunchEntity

```go
launch := client.Launch(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Launch(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launch(nil).Load(map[string]any{"id": "launch_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LaunchVehicleEntity

```go
launch_vehicle := client.LaunchVehicle(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LaunchVehicle(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LaunchVehicleEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LauncherEntity

```go
launcher := client.Launcher(nil)
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

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launcher(nil).Load(map[string]any{"id": "launcher_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LauncherEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LocationEntity

```go
location := client.Location(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Location(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Location(nil).Load(map[string]any{"id": "location_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PadEntity

```go
pad := client.Pad(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Pad(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Pad(nil).Load(map[string]any{"id": "pad_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReusableFirstStageEntity

```go
reusable_first_stage := client.ReusableFirstStage(nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReusableFirstStageEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SpaceStationEntity

```go
space_station := client.SpaceStation(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SpaceStation(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.SpaceStation(nil).Load(map[string]any{"id": "space_station_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpaceStationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SpacecraftEntity

```go
spacecraft := client.Spacecraft(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Spacecraft(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Spacecraft(nil).Load(map[string]any{"id": "spacecraft_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SpacecraftEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewLaunchLibrary2SDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

