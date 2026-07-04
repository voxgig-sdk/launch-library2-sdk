# LaunchLibrary2 TypeScript SDK Reference

Complete API reference for the LaunchLibrary2 TypeScript SDK.


## LaunchLibrary2SDK

### Constructor

```ts
new LaunchLibrary2SDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LaunchLibrary2SDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = LaunchLibrary2SDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `LaunchLibrary2SDK` instance in test mode.


### Instance Methods

#### `Agency(data?: object)`

Create a new `Agency` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AgencyEntity` instance.

#### `Astronaut(data?: object)`

Create a new `Astronaut` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AstronautEntity` instance.

#### `Docking(data?: object)`

Create a new `Docking` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DockingEntity` instance.

#### `DockingEvent(data?: object)`

Create a new `DockingEvent` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DockingEventEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `Expedition(data?: object)`

Create a new `Expedition` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ExpeditionEntity` instance.

#### `FirstStage(data?: object)`

Create a new `FirstStage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FirstStageEntity` instance.

#### `Launch(data?: object)`

Create a new `Launch` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LaunchEntity` instance.

#### `LaunchVehicle(data?: object)`

Create a new `LaunchVehicle` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LaunchVehicleEntity` instance.

#### `Launcher(data?: object)`

Create a new `Launcher` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LauncherEntity` instance.

#### `Location(data?: object)`

Create a new `Location` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocationEntity` instance.

#### `Pad(data?: object)`

Create a new `Pad` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PadEntity` instance.

#### `ReusableFirstStage(data?: object)`

Create a new `ReusableFirstStage` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReusableFirstStageEntity` instance.

#### `SpaceStation(data?: object)`

Create a new `SpaceStation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpaceStationEntity` instance.

#### `Spacecraft(data?: object)`

Create a new `Spacecraft` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SpacecraftEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `LaunchLibrary2SDK.test()`.

**Returns:** `LaunchLibrary2SDK` instance in test mode.


---

## AgencyEntity

```ts
const agency = client.agency
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.agency.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.agency.load({ id: 'agency_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AgencyEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## AstronautEntity

```ts
const astronaut = client.astronaut
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.astronaut.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.astronaut.load({ id: 'astronaut_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AstronautEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DockingEntity

```ts
const docking = client.docking
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DockingEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DockingEventEntity

```ts
const docking_event = client.docking_event
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.docking_event.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.docking_event.load({ id: 'docking_event_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DockingEventEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.event
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.event.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.event.load({ id: 'event_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ExpeditionEntity

```ts
const expedition = client.expedition
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.expedition.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.expedition.load({ id: 'expedition_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ExpeditionEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FirstStageEntity

```ts
const first_stage = client.first_stage
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.first_stage.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.first_stage.load({ id: 'first_stage_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FirstStageEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LaunchEntity

```ts
const launch = client.launch
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.launch.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.launch.load({ id: 'launch_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LaunchEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LaunchVehicleEntity

```ts
const launch_vehicle = client.launch_vehicle
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.launch_vehicle.list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LaunchVehicleEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LauncherEntity

```ts
const launcher = client.launcher
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

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.launcher.load({ id: 'launcher_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LauncherEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocationEntity

```ts
const location = client.location
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.location.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.location.load({ id: 'location_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PadEntity

```ts
const pad = client.pad
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.pad.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.pad.load({ id: 'pad_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PadEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReusableFirstStageEntity

```ts
const reusable_first_stage = client.reusable_first_stage
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReusableFirstStageEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpaceStationEntity

```ts
const space_station = client.space_station
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.space_station.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.space_station.load({ id: 'space_station_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpaceStationEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SpacecraftEntity

```ts
const spacecraft = client.spacecraft
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

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.spacecraft.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.spacecraft.load({ id: 'spacecraft_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SpacecraftEntity` instance with the same client and
options.

#### `client()`

Return the parent `LaunchLibrary2SDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new LaunchLibrary2SDK({
  feature: {
    test: { active: true },
  }
})
```

