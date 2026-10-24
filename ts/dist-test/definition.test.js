"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "agency",
        "accessor": "Agency",
        "op": "list",
        "method": "GET",
        "path": "/agencies",
        "args": [],
        "select": {
            "agency_type": "v1",
            "country_code": "v1",
            "limit": 10,
            "offset": 0,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "agency_type",
            "country_code"
        ],
        "queryArgs": [
            {
                "name": "agency_type",
                "wire": "agency_type"
            },
            {
                "name": "country_code",
                "wire": "country_code"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "type": "x",
                    "country_code": "x",
                    "abbrev": "x",
                    "description": "x",
                    "administrator": "x",
                    "founding_year": "x",
                    "logo_url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "agency",
        "accessor": "Agency",
        "op": "load",
        "method": "GET",
        "path": "/agencies/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "type": "x",
            "country_code": "x",
            "abbrev": "x",
            "description": "x",
            "administrator": "x",
            "founding_year": "x",
            "logo_url": "x"
        },
        "idField": "id"
    },
    {
        "entity": "astronaut",
        "accessor": "Astronaut",
        "op": "list",
        "method": "GET",
        "path": "/astronaut",
        "args": [],
        "select": {
            "limit": 10,
            "nationality": "v1",
            "offset": 0,
            "search": "v1",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "status",
            "nationality"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "nationality",
                "wire": "nationality"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "status": {
                        "id": 1,
                        "name": "x"
                    },
                    "type": {
                        "id": 1,
                        "name": "x"
                    },
                    "date_of_birth": "2026-01-01",
                    "date_of_death": "2026-01-01",
                    "nationality": "x",
                    "bio": "x",
                    "profile_image": "x",
                    "flights_count": 1,
                    "spacewalks_count": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "astronaut",
        "accessor": "Astronaut",
        "op": "load",
        "method": "GET",
        "path": "/astronaut/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "status": {
                "id": 1,
                "name": "x"
            },
            "type": {
                "id": 1,
                "name": "x"
            },
            "date_of_birth": "2026-01-01",
            "date_of_death": "2026-01-01",
            "nationality": "x",
            "bio": "x",
            "profile_image": "x",
            "flights_count": 1,
            "spacewalks_count": 1
        },
        "idField": "id"
    },
    {
        "entity": "docking_event",
        "accessor": "DockingEvent",
        "op": "list",
        "method": "GET",
        "path": "/docking_event",
        "args": [],
        "select": {
            "docking_location": "v1",
            "limit": 10,
            "offset": 0,
            "spacestation": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "spacestation",
            "docking_location"
        ],
        "queryArgs": [
            {
                "name": "docking_location",
                "wire": "docking_location"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "spacestation",
                "wire": "spacestation"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "docking": "2026-01-01T00:00:00Z",
                    "departure": "2026-01-01T00:00:00Z",
                    "flight_vehicle": {
                        "id": 1,
                        "spacecraft": {}
                    },
                    "docking_location": {
                        "id": 1,
                        "name": "x",
                        "spacestation": {
                            "id": 1,
                            "url": "x",
                            "name": "x",
                            "status": {
                                "id": 1,
                                "name": "x"
                            },
                            "type": {
                                "id": 1,
                                "name": "x"
                            },
                            "founded": "2026-01-01",
                            "deorbited": "2026-01-01",
                            "orbit": "x",
                            "description": "x",
                            "image_url": "x",
                            "owners": [
                                {}
                            ]
                        }
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "docking_event",
        "accessor": "DockingEvent",
        "op": "load",
        "method": "GET",
        "path": "/docking_event/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "docking": "2026-01-01T00:00:00Z",
            "departure": "2026-01-01T00:00:00Z",
            "flight_vehicle": {
                "id": 1,
                "spacecraft": {}
            },
            "docking_location": {
                "id": 1,
                "name": "x",
                "spacestation": {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "status": {
                        "id": 1,
                        "name": "x"
                    },
                    "type": {
                        "id": 1,
                        "name": "x"
                    },
                    "founded": "2026-01-01",
                    "deorbited": "2026-01-01",
                    "orbit": "x",
                    "description": "x",
                    "image_url": "x",
                    "owners": [
                        {
                            "id": 1,
                            "url": "x",
                            "name": "x",
                            "type": "x",
                            "country_code": "x",
                            "abbrev": "x",
                            "description": "x",
                            "administrator": "x",
                            "founding_year": "x",
                            "logo_url": "x"
                        }
                    ]
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "event",
        "accessor": "Event",
        "op": "list",
        "method": "GET",
        "path": "/event",
        "args": [],
        "select": {
            "limit": 10,
            "offset": 0,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "type": {
                        "id": 1,
                        "name": "x"
                    },
                    "description": "x",
                    "location": "x",
                    "date": "2026-01-01T00:00:00Z",
                    "news_url": "x",
                    "video_url": "x",
                    "feature_image": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "event",
        "accessor": "Event",
        "op": "load",
        "method": "GET",
        "path": "/event/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "type": {
                "id": 1,
                "name": "x"
            },
            "description": "x",
            "location": "x",
            "date": "2026-01-01T00:00:00Z",
            "news_url": "x",
            "video_url": "x",
            "feature_image": "x"
        },
        "idField": "id"
    },
    {
        "entity": "expedition",
        "accessor": "Expedition",
        "op": "list",
        "method": "GET",
        "path": "/expedition",
        "args": [],
        "select": {
            "limit": 10,
            "offset": 0,
            "search": "v1",
            "spacestation": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "spacestation"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "spacestation",
                "wire": "spacestation"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "start": "2026-01-01T00:00:00Z",
                    "end": "2026-01-01T00:00:00Z",
                    "spacestation": {
                        "id": 1,
                        "url": "x",
                        "name": "x",
                        "status": {
                            "id": 1,
                            "name": "x"
                        },
                        "type": {
                            "id": 1,
                            "name": "x"
                        },
                        "founded": "2026-01-01",
                        "deorbited": "2026-01-01",
                        "orbit": "x",
                        "description": "x",
                        "image_url": "x",
                        "owners": [
                            {
                                "id": 1,
                                "url": "x",
                                "name": "x",
                                "type": "x",
                                "country_code": "x",
                                "abbrev": "x",
                                "description": "x",
                                "administrator": "x",
                                "founding_year": "x",
                                "logo_url": "x"
                            }
                        ]
                    },
                    "crew": [
                        {
                            "astronaut": {
                                "id": 1,
                                "url": "x",
                                "name": "x",
                                "status": {},
                                "type": {},
                                "date_of_birth": "2026-01-01",
                                "date_of_death": "2026-01-01",
                                "nationality": "x",
                                "bio": "x",
                                "profile_image": "x",
                                "flights_count": 1,
                                "spacewalks_count": 1
                            },
                            "role": {
                                "id": 1,
                                "name": "x"
                            }
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "expedition",
        "accessor": "Expedition",
        "op": "load",
        "method": "GET",
        "path": "/expedition/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "start": "2026-01-01T00:00:00Z",
            "end": "2026-01-01T00:00:00Z",
            "spacestation": {
                "id": 1,
                "url": "x",
                "name": "x",
                "status": {
                    "id": 1,
                    "name": "x"
                },
                "type": {
                    "id": 1,
                    "name": "x"
                },
                "founded": "2026-01-01",
                "deorbited": "2026-01-01",
                "orbit": "x",
                "description": "x",
                "image_url": "x",
                "owners": [
                    {
                        "id": 1,
                        "url": "x",
                        "name": "x",
                        "type": "x",
                        "country_code": "x",
                        "abbrev": "x",
                        "description": "x",
                        "administrator": "x",
                        "founding_year": "x",
                        "logo_url": "x"
                    }
                ]
            },
            "crew": [
                {
                    "astronaut": {
                        "id": 1,
                        "url": "x",
                        "name": "x",
                        "status": {
                            "id": 1,
                            "name": "x"
                        },
                        "type": {
                            "id": 1,
                            "name": "x"
                        },
                        "date_of_birth": "2026-01-01",
                        "date_of_death": "2026-01-01",
                        "nationality": "x",
                        "bio": "x",
                        "profile_image": "x",
                        "flights_count": 1,
                        "spacewalks_count": 1
                    },
                    "role": {
                        "id": 1,
                        "name": "x"
                    }
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "first_stage",
        "accessor": "FirstStage",
        "op": "list",
        "method": "GET",
        "path": "/firststage",
        "args": [],
        "select": {
            "flight_number": "v1",
            "limit": 10,
            "offset": 0,
            "serial_number": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "serial_number",
            "flight_number"
        ],
        "queryArgs": [
            {
                "name": "flight_number",
                "wire": "flight_number"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "serial_number",
                "wire": "serial_number"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "type": "x",
                    "serial_number": "x",
                    "launcher_config": {
                        "id": 1,
                        "url": "x",
                        "name": "x",
                        "family": "x",
                        "full_name": "x",
                        "variant": "x",
                        "description": "x",
                        "manufacturer": {
                            "id": 1,
                            "url": "x",
                            "name": "x",
                            "type": "x",
                            "country_code": "x",
                            "abbrev": "x",
                            "description": "x",
                            "administrator": "x",
                            "founding_year": "x",
                            "logo_url": "x"
                        },
                        "min_stage": 1,
                        "max_stage": 1,
                        "length": 1,
                        "diameter": 1,
                        "maiden_flight": "2026-01-01",
                        "launch_mass": 1,
                        "leo_capacity": 1,
                        "gto_capacity": 1,
                        "to_thrust": 1,
                        "apogee": 1,
                        "successful_launches": 1,
                        "consecutive_successful_launches": 1,
                        "failed_launches": 1,
                        "pending_launches": 1
                    },
                    "flights": 1,
                    "status": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "first_stage",
        "accessor": "FirstStage",
        "op": "load",
        "method": "GET",
        "path": "/firststage/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "type": "x",
            "serial_number": "x",
            "launcher_config": {
                "id": 1,
                "url": "x",
                "name": "x",
                "family": "x",
                "full_name": "x",
                "variant": "x",
                "description": "x",
                "manufacturer": {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "type": "x",
                    "country_code": "x",
                    "abbrev": "x",
                    "description": "x",
                    "administrator": "x",
                    "founding_year": "x",
                    "logo_url": "x"
                },
                "min_stage": 1,
                "max_stage": 1,
                "length": 1,
                "diameter": 1,
                "maiden_flight": "2026-01-01",
                "launch_mass": 1,
                "leo_capacity": 1,
                "gto_capacity": 1,
                "to_thrust": 1,
                "apogee": 1,
                "successful_launches": 1,
                "consecutive_successful_launches": 1,
                "failed_launches": 1,
                "pending_launches": 1
            },
            "flights": 1,
            "status": "x"
        },
        "idField": "id"
    },
    {
        "entity": "launch",
        "accessor": "Launch",
        "op": "list",
        "method": "GET",
        "path": "/launch",
        "args": [],
        "select": {
            "limit": 10,
            "lsp_id": "v1",
            "lsp_name": "v1",
            "offset": 0,
            "rocket_configuration_id": "v1",
            "search": "v1",
            "spacecraft_id": "v1",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "lsp__id",
            "lsp__name",
            "rocket__configuration__id",
            "spacecraft__id",
            "status"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "lsp_id",
                "wire": "lsp__id"
            },
            {
                "name": "lsp_name",
                "wire": "lsp__name"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "rocket_configuration_id",
                "wire": "rocket__configuration__id"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "spacecraft_id",
                "wire": "spacecraft__id"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": "x",
                    "url": "x",
                    "name": "x",
                    "status": {
                        "id": 1,
                        "name": "x"
                    },
                    "net": "2026-01-01T00:00:00Z",
                    "window_end": "2026-01-01T00:00:00Z",
                    "window_start": "2026-01-01T00:00:00Z",
                    "mission": {
                        "id": 1,
                        "name": "x",
                        "description": "x",
                        "type": "x",
                        "orbit": {}
                    },
                    "pad": {
                        "id": 1,
                        "name": "x",
                        "location": {}
                    },
                    "rocket": {
                        "id": 1,
                        "configuration": {}
                    },
                    "launch_service_provider": {
                        "id": 1,
                        "name": "x",
                        "type": "x"
                    },
                    "image": "x",
                    "webcast_live": true,
                    "probability": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "launch",
        "accessor": "Launch",
        "op": "load",
        "method": "GET",
        "path": "/launch/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": "x",
            "url": "x",
            "name": "x",
            "status": {
                "id": 1,
                "name": "x"
            },
            "net": "2026-01-01T00:00:00Z",
            "window_end": "2026-01-01T00:00:00Z",
            "window_start": "2026-01-01T00:00:00Z",
            "mission": {
                "id": 1,
                "name": "x",
                "description": "x",
                "type": "x",
                "orbit": {}
            },
            "pad": {
                "id": 1,
                "name": "x",
                "location": {}
            },
            "rocket": {
                "id": 1,
                "configuration": {}
            },
            "launch_service_provider": {
                "id": 1,
                "name": "x",
                "type": "x"
            },
            "image": "x",
            "webcast_live": true,
            "probability": 1
        },
        "idField": "id"
    },
    {
        "entity": "launcher",
        "accessor": "Launcher",
        "op": "list",
        "method": "GET",
        "path": "/config/launcher",
        "args": [],
        "select": {
            "family": "v1",
            "limit": 10,
            "manufacturer": "v1",
            "offset": 0,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "family",
            "manufacturer"
        ],
        "queryArgs": [
            {
                "name": "family",
                "wire": "family"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "manufacturer",
                "wire": "manufacturer"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "family": "x",
                    "full_name": "x",
                    "variant": "x",
                    "description": "x",
                    "manufacturer": {
                        "id": 1,
                        "url": "x",
                        "name": "x",
                        "type": "x",
                        "country_code": "x",
                        "abbrev": "x",
                        "description": "x",
                        "administrator": "x",
                        "founding_year": "x",
                        "logo_url": "x"
                    },
                    "min_stage": 1,
                    "max_stage": 1,
                    "length": 1,
                    "diameter": 1,
                    "maiden_flight": "2026-01-01",
                    "launch_mass": 1,
                    "leo_capacity": 1,
                    "gto_capacity": 1,
                    "to_thrust": 1,
                    "apogee": 1,
                    "successful_launches": 1,
                    "consecutive_successful_launches": 1,
                    "failed_launches": 1,
                    "pending_launches": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "launcher",
        "accessor": "Launcher",
        "op": "load",
        "method": "GET",
        "path": "/config/launcher/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "family": "x",
            "full_name": "x",
            "variant": "x",
            "description": "x",
            "manufacturer": {
                "id": 1,
                "url": "x",
                "name": "x",
                "type": "x",
                "country_code": "x",
                "abbrev": "x",
                "description": "x",
                "administrator": "x",
                "founding_year": "x",
                "logo_url": "x"
            },
            "min_stage": 1,
            "max_stage": 1,
            "length": 1,
            "diameter": 1,
            "maiden_flight": "2026-01-01",
            "launch_mass": 1,
            "leo_capacity": 1,
            "gto_capacity": 1,
            "to_thrust": 1,
            "apogee": 1,
            "successful_launches": 1,
            "consecutive_successful_launches": 1,
            "failed_launches": 1,
            "pending_launches": 1
        },
        "idField": "id"
    },
    {
        "entity": "location",
        "accessor": "Location",
        "op": "list",
        "method": "GET",
        "path": "/location",
        "args": [],
        "select": {
            "country_code": "v1",
            "limit": 10,
            "offset": 0,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "country_code"
        ],
        "queryArgs": [
            {
                "name": "country_code",
                "wire": "country_code"
            },
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "country_code": "x",
                    "map_image": "x",
                    "total_launch_count": 1,
                    "total_landing_count": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "location",
        "accessor": "Location",
        "op": "load",
        "method": "GET",
        "path": "/location/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "country_code": "x",
            "map_image": "x",
            "total_launch_count": 1,
            "total_landing_count": 1
        },
        "idField": "id"
    },
    {
        "entity": "pad",
        "accessor": "Pad",
        "op": "list",
        "method": "GET",
        "path": "/pad",
        "args": [],
        "select": {
            "limit": 10,
            "location": "v1",
            "offset": 0,
            "search": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "location"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "location",
                "wire": "location"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "agency_id": 1,
                    "name": "x",
                    "info_url": "x",
                    "wiki_url": "x",
                    "map_url": "x",
                    "latitude": "x",
                    "longitude": "x",
                    "location": {
                        "id": 1,
                        "url": "x",
                        "name": "x",
                        "country_code": "x",
                        "map_image": "x",
                        "total_launch_count": 1,
                        "total_landing_count": 1
                    },
                    "map_image": "x",
                    "total_launch_count": 1
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "pad",
        "accessor": "Pad",
        "op": "load",
        "method": "GET",
        "path": "/pad/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "agency_id": 1,
            "name": "x",
            "info_url": "x",
            "wiki_url": "x",
            "map_url": "x",
            "latitude": "x",
            "longitude": "x",
            "location": {
                "id": 1,
                "url": "x",
                "name": "x",
                "country_code": "x",
                "map_image": "x",
                "total_launch_count": 1,
                "total_landing_count": 1
            },
            "map_image": "x",
            "total_launch_count": 1
        },
        "idField": "id"
    },
    {
        "entity": "space_station",
        "accessor": "SpaceStation",
        "op": "list",
        "method": "GET",
        "path": "/spacestation",
        "args": [],
        "select": {
            "limit": 10,
            "offset": 0,
            "owner": "v1",
            "search": "v1",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "status",
            "owners"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "owner",
                "wire": "owners"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "status": {
                        "id": 1,
                        "name": "x"
                    },
                    "type": {
                        "id": 1,
                        "name": "x"
                    },
                    "founded": "2026-01-01",
                    "deorbited": "2026-01-01",
                    "orbit": "x",
                    "description": "x",
                    "image_url": "x",
                    "owners": [
                        {
                            "id": 1,
                            "url": "x",
                            "name": "x",
                            "type": "x",
                            "country_code": "x",
                            "abbrev": "x",
                            "description": "x",
                            "administrator": "x",
                            "founding_year": "x",
                            "logo_url": "x"
                        }
                    ]
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "space_station",
        "accessor": "SpaceStation",
        "op": "load",
        "method": "GET",
        "path": "/spacestation/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "status": {
                "id": 1,
                "name": "x"
            },
            "type": {
                "id": 1,
                "name": "x"
            },
            "founded": "2026-01-01",
            "deorbited": "2026-01-01",
            "orbit": "x",
            "description": "x",
            "image_url": "x",
            "owners": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "type": "x",
                    "country_code": "x",
                    "abbrev": "x",
                    "description": "x",
                    "administrator": "x",
                    "founding_year": "x",
                    "logo_url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "spacecraft",
        "accessor": "Spacecraft",
        "op": "list",
        "method": "GET",
        "path": "/config/spacecraft",
        "args": [],
        "select": {
            "limit": 10,
            "offset": 0,
            "search": "v1",
            "status": "v1"
        },
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [
            "limit",
            "offset",
            "search",
            "status"
        ],
        "queryArgs": [
            {
                "name": "limit",
                "wire": "limit"
            },
            {
                "name": "offset",
                "wire": "offset"
            },
            {
                "name": "search",
                "wire": "search"
            },
            {
                "name": "status",
                "wire": "status"
            }
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "count": 1,
            "next": "x",
            "previous": "x",
            "results": [
                {
                    "id": 1,
                    "url": "x",
                    "name": "x",
                    "type": {
                        "id": 1,
                        "name": "x"
                    },
                    "agency": {
                        "id": 1,
                        "url": "x",
                        "name": "x",
                        "type": "x",
                        "country_code": "x",
                        "abbrev": "x",
                        "description": "x",
                        "administrator": "x",
                        "founding_year": "x",
                        "logo_url": "x"
                    },
                    "in_use": true,
                    "capability": "x",
                    "history": "x",
                    "details": "x",
                    "maiden_flight": "2026-01-01",
                    "height": 1,
                    "diameter": 1,
                    "human_rated": true,
                    "crew_capacity": 1,
                    "image_url": "x"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "spacecraft",
        "accessor": "Spacecraft",
        "op": "load",
        "method": "GET",
        "path": "/config/spacecraft/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "url": "x",
            "name": "x",
            "type": {
                "id": 1,
                "name": "x"
            },
            "agency": {
                "id": 1,
                "url": "x",
                "name": "x",
                "type": "x",
                "country_code": "x",
                "abbrev": "x",
                "description": "x",
                "administrator": "x",
                "founding_year": "x",
                "logo_url": "x"
            },
            "in_use": true,
            "capability": "x",
            "history": "x",
            "details": "x",
            "maiden_flight": "2026-01-01",
            "height": 1,
            "diameter": 1,
            "human_rated": true,
            "crew_capacity": 1,
            "image_url": "x"
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map