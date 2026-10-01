# Launch Library 2

The Launch Library 2 API provides access to a comprehensive database of rocket launches, space events, and astronauts. It serves both orbital and suborbital launches, offering data on launch service providers, events, agencies, and more, all accessible for free within certain request limits. Free tier allows up to 15 requests per hour.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 12 entities and 24 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Agency

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `abbrev`: Agency abbreviation
- `administrator`: Agency administrator
- `country_code`: ISO country code
- `description`: Agency description
- `founding_year`: Year agency was founded

### Astronaut

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `bio`: Biographical information
- `date_of_birth`: Date of birth
- `date_of_death`: Date of death if applicable
- `flights_count`: Number of flights
- `id`: Astronaut ID

### DockingEvent

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `departure`: Departure time
- `docking`: Docking time
- `id`: Docking event ID
- `url`: API URL for this docking event

### Event

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `date`: Event date and time
- `description`: Description of the event
- `feature_image`: URL to feature image
- `id`: Event ID
- `location`: Event location

### Expedition

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `end`: End date of the expedition
- `id`: Expedition ID
- `name`: Name of the expedition
- `start`: Start date of the expedition
- `url`: API URL for this expedition

### FirstStage

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `flights`: Number of flights
- `id`: First stage ID
- `serial_number`: Serial number of the first stage
- `status`: Current status
- `type`: Type of first stage

### Launch

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: UUID of the launch
- `image`: URL to launch image
- `name`: Name of the launch
- `net`: Net Earliest Time (NET) for launch
- `probability`: Launch probability percentage

### Launcher

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `apogee`: Apogee in km
- `consecutive_successful_launches`: Number of consecutive successful launches
- `description`: Description of the launcher
- `diameter`: Diameter in meters
- `failed_launches`: Number of failed launches

### Location

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `country_code`: ISO country code
- `id`: Location ID
- `map_image`: URL to map image
- `name`: Name of the location
- `total_landing_count`: Total number of landings at this location

### Pad

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `agency_id`: ID of the agency that operates this pad
- `id`: Pad ID
- `info_url`: URL to more information
- `latitude`: Latitude coordinate
- `longitude`: Longitude coordinate

### SpaceStation

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `deorbited`: Date the space station was deorbited
- `description`: Description of the space station
- `founded`: Date the space station was founded
- `id`: Space station ID
- `image_url`: URL to space station image

### Spacecraft

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `capability`: Spacecraft capability
- `crew_capacity`: Crew capacity
- `details`: Detailed information
- `diameter`: Diameter in meters
- `height`: Height in meters

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Agency | `list` | `GET /agencies` | See reference |
| Agency | `load` | `GET /agencies/{id}` | See reference |
| Astronaut | `list` | `GET /astronaut` | See reference |
| Astronaut | `load` | `GET /astronaut/{id}` | See reference |
| DockingEvent | `list` | `GET /docking_event` | See reference |
| DockingEvent | `load` | `GET /docking_event/{id}` | See reference |
| Event | `list` | `GET /event` | See reference |
| Event | `load` | `GET /event/{id}` | See reference |
| Expedition | `list` | `GET /expedition` | See reference |
| Expedition | `load` | `GET /expedition/{id}` | See reference |
| FirstStage | `list` | `GET /firststage` | See reference |
| FirstStage | `load` | `GET /firststage/{id}` | See reference |
| Launch | `list` | `GET /launch` | See reference |
| Launch | `load` | `GET /launch/{id}` | See reference |
| Launcher | `list` | `GET /config/launcher` | See reference |
| Launcher | `load` | `GET /config/launcher/{id}` | See reference |
| Location | `list` | `GET /location` | See reference |
| Location | `load` | `GET /location/{id}` | See reference |
| Pad | `list` | `GET /pad` | See reference |
| Pad | `load` | `GET /pad/{id}` | See reference |
| SpaceStation | `list` | `GET /spacestation` | See reference |
| SpaceStation | `load` | `GET /spacestation/{id}` | See reference |
| Spacecraft | `list` | `GET /config/spacecraft` | See reference |
| Spacecraft | `load` | `GET /config/spacecraft/{id}` | See reference |

## Connect to the API

- Launch Library 2 API Server: `https://ll.thespacedevs.com/2.2.0`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `launch-library2_list`: List records for an entity. Supported entities: `agency`, `astronaut`, `docking_event`, `event`, `expedition`, `first_stage`, `launch`, `launcher`, `location`, `pad`, `space_station`, `spacecraft`.
- `launch-library2_load`: Load one record for an entity. Supported entities: `agency`, `astronaut`, `docking_event`, `event`, `expedition`, `first_stage`, `launch`, `launcher`, `location`, `pad`, `space_station`, `spacecraft`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

