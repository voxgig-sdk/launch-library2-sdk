# LaunchLibrary2 Python SDK Reference

Complete API reference for the LaunchLibrary2 Python SDK.


## LaunchLibrary2SDK

### Constructor

```python
from launchlibrary2_sdk import LaunchLibrary2SDK

client = LaunchLibrary2SDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LaunchLibrary2SDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = LaunchLibrary2SDK.test()
```


### Instance Methods

#### `Agency(data=None)`

Create a new `AgencyEntity` instance. Pass `None` for no initial data.

#### `Astronaut(data=None)`

Create a new `AstronautEntity` instance. Pass `None` for no initial data.

#### `Docking(data=None)`

Create a new `DockingEntity` instance. Pass `None` for no initial data.

#### `DockingEvent(data=None)`

Create a new `DockingEventEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `Expedition(data=None)`

Create a new `ExpeditionEntity` instance. Pass `None` for no initial data.

#### `FirstStage(data=None)`

Create a new `FirstStageEntity` instance. Pass `None` for no initial data.

#### `Launch(data=None)`

Create a new `LaunchEntity` instance. Pass `None` for no initial data.

#### `LaunchVehicle(data=None)`

Create a new `LaunchVehicleEntity` instance. Pass `None` for no initial data.

#### `Launcher(data=None)`

Create a new `LauncherEntity` instance. Pass `None` for no initial data.

#### `Location(data=None)`

Create a new `LocationEntity` instance. Pass `None` for no initial data.

#### `Pad(data=None)`

Create a new `PadEntity` instance. Pass `None` for no initial data.

#### `ReusableFirstStage(data=None)`

Create a new `ReusableFirstStageEntity` instance. Pass `None` for no initial data.

#### `SpaceStation(data=None)`

Create a new `SpaceStationEntity` instance. Pass `None` for no initial data.

#### `Spacecraft(data=None)`

Create a new `SpacecraftEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AgencyEntity

```python
agency = client.Agency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `str` | No |  |
| `administrator` | `str` | No |  |
| `country_code` | `str` | No |  |
| `description` | `str` | No |  |
| `founding_year` | `str` | No |  |
| `id` | `int` | No |  |
| `logo_url` | `str` | No |  |
| `name` | `str` | No |  |
| `type` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Agency().list()
for agency in results:
    print(agency)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Agency().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AgencyEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## AstronautEntity

```python
astronaut = client.Astronaut()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `str` | No |  |
| `date_of_birth` | `str` | No |  |
| `date_of_death` | `str` | No |  |
| `flights_count` | `int` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `nationality` | `str` | No |  |
| `profile_image` | `str` | No |  |
| `spacewalks_count` | `int` | No |  |
| `status` | `dict` | No |  |
| `type` | `dict` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Astronaut().list()
for astronaut in results:
    print(astronaut)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Astronaut().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AstronautEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DockingEntity

```python
docking = client.Docking()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DockingEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DockingEventEntity

```python
docking_event = client.DockingEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `str` | No |  |
| `docking` | `str` | No |  |
| `docking_location` | `dict` | No |  |
| `flight_vehicle` | `dict` | No |  |
| `id` | `int` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.DockingEvent().list()
for docking_event in results:
    print(docking_event)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DockingEvent().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DockingEventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `str` | No |  |
| `description` | `str` | No |  |
| `feature_image` | `str` | No |  |
| `id` | `int` | No |  |
| `location` | `str` | No |  |
| `name` | `str` | No |  |
| `news_url` | `str` | No |  |
| `type` | `dict` | No |  |
| `url` | `str` | No |  |
| `video_url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Event().list()
for event in results:
    print(event)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Event().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ExpeditionEntity

```python
expedition = client.Expedition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `list` | No |  |
| `end` | `str` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `spacestation` | `dict` | No |  |
| `start` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Expedition().list()
for expedition in results:
    print(expedition)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Expedition().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ExpeditionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FirstStageEntity

