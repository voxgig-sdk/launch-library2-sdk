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
				"docking_event": map[string]any{},
				"event": map[string]any{},
				"expedition": map[string]any{},
				"first_stage": map[string]any{},
				"launch": map[string]any{},
				"launch_vehicle": map[string]any{},
				"launcher": map[string]any{},
				"location": map[string]any{},
				"pad": map[string]any{},
				"space_station": map[string]any{},
				"spacecraft": map[string]any{},
			},
		},
		"entity": map[string]any{
			"agency": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "abbrev",
						"title": "Abbrev",
						"type": "`$STRING`",
						"short": "Agency abbreviation",
					},
					map[string]any{
						"name": "administrator",
						"title": "Administrator",
						"type": "`$STRING`",
						"short": "Agency administrator",
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO country code",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Agency description",
					},
					map[string]any{
						"name": "founding_year",
						"title": "Founding Year",
						"type": "`$STRING`",
						"short": "Year agency was founded",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Agency ID",
					},
					map[string]any{
						"name": "logo_url",
						"title": "Logo Url",
						"type": "`$STRING`",
						"short": "URL to agency logo",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the agency",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Type of agency",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this agency",
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
								"kind": "http",
								"method": "GET",
								"orig": "/agencies",
								"segments": []any{
									map[string]any{
										"lit": "agencies",
									},
								},
								"parts": []any{
									"agencies",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "agency_type",
											"orig": "agency_type",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "country_code",
											"orig": "country_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"agencies",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Bio",
						"type": "`$STRING`",
						"short": "Biographical information",
					},
					map[string]any{
						"name": "date_of_birth",
						"title": "Date Of Birth",
						"type": "`$STRING`",
						"short": "Date of birth",
						"format": "date",
					},
					map[string]any{
						"name": "date_of_death",
						"title": "Date Of Death",
						"type": "`$STRING`",
						"short": "Date of death if applicable",
						"format": "date",
					},
					map[string]any{
						"name": "flights_count",
						"title": "Flights Count",
						"type": "`$INTEGER`",
						"short": "Number of flights",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Astronaut ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the astronaut",
					},
					map[string]any{
						"name": "nationality",
						"title": "Nationality",
						"type": "`$STRING`",
						"short": "Astronaut nationality",
					},
					map[string]any{
						"name": "profile_image",
						"title": "Profile Image",
						"type": "`$STRING`",
						"short": "URL to profile image",
					},
					map[string]any{
						"name": "spacewalks_count",
						"title": "Spacewalks Count",
						"type": "`$INTEGER`",
						"short": "Number of spacewalks",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this astronaut",
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
								"kind": "http",
								"method": "GET",
								"orig": "/astronaut",
								"segments": []any{
									map[string]any{
										"lit": "astronaut",
									},
								},
								"parts": []any{
									"astronaut",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "nationality",
											"orig": "nationality",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"astronaut",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"docking_event": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "departure",
						"title": "Departure",
						"type": "`$STRING`",
						"short": "Departure time",
						"format": "date-time",
					},
					map[string]any{
						"name": "docking",
						"title": "Docking",
						"type": "`$STRING`",
						"short": "Docking time",
						"format": "date-time",
					},
					map[string]any{
						"name": "docking_location",
						"title": "Docking Location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "flight_vehicle",
						"title": "Flight Vehicle",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Docking event ID",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this docking event",
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
								"kind": "http",
								"method": "GET",
								"orig": "/docking_event",
								"segments": []any{
									map[string]any{
										"lit": "docking_event",
									},
								},
								"parts": []any{
									"docking_event",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "docking_location",
											"orig": "docking_location",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "spacestation",
											"orig": "spacestation",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"docking_event",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Date",
						"type": "`$STRING`",
						"short": "Event date and time",
						"format": "date-time",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the event",
					},
					map[string]any{
						"name": "feature_image",
						"title": "Feature Image",
						"type": "`$STRING`",
						"short": "URL to feature image",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Event ID",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$STRING`",
						"short": "Event location",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the event",
					},
					map[string]any{
						"name": "news_url",
						"title": "News Url",
						"type": "`$STRING`",
						"short": "URL to news article",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this event",
					},
					map[string]any{
						"name": "video_url",
						"title": "Video Url",
						"type": "`$STRING`",
						"short": "URL to video",
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
								"kind": "http",
								"method": "GET",
								"orig": "/event",
								"segments": []any{
									map[string]any{
										"lit": "event",
									},
								},
								"parts": []any{
									"event",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"search",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"event",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.type`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Crew",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "end",
						"title": "End",
						"type": "`$STRING`",
						"short": "End date of the expedition",
						"format": "date-time",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Expedition ID",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the expedition",
					},
					map[string]any{
						"name": "spacestation",
						"title": "Spacestation",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "start",
						"title": "Start",
						"type": "`$STRING`",
						"short": "Start date of the expedition",
						"format": "date-time",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this expedition",
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
								"kind": "http",
								"method": "GET",
								"orig": "/expedition",
								"segments": []any{
									map[string]any{
										"lit": "expedition",
									},
								},
								"parts": []any{
									"expedition",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "spacestation",
											"orig": "spacestation",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"expedition",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Apogee",
						"type": "`$INTEGER`",
						"short": "Apogee in km",
					},
					map[string]any{
						"name": "consecutive_successful_launches",
						"title": "Consecutive Successful Launches",
						"type": "`$INTEGER`",
						"short": "Number of consecutive successful launches",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the launcher",
					},
					map[string]any{
						"name": "diameter",
						"title": "Diameter",
						"type": "`$NUMBER`",
						"short": "Diameter in meters",
					},
					map[string]any{
						"name": "failed_launches",
						"title": "Failed Launches",
						"type": "`$INTEGER`",
						"short": "Number of failed launches",
					},
					map[string]any{
						"name": "family",
						"title": "Family",
						"type": "`$STRING`",
						"short": "Launcher family",
					},
					map[string]any{
						"name": "flights",
						"title": "Flights",
						"type": "`$INTEGER`",
						"short": "Number of flights",
					},
					map[string]any{
						"name": "full_name",
						"title": "Full Name",
						"type": "`$STRING`",
						"short": "Full name of the launcher",
					},
					map[string]any{
						"name": "gto_capacity",
						"title": "Gto Capacity",
						"type": "`$INTEGER`",
						"short": "GTO capacity in kg",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Configuration ID",
					},
					map[string]any{
						"name": "launch_mass",
						"title": "Launch Mass",
						"type": "`$INTEGER`",
						"short": "Launch mass in kg",
					},
					map[string]any{
						"name": "launcher_config",
						"title": "Launcher Config",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "length",
						"title": "Length",
						"type": "`$NUMBER`",
						"short": "Length in meters",
					},
					map[string]any{
						"name": "leo_capacity",
						"title": "Leo Capacity",
						"type": "`$INTEGER`",
						"short": "LEO capacity in kg",
					},
					map[string]any{
						"name": "maiden_flight",
						"title": "Maiden Flight",
						"type": "`$STRING`",
						"short": "Date of maiden flight",
						"format": "date",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "max_stage",
						"title": "Max Stage",
						"type": "`$INTEGER`",
						"short": "Maximum number of stages",
					},
					map[string]any{
						"name": "min_stage",
						"title": "Min Stage",
						"type": "`$INTEGER`",
						"short": "Minimum number of stages",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the launcher configuration",
					},
					map[string]any{
						"name": "pending_launches",
						"title": "Pending Launches",
						"type": "`$INTEGER`",
						"short": "Number of pending launches",
					},
					map[string]any{
						"name": "serial_number",
						"title": "Serial Number",
						"type": "`$STRING`",
						"short": "Serial number of the first stage",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$STRING`",
						"short": "Current status",
					},
					map[string]any{
						"name": "successful_launches",
						"title": "Successful Launches",
						"type": "`$INTEGER`",
						"short": "Number of successful launches",
					},
					map[string]any{
						"name": "to_thrust",
						"title": "To Thrust",
						"type": "`$INTEGER`",
						"short": "Takeoff thrust in kN",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Type of first stage",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this configuration",
					},
					map[string]any{
						"name": "variant",
						"title": "Variant",
						"type": "`$STRING`",
						"short": "Variant of the launcher",
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
								"kind": "http",
								"method": "GET",
								"orig": "/firststage",
								"segments": []any{
									map[string]any{
										"lit": "firststage",
									},
								},
								"parts": []any{
									"firststage",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "flight_number",
											"orig": "flight_number",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "serial_number",
											"orig": "serial_number",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"firststage",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.launcher_config`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Id",
						"type": "`$STRING`",
						"short": "UUID of the launch",
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$STRING`",
						"short": "URL to launch image",
					},
					map[string]any{
						"name": "launch_service_provider",
						"title": "Launch Service Provider",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "mission",
						"title": "Mission",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the launch",
					},
					map[string]any{
						"name": "net",
						"title": "Net",
						"type": "`$STRING`",
						"short": "Net Earliest Time (NET) for launch",
						"format": "date-time",
					},
					map[string]any{
						"name": "pad",
						"title": "Pad",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "probability",
						"title": "Probability",
						"type": "`$INTEGER`",
						"short": "Launch probability percentage",
					},
					map[string]any{
						"name": "rocket",
						"title": "Rocket",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this launch",
					},
					map[string]any{
						"name": "webcast_live",
						"title": "Webcast Live",
						"type": "`$BOOLEAN`",
						"short": "Whether the webcast is currently live",
					},
					map[string]any{
						"name": "window_end",
						"title": "Window End",
						"type": "`$STRING`",
						"short": "End of launch window",
						"format": "date-time",
					},
					map[string]any{
						"name": "window_start",
						"title": "Window Start",
						"type": "`$STRING`",
						"short": "Start of launch window",
						"format": "date-time",
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
								"kind": "http",
								"method": "GET",
								"orig": "/launch",
								"segments": []any{
									map[string]any{
										"lit": "launch",
									},
								},
								"parts": []any{
									"launch",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "lsp_id",
											"orig": "lsp_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "lsp_name",
											"orig": "lsp_name",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "rocket_configuration_id",
											"orig": "rocket_configuration_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "spacecraft_id",
											"orig": "spacecraft_id",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"launch",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Apogee",
						"type": "`$INTEGER`",
						"short": "Apogee in km",
					},
					map[string]any{
						"name": "consecutive_successful_launches",
						"title": "Consecutive Successful Launches",
						"type": "`$INTEGER`",
						"short": "Number of consecutive successful launches",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the launcher",
					},
					map[string]any{
						"name": "diameter",
						"title": "Diameter",
						"type": "`$NUMBER`",
						"short": "Diameter in meters",
					},
					map[string]any{
						"name": "failed_launches",
						"title": "Failed Launches",
						"type": "`$INTEGER`",
						"short": "Number of failed launches",
					},
					map[string]any{
						"name": "family",
						"title": "Family",
						"type": "`$STRING`",
						"short": "Launcher family",
					},
					map[string]any{
						"name": "full_name",
						"title": "Full Name",
						"type": "`$STRING`",
						"short": "Full name of the launcher",
					},
					map[string]any{
						"name": "gto_capacity",
						"title": "Gto Capacity",
						"type": "`$INTEGER`",
						"short": "GTO capacity in kg",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Configuration ID",
					},
					map[string]any{
						"name": "launch_mass",
						"title": "Launch Mass",
						"type": "`$INTEGER`",
						"short": "Launch mass in kg",
					},
					map[string]any{
						"name": "length",
						"title": "Length",
						"type": "`$NUMBER`",
						"short": "Length in meters",
					},
					map[string]any{
						"name": "leo_capacity",
						"title": "Leo Capacity",
						"type": "`$INTEGER`",
						"short": "LEO capacity in kg",
					},
					map[string]any{
						"name": "maiden_flight",
						"title": "Maiden Flight",
						"type": "`$STRING`",
						"short": "Date of maiden flight",
						"format": "date",
					},
					map[string]any{
						"name": "manufacturer",
						"title": "Manufacturer",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "max_stage",
						"title": "Max Stage",
						"type": "`$INTEGER`",
						"short": "Maximum number of stages",
					},
					map[string]any{
						"name": "min_stage",
						"title": "Min Stage",
						"type": "`$INTEGER`",
						"short": "Minimum number of stages",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the launcher configuration",
					},
					map[string]any{
						"name": "pending_launches",
						"title": "Pending Launches",
						"type": "`$INTEGER`",
						"short": "Number of pending launches",
					},
					map[string]any{
						"name": "successful_launches",
						"title": "Successful Launches",
						"type": "`$INTEGER`",
						"short": "Number of successful launches",
					},
					map[string]any{
						"name": "to_thrust",
						"title": "To Thrust",
						"type": "`$INTEGER`",
						"short": "Takeoff thrust in kN",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this configuration",
					},
					map[string]any{
						"name": "variant",
						"title": "Variant",
						"type": "`$STRING`",
						"short": "Variant of the launcher",
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
								"parts": []any{
									"config",
									"launcher",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "family",
											"orig": "family",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "manufacturer",
											"orig": "manufacturer",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
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
						"title": "Abbrev",
						"type": "`$STRING`",
						"short": "Agency abbreviation",
					},
					map[string]any{
						"name": "administrator",
						"title": "Administrator",
						"type": "`$STRING`",
						"short": "Agency administrator",
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO country code",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Agency description",
					},
					map[string]any{
						"name": "founding_year",
						"title": "Founding Year",
						"type": "`$STRING`",
						"short": "Year agency was founded",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Agency ID",
					},
					map[string]any{
						"name": "logo_url",
						"title": "Logo Url",
						"type": "`$STRING`",
						"short": "URL to agency logo",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the agency",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"short": "Type of agency",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this agency",
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
								"parts": []any{
									"config",
									"launcher",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.manufacturer`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO country code",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Location ID",
					},
					map[string]any{
						"name": "map_image",
						"title": "Map Image",
						"type": "`$STRING`",
						"short": "URL to map image",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the location",
					},
					map[string]any{
						"name": "total_landing_count",
						"title": "Total Landing Count",
						"type": "`$INTEGER`",
						"short": "Total number of landings at this location",
					},
					map[string]any{
						"name": "total_launch_count",
						"title": "Total Launch Count",
						"type": "`$INTEGER`",
						"short": "Total number of launches from this location",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this location",
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
								"kind": "http",
								"method": "GET",
								"orig": "/location",
								"segments": []any{
									map[string]any{
										"lit": "location",
									},
								},
								"parts": []any{
									"location",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "country_code",
											"orig": "country_code",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"location",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Agency Id",
						"type": "`$INTEGER`",
						"short": "ID of the agency that operates this pad",
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO country code",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Location ID",
					},
					map[string]any{
						"name": "info_url",
						"title": "Info Url",
						"type": "`$STRING`",
						"short": "URL to more information",
					},
					map[string]any{
						"name": "latitude",
						"title": "Latitude",
						"type": "`$STRING`",
						"short": "Latitude coordinate",
					},
					map[string]any{
						"name": "location",
						"title": "Location",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "longitude",
						"title": "Longitude",
						"type": "`$STRING`",
						"short": "Longitude coordinate",
					},
					map[string]any{
						"name": "map_image",
						"title": "Map Image",
						"type": "`$STRING`",
						"short": "URL to map image",
					},
					map[string]any{
						"name": "map_url",
						"title": "Map Url",
						"type": "`$STRING`",
						"short": "URL to map",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the location",
					},
					map[string]any{
						"name": "total_landing_count",
						"title": "Total Landing Count",
						"type": "`$INTEGER`",
						"short": "Total number of landings at this location",
					},
					map[string]any{
						"name": "total_launch_count",
						"title": "Total Launch Count",
						"type": "`$INTEGER`",
						"short": "Total number of launches from this location",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this location",
					},
					map[string]any{
						"name": "wiki_url",
						"title": "Wiki Url",
						"type": "`$STRING`",
						"short": "Wikipedia URL",
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
								"kind": "http",
								"method": "GET",
								"orig": "/pad",
								"segments": []any{
									map[string]any{
										"lit": "pad",
									},
								},
								"parts": []any{
									"pad",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "location",
											"orig": "location",
											"type": "`$INTEGER`",
											"kind": "query",
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"pad",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.location`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"space_station": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "deorbited",
						"title": "Deorbited",
						"type": "`$STRING`",
						"short": "Date the space station was deorbited",
						"format": "date",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"short": "Description of the space station",
					},
					map[string]any{
						"name": "founded",
						"title": "Founded",
						"type": "`$STRING`",
						"short": "Date the space station was founded",
						"format": "date",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Space station ID",
					},
					map[string]any{
						"name": "image_url",
						"title": "Image Url",
						"type": "`$STRING`",
						"short": "URL to space station image",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the space station",
					},
					map[string]any{
						"name": "orbit",
						"title": "Orbit",
						"type": "`$STRING`",
						"short": "Orbital information",
					},
					map[string]any{
						"name": "owners",
						"title": "Owners",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "status",
						"title": "Status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this space station",
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
								"kind": "http",
								"method": "GET",
								"orig": "/spacestation",
								"segments": []any{
									map[string]any{
										"lit": "spacestation",
									},
								},
								"parts": []any{
									"spacestation",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "owner",
											"orig": "owner",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"spacestation",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
						"title": "Agency",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "capability",
						"title": "Capability",
						"type": "`$STRING`",
						"short": "Spacecraft capability",
					},
					map[string]any{
						"name": "crew_capacity",
						"title": "Crew Capacity",
						"type": "`$INTEGER`",
						"short": "Crew capacity",
					},
					map[string]any{
						"name": "details",
						"title": "Details",
						"type": "`$STRING`",
						"short": "Detailed information",
					},
					map[string]any{
						"name": "diameter",
						"title": "Diameter",
						"type": "`$NUMBER`",
						"short": "Diameter in meters",
					},
					map[string]any{
						"name": "height",
						"title": "Height",
						"type": "`$NUMBER`",
						"short": "Height in meters",
					},
					map[string]any{
						"name": "history",
						"title": "History",
						"type": "`$STRING`",
						"short": "Historical information",
					},
					map[string]any{
						"name": "human_rated",
						"title": "Human Rated",
						"type": "`$BOOLEAN`",
						"short": "Whether the spacecraft is human-rated",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Spacecraft configuration ID",
					},
					map[string]any{
						"name": "image_url",
						"title": "Image Url",
						"type": "`$STRING`",
						"short": "URL to spacecraft image",
					},
					map[string]any{
						"name": "in_use",
						"title": "In Use",
						"type": "`$BOOLEAN`",
						"short": "Whether the spacecraft is currently in use",
					},
					map[string]any{
						"name": "maiden_flight",
						"title": "Maiden Flight",
						"type": "`$STRING`",
						"short": "Date of maiden flight",
						"format": "date",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Name of the spacecraft",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "API URL for this configuration",
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
								"parts": []any{
									"config",
									"spacecraft",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 10,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "search",
											"orig": "search",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "status",
											"orig": "status",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"config",
									"spacecraft",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$INTEGER`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
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
