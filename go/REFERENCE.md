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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `int` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

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
| `bio` | `string` | No | Biographical information |
| `date_of_birth` | `string` | No | Date of birth |
| `date_of_death` | `string` | No | Date of death if applicable |
| `flights_count` | `int` | No | Number of flights |
| `id` | `int` | No | Astronaut ID |
| `name` | `string` | No | Name of the astronaut |
| `nationality` | `string` | No | Astronaut nationality |
| `profile_image` | `string` | No | URL to profile image |
| `spacewalks_count` | `int` | No | Number of spacewalks |
| `status` | `map[string]any` | No |  |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No | API URL for this astronaut |

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
| `departure` | `string` | No | Departure time |
| `docking` | `string` | No | Docking time |
| `docking_location` | `map[string]any` | No |  |
| `flight_vehicle` | `map[string]any` | No |  |
| `id` | `int` | No | Docking event ID |
| `url` | `string` | No | API URL for this docking event |

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
| `date` | `string` | No | Event date and time |
| `description` | `string` | No | Description of the event |
| `feature_image` | `string` | No | URL to feature image |
| `id` | `int` | No | Event ID |
| `location` | `string` | No | Event location |
| `name` | `string` | No | Name of the event |
| `news_url` | `string` | No | URL to news article |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No | API URL for this event |
| `video_url` | `string` | No | URL to video |

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
| `end` | `string` | No | End date of the expedition |
| `id` | `int` | No | Expedition ID |
| `name` | `string` | No | Name of the expedition |
| `spacestation` | `map[string]any` | No |  |
| `start` | `string` | No | Start date of the expedition |
| `url` | `string` | No | API URL for this expedition |

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
| `apogee` | `int` | No | Apogee in km |
| `consecutive_successful_launches` | `int` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `float64` | No | Diameter in meters |
| `failed_launches` | `int` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `flights` | `int` | No | Number of flights |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `int` | No | GTO capacity in kg |
| `id` | `int` | No | Configuration ID |
| `launch_mass` | `int` | No | Launch mass in kg |
| `launcher_config` | `map[string]any` | No |  |
| `length` | `float64` | No | Length in meters |
| `leo_capacity` | `int` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `map[string]any` | No |  |
| `max_stage` | `int` | No | Maximum number of stages |
| `min_stage` | `int` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `int` | No | Number of pending launches |
| `serial_number` | `string` | No | Serial number of the first stage |
| `status` | `string` | No | Current status |
| `successful_launches` | `int` | No | Number of successful launches |
| `to_thrust` | `int` | No | Takeoff thrust in kN |
| `type` | `string` | No | Type of first stage |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

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
| `id` | `string` | No | UUID of the launch |
| `image` | `string` | No | URL to launch image |
| `launch_service_provider` | `map[string]any` | No |  |
| `mission` | `map[string]any` | No |  |
| `name` | `string` | No | Name of the launch |
| `net` | `string` | No | Net Earliest Time (NET) for launch |
| `pad` | `map[string]any` | No |  |
| `probability` | `int` | No | Launch probability percentage |
| `rocket` | `map[string]any` | No |  |
| `status` | `map[string]any` | No |  |
| `url` | `string` | No | API URL for this launch |
| `webcast_live` | `bool` | No | Whether the webcast is currently live |
| `window_end` | `string` | No | End of launch window |
| `window_start` | `string` | No | Start of launch window |

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
| `apogee` | `int` | No | Apogee in km |
| `consecutive_successful_launches` | `int` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `float64` | No | Diameter in meters |
| `failed_launches` | `int` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `int` | No | GTO capacity in kg |
| `id` | `int` | No | Configuration ID |
| `launch_mass` | `int` | No | Launch mass in kg |
| `length` | `float64` | No | Length in meters |
| `leo_capacity` | `int` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `map[string]any` | No |  |
| `max_stage` | `int` | No | Maximum number of stages |
| `min_stage` | `int` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `int` | No | Number of pending launches |
| `successful_launches` | `int` | No | Number of successful launches |
| `to_thrust` | `int` | No | Takeoff thrust in kN |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `int` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

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
| `country_code` | `string` | No | ISO country code |
| `id` | `int` | No | Location ID |
| `map_image` | `string` | No | URL to map image |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `int` | No | Total number of landings at this location |
| `total_launch_count` | `int` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |

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
| `agency_id` | `int` | No | ID of the agency that operates this pad |
| `country_code` | `string` | No | ISO country code |
| `id` | `int` | No | Location ID |
| `info_url` | `string` | No | URL to more information |
| `latitude` | `string` | No | Latitude coordinate |
| `location` | `map[string]any` | No |  |
| `longitude` | `string` | No | Longitude coordinate |
| `map_image` | `string` | No | URL to map image |
| `map_url` | `string` | No | URL to map |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `int` | No | Total number of landings at this location |
| `total_launch_count` | `int` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |
| `wiki_url` | `string` | No | Wikipedia URL |

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
| `deorbited` | `string` | No | Date the space station was deorbited |
| `description` | `string` | No | Description of the space station |
| `founded` | `string` | No | Date the space station was founded |
| `id` | `int` | No | Space station ID |
| `image_url` | `string` | No | URL to space station image |
| `name` | `string` | No | Name of the space station |
| `orbit` | `string` | No | Orbital information |
| `owners` | `[]any` | No |  |
| `status` | `map[string]any` | No |  |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No | API URL for this space station |

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
| `capability` | `string` | No | Spacecraft capability |
| `crew_capacity` | `int` | No | Crew capacity |
| `details` | `string` | No | Detailed information |
| `diameter` | `float64` | No | Diameter in meters |
| `height` | `float64` | No | Height in meters |
| `history` | `string` | No | Historical information |
| `human_rated` | `bool` | No | Whether the spacecraft is human-rated |
| `id` | `int` | No | Spacecraft configuration ID |
| `image_url` | `string` | No | URL to spacecraft image |
| `in_use` | `bool` | No | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `name` | `string` | No | Name of the spacecraft |
| `type` | `map[string]any` | No |  |
| `url` | `string` | No | API URL for this configuration |

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

