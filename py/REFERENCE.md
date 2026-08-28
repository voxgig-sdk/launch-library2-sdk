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
| `abbrev` | `str` | No | Agency abbreviation |
| `administrator` | `str` | No | Agency administrator |
| `country_code` | `str` | No | ISO country code |
| `description` | `str` | No | Agency description |
| `founding_year` | `str` | No | Year agency was founded |
| `id` | `int` | No | Agency ID |
| `logo_url` | `str` | No | URL to agency logo |
| `name` | `str` | No | Name of the agency |
| `type` | `str` | No | Type of agency |
| `url` | `str` | No | API URL for this agency |

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
| `bio` | `str` | No | Biographical information |
| `date_of_birth` | `str` | No | Date of birth |
| `date_of_death` | `str` | No | Date of death if applicable |
| `flights_count` | `int` | No | Number of flights |
| `id` | `int` | No | Astronaut ID |
| `name` | `str` | No | Name of the astronaut |
| `nationality` | `str` | No | Astronaut nationality |
| `profile_image` | `str` | No | URL to profile image |
| `spacewalks_count` | `int` | No | Number of spacewalks |
| `status` | `dict` | No |  |
| `type` | `dict` | No |  |
| `url` | `str` | No | API URL for this astronaut |

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
| `departure` | `str` | No | Departure time |
| `docking` | `str` | No | Docking time |
| `docking_location` | `dict` | No |  |
| `flight_vehicle` | `dict` | No |  |
| `id` | `int` | No | Docking event ID |
| `url` | `str` | No | API URL for this docking event |

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
| `date` | `str` | No | Event date and time |
| `description` | `str` | No | Description of the event |
| `feature_image` | `str` | No | URL to feature image |
| `id` | `int` | No | Event ID |
| `location` | `str` | No | Event location |
| `name` | `str` | No | Name of the event |
| `news_url` | `str` | No | URL to news article |
| `type` | `dict` | No |  |
| `url` | `str` | No | API URL for this event |
| `video_url` | `str` | No | URL to video |

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
| `end` | `str` | No | End date of the expedition |
| `id` | `int` | No | Expedition ID |
| `name` | `str` | No | Name of the expedition |
| `spacestation` | `dict` | No |  |
| `start` | `str` | No | Start date of the expedition |
| `url` | `str` | No | API URL for this expedition |

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
| `apogee` | `int` | No | Apogee in km |
| `consecutive_successful_launches` | `int` | No | Number of consecutive successful launches |
| `description` | `str` | No | Description of the launcher |
| `diameter` | `float` | No | Diameter in meters |
| `failed_launches` | `int` | No | Number of failed launches |
| `family` | `str` | No | Launcher family |
| `flights` | `int` | No | Number of flights |
| `full_name` | `str` | No | Full name of the launcher |
| `gto_capacity` | `int` | No | GTO capacity in kg |
| `id` | `int` | No | Configuration ID |
| `launch_mass` | `int` | No | Launch mass in kg |
| `launcher_config` | `dict` | No |  |
| `length` | `float` | No | Length in meters |
| `leo_capacity` | `int` | No | LEO capacity in kg |
| `maiden_flight` | `str` | No | Date of maiden flight |
| `manufacturer` | `dict` | No |  |
| `max_stage` | `int` | No | Maximum number of stages |
| `min_stage` | `int` | No | Minimum number of stages |
| `name` | `str` | No | Name of the launcher configuration |
| `pending_launches` | `int` | No | Number of pending launches |
| `serial_number` | `str` | No | Serial number of the first stage |
| `status` | `str` | No | Current status |
| `successful_launches` | `int` | No | Number of successful launches |
| `to_thrust` | `int` | No | Takeoff thrust in kN |
| `type` | `str` | No | Type of first stage |
| `url` | `str` | No | API URL for this configuration |
| `variant` | `str` | No | Variant of the launcher |

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
| `id` | `str` | No | UUID of the launch |
| `image` | `str` | No | URL to launch image |
| `launch_service_provider` | `dict` | No |  |
| `mission` | `dict` | No |  |
| `name` | `str` | No | Name of the launch |
| `net` | `str` | No | Net Earliest Time (NET) for launch |
| `pad` | `dict` | No |  |
| `probability` | `int` | No | Launch probability percentage |
| `rocket` | `dict` | No |  |
| `status` | `dict` | No |  |
| `url` | `str` | No | API URL for this launch |
| `webcast_live` | `bool` | No | Whether the webcast is currently live |
| `window_end` | `str` | No | End of launch window |
| `window_start` | `str` | No | Start of launch window |

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
| `apogee` | `int` | No | Apogee in km |
| `consecutive_successful_launches` | `int` | No | Number of consecutive successful launches |
| `description` | `str` | No | Description of the launcher |
| `diameter` | `float` | No | Diameter in meters |
| `failed_launches` | `int` | No | Number of failed launches |
| `family` | `str` | No | Launcher family |
| `full_name` | `str` | No | Full name of the launcher |
| `gto_capacity` | `int` | No | GTO capacity in kg |
| `id` | `int` | No | Configuration ID |
| `launch_mass` | `int` | No | Launch mass in kg |
| `length` | `float` | No | Length in meters |
| `leo_capacity` | `int` | No | LEO capacity in kg |
| `maiden_flight` | `str` | No | Date of maiden flight |
| `manufacturer` | `dict` | No |  |
| `max_stage` | `int` | No | Maximum number of stages |
| `min_stage` | `int` | No | Minimum number of stages |
| `name` | `str` | No | Name of the launcher configuration |
| `pending_launches` | `int` | No | Number of pending launches |
| `successful_launches` | `int` | No | Number of successful launches |
| `to_thrust` | `int` | No | Takeoff thrust in kN |
| `url` | `str` | No | API URL for this configuration |
| `variant` | `str` | No | Variant of the launcher |

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
| `abbrev` | `str` | No | Agency abbreviation |
| `administrator` | `str` | No | Agency administrator |
| `country_code` | `str` | No | ISO country code |
| `description` | `str` | No | Agency description |
| `founding_year` | `str` | No | Year agency was founded |
| `id` | `int` | No | Agency ID |
| `logo_url` | `str` | No | URL to agency logo |
| `name` | `str` | No | Name of the agency |
| `type` | `str` | No | Type of agency |
| `url` | `str` | No | API URL for this agency |

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
| `country_code` | `str` | No | ISO country code |
| `id` | `int` | No | Location ID |
| `map_image` | `str` | No | URL to map image |
| `name` | `str` | No | Name of the location |
| `total_landing_count` | `int` | No | Total number of landings at this location |
| `total_launch_count` | `int` | No | Total number of launches from this location |
| `url` | `str` | No | API URL for this location |

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
| `agency_id` | `int` | No | ID of the agency that operates this pad |
| `country_code` | `str` | No | ISO country code |
| `id` | `int` | No | Location ID |
| `info_url` | `str` | No | URL to more information |
| `latitude` | `str` | No | Latitude coordinate |
| `location` | `dict` | No |  |
| `longitude` | `str` | No | Longitude coordinate |
| `map_image` | `str` | No | URL to map image |
| `map_url` | `str` | No | URL to map |
| `name` | `str` | No | Name of the location |
| `total_landing_count` | `int` | No | Total number of landings at this location |
| `total_launch_count` | `int` | No | Total number of launches from this location |
| `url` | `str` | No | API URL for this location |
| `wiki_url` | `str` | No | Wikipedia URL |

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
| `deorbited` | `str` | No | Date the space station was deorbited |
| `description` | `str` | No | Description of the space station |
| `founded` | `str` | No | Date the space station was founded |
| `id` | `int` | No | Space station ID |
| `image_url` | `str` | No | URL to space station image |
| `name` | `str` | No | Name of the space station |
| `orbit` | `str` | No | Orbital information |
| `owners` | `list` | No |  |
| `status` | `dict` | No |  |
| `type` | `dict` | No |  |
| `url` | `str` | No | API URL for this space station |

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
| `capability` | `str` | No | Spacecraft capability |
| `crew_capacity` | `int` | No | Crew capacity |
| `details` | `str` | No | Detailed information |
| `diameter` | `float` | No | Diameter in meters |
| `height` | `float` | No | Height in meters |
| `history` | `str` | No | Historical information |
| `human_rated` | `bool` | No | Whether the spacecraft is human-rated |
| `id` | `int` | No | Spacecraft configuration ID |
| `image_url` | `str` | No | URL to spacecraft image |
| `in_use` | `bool` | No | Whether the spacecraft is currently in use |
| `maiden_flight` | `str` | No | Date of maiden flight |
| `name` | `str` | No | Name of the spacecraft |
| `type` | `dict` | No |  |
| `url` | `str` | No | API URL for this configuration |

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

