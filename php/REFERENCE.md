# LaunchLibrary2 PHP SDK Reference

Complete API reference for the LaunchLibrary2 PHP SDK.


## LaunchLibrary2SDK

### Constructor

```php
require_once __DIR__ . '/launch-library2_sdk.php';

$client = new LaunchLibrary2SDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

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

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## AgencyEntity

```php
$agency = $client->Agency();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Agency()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Agency()->load(["id" => "agency_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AgencyEntity`

Create a new `AgencyEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## AstronautEntity

```php
$astronaut = $client->Astronaut();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Astronaut()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Astronaut()->load(["id" => "astronaut_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AstronautEntity`

Create a new `AstronautEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DockingEntity

```php
$docking = $client->Docking();
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DockingEntity`

Create a new `DockingEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## DockingEventEntity

```php
$docking_event = $client->DockingEvent();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->DockingEvent()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->DockingEvent()->load(["id" => "docking_event_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DockingEventEntity`

Create a new `DockingEventEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Event()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Event()->load(["id" => "event_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ExpeditionEntity

```php
$expedition = $client->Expedition();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Expedition()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Expedition()->load(["id" => "expedition_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ExpeditionEntity`

Create a new `ExpeditionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## FirstStageEntity

```php
$first_stage = $client->FirstStage();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->FirstStage()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->FirstStage()->load(["id" => "first_stage_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): FirstStageEntity`

Create a new `FirstStageEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LaunchEntity

```php
$launch = $client->Launch();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Launch()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Launch()->load(["id" => "launch_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LaunchEntity`

Create a new `LaunchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LaunchVehicleEntity

```php
$launch_vehicle = $client->LaunchVehicle();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->LaunchVehicle()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LaunchVehicleEntity`

Create a new `LaunchVehicleEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LauncherEntity

```php
$launcher = $client->Launcher();
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

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Launcher()->load(["id" => "launcher_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LauncherEntity`

Create a new `LauncherEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## LocationEntity

```php
$location = $client->Location();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Location()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Location()->load(["id" => "location_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LocationEntity`

Create a new `LocationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PadEntity

```php
$pad = $client->Pad();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Pad()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Pad()->load(["id" => "pad_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PadEntity`

Create a new `PadEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ReusableFirstStageEntity

```php
$reusable_first_stage = $client->ReusableFirstStage();
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ReusableFirstStageEntity`

Create a new `ReusableFirstStageEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SpaceStationEntity

```php
$space_station = $client->SpaceStation();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->SpaceStation()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->SpaceStation()->load(["id" => "space_station_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SpaceStationEntity`

Create a new `SpaceStationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SpacecraftEntity

```php
$spacecraft = $client->Spacecraft();
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

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->Spacecraft()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Spacecraft()->load(["id" => "spacecraft_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SpacecraftEntity`

Create a new `SpacecraftEntity` instance with the same client and
options.

#### `getName(): string`

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

