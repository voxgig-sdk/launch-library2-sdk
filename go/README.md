# LaunchLibrary2 Golang SDK



The Golang SDK for the LaunchLibrary2 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Agency(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
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
agencys, err := client.Agency(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = agencys
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

agency, err := client.Agency(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(agency) // the returned mock data
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
| `"abbrev"` |  |
| `"administrator"` |  |
| `"country_code"` |  |
| `"description"` |  |
| `"founding_year"` |  |
| `"id"` |  |
| `"logo_url"` |  |
| `"name"` |  |
| `"type"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/agencies`

#### Astronaut

| Field | Description |
| --- | --- |
| `"bio"` |  |
| `"date_of_birth"` |  |
| `"date_of_death"` |  |
| `"flights_count"` |  |
| `"id"` |  |
| `"name"` |  |
| `"nationality"` |  |
| `"profile_image"` |  |
| `"spacewalks_count"` |  |
| `"status"` |  |
| `"type"` |  |
| `"url"` |  |

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
| `"departure"` |  |
| `"docking"` |  |
| `"docking_location"` |  |
| `"flight_vehicle"` |  |
| `"id"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/docking_event`

#### Event

| Field | Description |
| --- | --- |
| `"date"` |  |
| `"description"` |  |
| `"feature_image"` |  |
| `"id"` |  |
| `"location"` |  |
| `"name"` |  |
| `"news_url"` |  |
| `"type"` |  |
| `"url"` |  |
| `"video_url"` |  |

Operations: List, Load.

API path: `/event`

#### Expedition

| Field | Description |
| --- | --- |
| `"crew"` |  |
| `"end"` |  |
| `"id"` |  |
| `"name"` |  |
| `"spacestation"` |  |
| `"start"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/expedition`

#### FirstStage

| Field | Description |
| --- | --- |
| `"flight"` |  |
| `"id"` |  |
| `"launcher_config"` |  |
| `"serial_number"` |  |
| `"status"` |  |
| `"type"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/firststage`

#### Launch

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"image"` |  |
| `"launch_service_provider"` |  |
| `"mission"` |  |
| `"name"` |  |
| `"net"` |  |
| `"pad"` |  |
| `"probability"` |  |
| `"rocket"` |  |
| `"status"` |  |
| `"url"` |  |
| `"webcast_live"` |  |
| `"window_end"` |  |
| `"window_start"` |  |

Operations: List, Load.

API path: `/launch`

#### LaunchVehicle

| Field | Description |
| --- | --- |
| `"apogee"` |  |
| `"consecutive_successful_launch"` |  |
| `"description"` |  |
| `"diameter"` |  |
| `"failed_launch"` |  |
| `"family"` |  |
| `"full_name"` |  |
| `"gto_capacity"` |  |
| `"id"` |  |
| `"launch_mass"` |  |
| `"length"` |  |
| `"leo_capacity"` |  |
| `"maiden_flight"` |  |
| `"manufacturer"` |  |
| `"max_stage"` |  |
| `"min_stage"` |  |
| `"name"` |  |
| `"pending_launch"` |  |
| `"successful_launch"` |  |
| `"to_thrust"` |  |
| `"url"` |  |
| `"variant"` |  |

Operations: List.

API path: `/config/launcher`

#### Launcher

| Field | Description |
| --- | --- |
| `"apogee"` |  |
| `"consecutive_successful_launch"` |  |
| `"description"` |  |
| `"diameter"` |  |
| `"failed_launch"` |  |
| `"family"` |  |
| `"full_name"` |  |
| `"gto_capacity"` |  |
| `"id"` |  |
| `"launch_mass"` |  |
| `"length"` |  |
| `"leo_capacity"` |  |
| `"maiden_flight"` |  |
| `"manufacturer"` |  |
| `"max_stage"` |  |
| `"min_stage"` |  |
| `"name"` |  |
| `"pending_launch"` |  |
| `"successful_launch"` |  |
| `"to_thrust"` |  |
| `"url"` |  |
| `"variant"` |  |

Operations: Load.

API path: `/config/launcher/{id}`

#### Location

| Field | Description |
| --- | --- |
| `"country_code"` |  |
| `"id"` |  |
| `"map_image"` |  |
| `"name"` |  |
| `"total_landing_count"` |  |
| `"total_launch_count"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/location`

#### Pad

| Field | Description |
| --- | --- |
| `"agency_id"` |  |
| `"id"` |  |
| `"info_url"` |  |
| `"latitude"` |  |
| `"location"` |  |
| `"longitude"` |  |
| `"map_image"` |  |
| `"map_url"` |  |
| `"name"` |  |
| `"total_launch_count"` |  |
| `"url"` |  |
| `"wiki_url"` |  |

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
| `"deorbited"` |  |
| `"description"` |  |
| `"founded"` |  |
| `"id"` |  |
| `"image_url"` |  |
| `"name"` |  |
| `"orbit"` |  |
| `"owner"` |  |
| `"status"` |  |
| `"type"` |  |
| `"url"` |  |

Operations: List, Load.

API path: `/spacestation`

#### Spacecraft

| Field | Description |
| --- | --- |
| `"agency"` |  |
| `"capability"` |  |
| `"crew_capacity"` |  |
| `"detail"` |  |
| `"diameter"` |  |
| `"height"` |  |
| `"history"` |  |
| `"human_rated"` |  |
| `"id"` |  |
| `"image_url"` |  |
| `"in_use"` |  |
| `"maiden_flight"` |  |
| `"name"` |  |
| `"type"` |  |
| `"url"` |  |

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
| `bio` | `string` |  |
| `date_of_birth` | `string` |  |
| `date_of_death` | `string` |  |
| `flights_count` | `int` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `nationality` | `string` |  |
| `profile_image` | `string` |  |
| `spacewalks_count` | `int` |  |
| `status` | `map[string]any` |  |
| `type` | `map[string]any` |  |
| `url` | `string` |  |

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
| `departure` | `string` |  |
| `docking` | `string` |  |
| `docking_location` | `map[string]any` |  |
| `flight_vehicle` | `map[string]any` |  |
| `id` | `int` |  |
| `url` | `string` |  |

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
| `date` | `string` |  |
| `description` | `string` |  |
| `feature_image` | `string` |  |
| `id` | `int` |  |
| `location` | `string` |  |
| `name` | `string` |  |
| `news_url` | `string` |  |
| `type` | `map[string]any` |  |
| `url` | `string` |  |
| `video_url` | `string` |  |

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
| `end` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `spacestation` | `map[string]any` |  |
| `start` | `string` |  |
| `url` | `string` |  |

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
| `flight` | `int` |  |
| `id` | `int` |  |
| `launcher_config` | `map[string]any` |  |
| `serial_number` | `string` |  |
| `status` | `string` |  |
| `type` | `string` |  |
| `url` | `string` |  |

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
| `id` | `string` |  |
| `image` | `string` |  |
| `launch_service_provider` | `map[string]any` |  |
| `mission` | `map[string]any` |  |
| `name` | `string` |  |
| `net` | `string` |  |
| `pad` | `map[string]any` |  |
| `probability` | `int` |  |
| `rocket` | `map[string]any` |  |
| `status` | `map[string]any` |  |
| `url` | `string` |  |
| `webcast_live` | `bool` |  |
| `window_end` | `string` |  |
| `window_start` | `string` |  |

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
| `apogee` | `int` |  |
| `consecutive_successful_launch` | `int` |  |
| `description` | `string` |  |
| `diameter` | `float64` |  |
| `failed_launch` | `int` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `int` |  |
| `id` | `int` |  |
| `launch_mass` | `int` |  |
| `length` | `float64` |  |
| `leo_capacity` | `int` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `map[string]any` |  |
| `max_stage` | `int` |  |
| `min_stage` | `int` |  |
| `name` | `string` |  |
| `pending_launch` | `int` |  |
| `successful_launch` | `int` |  |
| `to_thrust` | `int` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

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
| `apogee` | `int` |  |
| `consecutive_successful_launch` | `int` |  |
| `description` | `string` |  |
| `diameter` | `float64` |  |
| `failed_launch` | `int` |  |
| `family` | `string` |  |
| `full_name` | `string` |  |
| `gto_capacity` | `int` |  |
| `id` | `int` |  |
| `launch_mass` | `int` |  |
| `length` | `float64` |  |
| `leo_capacity` | `int` |  |
| `maiden_flight` | `string` |  |
| `manufacturer` | `map[string]any` |  |
| `max_stage` | `int` |  |
| `min_stage` | `int` |  |
| `name` | `string` |  |
| `pending_launch` | `int` |  |
| `successful_launch` | `int` |  |
| `to_thrust` | `int` |  |
| `url` | `string` |  |
| `variant` | `string` |  |

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
| `country_code` | `string` |  |
| `id` | `int` |  |
| `map_image` | `string` |  |
| `name` | `string` |  |
| `total_landing_count` | `int` |  |
| `total_launch_count` | `int` |  |
| `url` | `string` |  |

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
| `agency_id` | `int` |  |
| `id` | `int` |  |
| `info_url` | `string` |  |
| `latitude` | `string` |  |
| `location` | `map[string]any` |  |
| `longitude` | `string` |  |
| `map_image` | `string` |  |
| `map_url` | `string` |  |
| `name` | `string` |  |
| `total_launch_count` | `int` |  |
| `url` | `string` |  |
| `wiki_url` | `string` |  |

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
| `deorbited` | `string` |  |
| `description` | `string` |  |
| `founded` | `string` |  |
| `id` | `int` |  |
| `image_url` | `string` |  |
| `name` | `string` |  |
| `orbit` | `string` |  |
| `owner` | `[]any` |  |
| `status` | `map[string]any` |  |
| `type` | `map[string]any` |  |
| `url` | `string` |  |

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
| `capability` | `string` |  |
| `crew_capacity` | `int` |  |
| `detail` | `string` |  |
| `diameter` | `float64` |  |
| `height` | `float64` |  |
| `history` | `string` |  |
| `human_rated` | `bool` |  |
| `id` | `int` |  |
| `image_url` | `string` |  |
| `in_use` | `bool` |  |
| `maiden_flight` | `string` |  |
| `name` | `string` |  |
| `type` | `map[string]any` |  |
| `url` | `string` |  |

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
agency := client.Agency(nil)
agency.List(nil, nil)

// agency.Data() now returns the agency data from the last list
// agency.Match() returns the last match criteria
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
