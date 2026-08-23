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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `int` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

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
| `bio` | `string` | No | Biographical information |
| `date_of_birth` | `string` | No | Date of birth |
| `date_of_death` | `string` | No | Date of death if applicable |
| `flights_count` | `int` | No | Number of flights |
| `id` | `int` | No | Astronaut ID |
| `name` | `string` | No | Name of the astronaut |
| `nationality` | `string` | No | Astronaut nationality |
| `profile_image` | `string` | No | URL to profile image |
| `spacewalks_count` | `int` | No | Number of spacewalks |
| `status` | `array` | No |  |
| `type` | `array` | No |  |
| `url` | `string` | No | API URL for this astronaut |

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
| `departure` | `string` | No | Departure time |
| `docking` | `string` | No | Docking time |
| `docking_location` | `array` | No |  |
| `flight_vehicle` | `array` | No |  |
| `id` | `int` | No | Docking event ID |
| `url` | `string` | No | API URL for this docking event |

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
| `date` | `string` | No | Event date and time |
| `description` | `string` | No | Description of the event |
| `feature_image` | `string` | No | URL to feature image |
| `id` | `int` | No | Event ID |
| `location` | `string` | No | Event location |
| `name` | `string` | No | Name of the event |
| `news_url` | `string` | No | URL to news article |
| `type` | `array` | No |  |
| `url` | `string` | No | API URL for this event |
| `video_url` | `string` | No | URL to video |

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
| `end` | `string` | No | End date of the expedition |
| `id` | `int` | No | Expedition ID |
| `name` | `string` | No | Name of the expedition |
| `spacestation` | `array` | No |  |
| `start` | `string` | No | Start date of the expedition |
| `url` | `string` | No | API URL for this expedition |

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
| `apogee` | `int` | No | Apogee in km |
| `consecutive_successful_launches` | `int` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `float` | No | Diameter in meters |
| `failed_launches` | `int` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `flights` | `int` | No | Number of flights |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `int` | No | GTO capacity in kg |
| `id` | `int` | No | Configuration ID |
| `launch_mass` | `int` | No | Launch mass in kg |
| `launcher_config` | `array` | No |  |
| `length` | `float` | No | Length in meters |
| `leo_capacity` | `int` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `array` | No |  |
| `max_stage` | `int` | No | Maximum number of stages |
| `min_stage` | `int` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `int` | No | Number of pending launches |
| `serial_number` | `string` | No | Serial number of the first stage |
| `status` | `string` | No | Current status |
| `successful_launches` | `int` | No | Number of successful launches |
| `to_thrust` | `int` | No | Takeoff thrust in kN |
| `type` | `string` | No | Type of first stage |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

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
| `id` | `string` | No | UUID of the launch |
| `image` | `string` | No | URL to launch image |
| `launch_service_provider` | `array` | No |  |
| `mission` | `array` | No |  |
| `name` | `string` | No | Name of the launch |
| `net` | `string` | No | Net Earliest Time (NET) for launch |
| `pad` | `array` | No |  |
| `probability` | `int` | No | Launch probability percentage |
| `rocket` | `array` | No |  |
| `status` | `array` | No |  |
| `url` | `string` | No | API URL for this launch |
| `webcast_live` | `bool` | No | Whether the webcast is currently live |
| `window_end` | `string` | No | End of launch window |
| `window_start` | `string` | No | Start of launch window |

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
| `apogee` | `int` | No | Apogee in km |
| `consecutive_successful_launches` | `int` | No | Number of consecutive successful launches |
| `description` | `string` | No | Description of the launcher |
| `diameter` | `float` | No | Diameter in meters |
| `failed_launches` | `int` | No | Number of failed launches |
| `family` | `string` | No | Launcher family |
| `full_name` | `string` | No | Full name of the launcher |
| `gto_capacity` | `int` | No | GTO capacity in kg |
| `id` | `int` | No | Configuration ID |
| `launch_mass` | `int` | No | Launch mass in kg |
| `length` | `float` | No | Length in meters |
| `leo_capacity` | `int` | No | LEO capacity in kg |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `manufacturer` | `array` | No |  |
| `max_stage` | `int` | No | Maximum number of stages |
| `min_stage` | `int` | No | Minimum number of stages |
| `name` | `string` | No | Name of the launcher configuration |
| `pending_launches` | `int` | No | Number of pending launches |
| `successful_launches` | `int` | No | Number of successful launches |
| `to_thrust` | `int` | No | Takeoff thrust in kN |
| `url` | `string` | No | API URL for this configuration |
| `variant` | `string` | No | Variant of the launcher |

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
| `abbrev` | `string` | No | Agency abbreviation |
| `administrator` | `string` | No | Agency administrator |
| `country_code` | `string` | No | ISO country code |
| `description` | `string` | No | Agency description |
| `founding_year` | `string` | No | Year agency was founded |
| `id` | `int` | No | Agency ID |
| `logo_url` | `string` | No | URL to agency logo |
| `name` | `string` | No | Name of the agency |
| `type` | `string` | No | Type of agency |
| `url` | `string` | No | API URL for this agency |

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
| `country_code` | `string` | No | ISO country code |
| `id` | `int` | No | Location ID |
| `map_image` | `string` | No | URL to map image |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `int` | No | Total number of landings at this location |
| `total_launch_count` | `int` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |

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
| `agency_id` | `int` | No | ID of the agency that operates this pad |
| `country_code` | `string` | No | ISO country code |
| `id` | `int` | No | Location ID |
| `info_url` | `string` | No | URL to more information |
| `latitude` | `string` | No | Latitude coordinate |
| `location` | `array` | No |  |
| `longitude` | `string` | No | Longitude coordinate |
| `map_image` | `string` | No | URL to map image |
| `map_url` | `string` | No | URL to map |
| `name` | `string` | No | Name of the location |
| `total_landing_count` | `int` | No | Total number of landings at this location |
| `total_launch_count` | `int` | No | Total number of launches from this location |
| `url` | `string` | No | API URL for this location |
| `wiki_url` | `string` | No | Wikipedia URL |

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
| `deorbited` | `string` | No | Date the space station was deorbited |
| `description` | `string` | No | Description of the space station |
| `founded` | `string` | No | Date the space station was founded |
| `id` | `int` | No | Space station ID |
| `image_url` | `string` | No | URL to space station image |
| `name` | `string` | No | Name of the space station |
| `orbit` | `string` | No | Orbital information |
| `owners` | `array` | No |  |
| `status` | `array` | No |  |
| `type` | `array` | No |  |
| `url` | `string` | No | API URL for this space station |

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
| `capability` | `string` | No | Spacecraft capability |
| `crew_capacity` | `int` | No | Crew capacity |
| `details` | `string` | No | Detailed information |
| `diameter` | `float` | No | Diameter in meters |
| `height` | `float` | No | Height in meters |
| `history` | `string` | No | Historical information |
| `human_rated` | `bool` | No | Whether the spacecraft is human-rated |
| `id` | `int` | No | Spacecraft configuration ID |
| `image_url` | `string` | No | URL to spacecraft image |
| `in_use` | `bool` | No | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | No | Date of maiden flight |
| `name` | `string` | No | Name of the spacecraft |
| `type` | `array` | No |  |
| `url` | `string` | No | API URL for this configuration |

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

