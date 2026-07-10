# LaunchLibrary2 Python SDK



The Python SDK for the LaunchLibrary2 API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Agency()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/launch-library2-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from launchlibrary2_sdk import LaunchLibrary2SDK

client = LaunchLibrary2SDK()
```

### 2. List agency records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    agencys = client.Agency().list()
    for agency in agencys:
        print(agency)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an agency

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    agency = client.Agency().load({"id": 1})
    print(agency)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    agencys = client.Agency().list()
    print(agencys)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = LaunchLibrary2SDK.test()

# Entity ops return the bare record and raise on error.
agency = client.Agency().list()
# agency contains the mock response record
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
LAUNCH_LIBRARY2_TEST_LIVE=TRUE
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
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

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

Create an instance: `agency = client.Agency()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbrev` | `str` |  |
| `administrator` | `str` |  |
| `country_code` | `str` |  |
| `description` | `str` |  |
| `founding_year` | `str` |  |
| `id` | `int` |  |
| `logo_url` | `str` |  |
| `name` | `str` |  |
| `type` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
agency = client.Agency().load({"id": 1})
```

#### Example: List

```python
agencys = client.Agency().list()
```


### Astronaut

Create an instance: `astronaut = client.Astronaut()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `str` |  |
| `date_of_birth` | `str` |  |
| `date_of_death` | `str` |  |
| `flights_count` | `int` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `nationality` | `str` |  |
| `profile_image` | `str` |  |
| `spacewalks_count` | `int` |  |
| `status` | `dict` |  |
| `type` | `dict` |  |
| `url` | `str` |  |

#### Example: Load

```python
astronaut = client.Astronaut().load({"id": 1})
```

#### Example: List

```python
astronauts = client.Astronaut().list()
```


### Docking

Create an instance: `docking = client.Docking()`


### DockingEvent

Create an instance: `docking_event = client.DockingEvent()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departure` | `str` |  |
| `docking` | `str` |  |
| `docking_location` | `dict` |  |
| `flight_vehicle` | `dict` |  |
| `id` | `int` |  |
| `url` | `str` |  |

#### Example: Load

```python
docking_event = client.DockingEvent().load({"id": 1})
```

#### Example: List

```python
docking_events = client.DockingEvent().list()
```


### Event

Create an instance: `event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | `str` |  |
| `description` | `str` |  |
| `feature_image` | `str` |  |
| `id` | `int` |  |
| `location` | `str` |  |
| `name` | `str` |  |
| `news_url` | `str` |  |
| `type` | `dict` |  |
| `url` | `str` |  |
| `video_url` | `str` |  |

#### Example: Load

```python
event = client.Event().load({"id": 1})
```

#### Example: List

```python
events = client.Event().list()
```


### Expedition

Create an instance: `expedition = client.Expedition()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `list` |  |
| `end` | `str` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `spacestation` | `dict` |  |
| `start` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
expedition = client.Expedition().load({"id": 1})
```

#### Example: List

```python
expeditions = client.Expedition().list()
```


### FirstStage

Create an instance: `first_stage = client.FirstStage()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `flight` | `int` |  |
| `id` | `int` |  |
| `launcher_config` | `dict` |  |
| `serial_number` | `str` |  |
| `status` | `str` |  |
| `type` | `str` |  |
| `url` | `str` |  |

#### Example: Load

```python
first_stage = client.FirstStage().load({"id": 1})
```

#### Example: List

```python
first_stages = client.FirstStage().list()
```


### Launch

Create an instance: `launch = client.Launch()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `str` |  |
| `image` | `str` |  |
| `launch_service_provider` | `dict` |  |
| `mission` | `dict` |  |
| `name` | `str` |  |
| `net` | `str` |  |
| `pad` | `dict` |  |
| `probability` | `int` |  |
| `rocket` | `dict` |  |
| `status` | `dict` |  |
| `url` | `str` |  |
| `webcast_live` | `bool` |  |
| `window_end` | `str` |  |
| `window_start` | `str` |  |

#### Example: Load

```python
launch = client.Launch().load({"id": "launch_id"})
```

#### Example: List

```python
launchs = client.Launch().list()
```


### LaunchVehicle

