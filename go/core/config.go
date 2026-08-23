package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "LaunchLibrary2",
			"slug": "launch-library2",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://ll.thespacedevs.com/2.2.0",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"agency": map[string]any{},
				"astronaut": map[string]any{},
				"docking": map[string]any{},
				"docking_event": map[string]any{},
				"event": map[string]any{},
				"expedition": map[string]any{},
				"first_stage": map[string]any{},
				"launch": map[string]any{},
				"launch_vehicle": map[string]any{},
				"launcher": map[string]any{},
				"location": map[string]any{},
				"pad": map[string]any{},
				"reusable_first_stage": map[string]any{},
				"space_station": map[string]any{},
				"spacecraft": map[string]any{},
			},
		},
		"entity": map[string]any{
			"agency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "abbrev",
						"short": "Agency abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "administrator",
						"short": "Agency administrator",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Agency description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "founding_year",
						"short": "Year agency was founded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Agency ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "logo_url",
						"short": "URL to agency logo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the agency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of agency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this agency",
						"type": "`$STRING`",
					},
				},
				"name": "agency",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "agency_type",
											"orig": "agency_type",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "country_code",
											"orig": "country_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/agencies",
								"parts": []any{
									"agencies",
								},
								"select": map[string]any{
									"exist": []any{
										"agency_type",
										"country_code",
										"limit",
										"offset",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/agencies/{id}",
								"parts": []any{
									"agencies",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"astronaut": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bio",
						"short": "Biographical information",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_of_birth",
						"short": "Date of birth",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "date_of_death",
						"short": "Date of death if applicable",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flights_count",
						"short": "Number of flights",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Astronaut ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the astronaut",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nationality",
						"short": "Astronaut nationality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "profile_image",
						"short": "URL to profile image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "spacewalks_count",
						"short": "Number of spacewalks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this astronaut",
						"type": "`$STRING`",
					},
				},
				"name": "astronaut",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "nationality",
											"orig": "nationality",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/astronaut",
								"parts": []any{
									"astronaut",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"nationality",
										"offset",
										"search",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/astronaut/{id}",
								"parts": []any{
									"astronaut",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"docking": map[string]any{
				"fields": []any{},
				"name": "docking",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"docking_event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departure",
						"short": "Departure time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "docking",
						"short": "Docking time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "docking_location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "flight_vehicle",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"short": "Docking event ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this docking event",
						"type": "`$STRING`",
					},
				},
				"name": "docking_event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "docking_location",
											"orig": "docking_location",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "spacestation",
											"orig": "spacestation",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/docking_event",
								"parts": []any{
									"docking_event",
								},
								"select": map[string]any{
									"exist": []any{
										"docking_location",
										"limit",
										"offset",
										"spacestation",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/docking_event/{id}",
								"parts": []any{
									"docking_event",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "date",
						"short": "Event date and time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "feature_image",
						"short": "URL to feature image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Event ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "location",
						"short": "Event location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "news_url",
						"short": "URL to news article",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this event",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "video_url",
						"short": "URL to video",
						"type": "`$STRING`",
					},
				},
				"name": "event",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/event",
								"parts": []any{
									"event",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/event/{id}",
								"parts": []any{
									"event",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.type`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"expedition": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "crew",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "end",
						"short": "End date of the expedition",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Expedition ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the expedition",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "spacestation",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start",
						"short": "Start date of the expedition",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this expedition",
						"type": "`$STRING`",
					},
				},
				"name": "expedition",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "spacestation",
											"orig": "spacestation",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/expedition",
								"parts": []any{
									"expedition",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"search",
										"spacestation",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/expedition/{id}",
								"parts": []any{
									"expedition",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"first_stage": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "apogee",
						"short": "Apogee in km",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "consecutive_successful_launches",
						"short": "Number of consecutive successful launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the launcher",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diameter",
						"short": "Diameter in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "failed_launches",
						"short": "Number of failed launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "family",
						"short": "Launcher family",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "flights",
						"short": "Number of flights",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "full_name",
						"short": "Full name of the launcher",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gto_capacity",
						"short": "GTO capacity in kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Configuration ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_mass",
						"short": "Launch mass in kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launcher_config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "length",
						"short": "Length in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "leo_capacity",
						"short": "LEO capacity in kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maiden_flight",
						"short": "Date of maiden flight",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "max_stage",
						"short": "Maximum number of stages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min_stage",
						"short": "Minimum number of stages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the launcher configuration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pending_launches",
						"short": "Number of pending launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "serial_number",
						"short": "Serial number of the first stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Current status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "successful_launches",
						"short": "Number of successful launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "to_thrust",
						"short": "Takeoff thrust in kN",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of first stage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this configuration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "variant",
						"short": "Variant of the launcher",
						"type": "`$STRING`",
					},
				},
				"name": "first_stage",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "flight_number",
											"orig": "flight_number",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "serial_number",
											"orig": "serial_number",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/firststage",
								"parts": []any{
									"firststage",
								},
								"select": map[string]any{
									"exist": []any{
										"flight_number",
										"limit",
										"offset",
										"serial_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/firststage/{id}",
								"parts": []any{
									"firststage",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.launcher_config`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"launch": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "UUID of the launch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "image",
						"short": "URL to launch image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "launch_service_provider",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "mission",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the launch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "net",
						"short": "Net Earliest Time (NET) for launch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pad",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "probability",
						"short": "Launch probability percentage",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "rocket",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this launch",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "webcast_live",
						"short": "Whether the webcast is currently live",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "window_end",
						"short": "End of launch window",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "window_start",
						"short": "Start of launch window",
						"type": "`$STRING`",
					},
				},
				"name": "launch",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lsp_id",
											"orig": "lsp_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lsp_name",
											"orig": "lsp_name",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "rocket_configuration_id",
											"orig": "rocket_configuration_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "spacecraft_id",
											"orig": "spacecraft_id",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/launch",
								"parts": []any{
									"launch",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"lsp_id",
										"lsp_name",
										"offset",
										"rocket_configuration_id",
										"search",
										"spacecraft_id",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/launch/{id}",
								"parts": []any{
									"launch",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"launch_vehicle": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "apogee",
						"short": "Apogee in km",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "consecutive_successful_launches",
						"short": "Number of consecutive successful launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the launcher",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diameter",
						"short": "Diameter in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "failed_launches",
						"short": "Number of failed launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "family",
						"short": "Launcher family",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "full_name",
						"short": "Full name of the launcher",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gto_capacity",
						"short": "GTO capacity in kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "id",
						"short": "Configuration ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "launch_mass",
						"short": "Launch mass in kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "length",
						"short": "Length in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "leo_capacity",
						"short": "LEO capacity in kg",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "maiden_flight",
						"short": "Date of maiden flight",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "manufacturer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "max_stage",
						"short": "Maximum number of stages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "min_stage",
						"short": "Minimum number of stages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the launcher configuration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pending_launches",
						"short": "Number of pending launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "successful_launches",
						"short": "Number of successful launches",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "to_thrust",
						"short": "Takeoff thrust in kN",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this configuration",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "variant",
						"short": "Variant of the launcher",
						"type": "`$STRING`",
					},
				},
				"name": "launch_vehicle",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "family",
											"orig": "family",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "manufacturer",
											"orig": "manufacturer",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/config/launcher",
								"parts": []any{
									"config",
									"launcher",
								},
								"select": map[string]any{
									"exist": []any{
										"family",
										"limit",
										"manufacturer",
										"offset",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"launcher": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "abbrev",
						"short": "Agency abbreviation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "administrator",
						"short": "Agency administrator",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Agency description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "founding_year",
						"short": "Year agency was founded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Agency ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "logo_url",
						"short": "URL to agency logo",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the agency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of agency",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this agency",
						"type": "`$STRING`",
					},
				},
				"name": "launcher",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/config/launcher/{id}",
								"parts": []any{
									"config",
									"launcher",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.manufacturer`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"location": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "country_code",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Location ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "map_image",
						"short": "URL to map image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_landing_count",
						"short": "Total number of landings at this location",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_launch_count",
						"short": "Total number of launches from this location",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this location",
						"type": "`$STRING`",
					},
				},
				"name": "location",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "country_code",
											"orig": "country_code",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/location",
								"parts": []any{
									"location",
								},
								"select": map[string]any{
									"exist": []any{
										"country_code",
										"limit",
										"offset",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/location/{id}",
								"parts": []any{
									"location",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"pad": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agency_id",
						"short": "ID of the agency that operates this pad",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "country_code",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Location ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "info_url",
						"short": "URL to more information",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "map_image",
						"short": "URL to map image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "map_url",
						"short": "URL to map",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total_landing_count",
						"short": "Total number of landings at this location",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "total_launch_count",
						"short": "Total number of launches from this location",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "wiki_url",
						"short": "Wikipedia URL",
						"type": "`$STRING`",
					},
				},
				"name": "pad",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "location",
											"orig": "location",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/pad",
								"parts": []any{
									"pad",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"location",
										"offset",
										"search",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/pad/{id}",
								"parts": []any{
									"pad",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.location`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reusable_first_stage": map[string]any{
				"fields": []any{},
				"name": "reusable_first_stage",
				"op": map[string]any{},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"space_station": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deorbited",
						"short": "Date the space station was deorbited",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the space station",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "founded",
						"short": "Date the space station was founded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Space station ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "image_url",
						"short": "URL to space station image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the space station",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "orbit",
						"short": "Orbital information",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owners",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this space station",
						"type": "`$STRING`",
					},
				},
				"name": "space_station",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/spacestation",
								"parts": []any{
									"spacestation",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"owner",
										"search",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/spacestation/{id}",
								"parts": []any{
									"spacestation",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"spacecraft": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "agency",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "capability",
						"short": "Spacecraft capability",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "crew_capacity",
						"short": "Crew capacity",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "details",
						"short": "Detailed information",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "diameter",
						"short": "Diameter in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "height",
						"short": "Height in meters",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "history",
						"short": "Historical information",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "human_rated",
						"short": "Whether the spacecraft is human-rated",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"short": "Spacecraft configuration ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "image_url",
						"short": "URL to spacecraft image",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "in_use",
						"short": "Whether the spacecraft is currently in use",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "maiden_flight",
						"short": "Date of maiden flight",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the spacecraft",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"short": "API URL for this configuration",
						"type": "`$STRING`",
					},
				},
				"name": "spacecraft",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 10,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/config/spacecraft",
								"parts": []any{
									"config",
									"spacecraft",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"search",
										"status",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/config/spacecraft/{id}",
								"parts": []any{
									"config",
									"spacecraft",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
