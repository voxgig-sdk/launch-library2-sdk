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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "agencies",
									},
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
								"parts": []any{
									"agencies",
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
								"segments": []any{
									map[string]any{
										"lit": "agencies",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"agencies",
									"{id}",
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
						"format": "date",
						"name": "date_of_birth",
						"short": "Date of birth",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "astronaut",
									},
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
								"parts": []any{
									"astronaut",
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
								"segments": []any{
									map[string]any{
										"lit": "astronaut",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"astronaut",
									"{id}",
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
						"format": "date-time",
						"name": "departure",
						"short": "Departure time",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "docking_event",
									},
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
								"parts": []any{
									"docking_event",
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
								"segments": []any{
									map[string]any{
										"lit": "docking_event",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"docking_event",
									"{id}",
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
						"format": "date-time",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "event",
									},
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
								"parts": []any{
									"event",
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
								"segments": []any{
									map[string]any{
										"lit": "event",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"event",
									"{id}",
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
						"format": "date-time",
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
						"format": "date-time",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "expedition",
									},
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
								"parts": []any{
									"expedition",
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
								"segments": []any{
									map[string]any{
										"lit": "expedition",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"expedition",
									"{id}",
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
						"format": "date",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "firststage",
									},
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
								"parts": []any{
									"firststage",
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
								"segments": []any{
									map[string]any{
										"lit": "firststage",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"firststage",
									"{id}",
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
						"format": "date-time",
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
						"format": "date-time",
						"name": "window_end",
						"short": "End of launch window",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "window_start",
						"short": "Start of launch window",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "launch",
									},
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
								"parts": []any{
									"launch",
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
								"segments": []any{
									map[string]any{
										"lit": "launch",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"launch",
									"{id}",
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
						"format": "date",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "launcher",
									},
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
								"parts": []any{
									"config",
									"launcher",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "launcher",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"config",
									"launcher",
									"{id}",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "location",
									},
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
								"parts": []any{
									"location",
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
								"segments": []any{
									map[string]any{
										"lit": "location",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"location",
									"{id}",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "pad",
									},
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
								"parts": []any{
									"pad",
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
								"segments": []any{
									map[string]any{
										"lit": "pad",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"pad",
									"{id}",
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
						"format": "date",
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
						"format": "date",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "spacestation",
									},
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
								"parts": []any{
									"spacestation",
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
								"segments": []any{
									map[string]any{
										"lit": "spacestation",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"spacestation",
									"{id}",
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
						"format": "date",
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
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "spacecraft",
									},
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
								"parts": []any{
									"config",
									"spacecraft",
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
								"segments": []any{
									map[string]any{
										"lit": "config",
									},
									map[string]any{
										"lit": "spacecraft",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"config",
									"spacecraft",
									"{id}",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