Create an instance: `launch_vehicle = client.LaunchVehicle()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `int` |  |
| `consecutive_successful_launch` | `int` |  |
| `description` | `str` |  |
| `diameter` | `float` |  |
| `failed_launch` | `int` |  |
| `family` | `str` |  |
| `full_name` | `str` |  |
| `gto_capacity` | `int` |  |
| `id` | `int` |  |
| `launch_mass` | `int` |  |
| `length` | `float` |  |
| `leo_capacity` | `int` |  |
| `maiden_flight` | `str` |  |
| `manufacturer` | `dict` |  |
| `max_stage` | `int` |  |
| `min_stage` | `int` |  |
| `name` | `str` |  |
| `pending_launch` | `int` |  |
| `successful_launch` | `int` |  |
| `to_thrust` | `int` |  |
| `url` | `str` |  |
| `variant` | `str` |  |

#### Example: List

```python
launch_vehicles = client.LaunchVehicle().list()
```


### Launcher

Create an instance: `launcher = client.Launcher()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `int` |  |
| `consecutive_successful_launch` | `int` |  |
| `description` | `str` |  |
| `diameter` | `float` |  |
| `failed_launch` | `int` |  |
| `family` | `str` |  |
| `full_name` | `str` |  |
| `gto_capacity` | `int` |  |
| `id` | `int` |  |
| `launch_mass` | `int` |  |
| `length` | `float` |  |
| `leo_capacity` | `int` |  |
| `maiden_flight` | `str` |  |
| `manufacturer` | `dict` |  |
| `max_stage` | `int` |  |
| `min_stage` | `int` |  |
| `name` | `str` |  |
| `pending_launch` | `int` |  |
| `successful_launch` | `int` |  |
| `to_thrust` | `int` |  |
| `url` | `str` |  |
| `variant` | `str` |  |

#### Example: Load

```python
launcher = client.Launcher().load({"id": 1})
```


### Location

Create an instance: `location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `str` |  |
| `id` | `int` |  |
| `map_image` | `str` |  |
| `name` | `str` |  |
| `total_landing_count` | `int` |  |
| `total_launch_count` | `int` |  |
| `url` | `str` |  |

#### Example: Load

```python
location = client.Location().load({"id": 1})
```

#### Example: List

```python
locations = client.Location().list()
```


### Pad

Create an instance: `pad = client.Pad()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency_id` | `int` |  |
| `id` | `int` |  |
| `info_url` | `str` |  |
| `latitude` | `str` |  |
| `location` | `dict` |  |
| `longitude` | `str` |  |
| `map_image` | `str` |  |
| `map_url` | `str` |  |
| `name` | `str` |  |
| `total_launch_count` | `int` |  |
| `url` | `str` |  |
| `wiki_url` | `str` |  |

#### Example: Load

```python
pad = client.Pad().load({"id": 1})
```

#### Example: List

```python
pads = client.Pad().list()
```


### ReusableFirstStage

Create an instance: `reusable_first_stage = client.ReusableFirstStage()`


### SpaceStation

Create an instance: `space_station = client.SpaceStation()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `deorbited` | `str` |  |
| `description` | `str` |  |
| `founded` | `str` |  |
| `id` | `int` |  |
| `image_url` | `str` |  |
| `name` | `str` |  |
| `orbit` | `str` |  |
| `owner` | `list` |  |
| `status` | `dict` |  |
| `type` | `dict` |  |
| `url` | `str` |  |

#### Example: Load

```python
space_station = client.SpaceStation().load({"id": 1})
```

#### Example: List

```python
space_stations = client.SpaceStation().list()
```


### Spacecraft

Create an instance: `spacecraft = client.Spacecraft()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `dict` |  |
| `capability` | `str` |  |
| `crew_capacity` | `int` |  |
| `detail` | `str` |  |
| `diameter` | `float` |  |
| `height` | `float` |  |
| `history` | `str` |  |
| `human_rated` | `bool` |  |
| `id` | `int` |  |
| `image_url` | `str` |  |
| `in_use` | `bool` |  |
| `maiden_flight` | `str` |  |
| `name` | `str` |  |
| `type` | `dict` |  |
| `url` | `str` |  |

#### Example: Load

```python
spacecraft = client.Spacecraft().load({"id": 1})
```

#### Example: List

```python
spacecrafts = client.Spacecraft().list()
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
agency = client.Agency()
agency.list()

# agency.data_get() now returns the agency data from the last list
# agency.match_get() returns the last match criteria
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
