# LaunchLibrary2 PHP SDK



The PHP SDK for the LaunchLibrary2 API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Agency()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/launch-library2-sdk/releases](https://github.com/voxgig-sdk/launch-library2-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'launchlibrary2_sdk.php';

$client = new LaunchLibrary2SDK();
```

### 2. List agency records

```php
try {
    // list() returns an array of Agency records — iterate directly.
    $agencys = $client->Agency()->list();
    foreach ($agencys as $item) {
        echo $item["id"] . " " . $item["abbrev"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an agency

```php
try {
    // load() returns the bare Agency record (throws on error).
    $agency = $client->Agency()->load(["id" => "example_id"]);
    print_r($agency);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $agencys = $client->Agency()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = LaunchLibrary2SDK::test([
    "entity" => ["agency" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$agency = $client->Agency()->list();
print_r($agency);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new LaunchLibrary2SDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAUNCH_LIBRARY2_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### LaunchLibrary2SDK

```php
require_once 'launchlibrary2_sdk.php';
$client = new LaunchLibrary2SDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = LaunchLibrary2SDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### LaunchLibrary2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Agency` | `($data): AgencyEntity` | Create an Agency entity instance. |
| `Astronaut` | `($data): AstronautEntity` | Create an Astronaut entity instance. |
| `Docking` | `($data): DockingEntity` | Create a Docking entity instance. |
| `DockingEvent` | `($data): DockingEventEntity` | Create a DockingEvent entity instance. |
| `Event` | `($data): EventEntity` | Create an Event entity instance. |
| `Expedition` | `($data): ExpeditionEntity` | Create an Expedition entity instance. |
| `FirstStage` | `($data): FirstStageEntity` | Create a FirstStage entity instance. |
| `Launch` | `($data): LaunchEntity` | Create a Launch entity instance. |
| `LaunchVehicle` | `($data): LaunchVehicleEntity` | Create a LaunchVehicle entity instance. |
| `Launcher` | `($data): LauncherEntity` | Create a Launcher entity instance. |
| `Location` | `($data): LocationEntity` | Create a Location entity instance. |
| `Pad` | `($data): PadEntity` | Create a Pad entity instance. |
| `ReusableFirstStage` | `($data): ReusableFirstStageEntity` | Create a ReusableFirstStage entity instance. |
| `SpaceStation` | `($data): SpaceStationEntity` | Create a SpaceStation entity instance. |
| `Spacecraft` | `($data): SpacecraftEntity` | Create a Spacecraft entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Operations: List, Load.

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
| `departure` |  |
| `docking` |  |
| `docking_location` |  |
| `flight_vehicle` |  |
| `id` |  |
| `url` |  |

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List.

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

Operations: Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

API path: `/config/spacecraft`



## Entities


### Agency

Create an instance: `$agency = $client->Agency();`

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
| `id` | `int` |  |
| `logo_url` | `string` |  |
| `name` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Agency record (throws on error).
$agency = $client->Agency()->load(["id" => "agency_id"]);
```

#### Example: List

```php
// list() returns an array of Agency records (throws on error).
$agencys = $client->Agency()->list();
```


### Astronaut

Create an instance: `$astronaut = $client->Astronaut();`

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
| `flights_count` | `int` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `nationality` | `string` |  |
| `profile_image` | `string` |  |
| `spacewalks_count` | `int` |  |
| `status` | `array` |  |
| `type` | `array` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Astronaut record (throws on error).
$astronaut = $client->Astronaut()->load(["id" => "astronaut_id"]);
```

#### Example: List

```php
// list() returns an array of Astronaut records (throws on error).
$astronauts = $client->Astronaut()->list();
```


### Docking

Create an instance: `$docking = $client->Docking();`


### DockingEvent

Create an instance: `$docking_event = $client->DockingEvent();`

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
| `docking_location` | `array` |  |
| `flight_vehicle` | `array` |  |
| `id` | `int` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare DockingEvent record (throws on error).
$docking_event = $client->DockingEvent()->load(["id" => "docking_event_id"]);
```

#### Example: List

```php
// list() returns an array of DockingEvent records (throws on error).
$docking_events = $client->DockingEvent()->list();
```


### Event

Create an instance: `$event = $client->Event();`

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
| `id` | `int` |  |
| `location` | `string` |  |
| `name` | `string` |  |
| `news_url` | `string` |  |
| `type` | `array` |  |
| `url` | `string` |  |
| `video_url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Event record (throws on error).
$event = $client->Event()->load(["id" => "event_id"]);
```

#### Example: List

```php
// list() returns an array of Event records (throws on error).
$events = $client->Event()->list();
```


### Expedition

Create an instance: `$expedition = $client->Expedition();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `array` |  |
| `end` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `spacestation` | `array` |  |
| `start` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Expedition record (throws on error).
$expedition = $client->Expedition()->load(["id" => "expedition_id"]);
```

#### Example: List

```php
// list() returns an array of Expedition records (throws on error).
$expeditions = $client->Expedition()->list();
```


### FirstStage

Create an instance: `$first_stage = $client->FirstStage();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `flight` | `int` |  |
| `id` | `int` |  |
| `launcher_config` | `array` |  |
| `serial_number` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare FirstStage record (throws on error).
$first_stage = $client->FirstStage()->load(["id" => "first_stage_id"]);
```

#### Example: List

```php
// list() returns an array of FirstStage records (throws on error).
$first_stages = $client->FirstStage()->list();
```


### Launch

Create an instance: `$launch = $client->Launch();`

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
| `launch_service_provider` | `array` |  |
| `mission` | `array` |  |
| `name` | `string` |  |
| `net` | `string` |  |
| `pad` | `array` |  |
| `probability` | `int` |  |
| `rocket` | `array` |  |
| `status` | `array` |  |
| `url` | `string` |  |
| `webcast_live` | `bool` |  |
| `window_end` | `string` |  |
| `window_start` | `string` |  |

#### Example: Load

```php
// load() returns the bare Launch record (throws on error).
$launch = $client->Launch()->load(["id" => "launch_id"]);
```

#### Example: List

```php
// list() returns an array of Launch records (throws on error).
$launchs = $client->Launch()->list();
```


### LaunchVehicle

Create an instance: `$launch_vehicle = $client->LaunchVehicle();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `int` |  |
| `consecutive_successful_launch` | `int` |  |
| `description` | `string` |  |
| `diameter` | `float` |  |
| `failed_launch` | `int` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `int` |  |
| `id` | `int` |  |
| `launch_mass` | `int` |  |
| `length` | `float` |  |
| `leo_capacity` | `int` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `array` |  |
| `max_stage` | `int` |  |
| `min_stage` | `int` |  |
| `name` | `string` |  |
| `pending_launch` | `int` |  |
| `successful_launch` | `int` |  |
| `to_thrust` | `int` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

#### Example: List

```php
// list() returns an array of LaunchVehicle records (throws on error).
$launch_vehicles = $client->LaunchVehicle()->list();
```


### Launcher

Create an instance: `$launcher = $client->Launcher();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `int` |  |
| `consecutive_successful_launch` | `int` |  |
| `description` | `string` |  |
| `diameter` | `float` |  |
| `failed_launch` | `int` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `int` |  |
| `id` | `int` |  |
| `launch_mass` | `int` |  |
| `length` | `float` |  |
| `leo_capacity` | `int` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `array` |  |
| `max_stage` | `int` |  |
| `min_stage` | `int` |  |
| `name` | `string` |  |
| `pending_launch` | `int` |  |
| `successful_launch` | `int` |  |
| `to_thrust` | `int` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

#### Example: Load

```php
// load() returns the bare Launcher record (throws on error).
$launcher = $client->Launcher()->load(["id" => "launcher_id"]);
```


### Location

Create an instance: `$location = $client->Location();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `country_code` | `string` |  |
| `id` | `int` |  |
| `map_image` | `string` |  |
| `name` | `string` |  |
| `total_landing_count` | `int` |  |
| `total_launch_count` | `int` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Location record (throws on error).
$location = $client->Location()->load(["id" => "location_id"]);
```

#### Example: List

```php
// list() returns an array of Location records (throws on error).
$locations = $client->Location()->list();
```


### Pad

Create an instance: `$pad = $client->Pad();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency_id` | `int` |  |
| `id` | `int` |  |
| `info_url` | `string` |  |
| `latitude` | `string` |  |
| `location` | `array` |  |
| `longitude` | `string` |  |
| `map_image` | `string` |  |
| `map_url` | `string` |  |
| `name` | `string` |  |
| `total_launch_count` | `int` |  |
| `url` | `string` |  |
| `wiki_url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Pad record (throws on error).
$pad = $client->Pad()->load(["id" => "pad_id"]);
```

#### Example: List

```php
// list() returns an array of Pad records (throws on error).
$pads = $client->Pad()->list();
```


### ReusableFirstStage

Create an instance: `$reusable_first_stage = $client->ReusableFirstStage();`


### SpaceStation

Create an instance: `$space_station = $client->SpaceStation();`

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
| `id` | `int` |  |
| `image_url` | `string` |  |
| `name` | `string` |  |
| `orbit` | `string` |  |
| `owner` | `array` |  |
| `status` | `array` |  |
| `type` | `array` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare SpaceStation record (throws on error).
$space_station = $client->SpaceStation()->load(["id" => "space_station_id"]);
```

#### Example: List

```php
// list() returns an array of SpaceStation records (throws on error).
$space_stations = $client->SpaceStation()->list();
```


### Spacecraft

Create an instance: `$spacecraft = $client->Spacecraft();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `array` |  |
| `capability` | `string` |  |
| `crew_capacity` | `int` |  |
| `detail` | `string` |  |
| `diameter` | `float` |  |
| `height` | `float` |  |
| `history` | `string` |  |
| `human_rated` | `bool` |  |
| `id` | `int` |  |
| `image_url` | `string` |  |
| `in_use` | `bool` |  |
| `maiden_flight` | `string` |  |
| `name` | `string` |  |
| `type` | `array` |  |
| `url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Spacecraft record (throws on error).
$spacecraft = $client->Spacecraft()->load(["id" => "spacecraft_id"]);
```

#### Example: List

```php
// list() returns an array of Spacecraft records (throws on error).
$spacecrafts = $client->Spacecraft()->list();
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── launchlibrary2_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`launchlibrary2_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$agency = $client->Agency();
$agency->list();

// $agency->data_get() now returns the agency data from the last list
// $agency->match_get() returns the last match criteria
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
