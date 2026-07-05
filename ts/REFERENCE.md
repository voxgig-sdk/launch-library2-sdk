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
const agency = client.Agency()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `string` | No |  |
| `administrator` | `string` | No |  |
| `country_code` | `string` | No |  |
| `description` | `string` | No |  |
| `founding_year` | `string` | No |  |
| `id` | `number` | No |  |
| `logo_url` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Agency().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Agency().load({ id: 1 })
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
const astronaut = client.Astronaut()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `date_of_birth` | `string` | No |  |
| `date_of_death` | `string` | No |  |
| `flights_count` | `number` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `profile_image` | `string` | No |  |
| `spacewalks_count` | `number` | No |  |
| `status` | `Record<string, any>` | No |  |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Astronaut().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Astronaut().load({ id: 1 })
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
const docking = client.Docking()
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
const docking_event = client.DockingEvent()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `string` | No |  |
| `docking` | `string` | No |  |
| `docking_location` | `Record<string, any>` | No |  |
| `flight_vehicle` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DockingEvent().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.DockingEvent().load({ id: 1 })
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
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `description` | `string` | No |  |
| `feature_image` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `string` | No |  |
| `name` | `string` | No |  |
| `news_url` | `string` | No |  |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |
| `video_url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Event().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Event().load({ id: 1 })
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
const expedition = client.Expedition()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `any[]` | No |  |
| `end` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `spacestation` | `Record<string, any>` | No |  |
| `start` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Expedition().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Expedition().load({ id: 1 })
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
const first_stage = client.FirstStage()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `flight` | `number` | No |  |
| `id` | `number` | No |  |
| `launcher_config` | `Record<string, any>` | No |  |
| `serial_number` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.FirstStage().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.FirstStage().load({ id: 1 })
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
const launch = client.Launch()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launch_service_provider` | `Record<string, any>` | No |  |
| `mission` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `net` | `string` | No |  |
| `pad` | `Record<string, any>` | No |  |
| `probability` | `number` | No |  |
| `rocket` | `Record<string, any>` | No |  |
| `status` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |
| `webcast_live` | `boolean` | No |  |
| `window_end` | `string` | No |  |
| `window_start` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Launch().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Launch().load({ id: 'launch_id' })
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
const launch_vehicle = client.LaunchVehicle()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `number` | No |  |
| `consecutive_successful_launch` | `number` | No |  |
| `description` | `string` | No |  |
| `diameter` | `number` | No |  |
| `failed_launch` | `number` | No |  |
| `family` | `string` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `number` | No |  |
| `id` | `number` | No |  |
| `launch_mass` | `number` | No |  |
| `length` | `number` | No |  |
| `leo_capacity` | `number` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `Record<string, any>` | No |  |
| `max_stage` | `number` | No |  |
| `min_stage` | `number` | No |  |
| `name` | `string` | No |  |
| `pending_launch` | `number` | No |  |
| `successful_launch` | `number` | No |  |
| `to_thrust` | `number` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LaunchVehicle().list()
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
const launcher = client.Launcher()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `number` | No |  |
| `consecutive_successful_launch` | `number` | No |  |
| `description` | `string` | No |  |
| `diameter` | `number` | No |  |
| `failed_launch` | `number` | No |  |
| `family` | `string` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `number` | No |  |
| `id` | `number` | No |  |
| `launch_mass` | `number` | No |  |
| `length` | `number` | No |  |
| `leo_capacity` | `number` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `Record<string, any>` | No |  |
| `max_stage` | `number` | No |  |
| `min_stage` | `number` | No |  |
| `name` | `string` | No |  |
| `pending_launch` | `number` | No |  |
| `successful_launch` | `number` | No |  |
| `to_thrust` | `number` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Launcher().load({ id: 1 })
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
const location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `id` | `number` | No |  |
| `map_image` | `string` | No |  |
| `name` | `string` | No |  |
| `total_landing_count` | `number` | No |  |
| `total_launch_count` | `number` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Location().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Location().load({ id: 1 })
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
const pad = client.Pad()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency_id` | `number` | No |  |
| `id` | `number` | No |  |
| `info_url` | `string` | No |  |
| `latitude` | `string` | No |  |
| `location` | `Record<string, any>` | No |  |
| `longitude` | `string` | No |  |
| `map_image` | `string` | No |  |
| `map_url` | `string` | No |  |
| `name` | `string` | No |  |
| `total_launch_count` | `number` | No |  |
| `url` | `string` | No |  |
| `wiki_url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Pad().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Pad().load({ id: 1 })
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
const reusable_first_stage = client.ReusableFirstStage()
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
const space_station = client.SpaceStation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deorbited` | `string` | No |  |
| `description` | `string` | No |  |
| `founded` | `string` | No |  |
| `id` | `number` | No |  |
| `image_url` | `string` | No |  |
| `name` | `string` | No |  |
| `orbit` | `string` | No |  |
| `owner` | `any[]` | No |  |
| `status` | `Record<string, any>` | No |  |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.SpaceStation().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.SpaceStation().load({ id: 1 })
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
const spacecraft = client.Spacecraft()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `Record<string, any>` | No |  |
| `capability` | `string` | No |  |
| `crew_capacity` | `number` | No |  |
| `detail` | `string` | No |  |
| `diameter` | `number` | No |  |
| `height` | `number` | No |  |
| `history` | `string` | No |  |
| `human_rated` | `boolean` | No |  |
| `id` | `number` | No |  |
| `image_url` | `string` | No |  |
| `in_use` | `boolean` | No |  |
| `maiden_flight` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Spacecraft().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Spacecraft().load({ id: 1 })
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

