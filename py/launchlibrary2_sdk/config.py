# LaunchLibrary2 SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "LaunchLibrary2",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://ll.thespacedevs.com/2.2.0",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "agency": {},
                "astronaut": {},
                "docking": {},
                "docking_event": {},
                "event": {},
                "expedition": {},
                "first_stage": {},
                "launch": {},
                "launch_vehicle": {},
                "launcher": {},
                "location": {},
                "pad": {},
                "reusable_first_stage": {},
                "space_station": {},
                "spacecraft": {},
            },
        },
        "entity": {
      "agency": {
        "fields": [
          {
            "name": "abbrev",
            "type": "`$STRING`",
          },
          {
            "name": "administrator",
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "founding_year",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "logo_url",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "agency",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "agency_type",
                      "orig": "agency_type",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "country_code",
                      "orig": "country_code",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/agencies",
                "parts": [
                  "agencies",
                ],
                "select": {
                  "exist": [
                    "agency_type",
                    "country_code",
                    "limit",
                    "offset",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/agencies/{id}",
                "parts": [
                  "agencies",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "astronaut": {
        "fields": [
          {
            "name": "bio",
            "type": "`$STRING`",
          },
          {
            "name": "date_of_birth",
            "type": "`$STRING`",
          },
          {
            "name": "date_of_death",
            "type": "`$STRING`",
          },
          {
            "name": "flights_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "nationality",
            "type": "`$STRING`",
          },
          {
            "name": "profile_image",
            "type": "`$STRING`",
          },
          {
            "name": "spacewalks_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "type": "`$OBJECT`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "astronaut",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "nationality",
                      "orig": "nationality",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/astronaut",
                "parts": [
                  "astronaut",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "nationality",
                    "offset",
                    "search",
                    "status",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/astronaut/{id}",
                "parts": [
                  "astronaut",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "docking": {
        "fields": [],
        "name": "docking",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
      "docking_event": {
        "fields": [
          {
            "name": "departure",
            "type": "`$STRING`",
          },
          {
            "name": "docking",
            "type": "`$STRING`",
          },
          {
            "name": "docking_location",
            "type": "`$OBJECT`",
          },
          {
            "name": "flight_vehicle",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "docking_event",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "docking_location",
                      "orig": "docking_location",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "spacestation",
                      "orig": "spacestation",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/docking_event",
                "parts": [
                  "docking_event",
                ],
                "select": {
                  "exist": [
                    "docking_location",
                    "limit",
                    "offset",
                    "spacestation",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/docking_event/{id}",
                "parts": [
                  "docking_event",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "event": {
        "fields": [
          {
            "name": "date",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "feature_image",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "location",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "news_url",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$OBJECT`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "video_url",
            "type": "`$STRING`",
          },
        ],
        "name": "event",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/event",
                "parts": [
                  "event",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/event/{id}",
                "parts": [
                  "event",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.type`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "expedition": {
        "fields": [
          {
            "name": "crew",
            "type": "`$ARRAY`",
          },
          {
            "name": "end",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "spacestation",
            "type": "`$OBJECT`",
          },
          {
            "name": "start",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "expedition",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "spacestation",
                      "orig": "spacestation",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/expedition",
                "parts": [
                  "expedition",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "search",
                    "spacestation",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/expedition/{id}",
                "parts": [
                  "expedition",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "first_stage": {
        "fields": [
          {
            "name": "apogee",
            "type": "`$INTEGER`",
          },
          {
            "name": "consecutive_successful_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "diameter",
            "type": "`$NUMBER`",
          },
          {
            "name": "failed_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "family",
            "type": "`$STRING`",
          },
          {
            "name": "flights",
            "type": "`$INTEGER`",
          },
          {
            "name": "full_name",
            "type": "`$STRING`",
          },
          {
            "name": "gto_capacity",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "launch_mass",
            "type": "`$INTEGER`",
          },
          {
            "name": "launcher_config",
            "type": "`$OBJECT`",
          },
          {
            "name": "length",
            "type": "`$NUMBER`",
          },
          {
            "name": "leo_capacity",
            "type": "`$INTEGER`",
          },
          {
            "name": "maiden_flight",
            "type": "`$STRING`",
          },
          {
            "name": "manufacturer",
            "type": "`$OBJECT`",
          },
          {
            "name": "max_stage",
            "type": "`$INTEGER`",
          },
          {
            "name": "min_stage",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "pending_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "serial_number",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "type": "`$STRING`",
          },
          {
            "name": "successful_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "to_thrust",
            "type": "`$INTEGER`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "variant",
            "type": "`$STRING`",
          },
        ],
        "name": "first_stage",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "flight_number",
                      "orig": "flight_number",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "serial_number",
                      "orig": "serial_number",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/firststage",
                "parts": [
                  "firststage",
                ],
                "select": {
                  "exist": [
                    "flight_number",
                    "limit",
                    "offset",
                    "serial_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/firststage/{id}",
                "parts": [
                  "firststage",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.launcher_config`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "launch": {
        "fields": [
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "name": "image",
            "type": "`$STRING`",
          },
          {
            "name": "launch_service_provider",
            "type": "`$OBJECT`",
          },
          {
            "name": "mission",
            "type": "`$OBJECT`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "net",
            "type": "`$STRING`",
          },
          {
            "name": "pad",
            "type": "`$OBJECT`",
          },
          {
            "name": "probability",
            "type": "`$INTEGER`",
          },
          {
            "name": "rocket",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "type": "`$OBJECT`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "webcast_live",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "window_end",
            "type": "`$STRING`",
          },
          {
            "name": "window_start",
            "type": "`$STRING`",
          },
        ],
        "name": "launch",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "lsp_id",
                      "orig": "lsp_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "lsp_name",
                      "orig": "lsp_name",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "rocket_configuration_id",
                      "orig": "rocket_configuration_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "spacecraft_id",
                      "orig": "spacecraft_id",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/launch",
                "parts": [
                  "launch",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "lsp_id",
                    "lsp_name",
                    "offset",
                    "rocket_configuration_id",
                    "search",
                    "spacecraft_id",
                    "status",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/launch/{id}",
                "parts": [
                  "launch",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "launch_vehicle": {
        "fields": [
          {
            "name": "apogee",
            "type": "`$INTEGER`",
          },
          {
            "name": "consecutive_successful_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "diameter",
            "type": "`$NUMBER`",
          },
          {
            "name": "failed_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "family",
            "type": "`$STRING`",
          },
          {
            "name": "full_name",
            "type": "`$STRING`",
          },
          {
            "name": "gto_capacity",
            "type": "`$INTEGER`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "launch_mass",
            "type": "`$INTEGER`",
          },
          {
            "name": "length",
            "type": "`$NUMBER`",
          },
          {
            "name": "leo_capacity",
            "type": "`$INTEGER`",
          },
          {
            "name": "maiden_flight",
            "type": "`$STRING`",
          },
          {
            "name": "manufacturer",
            "type": "`$OBJECT`",
          },
          {
            "name": "max_stage",
            "type": "`$INTEGER`",
          },
          {
            "name": "min_stage",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "pending_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "successful_launches",
            "type": "`$INTEGER`",
          },
          {
            "name": "to_thrust",
            "type": "`$INTEGER`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "variant",
            "type": "`$STRING`",
          },
        ],
        "name": "launch_vehicle",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "family",
                      "orig": "family",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "manufacturer",
                      "orig": "manufacturer",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/config/launcher",
                "parts": [
                  "config",
                  "launcher",
                ],
                "select": {
                  "exist": [
                    "family",
                    "limit",
                    "manufacturer",
                    "offset",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "launcher": {
        "fields": [
          {
            "name": "abbrev",
            "type": "`$STRING`",
          },
          {
            "name": "administrator",
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "founding_year",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "logo_url",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "launcher",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/config/launcher/{id}",
                "parts": [
                  "config",
                  "launcher",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.manufacturer`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "location": {
        "fields": [
          {
            "name": "country_code",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "map_image",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "total_landing_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "total_launch_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "location",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "kind": "query",
                      "name": "country_code",
                      "orig": "country_code",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/location",
                "parts": [
                  "location",
                ],
                "select": {
                  "exist": [
                    "country_code",
                    "limit",
                    "offset",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/location/{id}",
                "parts": [
                  "location",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "pad": {
        "fields": [
          {
            "name": "agency_id",
            "type": "`$INTEGER`",
          },
          {
            "name": "country_code",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "info_url",
            "type": "`$STRING`",
          },
          {
            "name": "latitude",
            "type": "`$STRING`",
          },
          {
            "name": "location",
            "type": "`$OBJECT`",
          },
          {
            "name": "longitude",
            "type": "`$STRING`",
          },
          {
            "name": "map_image",
            "type": "`$STRING`",
          },
          {
            "name": "map_url",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "total_landing_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "total_launch_count",
            "type": "`$INTEGER`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
          {
            "name": "wiki_url",
            "type": "`$STRING`",
          },
        ],
        "name": "pad",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "location",
                      "orig": "location",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/pad",
                "parts": [
                  "pad",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "location",
                    "offset",
                    "search",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/pad/{id}",
                "parts": [
                  "pad",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.location`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "reusable_first_stage": {
        "fields": [],
        "name": "reusable_first_stage",
        "op": {},
        "relations": {
          "ancestors": [],
        },
      },
      "space_station": {
        "fields": [
          {
            "name": "deorbited",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "type": "`$STRING`",
          },
          {
            "name": "founded",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "image_url",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "orbit",
            "type": "`$STRING`",
          },
          {
            "name": "owners",
            "type": "`$ARRAY`",
          },
          {
            "name": "status",
            "type": "`$OBJECT`",
          },
          {
            "name": "type",
            "type": "`$OBJECT`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "space_station",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "owner",
                      "orig": "owner",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/spacestation",
                "parts": [
                  "spacestation",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "owner",
                    "search",
                    "status",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/spacestation/{id}",
                "parts": [
                  "spacestation",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "spacecraft": {
        "fields": [
          {
            "name": "agency",
            "type": "`$OBJECT`",
          },
          {
            "name": "capability",
            "type": "`$STRING`",
          },
          {
            "name": "crew_capacity",
            "type": "`$INTEGER`",
          },
          {
            "name": "details",
            "type": "`$STRING`",
          },
          {
            "name": "diameter",
            "type": "`$NUMBER`",
          },
          {
            "name": "height",
            "type": "`$NUMBER`",
          },
          {
            "name": "history",
            "type": "`$STRING`",
          },
          {
            "name": "human_rated",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "type": "`$INTEGER`",
          },
          {
            "name": "image_url",
            "type": "`$STRING`",
          },
          {
            "name": "in_use",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "maiden_flight",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "type": "`$OBJECT`",
          },
          {
            "name": "url",
            "type": "`$STRING`",
          },
        ],
        "name": "spacecraft",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 10,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "search",
                      "orig": "search",
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/config/spacecraft",
                "parts": [
                  "config",
                  "spacecraft",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "search",
                    "status",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/config/spacecraft/{id}",
                "parts": [
                  "config",
                  "spacecraft",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
