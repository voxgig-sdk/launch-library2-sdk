# LaunchLibrary2 TypeScript SDK

The TypeScript SDK for the LaunchLibrary2 API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install launch-library2
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LaunchLibrary2SDK } from 'launch-library2'

const client = new LaunchLibrary2SDK({})
```

### 2. List agencys

```ts
const result = await client.Agency().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a agency

```ts
const result = await client.Agency().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = LaunchLibrary2SDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new LaunchLibrary2SDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new LaunchLibrary2SDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAUNCH-LIBRARY2_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### LaunchLibrary2SDK

#### Constructor

```ts
new LaunchLibrary2SDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Agency(data?)` | `AgencyEntity` | Create a Agency entity instance. |
| `Astronaut(data?)` | `AstronautEntity` | Create a Astronaut entity instance. |
| `Docking(data?)` | `DockingEntity` | Create a Docking entity instance. |
| `DockingEvent(data?)` | `DockingEventEntity` | Create a DockingEvent entity instance. |
| `Event(data?)` | `EventEntity` | Create a Event entity instance. |
| `Expedition(data?)` | `ExpeditionEntity` | Create a Expedition entity instance. |
| `FirstStage(data?)` | `FirstStageEntity` | Create a FirstStage entity instance. |
| `Launch(data?)` | `LaunchEntity` | Create a Launch entity instance. |
| `LaunchVehicle(data?)` | `LaunchVehicleEntity` | Create a LaunchVehicle entity instance. |
| `Launcher(data?)` | `LauncherEntity` | Create a Launcher entity instance. |
| `Location(data?)` | `LocationEntity` | Create a Location entity instance. |
| `Pad(data?)` | `PadEntity` | Create a Pad entity instance. |
| `ReusableFirstStage(data?)` | `ReusableFirstStageEntity` | Create a ReusableFirstStage entity instance. |
| `SpaceStation(data?)` | `SpaceStationEntity` | Create a SpaceStation entity instance. |
| `Spacecraft(data?)` | `SpacecraftEntity` | Create a Spacecraft entity instance. |
| `tester(testopts?, sdkopts?)` | `LaunchLibrary2SDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `LaunchLibrary2SDK.test(testopts?, sdkopts?)` | `LaunchLibrary2SDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LaunchLibrary2SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list.

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

Operations: load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
launch-library2/
├── src/
│   ├── LaunchLibrary2SDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { LaunchLibrary2SDK } from 'launch-library2'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
