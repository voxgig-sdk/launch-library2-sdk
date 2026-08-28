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
    // load() returns the ENTITY — call data_get() for the Agency record (throws on error).
    $agency = $client->Agency()->load(["id" => 1]);
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
    $astronauts = $client->Astronaut()->list();
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
    "entity" => ["astronaut" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$astronaut = $client->Astronaut()->list();
print_r($astronaut);
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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

Operations: List, Load.

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
| `departure` | Departure time |
| `docking` | Docking time |
| `docking_location` |  |
| `flight_vehicle` |  |
| `id` | Docking event ID |
| `url` | API URL for this docking event |

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List, Load.

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

Operations: List.

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

Operations: Load.

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

Operations: List, Load.

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

Operations: List, Load.

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
| `abbrev` | `string` | Agency abbreviation |
| `administrator` | `string` | Agency administrator |
| `country_code` | `string` | ISO country code |
| `description` | `string` | Agency description |
| `founding_year` | `string` | Year agency was founded |
| `id` | `int` | Agency ID |
| `logo_url` | `string` | URL to agency logo |
| `name` | `string` | Name of the agency |
| `type` | `string` | Type of agency |
| `url` | `string` | API URL for this agency |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Agency record (throws on error).
$agency = $client->Agency()->load(["id" => 1]);
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
| `bio` | `string` | Biographical information |
| `date_of_birth` | `string` | Date of birth |
| `date_of_death` | `string` | Date of death if applicable |
| `flights_count` | `int` | Number of flights |
| `id` | `int` | Astronaut ID |
| `name` | `string` | Name of the astronaut |
| `nationality` | `string` | Astronaut nationality |
| `profile_image` | `string` | URL to profile image |
| `spacewalks_count` | `int` | Number of spacewalks |
| `status` | `array` |  |
| `type` | `array` |  |
| `url` | `string` | API URL for this astronaut |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Astronaut record (throws on error).
$astronaut = $client->Astronaut()->load(["id" => 1]);
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
| `departure` | `string` | Departure time |
| `docking` | `string` | Docking time |
| `docking_location` | `array` |  |
| `flight_vehicle` | `array` |  |
| `id` | `int` | Docking event ID |
| `url` | `string` | API URL for this docking event |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the DockingEvent record (throws on error).
$docking_event = $client->DockingEvent()->load(["id" => 1]);
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
| `date` | `string` | Event date and time |
| `description` | `string` | Description of the event |
| `feature_image` | `string` | URL to feature image |
| `id` | `int` | Event ID |
| `location` | `string` | Event location |
| `name` | `string` | Name of the event |
| `news_url` | `string` | URL to news article |
| `type` | `array` |  |
| `url` | `string` | API URL for this event |
| `video_url` | `string` | URL to video |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Event record (throws on error).
$event = $client->Event()->load(["id" => 1]);
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
| `end` | `string` | End date of the expedition |
| `id` | `int` | Expedition ID |
| `name` | `string` | Name of the expedition |
| `spacestation` | `array` |  |
| `start` | `string` | Start date of the expedition |
| `url` | `string` | API URL for this expedition |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Expedition record (throws on error).
$expedition = $client->Expedition()->load(["id" => 1]);
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
| `apogee` | `int` | Apogee in km |
| `consecutive_successful_launches` | `int` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `float` | Diameter in meters |
| `failed_launches` | `int` | Number of failed launches |
| `family` | `string` | Launcher family |
| `flights` | `int` | Number of flights |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `int` | GTO capacity in kg |
| `id` | `int` | Configuration ID |
| `launch_mass` | `int` | Launch mass in kg |
| `launcher_config` | `array` |  |
| `length` | `float` | Length in meters |
| `leo_capacity` | `int` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `array` |  |
| `max_stage` | `int` | Maximum number of stages |
| `min_stage` | `int` | Minimum number of stages |
| `name` | `string` | Name of the launcher configuration |
| `pending_launches` | `int` | Number of pending launches |
| `serial_number` | `string` | Serial number of the first stage |
| `status` | `string` | Current status |
| `successful_launches` | `int` | Number of successful launches |
| `to_thrust` | `int` | Takeoff thrust in kN |
| `type` | `string` | Type of first stage |
| `url` | `string` | API URL for this configuration |
| `variant` | `string` | Variant of the launcher |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the FirstStage record (throws on error).
$first_stage = $client->FirstStage()->load(["id" => 1]);
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
| `id` | `string` | UUID of the launch |
| `image` | `string` | URL to launch image |
| `launch_service_provider` | `array` |  |
| `mission` | `array` |  |
| `name` | `string` | Name of the launch |
| `net` | `string` | Net Earliest Time (NET) for launch |
| `pad` | `array` |  |
| `probability` | `int` | Launch probability percentage |
| `rocket` | `array` |  |
| `status` | `array` |  |
| `url` | `string` | API URL for this launch |
| `webcast_live` | `bool` | Whether the webcast is currently live |
| `window_end` | `string` | End of launch window |
| `window_start` | `string` | Start of launch window |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Launch record (throws on error).
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
| `apogee` | `int` | Apogee in km |
| `consecutive_successful_launches` | `int` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `float` | Diameter in meters |
| `failed_launches` | `int` | Number of failed launches |
| `family` | `string` | Launcher family |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `int` | GTO capacity in kg |
| `id` | `int` | Configuration ID |
| `launch_mass` | `int` | Launch mass in kg |
| `length` | `float` | Length in meters |
| `leo_capacity` | `int` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `array` |  |
| `max_stage` | `int` | Maximum number of stages |
| `min_stage` | `int` | Minimum number of stages |
| `name` | `string` | Name of the launcher configuration |
| `pending_launches` | `int` | Number of pending launches |
| `successful_launches` | `int` | Number of successful launches |
| `to_thrust` | `int` | Takeoff thrust in kN |
| `url` | `string` | API URL for this configuration |
| `variant` | `string` | Variant of the launcher |

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
| `abbrev` | `string` | Agency abbreviation |
| `administrator` | `string` | Agency administrator |
| `country_code` | `string` | ISO country code |
| `description` | `string` | Agency description |
| `founding_year` | `string` | Year agency was founded |
| `id` | `int` | Agency ID |
| `logo_url` | `string` | URL to agency logo |
| `name` | `string` | Name of the agency |
| `type` | `string` | Type of agency |
| `url` | `string` | API URL for this agency |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Launcher record (throws on error).
$launcher = $client->Launcher()->load(["id" => 1]);
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
| `country_code` | `string` | ISO country code |
| `id` | `int` | Location ID |
| `map_image` | `string` | URL to map image |
| `name` | `string` | Name of the location |
| `total_landing_count` | `int` | Total number of landings at this location |
| `total_launch_count` | `int` | Total number of launches from this location |
| `url` | `string` | API URL for this location |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Location record (throws on error).
$location = $client->Location()->load(["id" => 1]);
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
| `agency_id` | `int` | ID of the agency that operates this pad |
| `country_code` | `string` | ISO country code |
| `id` | `int` | Location ID |
| `info_url` | `string` | URL to more information |
| `latitude` | `string` | Latitude coordinate |
| `location` | `array` |  |
| `longitude` | `string` | Longitude coordinate |
| `map_image` | `string` | URL to map image |
| `map_url` | `string` | URL to map |
| `name` | `string` | Name of the location |
| `total_landing_count` | `int` | Total number of landings at this location |
| `total_launch_count` | `int` | Total number of launches from this location |
| `url` | `string` | API URL for this location |
| `wiki_url` | `string` | Wikipedia URL |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Pad record (throws on error).
$pad = $client->Pad()->load(["id" => 1]);
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
| `deorbited` | `string` | Date the space station was deorbited |
| `description` | `string` | Description of the space station |
| `founded` | `string` | Date the space station was founded |
| `id` | `int` | Space station ID |
| `image_url` | `string` | URL to space station image |
| `name` | `string` | Name of the space station |
| `orbit` | `string` | Orbital information |
| `owners` | `array` |  |
| `status` | `array` |  |
| `type` | `array` |  |
| `url` | `string` | API URL for this space station |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the SpaceStation record (throws on error).
$space_station = $client->SpaceStation()->load(["id" => 1]);
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
| `capability` | `string` | Spacecraft capability |
| `crew_capacity` | `int` | Crew capacity |
| `details` | `string` | Detailed information |
| `diameter` | `float` | Diameter in meters |
| `height` | `float` | Height in meters |
| `history` | `string` | Historical information |
| `human_rated` | `bool` | Whether the spacecraft is human-rated |
| `id` | `int` | Spacecraft configuration ID |
| `image_url` | `string` | URL to spacecraft image |
| `in_use` | `bool` | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | Date of maiden flight |
| `name` | `string` | Name of the spacecraft |
| `type` | `array` |  |
| `url` | `string` | API URL for this configuration |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Spacecraft record (throws on error).
$spacecraft = $client->Spacecraft()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Spacecraft records (throws on error).
$spacecrafts = $client->Spacecraft()->list();
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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
$astronaut = $client->Astronaut();
$astronaut->list();

// $astronaut->data_get() now returns the astronaut data from the last list
// $astronaut->match_get() returns the last match criteria
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