```python
first_stage = client.FirstStage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `int` | No |  |
| `consecutive_successful_launches` | `int` | No |  |
| `description` | `str` | No |  |
| `diameter` | `float` | No |  |
| `failed_launches` | `int` | No |  |
| `family` | `str` | No |  |
| `flights` | `int` | No |  |
| `full_name` | `str` | No |  |
| `gto_capacity` | `int` | No |  |
| `id` | `int` | No |  |
| `launch_mass` | `int` | No |  |
| `launcher_config` | `dict` | No |  |
| `length` | `float` | No |  |
| `leo_capacity` | `int` | No |  |
| `maiden_flight` | `str` | No |  |
| `manufacturer` | `dict` | No |  |
| `max_stage` | `int` | No |  |
| `min_stage` | `int` | No |  |
| `name` | `str` | No |  |
| `pending_launches` | `int` | No |  |
| `serial_number` | `str` | No |  |
| `status` | `str` | No |  |
| `successful_launches` | `int` | No |  |
| `to_thrust` | `int` | No |  |
| `type` | `str` | No |  |
| `url` | `str` | No |  |
| `variant` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.FirstStage().list()
for first_stage in results:
    print(first_stage)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FirstStage().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FirstStageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LaunchEntity

```python
launch = client.Launch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `str` | No |  |
| `image` | `str` | No |  |
| `launch_service_provider` | `dict` | No |  |
| `mission` | `dict` | No |  |
| `name` | `str` | No |  |
| `net` | `str` | No |  |
| `pad` | `dict` | No |  |
| `probability` | `int` | No |  |
| `rocket` | `dict` | No |  |
| `status` | `dict` | No |  |
| `url` | `str` | No |  |
| `webcast_live` | `bool` | No |  |
| `window_end` | `str` | No |  |
| `window_start` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Launch().list()
for launch in results:
    print(launch)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Launch().load({"id": "launch_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LaunchVehicleEntity

```python
launch_vehicle = client.LaunchVehicle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `int` | No |  |
| `consecutive_successful_launches` | `int` | No |  |
| `description` | `str` | No |  |
| `diameter` | `float` | No |  |
| `failed_launches` | `int` | No |  |
| `family` | `str` | No |  |
| `full_name` | `str` | No |  |
| `gto_capacity` | `int` | No |  |
| `id` | `int` | No |  |
| `launch_mass` | `int` | No |  |
| `length` | `float` | No |  |
| `leo_capacity` | `int` | No |  |
| `maiden_flight` | `str` | No |  |
| `manufacturer` | `dict` | No |  |
| `max_stage` | `int` | No |  |
| `min_stage` | `int` | No |  |
| `name` | `str` | No |  |
| `pending_launches` | `int` | No |  |
| `successful_launches` | `int` | No |  |
| `to_thrust` | `int` | No |  |
| `url` | `str` | No |  |
| `variant` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LaunchVehicle().list()
for launch_vehicle in results:
    print(launch_vehicle)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LaunchVehicleEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LauncherEntity

```python
launcher = client.Launcher()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `str` | No |  |
| `administrator` | `str` | No |  |
| `country_code` | `str` | No |  |
| `description` | `str` | No |  |
| `founding_year` | `str` | No |  |
| `id` | `int` | No |  |
| `logo_url` | `str` | No |  |
| `name` | `str` | No |  |
| `type` | `str` | No |  |
| `url` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Launcher().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LauncherEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocationEntity

```python
location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `str` | No |  |
| `id` | `int` | No |  |
| `map_image` | `str` | No |  |
| `name` | `str` | No |  |
| `total_landing_count` | `int` | No |  |
| `total_launch_count` | `int` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Location().list()
for location in results:
    print(location)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Location().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PadEntity

```python
pad = client.Pad()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency_id` | `int` | No |  |
| `country_code` | `str` | No |  |
| `id` | `int` | No |  |
| `info_url` | `str` | No |  |
| `latitude` | `str` | No |  |
| `location` | `dict` | No |  |
| `longitude` | `str` | No |  |
| `map_image` | `str` | No |  |
| `map_url` | `str` | No |  |
| `name` | `str` | No |  |
| `total_landing_count` | `int` | No |  |
| `total_launch_count` | `int` | No |  |
| `url` | `str` | No |  |
| `wiki_url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Pad().list()
for pad in results:
    print(pad)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Pad().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReusableFirstStageEntity

```python
reusable_first_stage = client.ReusableFirstStage()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReusableFirstStageEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpaceStationEntity

```python
space_station = client.SpaceStation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deorbited` | `str` | No |  |
| `description` | `str` | No |  |
| `founded` | `str` | No |  |
| `id` | `int` | No |  |
| `image_url` | `str` | No |  |
| `name` | `str` | No |  |
| `orbit` | `str` | No |  |
| `owners` | `list` | No |  |
| `status` | `dict` | No |  |
| `type` | `dict` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.SpaceStation().list()
for space_station in results:
    print(space_station)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SpaceStation().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpaceStationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SpacecraftEntity

```python
spacecraft = client.Spacecraft()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `dict` | No |  |
| `capability` | `str` | No |  |
| `crew_capacity` | `int` | No |  |
| `details` | `str` | No |  |
| `diameter` | `float` | No |  |
| `height` | `float` | No |  |
| `history` | `str` | No |  |
| `human_rated` | `bool` | No |  |
| `id` | `int` | No |  |
| `image_url` | `str` | No |  |
| `in_use` | `bool` | No |  |
| `maiden_flight` | `str` | No |  |
| `name` | `str` | No |  |
| `type` | `dict` | No |  |
| `url` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Spacecraft().list()
for spacecraft in results:
    print(spacecraft)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Spacecraft().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SpacecraftEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = LaunchLibrary2SDK({
    "feature": {
        "test": {"active": True},
    },
})
```

