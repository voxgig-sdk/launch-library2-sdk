# LaunchLibrary2 SDK

Browse rocket launches, space events, astronauts, spacecraft and stations from TheSpaceDevs

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Launch Library 2

Launch Library 2 is a REST API published by [TheSpaceDevs](https://thespacedevs.com/), a community project that catalogues the global space industry. The dataset powers a number of third-party launch trackers and dashboards.

What you get from the API:
- Upcoming and previous rocket **launches** with vehicles, pads, mission details and status
- **Agencies** (national space agencies and commercial operators)
- **Astronauts**, **expeditions**, **space stations** and **dockings**
- **Spacecraft** and **launchers**, including reusable first stages
- Space-related **events**, **locations** and launch **pads**

The server is `https://ll.thespacedevs.com/2.2.0` and responses are JSON. The free tier is limited to roughly 15 requests per hour; sustained or higher-throughput use is intended for Patreon supporters.

## Try it

**TypeScript**
```bash
npm install launch-library2
```

**Python**
```bash
pip install launch-library2-sdk
```

**PHP**
```bash
composer require voxgig/launch-library2-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/launch-library2-sdk/go
```

**Ruby**
```bash
gem install launch-library2-sdk
```

**Lua**
```bash
luarocks install launch-library2-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { LaunchLibrary2SDK } from 'launch-library2'

const client = new LaunchLibrary2SDK({})

// List all agencys
const agencys = await client.Agency().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o launch-library2-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "launch-library2": {
      "command": "/abs/path/to/launch-library2-mcp"
    }
  }
}
```

## Entities

The API exposes 15 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Agency** | Space agencies and commercial operators that fund, build or operate missions. | `/agencies` |
| **Astronaut** | Human spaceflight participants with biographical details and mission history. | `/astronaut` |
| **Docking** | Docking ports or interfaces between spacecraft and stations. | `` |
| **DockingEvent** | Records of a spacecraft docking with or undocking from a space station. | `/docking_event` |
| **Event** | Space-related events such as launches, landings, EVAs and mission milestones. | `/event` |
| **Expedition** | Long-duration crewed expeditions to space stations. | `/expedition` |
| **FirstStage** | Individual first-stage boosters used in launches. | `/firststage` |
| **Launch** | Upcoming and previous rocket launches with vehicle, pad and status. | `/launch` |
| **LaunchVehicle** | Specific launch vehicle instances used for a flight. | `/config/launcher` |
| **Launcher** | Launcher (rocket) families and their configurations. | `/config/launcher/{id}` |
| **Location** | Geographic locations that contain launch pads. | `/location` |
| **Pad** | Individual launch pads at a location. | `/pad` |
| **ReusableFirstStage** | Reusable booster cores tracked across multiple flights. | `` |
| **SpaceStation** | Crewed orbital stations and their operating status. | `/spacestation` |
| **Spacecraft** | Crew- or cargo-carrying spacecraft and their flight history. | `/config/spacecraft` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from launchlibrary2_sdk import LaunchLibrary2SDK

client = LaunchLibrary2SDK({})

# List all agencys
agencys, err = client.Agency(None).list(None, None)

# Load a specific agency
agency, err = client.Agency(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'launchlibrary2_sdk.php';

$client = new LaunchLibrary2SDK([]);

// List all agencys
[$agencys, $err] = $client->Agency(null)->list(null, null);

// Load a specific agency
[$agency, $err] = $client->Agency(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/launch-library2-sdk/go"

client := sdk.NewLaunchLibrary2SDK(map[string]any{})

// List all agencys
agencys, err := client.Agency(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "LaunchLibrary2_sdk"

client = LaunchLibrary2SDK.new({})

# List all agencys
agencys, err = client.Agency(nil).list(nil, nil)

# Load a specific agency
agency, err = client.Agency(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("launch-library2_sdk")

local client = sdk.new({})

-- List all agencys
local agencys, err = client:Agency(nil):list(nil, nil)

-- Load a specific agency
local agency, err = client:Agency(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = LaunchLibrary2SDK.test()
const result = await client.Agency().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = LaunchLibrary2SDK.test(None, None)
result, err = client.Agency(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = LaunchLibrary2SDK::test(null, null);
[$result, $err] = $client->Agency(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Agency(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = LaunchLibrary2SDK.test(nil, nil)
result, err = client.Agency(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Agency(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Launch Library 2

- Upstream: [https://thespacedevs.com/llapi](https://thespacedevs.com/llapi)
- API docs: [https://ll.thespacedevs.com/2.2.0/swagger](https://ll.thespacedevs.com/2.2.0/swagger)

- Operated by TheSpaceDevs, a community project covering the space industry
- Free tier is rate-limited to 15 requests per hour
- Higher quotas are available to Patreon supporters
- Consult TheSpaceDevs site for current terms of use and attribution expectations

---

Generated from the Launch Library 2 OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
