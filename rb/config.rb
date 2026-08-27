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
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
          "docking" => {},
          "docking_event" => {},
          "event" => {},
          "expedition" => {},
          "first_stage" => {},
          "launch" => {},
          "launch_vehicle" => {},
          "launcher" => {},
          "location" => {},
          "pad" => {},
          "reusable_first_stage" => {},
          "space_station" => {},
          "spacecraft" => {},
        },
      },
      "entity" => {
        "agency" => {
          "fields" => [
            {
              "name" => "abbrev",
              "short" => "Agency abbreviation",
              "type" => "`$STRING`",
            },
            {
              "name" => "administrator",
              "short" => "Agency administrator",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "short" => "ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Agency description",
              "type" => "`$STRING`",
            },
            {
              "name" => "founding_year",
              "short" => "Year agency was founded",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Agency ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "logo_url",
              "short" => "URL to agency logo",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the agency",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "Type of agency",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "API URL for this agency",
              "type" => "`$STRING`",
            },
          ],
          "name" => "agency",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "agency_type",
                        "orig" => "agency_type",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "country_code",
                        "orig" => "country_code",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agencies",
                  "parts" => [
                    "agencies",
                  ],
                  "select" => {
                    "exist" => [
                      "agency_type",
                      "country_code",
                      "limit",
                      "offset",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/agencies/{id}",
                  "parts" => [
                    "agencies",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "short" => "Biographical information",
              "type" => "`$STRING`",
            },
            {
              "name" => "date_of_birth",
              "short" => "Date of birth",
              "type" => "`$STRING`",
            },
            {
              "name" => "date_of_death",
              "short" => "Date of death if applicable",
              "type" => "`$STRING`",
            },
            {
              "name" => "flights_count",
              "short" => "Number of flights",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Astronaut ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Name of the astronaut",
              "type" => "`$STRING`",
            },
            {
              "name" => "nationality",
              "short" => "Astronaut nationality",
              "type" => "`$STRING`",
            },
            {
              "name" => "profile_image",
              "short" => "URL to profile image",
              "type" => "`$STRING`",
            },
            {
              "name" => "spacewalks_count",
              "short" => "Number of spacewalks",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "short" => "API URL for this astronaut",
              "type" => "`$STRING`",
            },
          ],
          "name" => "astronaut",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "nationality",
                        "orig" => "nationality",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/astronaut",
                  "parts" => [
                    "astronaut",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "nationality",
                      "offset",
                      "search",
                      "status",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/astronaut/{id}",
                  "parts" => [
                    "astronaut",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "docking" => {
          "fields" => [],
          "name" => "docking",
          "op" => {},
          "relations" => {
            "ancestors" => [],
          },
        },
        "docking_event" => {
          "fields" => [
            {
              "name" => "departure",
              "short" => "Departure time",
              "type" => "`$STRING`",
            },
            {
              "name" => "docking",
              "short" => "Docking time",
              "type" => "`$STRING`",
            },
            {
              "name" => "docking_location",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "flight_vehicle",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "id",
              "short" => "Docking event ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "short" => "API URL for this docking event",
              "type" => "`$STRING`",
            },
          ],
          "name" => "docking_event",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "docking_location",
                        "orig" => "docking_location",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "spacestation",
                        "orig" => "spacestation",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/docking_event",
                  "parts" => [
                    "docking_event",
                  ],
                  "select" => {
                    "exist" => [
                      "docking_location",
                      "limit",
                      "offset",
                      "spacestation",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/docking_event/{id}",
                  "parts" => [
                    "docking_event",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "short" => "Event date and time",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Description of the event",
              "type" => "`$STRING`",
            },
            {
              "name" => "feature_image",
              "short" => "URL to feature image",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Event ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "location",
              "short" => "Event location",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the event",
              "type" => "`$STRING`",
            },
            {
              "name" => "news_url",
              "short" => "URL to news article",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "short" => "API URL for this event",
              "type" => "`$STRING`",
            },
            {
              "name" => "video_url",
              "short" => "URL to video",
              "type" => "`$STRING`",
            },
          ],
          "name" => "event",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/event",
                  "parts" => [
                    "event",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/event/{id}",
                  "parts" => [
                    "event",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.type`",
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
              "type" => "`$ARRAY`",
            },
            {
              "name" => "end",
              "short" => "End date of the expedition",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Expedition ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Name of the expedition",
              "type" => "`$STRING`",
            },
            {
              "name" => "spacestation",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "start",
              "short" => "Start date of the expedition",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "API URL for this expedition",
              "type" => "`$STRING`",
            },
          ],
          "name" => "expedition",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "spacestation",
                        "orig" => "spacestation",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/expedition",
                  "parts" => [
                    "expedition",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "search",
                      "spacestation",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/expedition/{id}",
                  "parts" => [
                    "expedition",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "name" => "apogee",
              "short" => "Apogee in km",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "consecutive_successful_launches",
              "short" => "Number of consecutive successful launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "description",
              "short" => "Description of the launcher",
              "type" => "`$STRING`",
            },
            {
              "name" => "diameter",
              "short" => "Diameter in meters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "failed_launches",
              "short" => "Number of failed launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "family",
              "short" => "Launcher family",
              "type" => "`$STRING`",
            },
            {
              "name" => "flights",
              "short" => "Number of flights",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "full_name",
              "short" => "Full name of the launcher",
              "type" => "`$STRING`",
            },
            {
              "name" => "gto_capacity",
              "short" => "GTO capacity in kg",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Configuration ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "launch_mass",
              "short" => "Launch mass in kg",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "launcher_config",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "length",
              "short" => "Length in meters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "leo_capacity",
              "short" => "LEO capacity in kg",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "maiden_flight",
              "short" => "Date of maiden flight",
              "type" => "`$STRING`",
            },
            {
              "name" => "manufacturer",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "max_stage",
              "short" => "Maximum number of stages",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "min_stage",
              "short" => "Minimum number of stages",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Name of the launcher configuration",
              "type" => "`$STRING`",
            },
            {
              "name" => "pending_launches",
              "short" => "Number of pending launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "serial_number",
              "short" => "Serial number of the first stage",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "short" => "Current status",
              "type" => "`$STRING`",
            },
            {
              "name" => "successful_launches",
              "short" => "Number of successful launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "to_thrust",
              "short" => "Takeoff thrust in kN",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "type",
              "short" => "Type of first stage",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "API URL for this configuration",
              "type" => "`$STRING`",
            },
            {
              "name" => "variant",
              "short" => "Variant of the launcher",
              "type" => "`$STRING`",
            },
          ],
          "name" => "first_stage",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "flight_number",
                        "orig" => "flight_number",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "serial_number",
                        "orig" => "serial_number",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/firststage",
                  "parts" => [
                    "firststage",
                  ],
                  "select" => {
                    "exist" => [
                      "flight_number",
                      "limit",
                      "offset",
                      "serial_number",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/firststage/{id}",
                  "parts" => [
                    "firststage",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.launcher_config`",
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
              "short" => "UUID of the launch",
              "type" => "`$STRING`",
            },
            {
              "name" => "image",
              "short" => "URL to launch image",
              "type" => "`$STRING`",
            },
            {
              "name" => "launch_service_provider",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "mission",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "name",
              "short" => "Name of the launch",
              "type" => "`$STRING`",
            },
            {
              "name" => "net",
              "short" => "Net Earliest Time (NET) for launch",
              "type" => "`$STRING`",
            },
            {
              "name" => "pad",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "probability",
              "short" => "Launch probability percentage",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "rocket",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "short" => "API URL for this launch",
              "type" => "`$STRING`",
            },
            {
              "name" => "webcast_live",
              "short" => "Whether the webcast is currently live",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "window_end",
              "short" => "End of launch window",
              "type" => "`$STRING`",
            },
            {
              "name" => "window_start",
              "short" => "Start of launch window",
              "type" => "`$STRING`",
            },
          ],
          "name" => "launch",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "lsp_id",
                        "orig" => "lsp_id",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "lsp_name",
                        "orig" => "lsp_name",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "rocket_configuration_id",
                        "orig" => "rocket_configuration_id",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "spacecraft_id",
                        "orig" => "spacecraft_id",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/launch",
                  "parts" => [
                    "launch",
                  ],
                  "select" => {
                    "exist" => [
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
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/launch/{id}",
                  "parts" => [
                    "launch",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "launch_vehicle" => {
          "fields" => [
            {
              "name" => "apogee",
              "short" => "Apogee in km",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "consecutive_successful_launches",
              "short" => "Number of consecutive successful launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "description",
              "short" => "Description of the launcher",
              "type" => "`$STRING`",
            },
            {
              "name" => "diameter",
              "short" => "Diameter in meters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "failed_launches",
              "short" => "Number of failed launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "family",
              "short" => "Launcher family",
              "type" => "`$STRING`",
            },
            {
              "name" => "full_name",
              "short" => "Full name of the launcher",
              "type" => "`$STRING`",
            },
            {
              "name" => "gto_capacity",
              "short" => "GTO capacity in kg",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "id",
              "short" => "Configuration ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "launch_mass",
              "short" => "Launch mass in kg",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "length",
              "short" => "Length in meters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "leo_capacity",
              "short" => "LEO capacity in kg",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "maiden_flight",
              "short" => "Date of maiden flight",
              "type" => "`$STRING`",
            },
            {
              "name" => "manufacturer",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "max_stage",
              "short" => "Maximum number of stages",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "min_stage",
              "short" => "Minimum number of stages",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "short" => "Name of the launcher configuration",
              "type" => "`$STRING`",
            },
            {
              "name" => "pending_launches",
              "short" => "Number of pending launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "successful_launches",
              "short" => "Number of successful launches",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "to_thrust",
              "short" => "Takeoff thrust in kN",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "short" => "API URL for this configuration",
              "type" => "`$STRING`",
            },
            {
              "name" => "variant",
              "short" => "Variant of the launcher",
              "type" => "`$STRING`",
            },
          ],
          "name" => "launch_vehicle",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "family",
                        "orig" => "family",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "manufacturer",
                        "orig" => "manufacturer",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/launcher",
                  "parts" => [
                    "config",
                    "launcher",
                  ],
                  "select" => {
                    "exist" => [
                      "family",
                      "limit",
                      "manufacturer",
                      "offset",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
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
              "name" => "abbrev",
              "short" => "Agency abbreviation",
              "type" => "`$STRING`",
            },
            {
              "name" => "administrator",
              "short" => "Agency administrator",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "short" => "ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Agency description",
              "type" => "`$STRING`",
            },
            {
              "name" => "founding_year",
              "short" => "Year agency was founded",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Agency ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "logo_url",
              "short" => "URL to agency logo",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the agency",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "short" => "Type of agency",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "short" => "API URL for this agency",
              "type" => "`$STRING`",
            },
          ],
          "name" => "launcher",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/launcher/{id}",
                  "parts" => [
                    "config",
                    "launcher",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.manufacturer`",
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
              "short" => "ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Location ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "map_image",
              "short" => "URL to map image",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the location",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_landing_count",
              "short" => "Total number of landings at this location",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "total_launch_count",
              "short" => "Total number of launches from this location",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "short" => "API URL for this location",
              "type" => "`$STRING`",
            },
          ],
          "name" => "location",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "country_code",
                        "orig" => "country_code",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/location",
                  "parts" => [
                    "location",
                  ],
                  "select" => {
                    "exist" => [
                      "country_code",
                      "limit",
                      "offset",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/location/{id}",
                  "parts" => [
                    "location",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "short" => "ID of the agency that operates this pad",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "country_code",
              "short" => "ISO country code",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Location ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "info_url",
              "short" => "URL to more information",
              "type" => "`$STRING`",
            },
            {
              "name" => "latitude",
              "short" => "Latitude coordinate",
              "type" => "`$STRING`",
            },
            {
              "name" => "location",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "longitude",
              "short" => "Longitude coordinate",
              "type" => "`$STRING`",
            },
            {
              "name" => "map_image",
              "short" => "URL to map image",
              "type" => "`$STRING`",
            },
            {
              "name" => "map_url",
              "short" => "URL to map",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the location",
              "type" => "`$STRING`",
            },
            {
              "name" => "total_landing_count",
              "short" => "Total number of landings at this location",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "total_launch_count",
              "short" => "Total number of launches from this location",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "short" => "API URL for this location",
              "type" => "`$STRING`",
            },
            {
              "name" => "wiki_url",
              "short" => "Wikipedia URL",
              "type" => "`$STRING`",
            },
          ],
          "name" => "pad",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "location",
                        "orig" => "location",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pad",
                  "parts" => [
                    "pad",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "location",
                      "offset",
                      "search",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/pad/{id}",
                  "parts" => [
                    "pad",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.location`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "reusable_first_stage" => {
          "fields" => [],
          "name" => "reusable_first_stage",
          "op" => {},
          "relations" => {
            "ancestors" => [],
          },
        },
        "space_station" => {
          "fields" => [
            {
              "name" => "deorbited",
              "short" => "Date the space station was deorbited",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Description of the space station",
              "type" => "`$STRING`",
            },
            {
              "name" => "founded",
              "short" => "Date the space station was founded",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "short" => "Space station ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "image_url",
              "short" => "URL to space station image",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the space station",
              "type" => "`$STRING`",
            },
            {
              "name" => "orbit",
              "short" => "Orbital information",
              "type" => "`$STRING`",
            },
            {
              "name" => "owners",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "status",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "short" => "API URL for this space station",
              "type" => "`$STRING`",
            },
          ],
          "name" => "space_station",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "owner",
                        "orig" => "owner",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/spacestation",
                  "parts" => [
                    "spacestation",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "owner",
                      "search",
                      "status",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/spacestation/{id}",
                  "parts" => [
                    "spacestation",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
              "type" => "`$OBJECT`",
            },
            {
              "name" => "capability",
              "short" => "Spacecraft capability",
              "type" => "`$STRING`",
            },
            {
              "name" => "crew_capacity",
              "short" => "Crew capacity",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "details",
              "short" => "Detailed information",
              "type" => "`$STRING`",
            },
            {
              "name" => "diameter",
              "short" => "Diameter in meters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "height",
              "short" => "Height in meters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "history",
              "short" => "Historical information",
              "type" => "`$STRING`",
            },
            {
              "name" => "human_rated",
              "short" => "Whether the spacecraft is human-rated",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "short" => "Spacecraft configuration ID",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "image_url",
              "short" => "URL to spacecraft image",
              "type" => "`$STRING`",
            },
            {
              "name" => "in_use",
              "short" => "Whether the spacecraft is currently in use",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "maiden_flight",
              "short" => "Date of maiden flight",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the spacecraft",
              "type" => "`$STRING`",
            },
            {
              "name" => "type",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "url",
              "short" => "API URL for this configuration",
              "type" => "`$STRING`",
            },
          ],
          "name" => "spacecraft",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 10,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "offset",
                        "orig" => "offset",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "search",
                        "orig" => "search",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "status",
                        "orig" => "status",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/spacecraft",
                  "parts" => [
                    "config",
                    "spacecraft",
                  ],
                  "select" => {
                    "exist" => [
                      "limit",
                      "offset",
                      "search",
                      "status",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/config/spacecraft/{id}",
                  "parts" => [
                    "config",
                    "spacecraft",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
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
