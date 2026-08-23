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
  # load returns the ENTITY — call data_get for the Agency record (raises on error).
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
  astronauts = client.Astronaut.list()
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
  "entity" => { "astronaut" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
astronaut = client.Astronaut.list()
puts astronaut
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
| `abbrev` | Agency abbreviation |
| `administrator` | Agency administrator |
| `country_code` | ISO country code |
| `description` | Agency description |
| `founding_year` | Year agency was founded |
| `id` | Agency ID |
| `logo_url` | URL to agency logo |
| `name` | Name of the agency |
| `type` | Type of agency |
| `url` | API URL for this agency |

Operations: List, Load.

API path: `/agencies`

#### Astronaut

| Field | Description |
| --- | --- |
| `bio` | Biographical information |
| `date_of_birth` | Date of birth |
| `date_of_death` | Date of death if applicable |
| `flights_count` | Number of flights |
| `id` | Astronaut ID |
| `name` | Name of the astronaut |
| `nationality` | Astronaut nationality |
| `profile_image` | URL to profile image |
| `spacewalks_count` | Number of spacewalks |
| `status` |  |
| `type` |  |
| `url` | API URL for this astronaut |

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
| `departure` | Departure time |
| `docking` | Docking time |
| `docking_location` |  |
| `flight_vehicle` |  |
| `id` | Docking event ID |
| `url` | API URL for this docking event |

Operations: List, Load.

API path: `/docking_event`

#### Event

| Field | Description |
| --- | --- |
| `date` | Event date and time |
| `description` | Description of the event |
| `feature_image` | URL to feature image |
| `id` | Event ID |
| `location` | Event location |
| `name` | Name of the event |
| `news_url` | URL to news article |
| `type` |  |
| `url` | API URL for this event |
| `video_url` | URL to video |

Operations: List, Load.

API path: `/event`

#### Expedition

| Field | Description |
| --- | --- |
| `crew` |  |
| `end` | End date of the expedition |
| `id` | Expedition ID |
| `name` | Name of the expedition |
| `spacestation` |  |
| `start` | Start date of the expedition |
| `url` | API URL for this expedition |

Operations: List, Load.

API path: `/expedition`

#### FirstStage

| Field | Description |
| --- | --- |
| `apogee` | Apogee in km |
| `consecutive_successful_launches` | Number of consecutive successful launches |
| `description` | Description of the launcher |
| `diameter` | Diameter in meters |
| `failed_launches` | Number of failed launches |
| `family` | Launcher family |
| `flights` | Number of flights |
| `full_name` | Full name of the launcher |
| `gto_capacity` | GTO capacity in kg |
| `id` | Configuration ID |
| `launch_mass` | Launch mass in kg |
| `launcher_config` |  |
| `length` | Length in meters |
| `leo_capacity` | LEO capacity in kg |
| `maiden_flight` | Date of maiden flight |
| `manufacturer` |  |
| `max_stage` | Maximum number of stages |
| `min_stage` | Minimum number of stages |
| `name` | Name of the launcher configuration |
| `pending_launches` | Number of pending launches |
| `serial_number` | Serial number of the first stage |
| `status` | Current status |
| `successful_launches` | Number of successful launches |
| `to_thrust` | Takeoff thrust in kN |
| `type` | Type of first stage |
| `url` | API URL for this configuration |
| `variant` | Variant of the launcher |

Operations: List, Load.

API path: `/firststage`

#### Launch

| Field | Description |
| --- | --- |
| `id` | UUID of the launch |
| `image` | URL to launch image |
| `launch_service_provider` |  |
| `mission` |  |
| `name` | Name of the launch |
| `net` | Net Earliest Time (NET) for launch |
| `pad` |  |
| `probability` | Launch probability percentage |
| `rocket` |  |
| `status` |  |
| `url` | API URL for this launch |
| `webcast_live` | Whether the webcast is currently live |
| `window_end` | End of launch window |
| `window_start` | Start of launch window |

Operations: List, Load.

API path: `/launch`

#### LaunchVehicle

| Field | Description |
| --- | --- |
| `apogee` | Apogee in km |
| `consecutive_successful_launches` | Number of consecutive successful launches |
| `description` | Description of the launcher |
| `diameter` | Diameter in meters |
| `failed_launches` | Number of failed launches |
| `family` | Launcher family |
| `full_name` | Full name of the launcher |
| `gto_capacity` | GTO capacity in kg |
| `id` | Configuration ID |
| `launch_mass` | Launch mass in kg |
| `length` | Length in meters |
| `leo_capacity` | LEO capacity in kg |
| `maiden_flight` | Date of maiden flight |
| `manufacturer` |  |
| `max_stage` | Maximum number of stages |
| `min_stage` | Minimum number of stages |
| `name` | Name of the launcher configuration |
| `pending_launches` | Number of pending launches |
| `successful_launches` | Number of successful launches |
| `to_thrust` | Takeoff thrust in kN |
| `url` | API URL for this configuration |
| `variant` | Variant of the launcher |

Operations: List.

API path: `/config/launcher`

#### Launcher

| Field | Description |
| --- | --- |
| `abbrev` | Agency abbreviation |
| `administrator` | Agency administrator |
| `country_code` | ISO country code |
| `description` | Agency description |
| `founding_year` | Year agency was founded |
| `id` | Agency ID |
| `logo_url` | URL to agency logo |
| `name` | Name of the agency |
| `type` | Type of agency |
| `url` | API URL for this agency |

Operations: Load.

API path: `/config/launcher/{id}`

#### Location

| Field | Description |
| --- | --- |
| `country_code` | ISO country code |
| `id` | Location ID |
| `map_image` | URL to map image |
| `name` | Name of the location |
| `total_landing_count` | Total number of landings at this location |
| `total_launch_count` | Total number of launches from this location |
| `url` | API URL for this location |

Operations: List, Load.

API path: `/location`

#### Pad

| Field | Description |
| --- | --- |
| `agency_id` | ID of the agency that operates this pad |
| `country_code` | ISO country code |
| `id` | Location ID |
| `info_url` | URL to more information |
| `latitude` | Latitude coordinate |
| `location` |  |
| `longitude` | Longitude coordinate |
| `map_image` | URL to map image |
| `map_url` | URL to map |
| `name` | Name of the location |
| `total_landing_count` | Total number of landings at this location |
| `total_launch_count` | Total number of launches from this location |
| `url` | API URL for this location |
| `wiki_url` | Wikipedia URL |

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
| `deorbited` | Date the space station was deorbited |
| `description` | Description of the space station |
| `founded` | Date the space station was founded |
| `id` | Space station ID |
| `image_url` | URL to space station image |
| `name` | Name of the space station |
| `orbit` | Orbital information |
| `owners` |  |
| `status` |  |
| `type` |  |
| `url` | API URL for this space station |

Operations: List, Load.

API path: `/spacestation`

#### Spacecraft

| Field | Description |
| --- | --- |
| `agency` |  |
| `capability` | Spacecraft capability |
| `crew_capacity` | Crew capacity |
| `details` | Detailed information |
| `diameter` | Diameter in meters |
| `height` | Height in meters |
| `history` | Historical information |
| `human_rated` | Whether the spacecraft is human-rated |
| `id` | Spacecraft configuration ID |
| `image_url` | URL to spacecraft image |
| `in_use` | Whether the spacecraft is currently in use |
| `maiden_flight` | Date of maiden flight |
| `name` | Name of the spacecraft |
| `type` |  |
| `url` | API URL for this configuration |

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
| `abbrev` | `String` | Agency abbreviation |
| `administrator` | `String` | Agency administrator |
| `country_code` | `String` | ISO country code |
| `description` | `String` | Agency description |
| `founding_year` | `String` | Year agency was founded |
| `id` | `Integer` | Agency ID |
| `logo_url` | `String` | URL to agency logo |
| `name` | `String` | Name of the agency |
| `type` | `String` | Type of agency |
| `url` | `String` | API URL for this agency |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Agency record (raises on error).
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
| `bio` | `String` | Biographical information |
| `date_of_birth` | `String` | Date of birth |
| `date_of_death` | `String` | Date of death if applicable |
| `flights_count` | `Integer` | Number of flights |
| `id` | `Integer` | Astronaut ID |
| `name` | `String` | Name of the astronaut |
| `nationality` | `String` | Astronaut nationality |
| `profile_image` | `String` | URL to profile image |
| `spacewalks_count` | `Integer` | Number of spacewalks |
| `status` | `Hash` |  |
| `type` | `Hash` |  |
| `url` | `String` | API URL for this astronaut |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Astronaut record (raises on error).
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
| `departure` | `String` | Departure time |
| `docking` | `String` | Docking time |
| `docking_location` | `Hash` |  |
| `flight_vehicle` | `Hash` |  |
| `id` | `Integer` | Docking event ID |
| `url` | `String` | API URL for this docking event |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the DockingEvent record (raises on error).
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
| `date` | `String` | Event date and time |
| `description` | `String` | Description of the event |
| `feature_image` | `String` | URL to feature image |
| `id` | `Integer` | Event ID |
| `location` | `String` | Event location |
| `name` | `String` | Name of the event |
| `news_url` | `String` | URL to news article |
| `type` | `Hash` |  |
| `url` | `String` | API URL for this event |
| `video_url` | `String` | URL to video |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Event record (raises on error).
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
| `end` | `String` | End date of the expedition |
| `id` | `Integer` | Expedition ID |
| `name` | `String` | Name of the expedition |
| `spacestation` | `Hash` |  |
| `start` | `String` | Start date of the expedition |
| `url` | `String` | API URL for this expedition |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Expedition record (raises on error).
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
| `apogee` | `Integer` | Apogee in km |
| `consecutive_successful_launches` | `Integer` | Number of consecutive successful launches |
| `description` | `String` | Description of the launcher |
| `diameter` | `Float` | Diameter in meters |
| `failed_launches` | `Integer` | Number of failed launches |
| `family` | `String` | Launcher family |
| `flights` | `Integer` | Number of flights |
| `full_name` | `String` | Full name of the launcher |
| `gto_capacity` | `Integer` | GTO capacity in kg |
| `id` | `Integer` | Configuration ID |
| `launch_mass` | `Integer` | Launch mass in kg |
| `launcher_config` | `Hash` |  |
| `length` | `Float` | Length in meters |
| `leo_capacity` | `Integer` | LEO capacity in kg |
| `maiden_flight` | `String` | Date of maiden flight |
| `manufacturer` | `Hash` |  |
| `max_stage` | `Integer` | Maximum number of stages |
| `min_stage` | `Integer` | Minimum number of stages |
| `name` | `String` | Name of the launcher configuration |
| `pending_launches` | `Integer` | Number of pending launches |
| `serial_number` | `String` | Serial number of the first stage |
| `status` | `String` | Current status |
| `successful_launches` | `Integer` | Number of successful launches |
| `to_thrust` | `Integer` | Takeoff thrust in kN |
| `type` | `String` | Type of first stage |
| `url` | `String` | API URL for this configuration |
| `variant` | `String` | Variant of the launcher |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the FirstStage record (raises on error).
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
| `id` | `String` | UUID of the launch |
| `image` | `String` | URL to launch image |
| `launch_service_provider` | `Hash` |  |
| `mission` | `Hash` |  |
| `name` | `String` | Name of the launch |
| `net` | `String` | Net Earliest Time (NET) for launch |
| `pad` | `Hash` |  |
| `probability` | `Integer` | Launch probability percentage |
| `rocket` | `Hash` |  |
| `status` | `Hash` |  |
| `url` | `String` | API URL for this launch |
| `webcast_live` | `Boolean` | Whether the webcast is currently live |
| `window_end` | `String` | End of launch window |
| `window_start` | `String` | Start of launch window |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Launch record (raises on error).
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
| `apogee` | `Integer` | Apogee in km |
| `consecutive_successful_launches` | `Integer` | Number of consecutive successful launches |
| `description` | `String` | Description of the launcher |
| `diameter` | `Float` | Diameter in meters |
| `failed_launches` | `Integer` | Number of failed launches |
| `family` | `String` | Launcher family |
| `full_name` | `String` | Full name of the launcher |
| `gto_capacity` | `Integer` | GTO capacity in kg |
| `id` | `Integer` | Configuration ID |
| `launch_mass` | `Integer` | Launch mass in kg |
| `length` | `Float` | Length in meters |
| `leo_capacity` | `Integer` | LEO capacity in kg |
| `maiden_flight` | `String` | Date of maiden flight |
| `manufacturer` | `Hash` |  |
| `max_stage` | `Integer` | Maximum number of stages |
| `min_stage` | `Integer` | Minimum number of stages |
| `name` | `String` | Name of the launcher configuration |
| `pending_launches` | `Integer` | Number of pending launches |
| `successful_launches` | `Integer` | Number of successful launches |
| `to_thrust` | `Integer` | Takeoff thrust in kN |
| `url` | `String` | API URL for this configuration |
| `variant` | `String` | Variant of the launcher |

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
| `abbrev` | `String` | Agency abbreviation |
| `administrator` | `String` | Agency administrator |
| `country_code` | `String` | ISO country code |
| `description` | `String` | Agency description |
| `founding_year` | `String` | Year agency was founded |
| `id` | `Integer` | Agency ID |
| `logo_url` | `String` | URL to agency logo |
| `name` | `String` | Name of the agency |
| `type` | `String` | Type of agency |
| `url` | `String` | API URL for this agency |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Launcher record (raises on error).
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
| `country_code` | `String` | ISO country code |
| `id` | `Integer` | Location ID |
| `map_image` | `String` | URL to map image |
| `name` | `String` | Name of the location |
| `total_landing_count` | `Integer` | Total number of landings at this location |
| `total_launch_count` | `Integer` | Total number of launches from this location |
| `url` | `String` | API URL for this location |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Location record (raises on error).
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
| `agency_id` | `Integer` | ID of the agency that operates this pad |
| `country_code` | `String` | ISO country code |
| `id` | `Integer` | Location ID |
| `info_url` | `String` | URL to more information |
| `latitude` | `String` | Latitude coordinate |
| `location` | `Hash` |  |
| `longitude` | `String` | Longitude coordinate |
| `map_image` | `String` | URL to map image |
| `map_url` | `String` | URL to map |
| `name` | `String` | Name of the location |
| `total_landing_count` | `Integer` | Total number of landings at this location |
| `total_launch_count` | `Integer` | Total number of launches from this location |
| `url` | `String` | API URL for this location |
| `wiki_url` | `String` | Wikipedia URL |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Pad record (raises on error).
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
| `deorbited` | `String` | Date the space station was deorbited |
| `description` | `String` | Description of the space station |
| `founded` | `String` | Date the space station was founded |
| `id` | `Integer` | Space station ID |
| `image_url` | `String` | URL to space station image |
| `name` | `String` | Name of the space station |
| `orbit` | `String` | Orbital information |
| `owners` | `Array` |  |
| `status` | `Hash` |  |
| `type` | `Hash` |  |
| `url` | `String` | API URL for this space station |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the SpaceStation record (raises on error).
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
| `capability` | `String` | Spacecraft capability |
| `crew_capacity` | `Integer` | Crew capacity |
| `details` | `String` | Detailed information |
| `diameter` | `Float` | Diameter in meters |
| `height` | `Float` | Height in meters |
| `history` | `String` | Historical information |
| `human_rated` | `Boolean` | Whether the spacecraft is human-rated |
| `id` | `Integer` | Spacecraft configuration ID |
| `image_url` | `String` | URL to spacecraft image |
| `in_use` | `Boolean` | Whether the spacecraft is currently in use |
| `maiden_flight` | `String` | Date of maiden flight |
| `name` | `String` | Name of the spacecraft |
| `type` | `Hash` |  |
| `url` | `String` | API URL for this configuration |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Spacecraft record (raises on error).
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
astronaut = client.Astronaut
astronaut.list()

# astronaut.data_get now returns the astronaut data from the last list
# astronaut.match_get returns the last match criteria
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
