# LaunchLibrary2 Ruby SDK



The Ruby SDK for the LaunchLibrary2 API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Agency` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/launch-library2-sdk/releases](https://github.com/voxgig-sdk/launch-library2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "LaunchLibrary2_sdk"

client = LaunchLibrary2SDK.new
```

### 2. List agency records

```ruby
begin
  # list returns an Array of Agency records — iterate directly.
  agencys = client.Agency.list
  agencys.each do |item|
    puts "#{item["id"]} #{item["abbrev"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an agency

```ruby
begin
  # load returns the bare Agency record (raises on error).
  agency = client.Agency.load({ "id" => 1 })
  puts agency
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  agencys = client.Agency.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = LaunchLibrary2SDK.test({
  "entity" => { "agency" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
agency = client.Agency.list()
puts agency
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = LaunchLibrary2SDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### LaunchLibrary2SDK

```ruby
require_relative "LaunchLibrary2_sdk"
client = LaunchLibrary2SDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = LaunchLibrary2SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LaunchLibrary2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `LaunchLibrary2Error` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `agency = client.Agency`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbrev` | `String` |  |
| `administrator` | `String` |  |
| `country_code` | `String` |  |
| `description` | `String` |  |
| `founding_year` | `String` |  |
| `id` | `Integer` |  |
| `logo_url` | `String` |  |
| `name` | `String` |  |
| `type` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Agency record (raises on error).
agency = client.Agency.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Agency records (raises on error).
agencys = client.Agency.list
```


### Astronaut

Create an instance: `astronaut = client.Astronaut`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `String` |  |
| `date_of_birth` | `String` |  |
| `date_of_death` | `String` |  |
| `flights_count` | `Integer` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `nationality` | `String` |  |
| `profile_image` | `String` |  |
| `spacewalks_count` | `Integer` |  |
| `status` | `Hash` |  |
| `type` | `Hash` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Astronaut record (raises on error).
astronaut = client.Astronaut.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Astronaut records (raises on error).
astronauts = client.Astronaut.list
```


### Docking

Create an instance: `docking = client.Docking`


### DockingEvent

Create an instance: `docking_event = client.DockingEvent`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departure` | `String` |  |
| `docking` | `String` |  |
| `docking_location` | `Hash` |  |
| `flight_vehicle` | `Hash` |  |
| `id` | `Integer` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare DockingEvent record (raises on error).
docking_event = client.DockingEvent.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of DockingEvent records (raises on error).
docking_events = client.DockingEvent.list
```


### Event

Create an instance: `event = client.Event`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `String` |  |
| `description` | `String` |  |
| `feature_image` | `String` |  |
| `id` | `Integer` |  |
| `location` | `String` |  |
| `name` | `String` |  |
| `news_url` | `String` |  |
| `type` | `Hash` |  |
| `url` | `String` |  |
| `video_url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Event record (raises on error).
event = client.Event.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Event records (raises on error).
events = client.Event.list
```


### Expedition

Create an instance: `expedition = client.Expedition`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `Array` |  |
| `end` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `spacestation` | `Hash` |  |
| `start` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Expedition record (raises on error).
expedition = client.Expedition.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Expedition records (raises on error).
expeditions = client.Expedition.list
```


### FirstStage

Create an instance: `first_stage = client.FirstStage`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `flight` | `Integer` |  |
| `id` | `Integer` |  |
| `launcher_config` | `Hash` |  |
| `serial_number` | `String` |  |
| `status` | `String` |  |
| `type` | `String` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare FirstStage record (raises on error).
first_stage = client.FirstStage.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of FirstStage records (raises on error).
first_stages = client.FirstStage.list
```


### Launch

Create an instance: `launch = client.Launch`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `String` |  |
| `image` | `String` |  |
| `launch_service_provider` | `Hash` |  |
| `mission` | `Hash` |  |
| `name` | `String` |  |
| `net` | `String` |  |
| `pad` | `Hash` |  |
| `probability` | `Integer` |  |
| `rocket` | `Hash` |  |
| `status` | `Hash` |  |
| `url` | `String` |  |
| `webcast_live` | `Boolean` |  |
| `window_end` | `String` |  |
| `window_start` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Launch record (raises on error).
launch = client.Launch.load({ "id" => "launch_id" })
```

#### Example: List

```ruby
# list returns an Array of Launch records (raises on error).
launchs = client.Launch.list
```


### LaunchVehicle

Create an instance: `launch_vehicle = client.LaunchVehicle`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `Integer` |  |
| `consecutive_successful_launch` | `Integer` |  |
| `description` | `String` |  |
| `diameter` | `Float` |  |
| `failed_launch` | `Integer` |  |
| `family` | `String` |  |
| `full_name` | `String` |  |
| `gto_capacity` | `Integer` |  |
| `id` | `Integer` |  |
| `launch_mass` | `Integer` |  |
| `length` | `Float` |  |
| `leo_capacity` | `Integer` |  |
| `maiden_flight` | `String` |  |
| `manufacturer` | `Hash` |  |
| `max_stage` | `Integer` |  |
| `min_stage` | `Integer` |  |
| `name` | `String` |  |
| `pending_launch` | `Integer` |  |
| `successful_launch` | `Integer` |  |
| `to_thrust` | `Integer` |  |
| `url` | `String` |  |
| `variant` | `String` |  |

#### Example: List

```ruby
# list returns an Array of LaunchVehicle records (raises on error).
launch_vehicles = client.LaunchVehicle.list
```


### Launcher

Create an instance: `launcher = client.Launcher`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `Integer` |  |
| `consecutive_successful_launch` | `Integer` |  |
| `description` | `String` |  |
| `diameter` | `Float` |  |
| `failed_launch` | `Integer` |  |
| `family` | `String` |  |
| `full_name` | `String` |  |
| `gto_capacity` | `Integer` |  |
| `id` | `Integer` |  |
| `launch_mass` | `Integer` |  |
| `length` | `Float` |  |
| `leo_capacity` | `Integer` |  |
| `maiden_flight` | `String` |  |
| `manufacturer` | `Hash` |  |
| `max_stage` | `Integer` |  |
| `min_stage` | `Integer` |  |
| `name` | `String` |  |
| `pending_launch` | `Integer` |  |
| `successful_launch` | `Integer` |  |
| `to_thrust` | `Integer` |  |
| `url` | `String` |  |
| `variant` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Launcher record (raises on error).
launcher = client.Launcher.load({ "id" => 1 })
```


### Location

Create an instance: `location = client.Location`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `String` |  |
| `id` | `Integer` |  |
| `map_image` | `String` |  |
| `name` | `String` |  |
| `total_landing_count` | `Integer` |  |
| `total_launch_count` | `Integer` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Location record (raises on error).
location = client.Location.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Location records (raises on error).
locations = client.Location.list
```


### Pad

Create an instance: `pad = client.Pad`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency_id` | `Integer` |  |
| `id` | `Integer` |  |
| `info_url` | `String` |  |
| `latitude` | `String` |  |
| `location` | `Hash` |  |
| `longitude` | `String` |  |
| `map_image` | `String` |  |
| `map_url` | `String` |  |
| `name` | `String` |  |
| `total_launch_count` | `Integer` |  |
| `url` | `String` |  |
| `wiki_url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Pad record (raises on error).
pad = client.Pad.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Pad records (raises on error).
pads = client.Pad.list
```


### ReusableFirstStage

Create an instance: `reusable_first_stage = client.ReusableFirstStage`


### SpaceStation

Create an instance: `space_station = client.SpaceStation`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deorbited` | `String` |  |
| `description` | `String` |  |
| `founded` | `String` |  |
| `id` | `Integer` |  |
| `image_url` | `String` |  |
| `name` | `String` |  |
| `orbit` | `String` |  |
| `owner` | `Array` |  |
| `status` | `Hash` |  |
| `type` | `Hash` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare SpaceStation record (raises on error).
space_station = client.SpaceStation.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of SpaceStation records (raises on error).
space_stations = client.SpaceStation.list
```


### Spacecraft

Create an instance: `spacecraft = client.Spacecraft`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `Hash` |  |
| `capability` | `String` |  |
| `crew_capacity` | `Integer` |  |
| `detail` | `String` |  |
| `diameter` | `Float` |  |
| `height` | `Float` |  |
| `history` | `String` |  |
| `human_rated` | `Boolean` |  |
| `id` | `Integer` |  |
| `image_url` | `String` |  |
| `in_use` | `Boolean` |  |
| `maiden_flight` | `String` |  |
| `name` | `String` |  |
| `type` | `Hash` |  |
| `url` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Spacecraft record (raises on error).
spacecraft = client.Spacecraft.load({ "id" => 1 })
```

#### Example: List

```ruby
# list returns an Array of Spacecraft records (raises on error).
spacecrafts = client.Spacecraft.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── LaunchLibrary2_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`LaunchLibrary2_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
agency = client.Agency
agency.list()

# agency.data_get now returns the agency data from the last list
# agency.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
