# LaunchLibrary2 SDK configuration

module LaunchLibrary2Config
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "LaunchLibrary2",
        "slug" => "launch-library2",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://ll.thespacedevs.com/2.2.0",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "agency" => {},
          "astronaut" => {},
          "docking_event" => {},
          "event" => {},
          "expedition" => {},
          "first_stage" => {},
          "launch" => {},
          "launcher" => {},
          "location" => {},
          "pad" => {},
          "space_station" => {},
          "spacecraft" => {},
        },
      },
      "entity" => {
        "agency" => {
          "fields" => [
            {
              "name" => "abbrev",
              "title" => "Abbrev",
              "type" => "`$STRING`",
              "short" => "Agency abbreviation",
            },
            {
              "name" => "administrator",
              "title" => "Administrator",
              "type" => "`$STRING`",
              "short" => "Agency administrator",
            },
            {
              "name" => "country_code",
              "title" => "Country Code",
              "type" => "`$STRING`",
              "short" => "ISO country code",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Agency description",
            },
            {
              "name" => "founding_year",
              "title" => "Founding Year",
              "type" => "`$STRING`",
              "short" => "Year agency was founded",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Agency ID",
            },
            {
              "name" => "logo_url",
              "title" => "Logo Url",
              "type" => "`$STRING`",
              "short" => "URL to agency logo",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the agency",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "short" => "Type of agency",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this agency",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "agency",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agencies",
                  "segments" => [
                    {
                      "lit" => "agencies",
                    },
                  ],
                  "parts" => [
                    "agencies",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "agency_type",
                        "orig" => "agency_type",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "country_code",
                        "orig" => "country_code",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agencies/{id}",
                  "segments" => [
                    {
                      "lit" => "agencies",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "agencies",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "astronaut" => {
          "fields" => [
            {
              "name" => "bio",
              "title" => "Bio",
              "type" => "`$STRING`",
              "short" => "Biographical information",
            },
            {
              "name" => "date_of_birth",
              "title" => "Date Of Birth",
              "type" => "`$STRING`",
              "short" => "Date of birth",
              "format" => "date",
            },
            {
              "name" => "date_of_death",
              "title" => "Date Of Death",
              "type" => "`$STRING`",
              "short" => "Date of death if applicable",
              "format" => "date",
            },
            {
              "name" => "flights_count",
              "title" => "Flights Count",
              "type" => "`$INTEGER`",
              "short" => "Number of flights",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Astronaut ID",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the astronaut",
            },
            {
              "name" => "nationality",
              "title" => "Nationality",
              "type" => "`$STRING`",
              "short" => "Astronaut nationality",
            },
            {
              "name" => "profile_image",
              "title" => "Profile Image",
              "type" => "`$STRING`",
              "short" => "URL to profile image",
            },
            {
              "name" => "spacewalks_count",
              "title" => "Spacewalks Count",
              "type" => "`$INTEGER`",
              "short" => "Number of spacewalks",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this astronaut",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "astronaut",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/astronaut",
                  "segments" => [
                    {
                      "lit" => "astronaut",
                    },
                  ],
                  "parts" => [
                    "astronaut",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "nationality",
                        "orig" => "nationality",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/astronaut/{id}",
                  "segments" => [
                    {
                      "lit" => "astronaut",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "astronaut",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "docking_event" => {
          "fields" => [
            {
              "name" => "departure",
              "title" => "Departure",
              "type" => "`$STRING`",
              "short" => "Departure time",
              "format" => "date-time",
            },
            {
              "name" => "docking",
              "title" => "Docking",
              "type" => "`$STRING`",
              "short" => "Docking time",
              "format" => "date-time",
            },
            {
              "name" => "docking_location",
              "title" => "Docking Location",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "flight_vehicle",
              "title" => "Flight Vehicle",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Docking event ID",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this docking event",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "docking_event",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/docking_event",
                  "segments" => [
                    {
                      "lit" => "docking_event",
                    },
                  ],
                  "parts" => [
                    "docking_event",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "docking_location",
                        "orig" => "docking_location",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "spacestation",
                        "orig" => "spacestation",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/docking_event/{id}",
                  "segments" => [
                    {
                      "lit" => "docking_event",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "docking_event",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "event" => {
          "fields" => [
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "short" => "Event date and time",
              "format" => "date-time",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Description of the event",
            },
            {
              "name" => "feature_image",
              "title" => "Feature Image",
              "type" => "`$STRING`",
              "short" => "URL to feature image",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Event ID",
            },
            {
              "name" => "location",
              "title" => "Location",
              "type" => "`$STRING`",
              "short" => "Event location",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the event",
            },
            {
              "name" => "news_url",
              "title" => "News Url",
              "type" => "`$STRING`",
              "short" => "URL to news article",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this event",
            },
            {
              "name" => "video_url",
              "title" => "Video Url",
              "type" => "`$STRING`",
              "short" => "URL to video",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "event",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/event",
                  "segments" => [
                    {
                      "lit" => "event",
                    },
                  ],
                  "parts" => [
                    "event",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/event/{id}",
                  "segments" => [
                    {
                      "lit" => "event",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "event",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "expedition" => {
          "fields" => [
            {
              "name" => "crew",
              "title" => "Crew",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "end",
              "title" => "End",
              "type" => "`$STRING`",
              "short" => "End date of the expedition",
              "format" => "date-time",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Expedition ID",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the expedition",
            },
            {
              "name" => "spacestation",
              "title" => "Spacestation",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "start",
              "title" => "Start",
              "type" => "`$STRING`",
              "short" => "Start date of the expedition",
              "format" => "date-time",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this expedition",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "expedition",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/expedition",
                  "segments" => [
                    {
                      "lit" => "expedition",
                    },
                  ],
                  "parts" => [
                    "expedition",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "spacestation",
                        "orig" => "spacestation",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/expedition/{id}",
                  "segments" => [
                    {
                      "lit" => "expedition",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "expedition",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "first_stage" => {
          "fields" => [
            {
              "name" => "flights",
              "title" => "Flights",
              "type" => "`$INTEGER`",
              "short" => "Number of flights",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "First stage ID",
            },
            {
              "name" => "launcher_config",
              "title" => "Launcher Config",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "serial_number",
              "title" => "Serial Number",
              "type" => "`$STRING`",
              "short" => "Serial number of the first stage",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$STRING`",
              "short" => "Current status",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "short" => "Type of first stage",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this first stage",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "first_stage",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/firststage",
                  "segments" => [
                    {
                      "lit" => "firststage",
                    },
                  ],
                  "parts" => [
                    "firststage",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "flight_number",
                        "orig" => "flight_number",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "serial_number",
                        "orig" => "serial_number",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/firststage/{id}",
                  "segments" => [
                    {
                      "lit" => "firststage",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "firststage",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "launch" => {
          "fields" => [
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "short" => "UUID of the launch",
            },
            {
              "name" => "image",
              "title" => "Image",
              "type" => "`$STRING`",
              "short" => "URL to launch image",
            },
            {
              "name" => "launch_service_provider",
              "title" => "Launch Service Provider",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "mission",
              "title" => "Mission",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the launch",
            },
            {
              "name" => "net",
              "title" => "Net",
              "type" => "`$STRING`",
              "short" => "Net Earliest Time (NET) for launch",
              "format" => "date-time",
            },
            {
              "name" => "pad",
              "title" => "Pad",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "probability",
              "title" => "Probability",
              "type" => "`$INTEGER`",
              "short" => "Launch probability percentage",
            },
            {
              "name" => "rocket",
              "title" => "Rocket",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this launch",
            },
            {
              "name" => "webcast_live",
              "title" => "Webcast Live",
              "type" => "`$BOOLEAN`",
              "short" => "Whether the webcast is currently live",
            },
            {
              "name" => "window_end",
              "title" => "Window End",
              "type" => "`$STRING`",
              "short" => "End of launch window",
              "format" => "date-time",
            },
            {
              "name" => "window_start",
              "title" => "Window Start",
              "type" => "`$STRING`",
              "short" => "Start of launch window",
              "format" => "date-time",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "launch",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/launch",
                  "segments" => [
                    {
                      "lit" => "launch",
                    },
                  ],
                  "parts" => [
                    "launch",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "lsp_id",
                        "orig" => "lsp__id",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "lsp_name",
                        "orig" => "lsp__name",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "rocket_configuration_id",
                        "orig" => "rocket__configuration__id",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "spacecraft_id",
                        "orig" => "spacecraft__id",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                      },
                      {
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/launch/{id}",
                  "segments" => [
                    {
                      "lit" => "launch",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "launch",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "launcher" => {
          "fields" => [
            {
              "name" => "apogee",
              "title" => "Apogee",
              "type" => "`$INTEGER`",
              "short" => "Apogee in km",
            },
            {
              "name" => "consecutive_successful_launches",
              "title" => "Consecutive Successful Launches",
              "type" => "`$INTEGER`",
              "short" => "Number of consecutive successful launches",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Description of the launcher",
            },
            {
              "name" => "diameter",
              "title" => "Diameter",
              "type" => "`$NUMBER`",
              "short" => "Diameter in meters",
            },
            {
              "name" => "failed_launches",
              "title" => "Failed Launches",
              "type" => "`$INTEGER`",
              "short" => "Number of failed launches",
            },
            {
              "name" => "family",
              "title" => "Family",
              "type" => "`$STRING`",
              "short" => "Launcher family",
            },
            {
              "name" => "full_name",
              "title" => "Full Name",
              "type" => "`$STRING`",
              "short" => "Full name of the launcher",
            },
            {
              "name" => "gto_capacity",
              "title" => "Gto Capacity",
              "type" => "`$INTEGER`",
              "short" => "GTO capacity in kg",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Configuration ID",
            },
            {
              "name" => "launch_mass",
              "title" => "Launch Mass",
              "type" => "`$INTEGER`",
              "short" => "Launch mass in kg",
            },
            {
              "name" => "length",
              "title" => "Length",
              "type" => "`$NUMBER`",
              "short" => "Length in meters",
            },
            {
              "name" => "leo_capacity",
              "title" => "Leo Capacity",
              "type" => "`$INTEGER`",
              "short" => "LEO capacity in kg",
            },
            {
              "name" => "maiden_flight",
              "title" => "Maiden Flight",
              "type" => "`$STRING`",
              "short" => "Date of maiden flight",
              "format" => "date",
            },
            {
              "name" => "manufacturer",
              "title" => "Manufacturer",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "max_stage",
              "title" => "Max Stage",
              "type" => "`$INTEGER`",
              "short" => "Maximum number of stages",
            },
            {
              "name" => "min_stage",
              "title" => "Min Stage",
              "type" => "`$INTEGER`",
              "short" => "Minimum number of stages",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the launcher configuration",
            },
            {
              "name" => "pending_launches",
              "title" => "Pending Launches",
              "type" => "`$INTEGER`",
              "short" => "Number of pending launches",
            },
            {
              "name" => "successful_launches",
              "title" => "Successful Launches",
              "type" => "`$INTEGER`",
              "short" => "Number of successful launches",
            },
            {
              "name" => "to_thrust",
              "title" => "To Thrust",
              "type" => "`$INTEGER`",
              "short" => "Takeoff thrust in kN",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this configuration",
            },
            {
              "name" => "variant",
              "title" => "Variant",
              "type" => "`$STRING`",
              "short" => "Variant of the launcher",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "launcher",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/launcher",
                  "segments" => [
                    {
                      "lit" => "config",
                    },
                    {
                      "lit" => "launcher",
                    },
                  ],
                  "parts" => [
                    "config",
                    "launcher",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "family",
                        "orig" => "family",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "manufacturer",
                        "orig" => "manufacturer",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/launcher/{id}",
                  "segments" => [
                    {
                      "lit" => "config",
                    },
                    {
                      "lit" => "launcher",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "config",
                    "launcher",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "location" => {
          "fields" => [
            {
              "name" => "country_code",
              "title" => "Country Code",
              "type" => "`$STRING`",
              "short" => "ISO country code",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Location ID",
            },
            {
              "name" => "map_image",
              "title" => "Map Image",
              "type" => "`$STRING`",
              "short" => "URL to map image",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the location",
            },
            {
              "name" => "total_landing_count",
              "title" => "Total Landing Count",
              "type" => "`$INTEGER`",
              "short" => "Total number of landings at this location",
            },
            {
              "name" => "total_launch_count",
              "title" => "Total Launch Count",
              "type" => "`$INTEGER`",
              "short" => "Total number of launches from this location",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this location",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "location",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/location",
                  "segments" => [
                    {
                      "lit" => "location",
                    },
                  ],
                  "parts" => [
                    "location",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "country_code",
                        "orig" => "country_code",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/location/{id}",
                  "segments" => [
                    {
                      "lit" => "location",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "location",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "pad" => {
          "fields" => [
            {
              "name" => "agency_id",
              "title" => "Agency Id",
              "type" => "`$INTEGER`",
              "short" => "ID of the agency that operates this pad",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Pad ID",
            },
            {
              "name" => "info_url",
              "title" => "Info Url",
              "type" => "`$STRING`",
              "short" => "URL to more information",
            },
            {
              "name" => "latitude",
              "title" => "Latitude",
              "type" => "`$STRING`",
              "short" => "Latitude coordinate",
            },
            {
              "name" => "location",
              "title" => "Location",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "longitude",
              "title" => "Longitude",
              "type" => "`$STRING`",
              "short" => "Longitude coordinate",
            },
            {
              "name" => "map_image",
              "title" => "Map Image",
              "type" => "`$STRING`",
              "short" => "URL to map image",
            },
            {
              "name" => "map_url",
              "title" => "Map Url",
              "type" => "`$STRING`",
              "short" => "URL to map",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the pad",
            },
            {
              "name" => "total_launch_count",
              "title" => "Total Launch Count",
              "type" => "`$INTEGER`",
              "short" => "Total number of launches from this pad",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this pad",
            },
            {
              "name" => "wiki_url",
              "title" => "Wiki Url",
              "type" => "`$STRING`",
              "short" => "Wikipedia URL",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "pad",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pad",
                  "segments" => [
                    {
                      "lit" => "pad",
                    },
                  ],
                  "parts" => [
                    "pad",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "field" => true,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pad/{id}",
                  "segments" => [
                    {
                      "lit" => "pad",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "pad",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "space_station" => {
          "fields" => [
            {
              "name" => "deorbited",
              "title" => "Deorbited",
              "type" => "`$STRING`",
              "short" => "Date the space station was deorbited",
              "format" => "date",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "short" => "Description of the space station",
            },
            {
              "name" => "founded",
              "title" => "Founded",
              "type" => "`$STRING`",
              "short" => "Date the space station was founded",
              "format" => "date",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Space station ID",
            },
            {
              "name" => "image_url",
              "title" => "Image Url",
              "type" => "`$STRING`",
              "short" => "URL to space station image",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the space station",
            },
            {
              "name" => "orbit",
              "title" => "Orbit",
              "type" => "`$STRING`",
              "short" => "Orbital information",
            },
            {
              "name" => "owners",
              "title" => "Owners",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "status",
              "title" => "Status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this space station",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "space_station",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/spacestation",
                  "segments" => [
                    {
                      "lit" => "spacestation",
                    },
                  ],
                  "parts" => [
                    "spacestation",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "owner",
                        "orig" => "owners",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "field" => true,
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/spacestation/{id}",
                  "segments" => [
                    {
                      "lit" => "spacestation",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "spacestation",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "spacecraft" => {
          "fields" => [
            {
              "name" => "agency",
              "title" => "Agency",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "capability",
              "title" => "Capability",
              "type" => "`$STRING`",
              "short" => "Spacecraft capability",
            },
            {
              "name" => "crew_capacity",
              "title" => "Crew Capacity",
              "type" => "`$INTEGER`",
              "short" => "Crew capacity",
            },
            {
              "name" => "details",
              "title" => "Details",
              "type" => "`$STRING`",
              "short" => "Detailed information",
            },
            {
              "name" => "diameter",
              "title" => "Diameter",
              "type" => "`$NUMBER`",
              "short" => "Diameter in meters",
            },
            {
              "name" => "height",
              "title" => "Height",
              "type" => "`$NUMBER`",
              "short" => "Height in meters",
            },
            {
              "name" => "history",
              "title" => "History",
              "type" => "`$STRING`",
              "short" => "Historical information",
            },
            {
              "name" => "human_rated",
              "title" => "Human Rated",
              "type" => "`$BOOLEAN`",
              "short" => "Whether the spacecraft is human-rated",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$INTEGER`",
              "short" => "Spacecraft configuration ID",
            },
            {
              "name" => "image_url",
              "title" => "Image Url",
              "type" => "`$STRING`",
              "short" => "URL to spacecraft image",
            },
            {
              "name" => "in_use",
              "title" => "In Use",
              "type" => "`$BOOLEAN`",
              "short" => "Whether the spacecraft is currently in use",
            },
            {
              "name" => "maiden_flight",
              "title" => "Maiden Flight",
              "type" => "`$STRING`",
              "short" => "Date of maiden flight",
              "format" => "date",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "short" => "Name of the spacecraft",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "title" => "Url",
              "type" => "`$STRING`",
              "short" => "API URL for this configuration",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "spacecraft",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/spacecraft",
                  "segments" => [
                    {
                      "lit" => "config",
                    },
                    {
                      "lit" => "spacecraft",
                    },
                  ],
                  "parts" => [
                    "config",
                    "spacecraft",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 10,
                      },
                      {
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                      {
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                        "kind" => "query",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/spacecraft/{id}",
                  "segments" => [
                    {
                      "lit" => "config",
                    },
                    {
                      "lit" => "spacecraft",
                    },
                    {
                      "var" => "id",
                    },
                  ],
                  "parts" => [
                    "config",
                    "spacecraft",
                    "{id}",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$INTEGER`",
                        "kind" => "param",
                        "reqd" => true,
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    LaunchLibrary2Features.make_feature(name)
  end
end
