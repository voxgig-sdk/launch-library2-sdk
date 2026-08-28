# LaunchLibrary2 Ruby SDK Reference

Complete API reference for the LaunchLibrary2 Ruby SDK.


## LaunchLibrary2SDK

### Constructor

```ruby
require_relative 'LaunchLibrary2_sdk'

client = LaunchLibrary2SDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LaunchLibrary2SDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = LaunchLibrary2SDK.test
```


### Instance Methods

#### `Agency(data = nil)`

Create a new `Agency` entity instance. Pass `nil` for no initial data.

#### `Astronaut(data = nil)`

Create a new `Astronaut` entity instance. Pass `nil` for no initial data.

#### `Docking(data = nil)`

Create a new `Docking` entity instance. Pass `nil` for no initial data.

#### `DockingEvent(data = nil)`

Create a new `DockingEvent` entity instance. Pass `nil` for no initial data.

#### `Event(data = nil)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Expedition(data = nil)`

Create a new `Expedition` entity instance. Pass `nil` for no initial data.

#### `FirstStage(data = nil)`

Create a new `FirstStage` entity instance. Pass `nil` for no initial data.

#### `Launch(data = nil)`

Create a new `Launch` entity instance. Pass `nil` for no initial data.

#### `LaunchVehicle(data = nil)`

Create a new `LaunchVehicle` entity instance. Pass `nil` for no initial data.

#### `Launcher(data = nil)`

Create a new `Launcher` entity instance. Pass `nil` for no initial data.

#### `Location(data = nil)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Pad(data = nil)`

Create a new `Pad` entity instance. Pass `nil` for no initial data.

#### `ReusableFirstStage(data = nil)`

Create a new `ReusableFirstStage` entity instance. Pass `nil` for no initial data.

#### `SpaceStation(data = nil)`

Create a new `SpaceStation` entity instance. Pass `nil` for no initial data.

#### `Spacecraft(data = nil)`

Create a new `Spacecraft` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AgencyEntity

```ruby
agency = client.Agency
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `String` | No | Agency abbreviation |
| `administrator` | `String` | No | Agency administrator |
| `country_code` | `String` | No | ISO country code |
| `description` | `String` | No | Agency description |
| `founding_year` | `String` | No | Year agency was founded |
| `id` | `Integer` | No | Agency ID |
| `logo_url` | `String` | No | URL to agency logo |
| `name` | `String` | No | Name of the agency |
| `type` | `String` | No | Type of agency |
| `url` | `String` | No | API URL for this agency |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Agency.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Agency.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AgencyEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## AstronautEntity

```ruby
astronaut = client.Astronaut
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `String` | No | Biographical information |
| `date_of_birth` | `String` | No | Date of birth |
| `date_of_death` | `String` | No | Date of death if applicable |
| `flights_count` | `Integer` | No | Number of flights |
| `id` | `Integer` | No | Astronaut ID |
| `name` | `String` | No | Name of the astronaut |
| `nationality` | `String` | No | Astronaut nationality |
| `profile_image` | `String` | No | URL to profile image |
| `spacewalks_count` | `Integer` | No | Number of spacewalks |
| `status` | `Hash` | No |  |
| `type` | `Hash` | No |  |
| `url` | `String` | No | API URL for this astronaut |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Astronaut.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Astronaut.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AstronautEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DockingEntity

```ruby
docking = client.Docking
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DockingEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DockingEventEntity

```ruby
docking_event = client.DockingEvent
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `String` | No | Departure time |
| `docking` | `String` | No | Docking time |
| `docking_location` | `Hash` | No |  |
| `flight_vehicle` | `Hash` | No |  |
| `id` | `Integer` | No | Docking event ID |
| `url` | `String` | No | API URL for this docking event |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.DockingEvent.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.DockingEvent.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DockingEventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventEntity

