# LaunchLibrary2 TypeScript SDK



The TypeScript SDK for the LaunchLibrary2 API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Agency()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
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

`list()` resolves to an array of Agency ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

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
  const astronauts = await client.Astronaut().list()
  console.log(astronauts)
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

const astronaut = await client.Astronaut().list()
// astronaut is the entity, populated with mock response data
// — call astronaut.data() for the record itself
console.log(astronaut)
```

You can also use the instance method:

```ts
const client = new LaunchLibrary2SDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Astronaut()

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

Operations: list, load.

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
| `departure` | Departure time |
| `docking` | Docking time |
| `docking_location` |  |
| `flight_vehicle` |  |
| `id` | Docking event ID |
| `url` | API URL for this docking event |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

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

Operations: list.

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

Operations: load.

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

Operations: list, load.

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

Operations: list, load.

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
| `abbrev` | `string` | Agency abbreviation |
| `administrator` | `string` | Agency administrator |
| `country_code` | `string` | ISO country code |
| `description` | `string` | Agency description |
| `founding_year` | `string` | Year agency was founded |
| `id` | `number` | Agency ID |
| `logo_url` | `string` | URL to agency logo |
| `name` | `string` | Name of the agency |
| `type` | `string` | Type of agency |
| `url` | `string` | API URL for this agency |

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
| `bio` | `string` | Biographical information |
| `date_of_birth` | `string` | Date of birth |
| `date_of_death` | `string` | Date of death if applicable |
| `flights_count` | `number` | Number of flights |
| `id` | `number` | Astronaut ID |
| `name` | `string` | Name of the astronaut |
| `nationality` | `string` | Astronaut nationality |
| `profile_image` | `string` | URL to profile image |
| `spacewalks_count` | `number` | Number of spacewalks |
| `status` | `Record<string, any>` |  |
| `type` | `Record<string, any>` |  |
| `url` | `string` | API URL for this astronaut |

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
| `departure` | `string` | Departure time |
| `docking` | `string` | Docking time |
| `docking_location` | `Record<string, any>` |  |
| `flight_vehicle` | `Record<string, any>` |  |
| `id` | `number` | Docking event ID |
| `url` | `string` | API URL for this docking event |

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
| `date` | `string` | Event date and time |
| `description` | `string` | Description of the event |
| `feature_image` | `string` | URL to feature image |
| `id` | `number` | Event ID |
| `location` | `string` | Event location |
| `name` | `string` | Name of the event |
| `news_url` | `string` | URL to news article |
| `type` | `Record<string, any>` |  |
| `url` | `string` | API URL for this event |
| `video_url` | `string` | URL to video |

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
| `end` | `string` | End date of the expedition |
| `id` | `number` | Expedition ID |
| `name` | `string` | Name of the expedition |
| `spacestation` | `Record<string, any>` |  |
| `start` | `string` | Start date of the expedition |
| `url` | `string` | API URL for this expedition |

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
| `apogee` | `number` | Apogee in km |
| `consecutive_successful_launches` | `number` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `number` | Diameter in meters |
| `failed_launches` | `number` | Number of failed launches |
| `family` | `string` | Launcher family |
| `flights` | `number` | Number of flights |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `number` | GTO capacity in kg |
| `id` | `number` | Configuration ID |
| `launch_mass` | `number` | Launch mass in kg |
| `launcher_config` | `Record<string, any>` |  |
| `length` | `number` | Length in meters |
| `leo_capacity` | `number` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `Record<string, any>` |  |
| `max_stage` | `number` | Maximum number of stages |
| `min_stage` | `number` | Minimum number of stages |
| `name` | `string` | Name of the launcher configuration |
| `pending_launches` | `number` | Number of pending launches |
| `serial_number` | `string` | Serial number of the first stage |
| `status` | `string` | Current status |
| `successful_launches` | `number` | Number of successful launches |
| `to_thrust` | `number` | Takeoff thrust in kN |
| `type` | `string` | Type of first stage |
| `url` | `string` | API URL for this configuration |
| `variant` | `string` | Variant of the launcher |

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
| `id` | `string` | UUID of the launch |
| `image` | `string` | URL to launch image |
| `launch_service_provider` | `Record<string, any>` |  |
| `mission` | `Record<string, any>` |  |
| `name` | `string` | Name of the launch |
| `net` | `string` | Net Earliest Time (NET) for launch |
| `pad` | `Record<string, any>` |  |
| `probability` | `number` | Launch probability percentage |
| `rocket` | `Record<string, any>` |  |
| `status` | `Record<string, any>` |  |
| `url` | `string` | API URL for this launch |
| `webcast_live` | `boolean` | Whether the webcast is currently live |
| `window_end` | `string` | End of launch window |
| `window_start` | `string` | Start of launch window |

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
| `apogee` | `number` | Apogee in km |
| `consecutive_successful_launches` | `number` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `number` | Diameter in meters |
| `failed_launches` | `number` | Number of failed launches |
| `family` | `string` | Launcher family |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `number` | GTO capacity in kg |
| `id` | `number` | Configuration ID |
| `launch_mass` | `number` | Launch mass in kg |
| `length` | `number` | Length in meters |
| `leo_capacity` | `number` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `Record<string, any>` |  |
| `max_stage` | `number` | Maximum number of stages |
| `min_stage` | `number` | Minimum number of stages |
| `name` | `string` | Name of the launcher configuration |
| `pending_launches` | `number` | Number of pending launches |
| `successful_launches` | `number` | Number of successful launches |
| `to_thrust` | `number` | Takeoff thrust in kN |
| `url` | `string` | API URL for this configuration |
| `variant` | `string` | Variant of the launcher |

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
| `abbrev` | `string` | Agency abbreviation |
| `administrator` | `string` | Agency administrator |
| `country_code` | `string` | ISO country code |
| `description` | `string` | Agency description |
| `founding_year` | `string` | Year agency was founded |
| `id` | `number` | Agency ID |
| `logo_url` | `string` | URL to agency logo |
| `name` | `string` | Name of the agency |
| `type` | `string` | Type of agency |
| `url` | `string` | API URL for this agency |

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
| `country_code` | `string` | ISO country code |
| `id` | `number` | Location ID |
| `map_image` | `string` | URL to map image |
| `name` | `string` | Name of the location |
| `total_landing_count` | `number` | Total number of landings at this location |
| `total_launch_count` | `number` | Total number of launches from this location |
| `url` | `string` | API URL for this location |

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
| `agency_id` | `number` | ID of the agency that operates this pad |
| `country_code` | `string` | ISO country code |
| `id` | `number` | Location ID |
| `info_url` | `string` | URL to more information |
| `latitude` | `string` | Latitude coordinate |
| `location` | `Record<string, any>` |  |
| `longitude` | `string` | Longitude coordinate |
| `map_image` | `string` | URL to map image |
| `map_url` | `string` | URL to map |
| `name` | `string` | Name of the location |
| `total_landing_count` | `number` | Total number of landings at this location |
| `total_launch_count` | `number` | Total number of launches from this location |
| `url` | `string` | API URL for this location |
| `wiki_url` | `string` | Wikipedia URL |

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
| `deorbited` | `string` | Date the space station was deorbited |
| `description` | `string` | Description of the space station |
| `founded` | `string` | Date the space station was founded |
| `id` | `number` | Space station ID |
| `image_url` | `string` | URL to space station image |
| `name` | `string` | Name of the space station |
| `orbit` | `string` | Orbital information |
| `owners` | `any[]` |  |
| `status` | `Record<string, any>` |  |
| `type` | `Record<string, any>` |  |
| `url` | `string` | API URL for this space station |

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
| `capability` | `string` | Spacecraft capability |
| `crew_capacity` | `number` | Crew capacity |
| `details` | `string` | Detailed information |
| `diameter` | `number` | Diameter in meters |
| `height` | `number` | Height in meters |
| `history` | `string` | Historical information |
| `human_rated` | `boolean` | Whether the spacecraft is human-rated |
| `id` | `number` | Spacecraft configuration ID |
| `image_url` | `string` | URL to spacecraft image |
| `in_use` | `boolean` | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | Date of maiden flight |
| `name` | `string` | Name of the spacecraft |
| `type` | `Record<string, any>` |  |
| `url` | `string` | API URL for this configuration |

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
const astronaut = client.Astronaut()
await astronaut.list()

// astronaut.data() now returns the astronaut data from the last `list`
// astronaut.match() returns the last match criteria
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
