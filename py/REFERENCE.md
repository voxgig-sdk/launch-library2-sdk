# LaunchLibrary2 Python SDK Reference

Complete API reference for the LaunchLibrary2 Python SDK.


## LaunchLibrary2SDK

### Constructor

```python
from launch-library2_sdk import LaunchLibrary2SDK

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
| `abbrev` | ``$STRING`` | No |  |
| `administrator` | ``$STRING`` | No |  |
| `country_code` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `founding_year` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `logo_url` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Agency().list({})
for agency in results:
    print(agency)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Agency().load({"id": "agency_id"})
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
| `bio` | ``$STRING`` | No |  |
| `date_of_birth` | ``$STRING`` | No |  |
| `date_of_death` | ``$STRING`` | No |  |
| `flights_count` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nationality` | ``$STRING`` | No |  |
| `profile_image` | ``$STRING`` | No |  |
| `spacewalks_count` | ``$INTEGER`` | No |  |
| `status` | ``$OBJECT`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Astronaut().list({})
for astronaut in results:
    print(astronaut)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Astronaut().load({"id": "astronaut_id"})
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
| `departure` | ``$STRING`` | No |  |
| `docking` | ``$STRING`` | No |  |
| `docking_location` | ``$OBJECT`` | No |  |
| `flight_vehicle` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.DockingEvent().list({})
for docking_event in results:
    print(docking_event)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.DockingEvent().load({"id": "docking_event_id"})
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
| `date` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `feature_image` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `news_url` | ``$STRING`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |
| `video_url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Event().list({})
for event in results:
    print(event)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Event().load({"id": "event_id"})
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
| `crew` | ``$ARRAY`` | No |  |
| `end` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `spacestation` | ``$OBJECT`` | No |  |
| `start` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Expedition().list({})
for expedition in results:
    print(expedition)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Expedition().load({"id": "expedition_id"})
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
| `flight` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `launcher_config` | ``$OBJECT`` | No |  |
| `serial_number` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.FirstStage().list({})
for first_stage in results:
    print(first_stage)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.FirstStage().load({"id": "first_stage_id"})
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
| `id` | ``$STRING`` | No |  |
| `image` | ``$STRING`` | No |  |
| `launch_service_provider` | ``$OBJECT`` | No |  |
| `mission` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `net` | ``$STRING`` | No |  |
| `pad` | ``$OBJECT`` | No |  |
| `probability` | ``$INTEGER`` | No |  |
| `rocket` | ``$OBJECT`` | No |  |
| `status` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |
| `webcast_live` | ``$BOOLEAN`` | No |  |
| `window_end` | ``$STRING`` | No |  |
| `window_start` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Launch().list({})
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
| `apogee` | ``$INTEGER`` | No |  |
| `consecutive_successful_launch` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `diameter` | ``$NUMBER`` | No |  |
| `failed_launch` | ``$INTEGER`` | No |  |
| `family` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `gto_capacity` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `launch_mass` | ``$INTEGER`` | No |  |
| `length` | ``$NUMBER`` | No |  |
| `leo_capacity` | ``$INTEGER`` | No |  |
| `maiden_flight` | ``$STRING`` | No |  |
| `manufacturer` | ``$OBJECT`` | No |  |
| `max_stage` | ``$INTEGER`` | No |  |
| `min_stage` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `pending_launch` | ``$INTEGER`` | No |  |
| `successful_launch` | ``$INTEGER`` | No |  |
| `to_thrust` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |
| `variant` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.LaunchVehicle().list({})
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
| `apogee` | ``$INTEGER`` | No |  |
| `consecutive_successful_launch` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `diameter` | ``$NUMBER`` | No |  |
| `failed_launch` | ``$INTEGER`` | No |  |
| `family` | ``$STRING`` | No |  |
| `full_name` | ``$STRING`` | No |  |
| `gto_capacity` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `launch_mass` | ``$INTEGER`` | No |  |
| `length` | ``$NUMBER`` | No |  |
| `leo_capacity` | ``$INTEGER`` | No |  |
| `maiden_flight` | ``$STRING`` | No |  |
| `manufacturer` | ``$OBJECT`` | No |  |
| `max_stage` | ``$INTEGER`` | No |  |
| `min_stage` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `pending_launch` | ``$INTEGER`` | No |  |
| `successful_launch` | ``$INTEGER`` | No |  |
| `to_thrust` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |
| `variant` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Launcher().load({"id": "launcher_id"})
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
| `country_code` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `map_image` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `total_landing_count` | ``$INTEGER`` | No |  |
| `total_launch_count` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Location().list({})
for location in results:
    print(location)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Location().load({"id": "location_id"})
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
| `agency_id` | ``$INTEGER`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `info_url` | ``$STRING`` | No |  |
| `latitude` | ``$STRING`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `longitude` | ``$STRING`` | No |  |
| `map_image` | ``$STRING`` | No |  |
| `map_url` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `total_launch_count` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |
| `wiki_url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Pad().list({})
for pad in results:
    print(pad)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Pad().load({"id": "pad_id"})
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
| `deorbited` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `founded` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image_url` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `orbit` | ``$STRING`` | No |  |
| `owner` | ``$ARRAY`` | No |  |
| `status` | ``$OBJECT`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.SpaceStation().list({})
for space_station in results:
    print(space_station)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.SpaceStation().load({"id": "space_station_id"})
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
| `agency` | ``$OBJECT`` | No |  |
| `capability` | ``$STRING`` | No |  |
| `crew_capacity` | ``$INTEGER`` | No |  |
| `detail` | ``$STRING`` | No |  |
| `diameter` | ``$NUMBER`` | No |  |
| `height` | ``$NUMBER`` | No |  |
| `history` | ``$STRING`` | No |  |
| `human_rated` | ``$BOOLEAN`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `image_url` | ``$STRING`` | No |  |
| `in_use` | ``$BOOLEAN`` | No |  |
| `maiden_flight` | ``$STRING`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$OBJECT`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.Spacecraft().list({})
for spacecraft in results:
    print(spacecraft)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Spacecraft().load({"id": "spacecraft_id"})
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

