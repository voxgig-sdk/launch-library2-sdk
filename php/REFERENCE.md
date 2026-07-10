# LaunchLibrary2 PHP SDK Reference

Complete API reference for the LaunchLibrary2 PHP SDK.


## LaunchLibrary2SDK

### Constructor

```php
require_once __DIR__ . '/launchlibrary2_sdk.php';

$client = new LaunchLibrary2SDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `LaunchLibrary2SDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = LaunchLibrary2SDK::test();
```


### Instance Methods

#### `Agency($data = null)`

Create a new `AgencyEntity` instance. Pass `null` for no initial data.

#### `Astronaut($data = null)`

Create a new `AstronautEntity` instance. Pass `null` for no initial data.

#### `Docking($data = null)`

Create a new `DockingEntity` instance. Pass `null` for no initial data.

#### `DockingEvent($data = null)`

Create a new `DockingEventEntity` instance. Pass `null` for no initial data.

#### `Event($data = null)`

Create a new `EventEntity` instance. Pass `null` for no initial data.

#### `Expedition($data = null)`

Create a new `ExpeditionEntity` instance. Pass `null` for no initial data.

#### `FirstStage($data = null)`

Create a new `FirstStageEntity` instance. Pass `null` for no initial data.

#### `Launch($data = null)`

Create a new `LaunchEntity` instance. Pass `null` for no initial data.

#### `LaunchVehicle($data = null)`

Create a new `LaunchVehicleEntity` instance. Pass `null` for no initial data.

#### `Launcher($data = null)`

Create a new `LauncherEntity` instance. Pass `null` for no initial data.

#### `Location($data = null)`

Create a new `LocationEntity` instance. Pass `null` for no initial data.

#### `Pad($data = null)`

Create a new `PadEntity` instance. Pass `null` for no initial data.

#### `ReusableFirstStage($data = null)`

Create a new `ReusableFirstStageEntity` instance. Pass `null` for no initial data.

#### `SpaceStation($data = null)`

Create a new `SpaceStationEntity` instance. Pass `null` for no initial data.

#### `Spacecraft($data = null)`

Create a new `SpacecraftEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): LaunchLibrary2Utility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AgencyEntity

```php
$agency = $client->Agency();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `abbrev` | `string` | No |  |
| `administrator` | `string` | No |  |
| `country_code` | `string` | No |  |
| `description` | `string` | No |  |
| `founding_year` | `string` | No |  |
| `id` | `int` | No |  |
| `logo_url` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Agency()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Agency()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AgencyEntity`

Create a new `AgencyEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## AstronautEntity

```php
$astronaut = $client->Astronaut();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No |  |
| `date_of_birth` | `string` | No |  |
| `date_of_death` | `string` | No |  |
| `flights_count` | `int` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `nationality` | `string` | No |  |
| `profile_image` | `string` | No |  |
| `spacewalks_count` | `int` | No |  |
| `status` | `array` | No |  |
| `type` | `array` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Astronaut()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Astronaut()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AstronautEntity`

Create a new `AstronautEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DockingEntity

```php
$docking = $client->Docking();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DockingEntity`

Create a new `DockingEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DockingEventEntity

```php
$docking_event = $client->DockingEvent();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `departure` | `string` | No |  |
| `docking` | `string` | No |  |
| `docking_location` | `array` | No |  |
| `flight_vehicle` | `array` | No |  |
| `id` | `int` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->DockingEvent()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->DockingEvent()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DockingEventEntity`

Create a new `DockingEventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `date` | `string` | No |  |
| `description` | `string` | No |  |
| `feature_image` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `string` | No |  |
| `name` | `string` | No |  |
| `news_url` | `string` | No |  |
| `type` | `array` | No |  |
| `url` | `string` | No |  |
| `video_url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Event()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Event()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ExpeditionEntity

```php
$expedition = $client->Expedition();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `array` | No |  |
| `end` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `spacestation` | `array` | No |  |
| `start` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Expedition()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Expedition()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ExpeditionEntity`

Create a new `ExpeditionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FirstStageEntity

```php
$first_stage = $client->FirstStage();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `flight` | `int` | No |  |
| `id` | `int` | No |  |
| `launcher_config` | `array` | No |  |
| `serial_number` | `string` | No |  |
| `status` | `string` | No |  |
| `type` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->FirstStage()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->FirstStage()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FirstStageEntity`