```ruby
event = client.Event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `String` | No | Event date and time |
| `description` | `String` | No | Description of the event |
| `feature_image` | `String` | No | URL to feature image |
| `id` | `Integer` | No | Event ID |
| `location` | `String` | No | Event location |
| `name` | `String` | No | Name of the event |
| `news_url` | `String` | No | URL to news article |
| `type` | `Hash` | No |  |
| `url` | `String` | No | API URL for this event |
| `video_url` | `String` | No | URL to video |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Event.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Event.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ExpeditionEntity

```ruby
expedition = client.Expedition
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `Array` | No |  |
| `end` | `String` | No | End date of the expedition |
| `id` | `Integer` | No | Expedition ID |
| `name` | `String` | No | Name of the expedition |
| `spacestation` | `Hash` | No |  |
| `start` | `String` | No | Start date of the expedition |
| `url` | `String` | No | API URL for this expedition |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Expedition.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Expedition.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ExpeditionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FirstStageEntity

```ruby
first_stage = client.FirstStage
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `Integer` | No | Apogee in km |
| `consecutive_successful_launches` | `Integer` | No | Number of consecutive successful launches |
| `description` | `String` | No | Description of the launcher |
| `diameter` | `Float` | No | Diameter in meters |
| `failed_launches` | `Integer` | No | Number of failed launches |
| `family` | `String` | No | Launcher family |
| `flights` | `Integer` | No | Number of flights |
| `full_name` | `String` | No | Full name of the launcher |
| `gto_capacity` | `Integer` | No | GTO capacity in kg |
| `id` | `Integer` | No | Configuration ID |
| `launch_mass` | `Integer` | No | Launch mass in kg |
| `launcher_config` | `Hash` | No |  |
| `length` | `Float` | No | Length in meters |
| `leo_capacity` | `Integer` | No | LEO capacity in kg |
| `maiden_flight` | `String` | No | Date of maiden flight |
| `manufacturer` | `Hash` | No |  |
| `max_stage` | `Integer` | No | Maximum number of stages |
| `min_stage` | `Integer` | No | Minimum number of stages |
| `name` | `String` | No | Name of the launcher configuration |
| `pending_launches` | `Integer` | No | Number of pending launches |
| `serial_number` | `String` | No | Serial number of the first stage |
| `status` | `String` | No | Current status |
| `successful_launches` | `Integer` | No | Number of successful launches |
| `to_thrust` | `Integer` | No | Takeoff thrust in kN |
| `type` | `String` | No | Type of first stage |
| `url` | `String` | No | API URL for this configuration |
| `variant` | `String` | No | Variant of the launcher |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.FirstStage.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.FirstStage.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FirstStageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LaunchEntity

```ruby
launch = client.Launch
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No | UUID of the launch |
| `image` | `String` | No | URL to launch image |
| `launch_service_provider` | `Hash` | No |  |
| `mission` | `Hash` | No |  |
| `name` | `String` | No | Name of the launch |
| `net` | `String` | No | Net Earliest Time (NET) for launch |
| `pad` | `Hash` | No |  |
| `probability` | `Integer` | No | Launch probability percentage |
| `rocket` | `Hash` | No |  |
| `status` | `Hash` | No |  |
| `url` | `String` | No | API URL for this launch |
| `webcast_live` | `Boolean` | No | Whether the webcast is currently live |
| `window_end` | `String` | No | End of launch window |
| `window_start` | `String` | No | Start of launch window |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Launch.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Launch.load({ "id" => "launch_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LaunchVehicleEntity

```ruby
launch_vehicle = client.LaunchVehicle
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `Integer` | No | Apogee in km |
| `consecutive_successful_launches` | `Integer` | No | Number of consecutive successful launches |
| `description` | `String` | No | Description of the launcher |
| `diameter` | `Float` | No | Diameter in meters |
| `failed_launches` | `Integer` | No | Number of failed launches |
| `family` | `String` | No | Launcher family |
| `full_name` | `String` | No | Full name of the launcher |
| `gto_capacity` | `Integer` | No | GTO capacity in kg |
| `id` | `Integer` | No | Configuration ID |
| `launch_mass` | `Integer` | No | Launch mass in kg |
| `length` | `Float` | No | Length in meters |
| `leo_capacity` | `Integer` | No | LEO capacity in kg |
| `maiden_flight` | `String` | No | Date of maiden flight |
| `manufacturer` | `Hash` | No |  |
| `max_stage` | `Integer` | No | Maximum number of stages |
| `min_stage` | `Integer` | No | Minimum number of stages |
| `name` | `String` | No | Name of the launcher configuration |
| `pending_launches` | `Integer` | No | Number of pending launches |
| `successful_launches` | `Integer` | No | Number of successful launches |
| `to_thrust` | `Integer` | No | Takeoff thrust in kN |
| `url` | `String` | No | API URL for this configuration |
| `variant` | `String` | No | Variant of the launcher |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.LaunchVehicle.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LaunchVehicleEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LauncherEntity

```ruby
launcher = client.Launcher
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `String` | No | Agency abbreviation |
| `administrator` | `String` | No | Agency administrator |
| `country_code` | `String` | No | ISO country code |
| `description` | `String` | No | Agency description |
| `founding_year` | `String` | No | Year agency was founded |
| `id` | `Integer` | No | Agency ID |
| `logo_url` | `String` | No | URL to agency logo |
| `name` | `String` | No | Name of the agency |
| `type` | `String` | No | Type of agency |
| `url` | `String` | No | API URL for this agency |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Launcher.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LauncherEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LocationEntity

```ruby
location = client.Location
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `String` | No | ISO country code |
| `id` | `Integer` | No | Location ID |
| `map_image` | `String` | No | URL to map image |
| `name` | `String` | No | Name of the location |
| `total_landing_count` | `Integer` | No | Total number of landings at this location |
| `total_launch_count` | `Integer` | No | Total number of launches from this location |
| `url` | `String` | No | API URL for this location |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Location.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Location.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PadEntity

```ruby
pad = client.Pad
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency_id` | `Integer` | No | ID of the agency that operates this pad |
| `country_code` | `String` | No | ISO country code |
| `id` | `Integer` | No | Location ID |
| `info_url` | `String` | No | URL to more information |
| `latitude` | `String` | No | Latitude coordinate |
| `location` | `Hash` | No |  |
| `longitude` | `String` | No | Longitude coordinate |
| `map_image` | `String` | No | URL to map image |
| `map_url` | `String` | No | URL to map |
| `name` | `String` | No | Name of the location |
| `total_landing_count` | `Integer` | No | Total number of landings at this location |
| `total_launch_count` | `Integer` | No | Total number of launches from this location |
| `url` | `String` | No | API URL for this location |
| `wiki_url` | `String` | No | Wikipedia URL |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Pad.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Pad.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReusableFirstStageEntity

```ruby
reusable_first_stage = client.ReusableFirstStage
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReusableFirstStageEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SpaceStationEntity

```ruby
space_station = client.SpaceStation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deorbited` | `String` | No | Date the space station was deorbited |
| `description` | `String` | No | Description of the space station |
| `founded` | `String` | No | Date the space station was founded |
| `id` | `Integer` | No | Space station ID |
| `image_url` | `String` | No | URL to space station image |
| `name` | `String` | No | Name of the space station |
| `orbit` | `String` | No | Orbital information |
| `owners` | `Array` | No |  |
| `status` | `Hash` | No |  |
| `type` | `Hash` | No |  |
| `url` | `String` | No | API URL for this space station |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.SpaceStation.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.SpaceStation.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SpaceStationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SpacecraftEntity

```ruby
spacecraft = client.Spacecraft
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `Hash` | No |  |
| `capability` | `String` | No | Spacecraft capability |
| `crew_capacity` | `Integer` | No | Crew capacity |
| `details` | `String` | No | Detailed information |
| `diameter` | `Float` | No | Diameter in meters |
| `height` | `Float` | No | Height in meters |
| `history` | `String` | No | Historical information |
| `human_rated` | `Boolean` | No | Whether the spacecraft is human-rated |
| `id` | `Integer` | No | Spacecraft configuration ID |
| `image_url` | `String` | No | URL to spacecraft image |
| `in_use` | `Boolean` | No | Whether the spacecraft is currently in use |
| `maiden_flight` | `String` | No | Date of maiden flight |
| `name` | `String` | No | Name of the spacecraft |
| `type` | `Hash` | No |  |
| `url` | `String` | No | API URL for this configuration |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Spacecraft.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Spacecraft.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SpacecraftEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = LaunchLibrary2SDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

