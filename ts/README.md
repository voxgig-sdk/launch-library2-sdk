# LaunchLibrary2 TypeScript SDK



The TypeScript SDK for the LaunchLibrary2 API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Agency()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/launch-library2-sdk/releases](https://github.com/voxgig-sdk/launch-library2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { LaunchLibrary2SDK } from '@voxgig-sdk/launch-library2'

const client = new LaunchLibrary2SDK()
```

### 2. List agency records

`list()` resolves to an array of Agency objects — iterate it directly:

```ts
const agencys = await client.Agency().list()

for (const agency of agencys) {
  console.log(agency)
}
```

### 3. Load an agency

`load()` returns the entity directly and throws on failure:

```ts
try {
  const agency = await client.Agency().load({ id: 1 })
  console.log(agency)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const agencys = await client.Agency().list()
  console.log(agencys)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
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

if (result instanceof Error) {
  throw result
}
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

const agency = await client.Agency().list()
// agency is a bare entity populated with mock response data
console.log(agency)
```

You can also use the instance method:

```ts
const client = new LaunchLibrary2SDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Agency()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
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
LAUNCH_LIBRARY2_TEST_LIVE=TRUE
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
| `Agency(data?)` | `AgencyEntity` | Create an Agency entity instance. |
| `Astronaut(data?)` | `AstronautEntity` | Create an Astronaut entity instance. |
| `Docking(data?)` | `DockingEntity` | Create a Docking entity instance. |
| `DockingEvent(data?)` | `DockingEventEntity` | Create a DockingEvent entity instance. |
| `Event(data?)` | `EventEntity` | Create an Event entity instance. |
| `Expedition(data?)` | `ExpeditionEntity` | Create an Expedition entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): LaunchLibrary2SDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

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
| `abbrev` | `string` |  |
| `administrator` | `string` |  |
| `country_code` | `string` |  |
| `description` | `string` |  |
| `founding_year` | `string` |  |
| `id` | `number` |  |
| `logo_url` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const agency = await client.Agency().load({ id: 1 })
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
| `bio` | `string` |  |
| `date_of_birth` | `string` |  |
| `date_of_death` | `string` |  |
| `flights_count` | `number` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `nationality` | `string` |  |
| `profile_image` | `string` |  |
| `spacewalks_count` | `number` |  |
| `status` | `Record<string, any>` |  |
| `type` | `Record<string, any>` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const astronaut = await client.Astronaut().load({ id: 1 })
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
| `departure` | `string` |  |
| `docking` | `string` |  |
| `docking_location` | `Record<string, any>` |  |
| `flight_vehicle` | `Record<string, any>` |  |
| `id` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const docking_event = await client.DockingEvent().load({ id: 1 })
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
| `date` | `string` |  |
| `description` | `string` |  |
| `feature_image` | `string` |  |
| `id` | `number` |  |
| `location` | `string` |  |
| `name` | `string` |  |
| `news_url` | `string` |  |
| `type` | `Record<string, any>` |  |
| `url` | `string` |  |
| `video_url` | `string` |  |

#### Example: Load

```ts
const event = await client.Event().load({ id: 1 })
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
| `crew` | `any[]` |  |
| `end` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `spacestation` | `Record<string, any>` |  |
| `start` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const expedition = await client.Expedition().load({ id: 1 })
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
| `flight` | `number` |  |
| `id` | `number` |  |
| `launcher_config` | `Record<string, any>` |  |
| `serial_number` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const first_stage = await client.FirstStage().load({ id: 1 })
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
| `id` | `string` |  |
| `image` | `string` |  |
| `launch_service_provider` | `Record<string, any>` |  |
| `mission` | `Record<string, any>` |  |
| `name` | `string` |  |
| `net` | `string` |  |
| `pad` | `Record<string, any>` |  |
| `probability` | `number` |  |
| `rocket` | `Record<string, any>` |  |
| `status` | `Record<string, any>` |  |
| `url` | `string` |  |
| `webcast_live` | `boolean` |  |
| `window_end` | `string` |  |
| `window_start` | `string` |  |

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
| `apogee` | `number` |  |
| `consecutive_successful_launch` | `number` |  |
| `description` | `string` |  |
| `diameter` | `number` |  |
| `failed_launch` | `number` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `number` |  |
| `id` | `number` |  |
| `launch_mass` | `number` |  |
| `length` | `number` |  |
| `leo_capacity` | `number` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `Record<string, any>` |  |
| `max_stage` | `number` |  |
| `min_stage` | `number` |  |
| `name` | `string` |  |
| `pending_launch` | `number` |  |
| `successful_launch` | `number` |  |
| `to_thrust` | `number` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

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
| `apogee` | `number` |  |
| `consecutive_successful_launch` | `number` |  |
| `description` | `string` |  |
| `diameter` | `number` |  |
| `failed_launch` | `number` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `number` |  |
| `id` | `number` |  |
| `launch_mass` | `number` |  |
| `length` | `number` |  |
| `leo_capacity` | `number` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `Record<string, any>` |  |
| `max_stage` | `number` |  |
| `min_stage` | `number` |  |
| `name` | `string` |  |
| `pending_launch` | `number` |  |
| `successful_launch` | `number` |  |
| `to_thrust` | `number` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

#### Example: Load

```ts
const launcher = await client.Launcher().load({ id: 1 })
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
| `country_code` | `string` |  |
| `id` | `number` |  |
| `map_image` | `string` |  |
| `name` | `string` |  |
| `total_landing_count` | `number` |  |
| `total_launch_count` | `number` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const location = await client.Location().load({ id: 1 })
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
| `agency_id` | `number` |  |
| `id` | `number` |  |
| `info_url` | `string` |  |
| `latitude` | `string` |  |
| `location` | `Record<string, any>` |  |
| `longitude` | `string` |  |
| `map_image` | `string` |  |
| `map_url` | `string` |  |
| `name` | `string` |  |
| `total_launch_count` | `number` |  |
| `url` | `string` |  |
| `wiki_url` | `string` |  |

#### Example: Load

```ts
const pad = await client.Pad().load({ id: 1 })
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
| `deorbited` | `string` |  |
| `description` | `string` |  |
| `founded` | `string` |  |
| `id` | `number` |  |
| `image_url` | `string` |  |
| `name` | `string` |  |
| `orbit` | `string` |  |
| `owner` | `any[]` |  |
| `status` | `Record<string, any>` |  |
| `type` | `Record<string, any>` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const space_station = await client.SpaceStation().load({ id: 1 })
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
| `agency` | `Record<string, any>` |  |
| `capability` | `string` |  |
| `crew_capacity` | `number` |  |
| `detail` | `string` |  |
| `diameter` | `number` |  |
| `height` | `number` |  |
| `history` | `string` |  |
| `human_rated` | `boolean` |  |
| `id` | `number` |  |
| `image_url` | `string` |  |
| `in_use` | `boolean` |  |
| `maiden_flight` | `string` |  |
| `name` | `string` |  |
| `type` | `Record<string, any>` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const spacecraft = await client.Spacecraft().load({ id: 1 })
```

#### Example: List

```ts
const spacecrafts = await client.Spacecraft().list()
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
import { LaunchLibrary2SDK } from '@voxgig-sdk/launch-library2'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const agency = client.Agency()
await agency.list()

// agency.data() now returns the agency data from the last `list`
// agency.match() returns the last match criteria
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
