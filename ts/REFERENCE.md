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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `number` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

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
| `bio` | `string` | No | Biographical information |
| `date_of_birth` | `string` | No | Date of birth |
| `date_of_death` | `string` | No | Date of death if applicable |
| `flights_count` | `number` | No | Number of flights |
| `id` | `number` | No | Astronaut ID |
| `name` | `string` | No | Name of the astronaut |
| `nationality` | `string` | No | Astronaut nationality |
| `profile_image` | `string` | No | URL to profile image |
| `spacewalks_count` | `number` | No | Number of spacewalks |
| `status` | `Record<string, any>` | No |  |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No | API URL for this astronaut |

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
| `departure` | `string` | No | Departure time |
| `docking` | `string` | No | Docking time |
| `docking_location` | `Record<string, any>` | No |  |
| `flight_vehicle` | `Record<string, any>` | No |  |
| `id` | `number` | No | Docking event ID |
| `url` | `string` | No | API URL for this docking event |

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
| `date` | `string` | No | Event date and time |
| `description` | `string` | No | Description of the event |
| `feature_image` | `string` | No | URL to feature image |
| `id` | `number` | No | Event ID |
| `location` | `string` | No | Event location |
| `name` | `string` | No | Name of the event |
| `news_url` | `string` | No | URL to news article |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No | API URL for this event |
| `video_url` | `string` | No | URL to video |

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
| `end` | `string` | No | End date of the expedition |
| `id` | `number` | No | Expedition ID |
| `name` | `string` | No | Name of the expedition |
| `spacestation` | `Record<string, any>` | No |  |
| `start` | `string` | No | Start date of the expedition |
| `url` | `string` | No | API URL for this expedition |

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
| `apogee` | `number` | No | Apogee in km |
| `consecutive_successful_launches` | `number` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `number` | No | Diameter in meters |
| `failed_launches` | `number` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `flights` | `number` | No | Number of flights |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `number` | No | GTO capacity in kg |
| `id` | `number` | No | Configuration ID |
| `launch_mass` | `number` | No | Launch mass in kg |
| `launcher_config` | `Record<string, any>` | No |  |
| `length` | `number` | No | Length in meters |
| `leo_capacity` | `number` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `Record<string, any>` | No |  |
| `max_stage` | `number` | No | Maximum number of stages |
| `min_stage` | `number` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `number` | No | Number of pending launches |
| `serial_number` | `string` | No | Serial number of the first stage |
| `status` | `string` | No | Current status |
| `successful_launches` | `number` | No | Number of successful launches |
| `to_thrust` | `number` | No | Takeoff thrust in kN |
| `type` | `string` | No | Type of first stage |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

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
| `id` | `string` | No | UUID of the launch |
| `image` | `string` | No | URL to launch image |
| `launch_service_provider` | `Record<string, any>` | No |  |
| `mission` | `Record<string, any>` | No |  |
| `name` | `string` | No | Name of the launch |
| `net` | `string` | No | Net Earliest Time (NET) for launch |
| `pad` | `Record<string, any>` | No |  |
| `probability` | `number` | No | Launch probability percentage |
| `rocket` | `Record<string, any>` | No |  |
| `status` | `Record<string, any>` | No |  |
| `url` | `string` | No | API URL for this launch |
| `webcast_live` | `boolean` | No | Whether the webcast is currently live |
| `window_end` | `string` | No | End of launch window |
| `window_start` | `string` | No | Start of launch window |

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
| `apogee` | `number` | No | Apogee in km |
| `consecutive_successful_launches` | `number` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `number` | No | Diameter in meters |
| `failed_launches` | `number` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `number` | No | GTO capacity in kg |
| `id` | `number` | No | Configuration ID |
| `launch_mass` | `number` | No | Launch mass in kg |
| `length` | `number` | No | Length in meters |
| `leo_capacity` | `number` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `Record<string, any>` | No |  |
| `max_stage` | `number` | No | Maximum number of stages |
| `min_stage` | `number` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `number` | No | Number of pending launches |
| `successful_launches` | `number` | No | Number of successful launches |
| `to_thrust` | `number` | No | Takeoff thrust in kN |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `number` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

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
| `country_code` | `string` | No | ISO country code |
| `id` | `number` | No | Location ID |
| `map_image` | `string` | No | URL to map image |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `number` | No | Total number of landings at this location |
| `total_launch_count` | `number` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |

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
| `agency_id` | `number` | No | ID of the agency that operates this pad |
| `country_code` | `string` | No | ISO country code |
| `id` | `number` | No | Location ID |
| `info_url` | `string` | No | URL to more information |
| `latitude` | `string` | No | Latitude coordinate |
| `location` | `Record<string, any>` | No |  |
| `longitude` | `string` | No | Longitude coordinate |
| `map_image` | `string` | No | URL to map image |
| `map_url` | `string` | No | URL to map |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `number` | No | Total number of landings at this location |
| `total_launch_count` | `number` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |
| `wiki_url` | `string` | No | Wikipedia URL |

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
| `deorbited` | `string` | No | Date the space station was deorbited |
| `description` | `string` | No | Description of the space station |
| `founded` | `string` | No | Date the space station was founded |
| `id` | `number` | No | Space station ID |
| `image_url` | `string` | No | URL to space station image |
| `name` | `string` | No | Name of the space station |
| `orbit` | `string` | No | Orbital information |
| `owners` | `any[]` | No |  |
| `status` | `Record<string, any>` | No |  |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No | API URL for this space station |

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
| `capability` | `string` | No | Spacecraft capability |
| `crew_capacity` | `number` | No | Crew capacity |
| `details` | `string` | No | Detailed information |
| `diameter` | `number` | No | Diameter in meters |
| `height` | `number` | No | Height in meters |
| `history` | `string` | No | Historical information |
| `human_rated` | `boolean` | No | Whether the spacecraft is human-rated |
| `id` | `number` | No | Spacecraft configuration ID |
| `image_url` | `string` | No | URL to spacecraft image |
| `in_use` | `boolean` | No | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `name` | `string` | No | Name of the spacecraft |
| `type` | `Record<string, any>` | No |  |
| `url` | `string` | No | API URL for this configuration |

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

