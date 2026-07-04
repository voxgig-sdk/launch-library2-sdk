# LaunchLibrary2 PHP SDK



The PHP SDK for the LaunchLibrary2 API — an entity-oriented client using PHP conventions.

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
        echo $item["id"] . " " . $item["name"] . "\n";
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
    echo "Error: " . $result["err"]->getMessage();
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

// load() returns the bare mock record (throws on error).
$agency = $client->Agency()->load(["id" => "test01"]);
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
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
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
| `departure` | ``$STRING`` |  |
| `docking` | ``$STRING`` |  |
| `docking_location` | ``$OBJECT`` |  |
| `flight_vehicle` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |

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
| `crew` | ``$ARRAY`` |  |
| `end` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `spacestation` | ``$OBJECT`` |  |
| `start` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

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
| `flight` | ``$INTEGER`` |  |
| `id` | ``$INTEGER`` |  |
| `launcher_config` | ``$OBJECT`` |  |
| `serial_number` | ``$STRING`` |  |
| `status` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

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
| `country_code` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `map_image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `total_landing_count` | ``$INTEGER`` |  |
| `total_launch_count` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |

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

```php
// load() returns the bare Spacecraft record (throws on error).
$spacecraft = $client->Spacecraft()->load(["id" => "spacecraft_id"]);
```

#### Example: List

```php
// list() returns an array of Spacecraft records (throws on error).
$spacecrafts = $client->Spacecraft()->list();
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
error is returned to the caller as the second element in the return array.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$agency = $client->Agency();
$agency->load(["id" => "example_id"]);

// $agency->dataGet() now returns the loaded agency data
// $agency->matchGet() returns the last match criteria
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
