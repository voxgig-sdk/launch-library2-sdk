# LaunchLibrary2 Python SDK

The Python SDK for the LaunchLibrary2 API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install launch-library2-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from launchlibrary2_sdk import LaunchLibrary2SDK

client = LaunchLibrary2SDK({})
```

### 2. List agencys

```python
result, err = client.Agency(None).list(None, None)
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```

### 3. Load a agency

```python
result, err = client.Agency(None).load({"id": "example_id"}, None)
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = LaunchLibrary2SDK.test(None, None)

result, err = client.LaunchLibrary2(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = LaunchLibrary2SDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAUNCH-LIBRARY2_TEST_LIVE=TRUE
```

Then run:

```bash
cd py && pytest test/
```


## Reference

### LaunchLibrary2SDK

```python
from launchlibrary2_sdk import LaunchLibrary2SDK

client = LaunchLibrary2SDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = LaunchLibrary2SDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### LaunchLibrary2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Agency` | `(data) -> AgencyEntity` | Create a Agency entity instance. |
| `Astronaut` | `(data) -> AstronautEntity` | Create a Astronaut entity instance. |
| `Docking` | `(data) -> DockingEntity` | Create a Docking entity instance. |
| `DockingEvent` | `(data) -> DockingEventEntity` | Create a DockingEvent entity instance. |
| `Event` | `(data) -> EventEntity` | Create a Event entity instance. |
| `Expedition` | `(data) -> ExpeditionEntity` | Create a Expedition entity instance. |
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
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `const agency = client.Agency()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbrev` | ``$STRING`` |  |
| `administrator` | ``$STRING`` |  |
| `country_code` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `founding_year` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `logo_url` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const agency = await client.Agency().load({ id: 'agency_id' })
```

#### Example: List

```ts
const agencys = await client.Agency().list()
```


### Astronaut

Create an instance: `const astronaut = client.Astronaut()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | ``$STRING`` |  |
| `date_of_birth` | ``$STRING`` |  |
| `date_of_death` | ``$STRING`` |  |
| `flights_count` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `nationality` | ``$STRING`` |  |
| `profile_image` | ``$STRING`` |  |
| `spacewalks_count` | ``$INTEGER`` |  |
| `status` | ``$OBJECT`` |  |
| `type` | ``$OBJECT`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const astronaut = await client.Astronaut().load({ id: 'astronaut_id' })
```

#### Example: List

```ts
const astronauts = await client.Astronaut().list()
```


### Docking

Create an instance: `const docking = client.Docking()`


### DockingEvent

Create an instance: `const docking_event = client.DockingEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departure` | ``$STRING`` |  |
| `docking` | ``$STRING`` |  |
| `docking_location` | ``$OBJECT`` |  |
| `flight_vehicle` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const docking_event = await client.DockingEvent().load({ id: 'docking_event_id' })
```

#### Example: List

```ts
const docking_events = await client.DockingEvent().list()
```


### Event

Create an instance: `const event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `feature_image` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `location` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `news_url` | ``$STRING`` |  |
| `type` | ``$OBJECT`` |  |
| `url` | ``$STRING`` |  |
| `video_url` | ``$STRING`` |  |

#### Example: Load

```ts
const event = await client.Event().load({ id: 'event_id' })
```

#### Example: List

```ts
const events = await client.Event().list()
```


### Expedition

Create an instance: `const expedition = client.Expedition()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | ``$ARRAY`` |  |
| `end` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `spacestation` | ``$OBJECT`` |  |
| `start` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const expedition = await client.Expedition().load({ id: 'expedition_id' })
```

#### Example: List

```ts
const expeditions = await client.Expedition().list()
```


### FirstStage

Create an instance: `const first_stage = client.FirstStage()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `flight` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `launcher_config` | ``$OBJECT`` |  |
| `serial_number` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const first_stage = await client.FirstStage().load({ id: 'first_stage_id' })
```

#### Example: List

```ts
const first_stages = await client.FirstStage().list()
```


### Launch

Create an instance: `const launch = client.Launch()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$STRING`` |  |
| `image` | ``$STRING`` |  |
| `launch_service_provider` | ``$OBJECT`` |  |
| `mission` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `net` | ``$STRING`` |  |
| `pad` | ``$OBJECT`` |  |
| `probability` | ``$INTEGER`` |  |
| `rocket` | ``$OBJECT`` |  |
| `status` | ``$OBJECT`` |  |
| `url` | ``$STRING`` |  |
| `webcast_live` | ``$BOOLEAN`` |  |
| `window_end` | ``$STRING`` |  |
| `window_start` | ``$STRING`` |  |

#### Example: Load

```ts
const launch = await client.Launch().load({ id: 'launch_id' })
```

#### Example: List

```ts
const launchs = await client.Launch().list()
```


### LaunchVehicle

Create an instance: `const launch_vehicle = client.LaunchVehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | ``$INTEGER`` |  |
| `consecutive_successful_launch` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `diameter` | ``$NUMBER`` |  |
| `failed_launch` | ``$INTEGER`` |  |
| `family` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `gto_capacity` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `launch_mass` | ``$INTEGER`` |  |
| `length` | ``$NUMBER`` |  |
| `leo_capacity` | ``$INTEGER`` |  |
| `maiden_flight` | ``$STRING`` |  |
| `manufacturer` | ``$OBJECT`` |  |
| `max_stage` | ``$INTEGER`` |  |
| `min_stage` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `pending_launch` | ``$INTEGER`` |  |
| `successful_launch` | ``$INTEGER`` |  |
| `to_thrust` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |
| `variant` | ``$STRING`` |  |

#### Example: List

```ts
const launch_vehicles = await client.LaunchVehicle().list()
```


### Launcher

Create an instance: `const launcher = client.Launcher()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | ``$INTEGER`` |  |
| `consecutive_successful_launch` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `diameter` | ``$NUMBER`` |  |
| `failed_launch` | ``$INTEGER`` |  |
| `family` | ``$STRING`` |  |
| `full_name` | ``$STRING`` |  |
| `gto_capacity` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `launch_mass` | ``$INTEGER`` |  |
| `length` | ``$NUMBER`` |  |
| `leo_capacity` | ``$INTEGER`` |  |
| `maiden_flight` | ``$STRING`` |  |
| `manufacturer` | ``$OBJECT`` |  |
| `max_stage` | ``$INTEGER`` |  |
| `min_stage` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `pending_launch` | ``$INTEGER`` |  |
| `successful_launch` | ``$INTEGER`` |  |
| `to_thrust` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |
| `variant` | ``$STRING`` |  |

#### Example: Load

```ts
const launcher = await client.Launcher().load({ id: 'launcher_id' })
```


### Location

Create an instance: `const location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `map_image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `total_landing_count` | ``$INTEGER`` |  |
| `total_launch_count` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const location = await client.Location().load({ id: 'location_id' })
```

#### Example: List

```ts
const locations = await client.Location().list()
```


### Pad

Create an instance: `const pad = client.Pad()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency_id` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `info_url` | ``$STRING`` |  |
| `latitude` | ``$STRING`` |  |
| `location` | ``$OBJECT`` |  |
| `longitude` | ``$STRING`` |  |
| `map_image` | ``$STRING`` |  |
| `map_url` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `total_launch_count` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |
| `wiki_url` | ``$STRING`` |  |

#### Example: Load

```ts
const pad = await client.Pad().load({ id: 'pad_id' })
```

#### Example: List

```ts
const pads = await client.Pad().list()
```


### ReusableFirstStage

Create an instance: `const reusable_first_stage = client.ReusableFirstStage()`


### SpaceStation

Create an instance: `const space_station = client.SpaceStation()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deorbited` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `founded` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `image_url` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `orbit` | ``$STRING`` |  |
| `owner` | ``$ARRAY`` |  |
| `status` | ``$OBJECT`` |  |
| `type` | ``$OBJECT`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const space_station = await client.SpaceStation().load({ id: 'space_station_id' })
```

#### Example: List

```ts
const space_stations = await client.SpaceStation().list()
```


### Spacecraft

Create an instance: `const spacecraft = client.Spacecraft()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | ``$OBJECT`` |  |
| `capability` | ``$STRING`` |  |
| `crew_capacity` | ``$INTEGER`` |  |
| `detail` | ``$STRING`` |  |
| `diameter` | ``$NUMBER`` |  |
| `height` | ``$NUMBER`` |  |
| `history` | ``$STRING`` |  |
| `human_rated` | ``$BOOLEAN`` |  |
| `id` | ``$INTEGER`` |  |
| `image_url` | ``$STRING`` |  |
| `in_use` | ``$BOOLEAN`` |  |
| `maiden_flight` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$OBJECT`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const spacecraft = await client.Spacecraft().load({ id: 'spacecraft_id' })
```

#### Example: List

```ts
const spacecrafts = await client.Spacecraft().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

### Features and hooks

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── launchlibrary2_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`launchlibrary2_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
