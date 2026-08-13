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
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *LaunchLibrary2SDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *LaunchLibrary2SDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
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
fmt.Println(agency.GetName()) // "agency"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `string` | No |  |
| `administrator` | `string` | No |  |
| `country_code` | `string` | No |  |
| `description` | `string` | No |  |
| `founding_year` | `string` | No |  |
| `id` | `int` | No |  |
| `logo_url` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Agency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Agency(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(astronaut.GetName()) // "astronaut"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `date_of_birth` | `string` | No |  |
| `date_of_death` | `string` | No |  |
| `flights_count` | `int` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `profile_image` | `string` | No |  |
| `spacewalks_count` | `int` | No |  |
| `status` | `map[string]any` | No |  |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Astronaut(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Astronaut(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(docking.GetName()) // "docking"
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
dockingEvent := client.DockingEvent(nil)
fmt.Println(dockingEvent.GetName()) // "docking_event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `string` | No |  |
| `docking` | `string` | No |  |
| `docking_location` | `map[string]any` | No |  |
| `flight_vehicle` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.DockingEvent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.DockingEvent(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(event.GetName()) // "event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `description` | `string` | No |  |
| `feature_image` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `string` | No |  |
| `name` | `string` | No |  |
| `news_url` | `string` | No |  |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No |  |
| `video_url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Event(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(expedition.GetName()) // "expedition"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `[]any` | No |  |
| `end` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `spacestation` | `map[string]any` | No |  |
| `start` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Expedition(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Expedition(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
firstStage := client.FirstStage(nil)
fmt.Println(firstStage.GetName()) // "first_stage"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `int` | No |  |
| `consecutive_successful_launches` | `int` | No |  |
| `description` | `string` | No |  |
| `diameter` | `float64` | No |  |
| `failed_launches` | `int` | No |  |
| `family` | `string` | No |  |
| `flights` | `int` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `int` | No |  |
| `id` | `int` | No |  |
| `launch_mass` | `int` | No |  |
| `launcher_config` | `map[string]any` | No |  |
| `length` | `float64` | No |  |
| `leo_capacity` | `int` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `map[string]any` | No |  |
| `max_stage` | `int` | No |  |
| `min_stage` | `int` | No |  |
| `name` | `string` | No |  |
| `pending_launches` | `int` | No |  |
| `serial_number` | `string` | No |  |
| `status` | `string` | No |  |
| `successful_launches` | `int` | No |  |
| `to_thrust` | `int` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.FirstStage(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.FirstStage(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(launch.GetName()) // "launch"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launch_service_provider` | `map[string]any` | No |  |
| `mission` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `net` | `string` | No |  |
| `pad` | `map[string]any` | No |  |
| `probability` | `int` | No |  |
| `rocket` | `map[string]any` | No |  |
| `status` | `map[string]any` | No |  |
| `url` | `string` | No |  |
| `webcast_live` | `bool` | No |  |
| `window_end` | `string` | No |  |
| `window_start` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Launch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launch(nil).Load(map[string]any{"id": "launch_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
launchVehicle := client.LaunchVehicle(nil)
fmt.Println(launchVehicle.GetName()) // "launch_vehicle"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `int` | No |  |
| `consecutive_successful_launches` | `int` | No |  |
| `description` | `string` | No |  |
| `diameter` | `float64` | No |  |
| `failed_launches` | `int` | No |  |
| `family` | `string` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `int` | No |  |
| `id` | `int` | No |  |
| `launch_mass` | `int` | No |  |
| `length` | `float64` | No |  |
| `leo_capacity` | `int` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `map[string]any` | No |  |
| `max_stage` | `int` | No |  |
| `min_stage` | `int` | No |  |
| `name` | `string` | No |  |
| `pending_launches` | `int` | No |  |
| `successful_launches` | `int` | No |  |
| `to_thrust` | `int` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LaunchVehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
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
fmt.Println(launcher.GetName()) // "launcher"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `string` | No |  |
| `administrator` | `string` | No |  |
| `country_code` | `string` | No |  |
| `description` | `string` | No |  |
| `founding_year` | `string` | No |  |
| `id` | `int` | No |  |
| `logo_url` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Launcher(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(location.GetName()) // "location"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `id` | `int` | No |  |
| `map_image` | `string` | No |  |
| `name` | `string` | No |  |
| `total_landing_count` | `int` | No |  |
| `total_launch_count` | `int` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Location(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(pad.GetName()) // "pad"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency_id` | `int` | No |  |
| `country_code` | `string` | No |  |
| `id` | `int` | No |  |
| `info_url` | `string` | No |  |
| `latitude` | `string` | No |  |
| `location` | `map[string]any` | No |  |
| `longitude` | `string` | No |  |
| `map_image` | `string` | No |  |
| `map_url` | `string` | No |  |
| `name` | `string` | No |  |
| `total_landing_count` | `int` | No |  |
| `total_launch_count` | `int` | No |  |
| `url` | `string` | No |  |
| `wiki_url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Pad(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Pad(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
reusableFirstStage := client.ReusableFirstStage(nil)
fmt.Println(reusableFirstStage.GetName()) // "reusable_first_stage"
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
spaceStation := client.SpaceStation(nil)
fmt.Println(spaceStation.GetName()) // "space_station"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deorbited` | `string` | No |  |
| `description` | `string` | No |  |
| `founded` | `string` | No |  |
| `id` | `int` | No |  |
| `image_url` | `string` | No |  |
| `name` | `string` | No |  |
| `orbit` | `string` | No |  |
| `owners` | `[]any` | No |  |
| `status` | `map[string]any` | No |  |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.SpaceStation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.SpaceStation(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(spacecraft.GetName()) // "spacecraft"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `map[string]any` | No |  |
| `capability` | `string` | No |  |
| `crew_capacity` | `int` | No |  |
| `details` | `string` | No |  |
| `diameter` | `float64` | No |  |
| `height` | `float64` | No |  |
| `history` | `string` | No |  |
| `human_rated` | `bool` | No |  |
| `id` | `int` | No |  |
| `image_url` | `string` | No |  |
| `in_use` | `bool` | No |  |
| `maiden_flight` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Spacecraft(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Spacecraft(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

