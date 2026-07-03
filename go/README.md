# LaunchLibrary2 Golang SDK



The Golang SDK for the LaunchLibrary2 API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/launch-library2-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/launch-library2-sdk/go=../path/to/github.com/voxgig-sdk/launch-library2-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/launch-library2-sdk/go"
    "github.com/voxgig-sdk/launch-library2-sdk/go/core"
)

func main() {
    client := sdk.NewLaunchLibrary2SDK(map[string]any{
        "apikey": os.Getenv("LAUNCH-LIBRARY2_APIKEY"),
    })
```

### 2. List agencys

```go
    result, err := client.Agency(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a agency

```go
    result, err = client.Agency(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
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

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
LAUNCH-LIBRARY2_TEST_LIVE=TRUE
LAUNCH-LIBRARY2_APIKEY=<your-key>
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
| `"apikey"` | `string` | API key for authentication. |
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
| `Agency` | `(data map[string]any) LaunchLibrary2Entity` | Create a Agency entity instance. |
| `Astronaut` | `(data map[string]any) LaunchLibrary2Entity` | Create a Astronaut entity instance. |
| `Docking` | `(data map[string]any) LaunchLibrary2Entity` | Create a Docking entity instance. |
| `DockingEvent` | `(data map[string]any) LaunchLibrary2Entity` | Create a DockingEvent entity instance. |
| `Event` | `(data map[string]any) LaunchLibrary2Entity` | Create a Event entity instance. |
| `Expedition` | `(data map[string]any) LaunchLibrary2Entity` | Create a Expedition entity instance. |
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
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

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

```go
result, err := client.Agency(nil).Load(map[string]any{"id": "agency_id"}, nil)
```

#### Example: List

```go
results, err := client.Agency(nil).List(nil, nil)
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

```go
result, err := client.Astronaut(nil).Load(map[string]any{"id": "astronaut_id"}, nil)
```

#### Example: List

```go
results, err := client.Astronaut(nil).List(nil, nil)
```


### Docking

Create an instance: `docking := client.Docking(nil)`


### DockingEvent

Create an instance: `docking_event := client.DockingEvent(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.DockingEvent(nil).Load(map[string]any{"id": "docking_event_id"}, nil)
```

#### Example: List

```go
results, err := client.DockingEvent(nil).List(nil, nil)
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

```go
result, err := client.Event(nil).Load(map[string]any{"id": "event_id"}, nil)
```

#### Example: List

```go
results, err := client.Event(nil).List(nil, nil)
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
| `crew` | ``$ARRAY`` |  |
| `end` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `spacestation` | ``$OBJECT`` |  |
| `start` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Expedition(nil).Load(map[string]any{"id": "expedition_id"}, nil)
```

#### Example: List

```go
results, err := client.Expedition(nil).List(nil, nil)
```


### FirstStage

Create an instance: `first_stage := client.FirstStage(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.FirstStage(nil).Load(map[string]any{"id": "first_stage_id"}, nil)
```

#### Example: List

```go
results, err := client.FirstStage(nil).List(nil, nil)
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

```go
result, err := client.Launch(nil).Load(map[string]any{"id": "launch_id"}, nil)
```

#### Example: List

```go
results, err := client.Launch(nil).List(nil, nil)
```


### LaunchVehicle

Create an instance: `launch_vehicle := client.LaunchVehicle(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

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

```go
results, err := client.LaunchVehicle(nil).List(nil, nil)
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

```go
result, err := client.Launcher(nil).Load(map[string]any{"id": "launcher_id"}, nil)
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
| `country_code` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `map_image` | ``$STRING`` |  |
| `name` | ``$STRING`` |  |
| `total_landing_count` | ``$INTEGER`` |  |
| `total_launch_count` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Location(nil).Load(map[string]any{"id": "location_id"}, nil)
```

#### Example: List

```go
results, err := client.Location(nil).List(nil, nil)
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

```go
result, err := client.Pad(nil).Load(map[string]any{"id": "pad_id"}, nil)
```

#### Example: List

```go
results, err := client.Pad(nil).List(nil, nil)
```


### ReusableFirstStage

Create an instance: `reusable_first_stage := client.ReusableFirstStage(nil)`


### SpaceStation

Create an instance: `space_station := client.SpaceStation(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.SpaceStation(nil).Load(map[string]any{"id": "space_station_id"}, nil)
```

#### Example: List

```go
results, err := client.SpaceStation(nil).List(nil, nil)
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

```go
result, err := client.Spacecraft(nil).Load(map[string]any{"id": "spacecraft_id"}, nil)
```

#### Example: List

```go
results, err := client.Spacecraft(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
