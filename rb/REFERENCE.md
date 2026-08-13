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
| `abbrev` | `String` | No |  |
| `administrator` | `String` | No |  |
| `country_code` | `String` | No |  |
| `description` | `String` | No |  |
| `founding_year` | `String` | No |  |
| `id` | `Integer` | No |  |
| `logo_url` | `String` | No |  |
| `name` | `String` | No |  |
| `type` | `String` | No |  |
| `url` | `String` | No |  |

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
| `bio` | `String` | No |  |
| `date_of_birth` | `String` | No |  |
| `date_of_death` | `String` | No |  |
| `flights_count` | `Integer` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `nationality` | `String` | No |  |
| `profile_image` | `String` | No |  |
| `spacewalks_count` | `Integer` | No |  |
| `status` | `Hash` | No |  |
| `type` | `Hash` | No |  |
| `url` | `String` | No |  |

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
| `departure` | `String` | No |  |
| `docking` | `String` | No |  |
| `docking_location` | `Hash` | No |  |
| `flight_vehicle` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `url` | `String` | No |  |

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
| `date` | `String` | No |  |
| `description` | `String` | No |  |
| `feature_image` | `String` | No |  |
| `id` | `Integer` | No |  |
| `location` | `String` | No |  |
| `name` | `String` | No |  |
| `news_url` | `String` | No |  |
| `type` | `Hash` | No |  |
| `url` | `String` | No |  |
| `video_url` | `String` | No |  |

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
| `end` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `spacestation` | `Hash` | No |  |
| `start` | `String` | No |  |
| `url` | `String` | No |  |

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
| `apogee` | `Integer` | No |  |
| `consecutive_successful_launches` | `Integer` | No |  |
| `description` | `String` | No |  |
| `diameter` | `Float` | No |  |
| `failed_launches` | `Integer` | No |  |
| `family` | `String` | No |  |
| `flights` | `Integer` | No |  |
| `full_name` | `String` | No |  |
| `gto_capacity` | `Integer` | No |  |
| `id` | `Integer` | No |  |
| `launch_mass` | `Integer` | No |  |
| `launcher_config` | `Hash` | No |  |
| `length` | `Float` | No |  |
| `leo_capacity` | `Integer` | No |  |
| `maiden_flight` | `String` | No |  |
| `manufacturer` | `Hash` | No |  |
| `max_stage` | `Integer` | No |  |
| `min_stage` | `Integer` | No |  |
| `name` | `String` | No |  |
| `pending_launches` | `Integer` | No |  |
| `serial_number` | `String` | No |  |
| `status` | `String` | No |  |
| `successful_launches` | `Integer` | No |  |
| `to_thrust` | `Integer` | No |  |
| `type` | `String` | No |  |
| `url` | `String` | No |  |
| `variant` | `String` | No |  |

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
| `id` | `String` | No |  |
| `image` | `String` | No |  |
| `launch_service_provider` | `Hash` | No |  |
| `mission` | `Hash` | No |  |
| `name` | `String` | No |  |
| `net` | `String` | No |  |
| `pad` | `Hash` | No |  |
| `probability` | `Integer` | No |  |
| `rocket` | `Hash` | No |  |
| `status` | `Hash` | No |  |
| `url` | `String` | No |  |
| `webcast_live` | `Boolean` | No |  |
| `window_end` | `String` | No |  |
| `window_start` | `String` | No |  |

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
| `apogee` | `Integer` | No |  |
| `consecutive_successful_launches` | `Integer` | No |  |
| `description` | `String` | No |  |
| `diameter` | `Float` | No |  |
| `failed_launches` | `Integer` | No |  |
| `family` | `String` | No |  |
| `full_name` | `String` | No |  |
| `gto_capacity` | `Integer` | No |  |
| `id` | `Integer` | No |  |
| `launch_mass` | `Integer` | No |  |
| `length` | `Float` | No |  |
| `leo_capacity` | `Integer` | No |  |
| `maiden_flight` | `String` | No |  |
| `manufacturer` | `Hash` | No |  |
| `max_stage` | `Integer` | No |  |
| `min_stage` | `Integer` | No |  |
| `name` | `String` | No |  |
| `pending_launches` | `Integer` | No |  |
| `successful_launches` | `Integer` | No |  |
| `to_thrust` | `Integer` | No |  |
| `url` | `String` | No |  |
| `variant` | `String` | No |  |

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
| `abbrev` | `String` | No |  |
| `administrator` | `String` | No |  |
| `country_code` | `String` | No |  |
| `description` | `String` | No |  |
| `founding_year` | `String` | No |  |
| `id` | `Integer` | No |  |
| `logo_url` | `String` | No |  |
| `name` | `String` | No |  |
| `type` | `String` | No |  |
| `url` | `String` | No |  |

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
| `country_code` | `String` | No |  |
| `id` | `Integer` | No |  |
| `map_image` | `String` | No |  |
| `name` | `String` | No |  |
| `total_landing_count` | `Integer` | No |  |
| `total_launch_count` | `Integer` | No |  |
| `url` | `String` | No |  |

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
| `agency_id` | `Integer` | No |  |
| `country_code` | `String` | No |  |
| `id` | `Integer` | No |  |
| `info_url` | `String` | No |  |
| `latitude` | `String` | No |  |
| `location` | `Hash` | No |  |
| `longitude` | `String` | No |  |
| `map_image` | `String` | No |  |
| `map_url` | `String` | No |  |
| `name` | `String` | No |  |
| `total_landing_count` | `Integer` | No |  |
| `total_launch_count` | `Integer` | No |  |
| `url` | `String` | No |  |
| `wiki_url` | `String` | No |  |

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
| `deorbited` | `String` | No |  |
| `description` | `String` | No |  |
| `founded` | `String` | No |  |
| `id` | `Integer` | No |  |
| `image_url` | `String` | No |  |
| `name` | `String` | No |  |
| `orbit` | `String` | No |  |
| `owners` | `Array` | No |  |
| `status` | `Hash` | No |  |
| `type` | `Hash` | No |  |
| `url` | `String` | No |  |

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
| `capability` | `String` | No |  |
| `crew_capacity` | `Integer` | No |  |
| `details` | `String` | No |  |
| `diameter` | `Float` | No |  |
| `height` | `Float` | No |  |
| `history` | `String` | No |  |
| `human_rated` | `Boolean` | No |  |
| `id` | `Integer` | No |  |
| `image_url` | `String` | No |  |
| `in_use` | `Boolean` | No |  |
| `maiden_flight` | `String` | No |  |
| `name` | `String` | No |  |
| `type` | `Hash` | No |  |
| `url` | `String` | No |  |

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

