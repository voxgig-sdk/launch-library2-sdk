# LaunchLibrary2 Golang SDK



The Golang SDK for the LaunchLibrary2 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Agency(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/launch-library2-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/launch-library2-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/launch-library2-sdk/go=../launch-library2-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/launch-library2-sdk/go"
)

func main() {
    client := sdk.New()

    // List agency records — the value is the array of records itself.
    agencys, err := client.Agency(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range agencys.([]any) {
        fmt.Println(item)
    }

    // Load a single agency — the value is the loaded record.
    agency, err := client.Agency(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(agency)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
astronauts, err := client.Astronaut(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = astronauts
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

astronaut, err := client.Astronaut(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(astronaut) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewLaunchLibrary2SDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LAUNCH_LIBRARY2_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewLaunchLibrary2SDK

```go
func NewLaunchLibrary2SDK(options map[string]any) *LaunchLibrary2SDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *LaunchLibrary2SDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### LaunchLibrary2SDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Agency` | `(data map[string]any) LaunchLibrary2Entity` | Create an Agency entity instance. |
| `Astronaut` | `(data map[string]any) LaunchLibrary2Entity` | Create an Astronaut entity instance. |
| `Docking` | `(data map[string]any) LaunchLibrary2Entity` | Create a Docking entity instance. |
| `DockingEvent` | `(data map[string]any) LaunchLibrary2Entity` | Create a DockingEvent entity instance. |
| `Event` | `(data map[string]any) LaunchLibrary2Entity` | Create an Event entity instance. |
| `Expedition` | `(data map[string]any) LaunchLibrary2Entity` | Create an Expedition entity instance. |
| `FirstStage` | `(data map[string]any) LaunchLibrary2Entity` | Create a FirstStage entity instance. |
| `Launch` | `(data map[string]any) LaunchLibrary2Entity` | Create a Launch entity instance. |
| `LaunchVehicle` | `(data map[string]any) LaunchLibrary2Entity` | Create a LaunchVehicle entity instance. |
| `Launcher` | `(data map[string]any) LaunchLibrary2Entity` | Create a Launcher entity instance. |
| `Location` | `(data map[string]any) LaunchLibrary2Entity` | Create a Location entity instance. |
| `Pad` | `(data map[string]any) LaunchLibrary2Entity` | Create a Pad entity instance. |
| `ReusableFirstStage` | `(data map[string]any) LaunchLibrary2Entity` | Create a ReusableFirstStage entity instance. |
| `SpaceStation` | `(data map[string]any) LaunchLibrary2Entity` | Create a SpaceStation entity instance. |
| `Spacecraft` | `(data map[string]any) LaunchLibrary2Entity` | Create a Spacecraft entity instance. |

### Entity interface (LaunchLibrary2Entity)

All entities implement the `LaunchLibrary2Entity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    agency, err := client.Agency(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // agency is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Agency

| Field | Description |
| --- | --- |
| `"abbrev"` | Agency abbreviation |
| `"administrator"` | Agency administrator |
| `"country_code"` | ISO country code |
| `"description"` | Agency description |
| `"founding_year"` | Year agency was founded |
| `"id"` | Agency ID |
| `"logo_url"` | URL to agency logo |
| `"name"` | Name of the agency |
| `"type"` | Type of agency |
| `"url"` | API URL for this agency |

Operations: List, Load.

API path: `/agencies`

#### Astronaut

| Field | Description |
| --- | --- |
| `"bio"` | Biographical information |
| `"date_of_birth"` | Date of birth |
| `"date_of_death"` | Date of death if applicable |
| `"flights_count"` | Number of flights |
| `"id"` | Astronaut ID |
| `"name"` | Name of the astronaut |
| `"nationality"` | Astronaut nationality |
| `"profile_image"` | URL to profile image |
| `"spacewalks_count"` | Number of spacewalks |
| `"status"` |  |
| `"type"` |  |
| `"url"` | API URL for this astronaut |

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
| `"departure"` | Departure time |
| `"docking"` | Docking time |
| `"docking_location"` |  |
| `"flight_vehicle"` |  |
| `"id"` | Docking event ID |
| `"url"` | API URL for this docking event |

Operations: List, Load.

API path: `/docking_event`

#### Event

| Field | Description |
| --- | --- |
| `"date"` | Event date and time |
| `"description"` | Description of the event |
| `"feature_image"` | URL to feature image |
| `"id"` | Event ID |
| `"location"` | Event location |
| `"name"` | Name of the event |
| `"news_url"` | URL to news article |
| `"type"` |  |
| `"url"` | API URL for this event |
| `"video_url"` | URL to video |

Operations: List, Load.

API path: `/event`

#### Expedition

| Field | Description |
| --- | --- |
| `"crew"` |  |
| `"end"` | End date of the expedition |
| `"id"` | Expedition ID |
| `"name"` | Name of the expedition |
| `"spacestation"` |  |
| `"start"` | Start date of the expedition |
| `"url"` | API URL for this expedition |

Operations: List, Load.

API path: `/expedition`

#### FirstStage

| Field | Description |
| --- | --- |
| `"apogee"` | Apogee in km |
| `"consecutive_successful_launches"` | Number of consecutive successful launches |
| `"description"` | Description of the launcher |
| `"diameter"` | Diameter in meters |
| `"failed_launches"` | Number of failed launches |
| `"family"` | Launcher family |
| `"flights"` | Number of flights |
| `"full_name"` | Full name of the launcher |
| `"gto_capacity"` | GTO capacity in kg |
| `"id"` | Configuration ID |
| `"launch_mass"` | Launch mass in kg |
| `"launcher_config"` |  |
| `"length"` | Length in meters |
| `"leo_capacity"` | LEO capacity in kg |
| `"maiden_flight"` | Date of maiden flight |
| `"manufacturer"` |  |
| `"max_stage"` | Maximum number of stages |
| `"min_stage"` | Minimum number of stages |
| `"name"` | Name of the launcher configuration |
| `"pending_launches"` | Number of pending launches |
| `"serial_number"` | Serial number of the first stage |
| `"status"` | Current status |
| `"successful_launches"` | Number of successful launches |
| `"to_thrust"` | Takeoff thrust in kN |
| `"type"` | Type of first stage |
| `"url"` | API URL for this configuration |
| `"variant"` | Variant of the launcher |

Operations: List, Load.

API path: `/firststage`

#### Launch

| Field | Description |
| --- | --- |
| `"id"` | UUID of the launch |
| `"image"` | URL to launch image |
| `"launch_service_provider"` |  |
| `"mission"` |  |
| `"name"` | Name of the launch |
| `"net"` | Net Earliest Time (NET) for launch |
| `"pad"` |  |
| `"probability"` | Launch probability percentage |
| `"rocket"` |  |
| `"status"` |  |
| `"url"` | API URL for this launch |
| `"webcast_live"` | Whether the webcast is currently live |
| `"window_end"` | End of launch window |
| `"window_start"` | Start of launch window |

Operations: List, Load.

API path: `/launch`

#### LaunchVehicle

| Field | Description |
| --- | --- |
| `"apogee"` | Apogee in km |
| `"consecutive_successful_launches"` | Number of consecutive successful launches |
| `"description"` | Description of the launcher |
| `"diameter"` | Diameter in meters |
| `"failed_launches"` | Number of failed launches |
| `"family"` | Launcher family |
| `"full_name"` | Full name of the launcher |
| `"gto_capacity"` | GTO capacity in kg |
| `"id"` | Configuration ID |
| `"launch_mass"` | Launch mass in kg |
| `"length"` | Length in meters |
| `"leo_capacity"` | LEO capacity in kg |
| `"maiden_flight"` | Date of maiden flight |
| `"manufacturer"` |  |
| `"max_stage"` | Maximum number of stages |
| `"min_stage"` | Minimum number of stages |
| `"name"` | Name of the launcher configuration |
| `"pending_launches"` | Number of pending launches |
| `"successful_launches"` | Number of successful launches |
| `"to_thrust"` | Takeoff thrust in kN |
| `"url"` | API URL for this configuration |
| `"variant"` | Variant of the launcher |

Operations: List.

API path: `/config/launcher`

#### Launcher

| Field | Description |
| --- | --- |
| `"abbrev"` | Agency abbreviation |
| `"administrator"` | Agency administrator |
| `"country_code"` | ISO country code |
| `"description"` | Agency description |
| `"founding_year"` | Year agency was founded |
| `"id"` | Agency ID |
| `"logo_url"` | URL to agency logo |
| `"name"` | Name of the agency |
| `"type"` | Type of agency |
| `"url"` | API URL for this agency |

Operations: Load.

API path: `/config/launcher/{id}`

#### Location

| Field | Description |
| --- | --- |
| `"country_code"` | ISO country code |
| `"id"` | Location ID |
| `"map_image"` | URL to map image |
| `"name"` | Name of the location |
| `"total_landing_count"` | Total number of landings at this location |
| `"total_launch_count"` | Total number of launches from this location |
| `"url"` | API URL for this location |

Operations: List, Load.

API path: `/location`

#### Pad

| Field | Description |
| --- | --- |
| `"agency_id"` | ID of the agency that operates this pad |
| `"country_code"` | ISO country code |
| `"id"` | Location ID |
| `"info_url"` | URL to more information |
| `"latitude"` | Latitude coordinate |
| `"location"` |  |
| `"longitude"` | Longitude coordinate |
| `"map_image"` | URL to map image |
| `"map_url"` | URL to map |
| `"name"` | Name of the location |
| `"total_landing_count"` | Total number of landings at this location |
| `"total_launch_count"` | Total number of launches from this location |
| `"url"` | API URL for this location |
| `"wiki_url"` | Wikipedia URL |

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
| `"deorbited"` | Date the space station was deorbited |
| `"description"` | Description of the space station |
| `"founded"` | Date the space station was founded |
| `"id"` | Space station ID |
| `"image_url"` | URL to space station image |
| `"name"` | Name of the space station |
| `"orbit"` | Orbital information |
| `"owners"` |  |
| `"status"` |  |
| `"type"` |  |
| `"url"` | API URL for this space station |

Operations: List, Load.

API path: `/spacestation`

#### Spacecraft

| Field | Description |
| --- | --- |
| `"agency"` |  |
| `"capability"` | Spacecraft capability |
| `"crew_capacity"` | Crew capacity |
| `"details"` | Detailed information |
| `"diameter"` | Diameter in meters |
| `"height"` | Height in meters |
| `"history"` | Historical information |
| `"human_rated"` | Whether the spacecraft is human-rated |
| `"id"` | Spacecraft configuration ID |
| `"image_url"` | URL to spacecraft image |
| `"in_use"` | Whether the spacecraft is currently in use |
| `"maiden_flight"` | Date of maiden flight |
| `"name"` | Name of the spacecraft |
| `"type"` |  |
| `"url"` | API URL for this configuration |

Operations: List, Load.

API path: `/config/spacecraft`



## Entities


### Agency

Create an instance: `agency := client.Agency(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
agency, err := client.Agency(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(agency) // the loaded record
```

#### Example: List

```go
agencys, err := client.Agency(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(agencys) // the array of records
```


### Astronaut

Create an instance: `astronaut := client.Astronaut(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `status` | `map[string]any` |  |
| `type` | `map[string]any` |  |
| `url` | `string` | API URL for this astronaut |

#### Example: Load

```go
astronaut, err := client.Astronaut(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(astronaut) // the loaded record
```

#### Example: List

```go
astronauts, err := client.Astronaut(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(astronauts) // the array of records
```


### Docking

Create an instance: `docking := client.Docking(nil)`


### DockingEvent

Create an instance: `dockingEvent := client.DockingEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `departure` | `string` | Departure time |
| `docking` | `string` | Docking time |
| `docking_location` | `map[string]any` |  |
| `flight_vehicle` | `map[string]any` |  |
| `id` | `int` | Docking event ID |
| `url` | `string` | API URL for this docking event |

#### Example: Load

```go
dockingEvent, err := client.DockingEvent(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dockingEvent) // the loaded record
```

#### Example: List

```go
dockingEvents, err := client.DockingEvent(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dockingEvents) // the array of records
```


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `type` | `map[string]any` |  |
| `url` | `string` | API URL for this event |
| `video_url` | `string` | URL to video |

#### Example: Load

```go
event, err := client.Event(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(event) // the loaded record
```

#### Example: List

```go
events, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(events) // the array of records
```


### Expedition

Create an instance: `expedition := client.Expedition(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `[]any` |  |
| `end` | `string` | End date of the expedition |
| `id` | `int` | Expedition ID |
| `name` | `string` | Name of the expedition |
| `spacestation` | `map[string]any` |  |
| `start` | `string` | Start date of the expedition |
| `url` | `string` | API URL for this expedition |

#### Example: Load

```go
expedition, err := client.Expedition(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(expedition) // the loaded record
```

#### Example: List

```go
expeditions, err := client.Expedition(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(expeditions) // the array of records
```


### FirstStage

Create an instance: `firstStage := client.FirstStage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `int` | Apogee in km |
| `consecutive_successful_launches` | `int` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `float64` | Diameter in meters |
| `failed_launches` | `int` | Number of failed launches |
| `family` | `string` | Launcher family |
| `flights` | `int` | Number of flights |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `int` | GTO capacity in kg |
| `id` | `int` | Configuration ID |
| `launch_mass` | `int` | Launch mass in kg |
| `launcher_config` | `map[string]any` |  |
| `length` | `float64` | Length in meters |
| `leo_capacity` | `int` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `map[string]any` |  |
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

```go
firstStage, err := client.FirstStage(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(firstStage) // the loaded record
```

#### Example: List

```go
firstStages, err := client.FirstStage(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(firstStages) // the array of records
```


### Launch

Create an instance: `launch := client.Launch(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | UUID of the launch |
| `image` | `string` | URL to launch image |
| `launch_service_provider` | `map[string]any` |  |
| `mission` | `map[string]any` |  |
| `name` | `string` | Name of the launch |
| `net` | `string` | Net Earliest Time (NET) for launch |
| `pad` | `map[string]any` |  |
| `probability` | `int` | Launch probability percentage |
| `rocket` | `map[string]any` |  |
| `status` | `map[string]any` |  |
| `url` | `string` | API URL for this launch |
| `webcast_live` | `bool` | Whether the webcast is currently live |
| `window_end` | `string` | End of launch window |
| `window_start` | `string` | Start of launch window |

#### Example: Load

```go
launch, err := client.Launch(nil).Load(map[string]any{"id": "launch_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(launch) // the loaded record
```

#### Example: List

```go
launchs, err := client.Launch(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(launchs) // the array of records
```


### LaunchVehicle

Create an instance: `launchVehicle := client.LaunchVehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `apogee` | `int` | Apogee in km |
| `consecutive_successful_launches` | `int` | Number of consecutive successful launches |
| `description` | `string` | Description of the launcher |
| `diameter` | `float64` | Diameter in meters |
| `failed_launches` | `int` | Number of failed launches |
| `family` | `string` | Launcher family |
| `full_name` | `string` | Full name of the launcher |
| `gto_capacity` | `int` | GTO capacity in kg |
| `id` | `int` | Configuration ID |
| `launch_mass` | `int` | Launch mass in kg |
| `length` | `float64` | Length in meters |
| `leo_capacity` | `int` | LEO capacity in kg |
| `maiden_flight` | `string` | Date of maiden flight |
| `manufacturer` | `map[string]any` |  |
| `max_stage` | `int` | Maximum number of stages |
| `min_stage` | `int` | Minimum number of stages |
| `name` | `string` | Name of the launcher configuration |
| `pending_launches` | `int` | Number of pending launches |
| `successful_launches` | `int` | Number of successful launches |
| `to_thrust` | `int` | Takeoff thrust in kN |
| `url` | `string` | API URL for this configuration |
| `variant` | `string` | Variant of the launcher |

#### Example: List

```go
launchVehicles, err := client.LaunchVehicle(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(launchVehicles) // the array of records
```


### Launcher

Create an instance: `launcher := client.Launcher(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
launcher, err := client.Launcher(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(launcher) // the loaded record
```


### Location

Create an instance: `location := client.Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
location, err := client.Location(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(location) // the loaded record
```

#### Example: List

```go
locations, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(locations) // the array of records
```


### Pad

Create an instance: `pad := client.Pad(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency_id` | `int` | ID of the agency that operates this pad |
| `country_code` | `string` | ISO country code |
| `id` | `int` | Location ID |
| `info_url` | `string` | URL to more information |
| `latitude` | `string` | Latitude coordinate |
| `location` | `map[string]any` |  |
| `longitude` | `string` | Longitude coordinate |
| `map_image` | `string` | URL to map image |
| `map_url` | `string` | URL to map |
| `name` | `string` | Name of the location |
| `total_landing_count` | `int` | Total number of landings at this location |
| `total_launch_count` | `int` | Total number of launches from this location |
| `url` | `string` | API URL for this location |
| `wiki_url` | `string` | Wikipedia URL |

#### Example: Load

```go
pad, err := client.Pad(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(pad) // the loaded record
```

#### Example: List

```go
pads, err := client.Pad(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(pads) // the array of records
```


### ReusableFirstStage

Create an instance: `reusableFirstStage := client.ReusableFirstStage(nil)`


### SpaceStation

Create an instance: `spaceStation := client.SpaceStation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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
| `owners` | `[]any` |  |
| `status` | `map[string]any` |  |
| `type` | `map[string]any` |  |
| `url` | `string` | API URL for this space station |

#### Example: Load

```go
spaceStation, err := client.SpaceStation(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceStation) // the loaded record
```

#### Example: List

```go
spaceStations, err := client.SpaceStation(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(spaceStations) // the array of records
```


### Spacecraft

Create an instance: `spacecraft := client.Spacecraft(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `agency` | `map[string]any` |  |
| `capability` | `string` | Spacecraft capability |
| `crew_capacity` | `int` | Crew capacity |
| `details` | `string` | Detailed information |
| `diameter` | `float64` | Diameter in meters |
| `height` | `float64` | Height in meters |
| `history` | `string` | Historical information |
| `human_rated` | `bool` | Whether the spacecraft is human-rated |
| `id` | `int` | Spacecraft configuration ID |
| `image_url` | `string` | URL to spacecraft image |
| `in_use` | `bool` | Whether the spacecraft is currently in use |
| `maiden_flight` | `string` | Date of maiden flight |
| `name` | `string` | Name of the spacecraft |
| `type` | `map[string]any` |  |
| `url` | `string` | API URL for this configuration |

#### Example: Load

```go
spacecraft, err := client.Spacecraft(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(spacecraft) // the loaded record
```

#### Example: List

```go
spacecrafts, err := client.Spacecraft(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(spacecrafts) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/launch-library2-sdk/go/
├── launch-library2.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/launch-library2-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
astronaut := client.Astronaut(nil)
astronaut.List(nil, nil)

// astronaut.Data() now returns the astronaut data from the last list
// astronaut.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
