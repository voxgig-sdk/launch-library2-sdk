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

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

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
    astronauts = client.Astronaut().list()
    print(astronauts)
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

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
astronaut = client.Astronaut().list()
# astronaut contains the mock response record
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

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
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

Create an instance: `agency = client.Agency()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `abbrev` | `str` | Agency abbreviation |
| `administrator` | `str` | Agency administrator |
| `country_code` | `str` | ISO country code |
| `description` | `str` | Agency description |
| `founding_year` | `str` | Year agency was founded |
| `id` | `int` | Agency ID |
| `logo_url` | `str` | URL to agency logo |
| `name` | `str` | Name of the agency |
| `type` | `str` | Type of agency |
| `url` | `str` | API URL for this agency |

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
| `bio` | `str` | Biographical information |
| `date_of_birth` | `str` | Date of birth |
| `date_of_death` | `str` | Date of death if applicable |
| `flights_count` | `int` | Number of flights |
| `id` | `int` | Astronaut ID |
| `name` | `str` | Name of the astronaut |
| `nationality` | `str` | Astronaut nationality |
| `profile_image` | `str` | URL to profile image |
| `spacewalks_count` | `int` | Number of spacewalks |
| `status` | `dict` |  |
| `type` | `dict` |  |
| `url` | `str` | API URL for this astronaut |

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
| `departure` | `str` | Departure time |
| `docking` | `str` | Docking time |
| `docking_location` | `dict` |  |
| `flight_vehicle` | `dict` |  |
| `id` | `int` | Docking event ID |
| `url` | `str` | API URL for this docking event |

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
| `date` | `str` | Event date and time |
| `description` | `str` | Description of the event |
| `feature_image` | `str` | URL to feature image |
| `id` | `int` | Event ID |
| `location` | `str` | Event location |
| `name` | `str` | Name of the event |
| `news_url` | `str` | URL to news article |
| `type` | `dict` |  |
| `url` | `str` | API URL for this event |
| `video_url` | `str` | URL to video |

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
| `end` | `str` | End date of the expedition |
| `id` | `int` | Expedition ID |
| `name` | `str` | Name of the expedition |
| `spacestation` | `dict` |  |
| `start` | `str` | Start date of the expedition |
| `url` | `str` | API URL for this expedition |

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
| `apogee` | `int` | Apogee in km |
| `consecutive_successful_launches` | `int` | Number of consecutive successful launches |
| `description` | `str` | Description of the launcher |
| `diameter` | `float` | Diameter in meters |
| `failed_launches` | `int` | Number of failed launches |
| `family` | `str` | Launcher family |
| `flights` | `int` | Number of flights |
| `full_name` | `str` | Full name of the launcher |
| `gto_capacity` | `int` | GTO capacity in kg |
| `id` | `int` | Configuration ID |
| `launch_mass` | `int` | Launch mass in kg |
| `launcher_config` | `dict` |  |
| `length` | `float` | Length in meters |
| `leo_capacity` | `int` | LEO capacity in kg |
| `maiden_flight` | `str` | Date of maiden flight |
| `manufacturer` | `dict` |  |
| `max_stage` | `int` | Maximum number of stages |
| `min_stage` | `int` | Minimum number of stages |
| `name` | `str` | Name of the launcher configuration |
| `pending_launches` | `int` | Number of pending launches |
| `serial_number` | `str` | Serial number of the first stage |
| `status` | `str` | Current status |
| `successful_launches` | `int` | Number of successful launches |
| `to_thrust` | `int` | Takeoff thrust in kN |
| `type` | `str` | Type of first stage |
| `url` | `str` | API URL for this configuration |
| `variant` | `str` | Variant of the launcher |

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
| `id` | `str` | UUID of the launch |
| `image` | `str` | URL to launch image |
| `launch_service_provider` | `dict` |  |
| `mission` | `dict` |  |
| `name` | `str` | Name of the launch |
| `net` | `str` | Net Earliest Time (NET) for launch |
| `pad` | `dict` |  |
| `probability` | `int` | Launch probability percentage |
| `rocket` | `dict` |  |
| `status` | `dict` |  |
| `url` | `str` | API URL for this launch |
| `webcast_live` | `bool` | Whether the webcast is currently live |
| `window_end` | `str` | End of launch window |
| `window_start` | `str` | Start of launch window |

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
| `apogee` | `int` | Apogee in km |
| `consecutive_successful_launches` | `int` | Number of consecutive successful launches |
| `description` | `str` | Description of the launcher |
| `diameter` | `float` | Diameter in meters |
| `failed_launches` | `int` | Number of failed launches |
| `family` | `str` | Launcher family |
| `full_name` | `str` | Full name of the launcher |
| `gto_capacity` | `int` | GTO capacity in kg |
| `id` | `int` | Configuration ID |
| `launch_mass` | `int` | Launch mass in kg |
| `length` | `float` | Length in meters |
| `leo_capacity` | `int` | LEO capacity in kg |
| `maiden_flight` | `str` | Date of maiden flight |
| `manufacturer` | `dict` |  |
| `max_stage` | `int` | Maximum number of stages |
| `min_stage` | `int` | Minimum number of stages |
| `name` | `str` | Name of the launcher configuration |
| `pending_launches` | `int` | Number of pending launches |
| `successful_launches` | `int` | Number of successful launches |
| `to_thrust` | `int` | Takeoff thrust in kN |
| `url` | `str` | API URL for this configuration |
| `variant` | `str` | Variant of the launcher |

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
| `abbrev` | `str` | Agency abbreviation |
| `administrator` | `str` | Agency administrator |
| `country_code` | `str` | ISO country code |
| `description` | `str` | Agency description |
| `founding_year` | `str` | Year agency was founded |
| `id` | `int` | Agency ID |
| `logo_url` | `str` | URL to agency logo |
| `name` | `str` | Name of the agency |
| `type` | `str` | Type of agency |
| `url` | `str` | API URL for this agency |

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
| `country_code` | `str` | ISO country code |
| `id` | `int` | Location ID |
| `map_image` | `str` | URL to map image |
| `name` | `str` | Name of the location |
| `total_landing_count` | `int` | Total number of landings at this location |
| `total_launch_count` | `int` | Total number of launches from this location |
| `url` | `str` | API URL for this location |

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
| `agency_id` | `int` | ID of the agency that operates this pad |
| `country_code` | `str` | ISO country code |
| `id` | `int` | Location ID |
| `info_url` | `str` | URL to more information |
| `latitude` | `str` | Latitude coordinate |
| `location` | `dict` |  |
| `longitude` | `str` | Longitude coordinate |
| `map_image` | `str` | URL to map image |
| `map_url` | `str` | URL to map |
| `name` | `str` | Name of the location |
| `total_landing_count` | `int` | Total number of landings at this location |
| `total_launch_count` | `int` | Total number of launches from this location |
| `url` | `str` | API URL for this location |
| `wiki_url` | `str` | Wikipedia URL |

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
| `deorbited` | `str` | Date the space station was deorbited |
| `description` | `str` | Description of the space station |
| `founded` | `str` | Date the space station was founded |
| `id` | `int` | Space station ID |
| `image_url` | `str` | URL to space station image |
| `name` | `str` | Name of the space station |
| `orbit` | `str` | Orbital information |
| `owners` | `list` |  |
| `status` | `dict` |  |
| `type` | `dict` |  |
| `url` | `str` | API URL for this space station |

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
| `capability` | `str` | Spacecraft capability |
| `crew_capacity` | `int` | Crew capacity |
| `details` | `str` | Detailed information |
| `diameter` | `float` | Diameter in meters |
| `height` | `float` | Height in meters |
| `history` | `str` | Historical information |
| `human_rated` | `bool` | Whether the spacecraft is human-rated |
| `id` | `int` | Spacecraft configuration ID |
| `image_url` | `str` | URL to spacecraft image |
| `in_use` | `bool` | Whether the spacecraft is currently in use |
| `maiden_flight` | `str` | Date of maiden flight |
| `name` | `str` | Name of the spacecraft |
| `type` | `dict` |  |
| `url` | `str` | API URL for this configuration |

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
astronaut = client.Astronaut()
astronaut.list()

# astronaut.data_get() now returns the astronaut data from the last list
# astronaut.match_get() returns the last match criteria
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