Create a new `FirstStageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LaunchEntity

```php
$launch = $client->Launch();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `string` | No |  |
| `image` | `string` | No |  |
| `launch_service_provider` | `array` | No |  |
| `mission` | `array` | No |  |
| `name` | `string` | No |  |
| `net` | `string` | No |  |
| `pad` | `array` | No |  |
| `probability` | `int` | No |  |
| `rocket` | `array` | No |  |
| `status` | `array` | No |  |
| `url` | `string` | No |  |
| `webcast_live` | `bool` | No |  |
| `window_end` | `string` | No |  |
| `window_start` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Launch()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Launch()->load(["id" => "launch_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LaunchEntity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LaunchVehicleEntity

```php
$launch_vehicle = $client->LaunchVehicle();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `int` | No |  |
| `consecutive_successful_launch` | `int` | No |  |
| `description` | `string` | No |  |
| `diameter` | `float` | No |  |
| `failed_launch` | `int` | No |  |
| `family` | `string` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `int` | No |  |
| `id` | `int` | No |  |
| `launch_mass` | `int` | No |  |
| `length` | `float` | No |  |
| `leo_capacity` | `int` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `array` | No |  |
| `max_stage` | `int` | No |  |
| `min_stage` | `int` | No |  |
| `name` | `string` | No |  |
| `pending_launch` | `int` | No |  |
| `successful_launch` | `int` | No |  |
| `to_thrust` | `int` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->LaunchVehicle()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LaunchVehicleEntity`

Create a new `LaunchVehicleEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LauncherEntity

```php
$launcher = $client->Launcher();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `apogee` | `int` | No |  |
| `consecutive_successful_launch` | `int` | No |  |
| `description` | `string` | No |  |
| `diameter` | `float` | No |  |
| `failed_launch` | `int` | No |  |
| `family` | `string` | No |  |
| `full_name` | `string` | No |  |
| `gto_capacity` | `int` | No |  |
| `id` | `int` | No |  |
| `launch_mass` | `int` | No |  |
| `length` | `float` | No |  |
| `leo_capacity` | `int` | No |  |
| `maiden_flight` | `string` | No |  |
| `manufacturer` | `array` | No |  |
| `max_stage` | `int` | No |  |
| `min_stage` | `int` | No |  |
| `name` | `string` | No |  |
| `pending_launch` | `int` | No |  |
| `successful_launch` | `int` | No |  |
| `to_thrust` | `int` | No |  |
| `url` | `string` | No |  |
| `variant` | `string` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Launcher()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LauncherEntity`

Create a new `LauncherEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LocationEntity

```php
$location = $client->Location();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `country_code` | `string` | No |  |
| `id` | `int` | No |  |
| `map_image` | `string` | No |  |
| `name` | `string` | No |  |
| `total_landing_count` | `int` | No |  |
| `total_launch_count` | `int` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Location()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Location()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LocationEntity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PadEntity

```php
$pad = $client->Pad();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency_id` | `int` | No |  |
| `id` | `int` | No |  |
| `info_url` | `string` | No |  |
| `latitude` | `string` | No |  |
| `location` | `array` | No |  |
| `longitude` | `string` | No |  |
| `map_image` | `string` | No |  |
| `map_url` | `string` | No |  |
| `name` | `string` | No |  |
| `total_launch_count` | `int` | No |  |
| `url` | `string` | No |  |
| `wiki_url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Pad()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Pad()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PadEntity`

Create a new `PadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ReusableFirstStageEntity

```php
$reusable_first_stage = $client->ReusableFirstStage();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ReusableFirstStageEntity`

Create a new `ReusableFirstStageEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SpaceStationEntity

```php
$space_station = $client->SpaceStation();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `deorbited` | `string` | No |  |
| `description` | `string` | No |  |
| `founded` | `string` | No |  |
| `id` | `int` | No |  |
| `image_url` | `string` | No |  |
| `name` | `string` | No |  |
| `orbit` | `string` | No |  |
| `owner` | `array` | No |  |
| `status` | `array` | No |  |
| `type` | `array` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->SpaceStation()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->SpaceStation()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SpaceStationEntity`

Create a new `SpaceStationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SpacecraftEntity

```php
$spacecraft = $client->Spacecraft();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `agency` | `array` | No |  |
| `capability` | `string` | No |  |
| `crew_capacity` | `int` | No |  |
| `detail` | `string` | No |  |
| `diameter` | `float` | No |  |
| `height` | `float` | No |  |
| `history` | `string` | No |  |
| `human_rated` | `bool` | No |  |
| `id` | `int` | No |  |
| `image_url` | `string` | No |  |
| `in_use` | `bool` | No |  |
| `maiden_flight` | `string` | No |  |
| `name` | `string` | No |  |
| `type` | `array` | No |  |
| `url` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Spacecraft()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Spacecraft()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SpacecraftEntity`

Create a new `SpacecraftEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new LaunchLibrary2SDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

