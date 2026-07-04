// Typed models for the LaunchLibrary2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Agency is the typed data model for the agency entity.
type Agency struct {
	Abbrev *string `json:"abbrev,omitempty"`
	Administrator *string `json:"administrator,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Description *string `json:"description,omitempty"`
	FoundingYear *string `json:"founding_year,omitempty"`
	Id *int `json:"id,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// AgencyLoadMatch is the typed request payload for Agency.LoadTyped.
type AgencyLoadMatch struct {
	Id int `json:"id"`
}

// AgencyListMatch mirrors the agency fields as an all-optional match
// filter (Go analog of Partial<Agency>).
type AgencyListMatch struct {
	Abbrev *string `json:"abbrev,omitempty"`
	Administrator *string `json:"administrator,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Description *string `json:"description,omitempty"`
	FoundingYear *string `json:"founding_year,omitempty"`
	Id *int `json:"id,omitempty"`
	LogoUrl *string `json:"logo_url,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Astronaut is the typed data model for the astronaut entity.
type Astronaut struct {
	Bio *string `json:"bio,omitempty"`
	DateOfBirth *string `json:"date_of_birth,omitempty"`
	DateOfDeath *string `json:"date_of_death,omitempty"`
	FlightsCount *int `json:"flights_count,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Nationality *string `json:"nationality,omitempty"`
	ProfileImage *string `json:"profile_image,omitempty"`
	SpacewalksCount *int `json:"spacewalks_count,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// AstronautLoadMatch is the typed request payload for Astronaut.LoadTyped.
type AstronautLoadMatch struct {
	Id int `json:"id"`
}

// AstronautListMatch mirrors the astronaut fields as an all-optional match
// filter (Go analog of Partial<Astronaut>).
type AstronautListMatch struct {
	Bio *string `json:"bio,omitempty"`
	DateOfBirth *string `json:"date_of_birth,omitempty"`
	DateOfDeath *string `json:"date_of_death,omitempty"`
	FlightsCount *int `json:"flights_count,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Nationality *string `json:"nationality,omitempty"`
	ProfileImage *string `json:"profile_image,omitempty"`
	SpacewalksCount *int `json:"spacewalks_count,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Docking is the typed data model for the docking entity.
type Docking struct {
}

// DockingEvent is the typed data model for the docking_event entity.
type DockingEvent struct {
	Departure *string `json:"departure,omitempty"`
	Docking *string `json:"docking,omitempty"`
	DockingLocation *map[string]any `json:"docking_location,omitempty"`
	FlightVehicle *map[string]any `json:"flight_vehicle,omitempty"`
	Id *int `json:"id,omitempty"`
	Url *string `json:"url,omitempty"`
}

// DockingEventLoadMatch is the typed request payload for DockingEvent.LoadTyped.
type DockingEventLoadMatch struct {
	Id int `json:"id"`
}

// DockingEventListMatch mirrors the docking_event fields as an all-optional match
// filter (Go analog of Partial<DockingEvent>).
type DockingEventListMatch struct {
	Departure *string `json:"departure,omitempty"`
	Docking *string `json:"docking,omitempty"`
	DockingLocation *map[string]any `json:"docking_location,omitempty"`
	FlightVehicle *map[string]any `json:"flight_vehicle,omitempty"`
	Id *int `json:"id,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	FeatureImage *string `json:"feature_image,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Name *string `json:"name,omitempty"`
	NewsUrl *string `json:"news_url,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	VideoUrl *string `json:"video_url,omitempty"`
}

// EventLoadMatch is the typed request payload for Event.LoadTyped.
type EventLoadMatch struct {
	Id int `json:"id"`
}

// EventListMatch mirrors the event fields as an all-optional match
// filter (Go analog of Partial<Event>).
type EventListMatch struct {
	Date *string `json:"date,omitempty"`
	Description *string `json:"description,omitempty"`
	FeatureImage *string `json:"feature_image,omitempty"`
	Id *int `json:"id,omitempty"`
	Location *string `json:"location,omitempty"`
	Name *string `json:"name,omitempty"`
	NewsUrl *string `json:"news_url,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
	VideoUrl *string `json:"video_url,omitempty"`
}

// Expedition is the typed data model for the expedition entity.
type Expedition struct {
	Crew *[]any `json:"crew,omitempty"`
	End *string `json:"end,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Spacestation *map[string]any `json:"spacestation,omitempty"`
	Start *string `json:"start,omitempty"`
	Url *string `json:"url,omitempty"`
}

// ExpeditionLoadMatch is the typed request payload for Expedition.LoadTyped.
type ExpeditionLoadMatch struct {
	Id int `json:"id"`
}

// ExpeditionListMatch mirrors the expedition fields as an all-optional match
// filter (Go analog of Partial<Expedition>).
type ExpeditionListMatch struct {
	Crew *[]any `json:"crew,omitempty"`
	End *string `json:"end,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Spacestation *map[string]any `json:"spacestation,omitempty"`
	Start *string `json:"start,omitempty"`
	Url *string `json:"url,omitempty"`
}

// FirstStage is the typed data model for the first_stage entity.
type FirstStage struct {
	Flight *int `json:"flight,omitempty"`
	Id *int `json:"id,omitempty"`
	LauncherConfig *map[string]any `json:"launcher_config,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// FirstStageLoadMatch is the typed request payload for FirstStage.LoadTyped.
type FirstStageLoadMatch struct {
	Id int `json:"id"`
}

// FirstStageListMatch mirrors the first_stage fields as an all-optional match
// filter (Go analog of Partial<FirstStage>).
type FirstStageListMatch struct {
	Flight *int `json:"flight,omitempty"`
	Id *int `json:"id,omitempty"`
	LauncherConfig *map[string]any `json:"launcher_config,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
	Status *string `json:"status,omitempty"`
	Type *string `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Launch is the typed data model for the launch entity.
type Launch struct {
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	LaunchServiceProvider *map[string]any `json:"launch_service_provider,omitempty"`
	Mission *map[string]any `json:"mission,omitempty"`
	Name *string `json:"name,omitempty"`
	Net *string `json:"net,omitempty"`
	Pad *map[string]any `json:"pad,omitempty"`
	Probability *int `json:"probability,omitempty"`
	Rocket *map[string]any `json:"rocket,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Url *string `json:"url,omitempty"`
	WebcastLive *bool `json:"webcast_live,omitempty"`
	WindowEnd *string `json:"window_end,omitempty"`
	WindowStart *string `json:"window_start,omitempty"`
}

// LaunchLoadMatch is the typed request payload for Launch.LoadTyped.
type LaunchLoadMatch struct {
	Id string `json:"id"`
}

// LaunchListMatch mirrors the launch fields as an all-optional match
// filter (Go analog of Partial<Launch>).
type LaunchListMatch struct {
	Id *string `json:"id,omitempty"`
	Image *string `json:"image,omitempty"`
	LaunchServiceProvider *map[string]any `json:"launch_service_provider,omitempty"`
	Mission *map[string]any `json:"mission,omitempty"`
	Name *string `json:"name,omitempty"`
	Net *string `json:"net,omitempty"`
	Pad *map[string]any `json:"pad,omitempty"`
	Probability *int `json:"probability,omitempty"`
	Rocket *map[string]any `json:"rocket,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Url *string `json:"url,omitempty"`
	WebcastLive *bool `json:"webcast_live,omitempty"`
	WindowEnd *string `json:"window_end,omitempty"`
	WindowStart *string `json:"window_start,omitempty"`
}

// LaunchVehicle is the typed data model for the launch_vehicle entity.
type LaunchVehicle struct {
	Apogee *int `json:"apogee,omitempty"`
	ConsecutiveSuccessfulLaunch *int `json:"consecutive_successful_launch,omitempty"`
	Description *string `json:"description,omitempty"`
	Diameter *float64 `json:"diameter,omitempty"`
	FailedLaunch *int `json:"failed_launch,omitempty"`
	Family *string `json:"family,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	GtoCapacity *int `json:"gto_capacity,omitempty"`
	Id *int `json:"id,omitempty"`
	LaunchMass *int `json:"launch_mass,omitempty"`
	Length *float64 `json:"length,omitempty"`
	LeoCapacity *int `json:"leo_capacity,omitempty"`
	MaidenFlight *string `json:"maiden_flight,omitempty"`
	Manufacturer *map[string]any `json:"manufacturer,omitempty"`
	MaxStage *int `json:"max_stage,omitempty"`
	MinStage *int `json:"min_stage,omitempty"`
	Name *string `json:"name,omitempty"`
	PendingLaunch *int `json:"pending_launch,omitempty"`
	SuccessfulLaunch *int `json:"successful_launch,omitempty"`
	ToThrust *int `json:"to_thrust,omitempty"`
	Url *string `json:"url,omitempty"`
	Variant *string `json:"variant,omitempty"`
}

// LaunchVehicleListMatch mirrors the launch_vehicle fields as an all-optional match
// filter (Go analog of Partial<LaunchVehicle>).
type LaunchVehicleListMatch struct {
	Apogee *int `json:"apogee,omitempty"`
	ConsecutiveSuccessfulLaunch *int `json:"consecutive_successful_launch,omitempty"`
	Description *string `json:"description,omitempty"`
	Diameter *float64 `json:"diameter,omitempty"`
	FailedLaunch *int `json:"failed_launch,omitempty"`
	Family *string `json:"family,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	GtoCapacity *int `json:"gto_capacity,omitempty"`
	Id *int `json:"id,omitempty"`
	LaunchMass *int `json:"launch_mass,omitempty"`
	Length *float64 `json:"length,omitempty"`
	LeoCapacity *int `json:"leo_capacity,omitempty"`
	MaidenFlight *string `json:"maiden_flight,omitempty"`
	Manufacturer *map[string]any `json:"manufacturer,omitempty"`
	MaxStage *int `json:"max_stage,omitempty"`
	MinStage *int `json:"min_stage,omitempty"`
	Name *string `json:"name,omitempty"`
	PendingLaunch *int `json:"pending_launch,omitempty"`
	SuccessfulLaunch *int `json:"successful_launch,omitempty"`
	ToThrust *int `json:"to_thrust,omitempty"`
	Url *string `json:"url,omitempty"`
	Variant *string `json:"variant,omitempty"`
}

// Launcher is the typed data model for the launcher entity.
type Launcher struct {
	Apogee *int `json:"apogee,omitempty"`
	ConsecutiveSuccessfulLaunch *int `json:"consecutive_successful_launch,omitempty"`
	Description *string `json:"description,omitempty"`
	Diameter *float64 `json:"diameter,omitempty"`
	FailedLaunch *int `json:"failed_launch,omitempty"`
	Family *string `json:"family,omitempty"`
	FullName *string `json:"full_name,omitempty"`
	GtoCapacity *int `json:"gto_capacity,omitempty"`
	Id *int `json:"id,omitempty"`
	LaunchMass *int `json:"launch_mass,omitempty"`
	Length *float64 `json:"length,omitempty"`
	LeoCapacity *int `json:"leo_capacity,omitempty"`
	MaidenFlight *string `json:"maiden_flight,omitempty"`
	Manufacturer *map[string]any `json:"manufacturer,omitempty"`
	MaxStage *int `json:"max_stage,omitempty"`
	MinStage *int `json:"min_stage,omitempty"`
	Name *string `json:"name,omitempty"`
	PendingLaunch *int `json:"pending_launch,omitempty"`
	SuccessfulLaunch *int `json:"successful_launch,omitempty"`
	ToThrust *int `json:"to_thrust,omitempty"`
	Url *string `json:"url,omitempty"`
	Variant *string `json:"variant,omitempty"`
}

// LauncherLoadMatch is the typed request payload for Launcher.LoadTyped.
type LauncherLoadMatch struct {
	Id int `json:"id"`
}

// Location is the typed data model for the location entity.
type Location struct {
	CountryCode *string `json:"country_code,omitempty"`
	Id *int `json:"id,omitempty"`
	MapImage *string `json:"map_image,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalLandingCount *int `json:"total_landing_count,omitempty"`
	TotalLaunchCount *int `json:"total_launch_count,omitempty"`
	Url *string `json:"url,omitempty"`
}

// LocationLoadMatch is the typed request payload for Location.LoadTyped.
type LocationLoadMatch struct {
	Id int `json:"id"`
}

// LocationListMatch mirrors the location fields as an all-optional match
// filter (Go analog of Partial<Location>).
type LocationListMatch struct {
	CountryCode *string `json:"country_code,omitempty"`
	Id *int `json:"id,omitempty"`
	MapImage *string `json:"map_image,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalLandingCount *int `json:"total_landing_count,omitempty"`
	TotalLaunchCount *int `json:"total_launch_count,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Pad is the typed data model for the pad entity.
type Pad struct {
	AgencyId *int `json:"agency_id,omitempty"`
	Id *int `json:"id,omitempty"`
	InfoUrl *string `json:"info_url,omitempty"`
	Latitude *string `json:"latitude,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Longitude *string `json:"longitude,omitempty"`
	MapImage *string `json:"map_image,omitempty"`
	MapUrl *string `json:"map_url,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalLaunchCount *int `json:"total_launch_count,omitempty"`
	Url *string `json:"url,omitempty"`
	WikiUrl *string `json:"wiki_url,omitempty"`
}

// PadLoadMatch is the typed request payload for Pad.LoadTyped.
type PadLoadMatch struct {
	Id int `json:"id"`
}

// PadListMatch mirrors the pad fields as an all-optional match
// filter (Go analog of Partial<Pad>).
type PadListMatch struct {
	AgencyId *int `json:"agency_id,omitempty"`
	Id *int `json:"id,omitempty"`
	InfoUrl *string `json:"info_url,omitempty"`
	Latitude *string `json:"latitude,omitempty"`
	Location *map[string]any `json:"location,omitempty"`
	Longitude *string `json:"longitude,omitempty"`
	MapImage *string `json:"map_image,omitempty"`
	MapUrl *string `json:"map_url,omitempty"`
	Name *string `json:"name,omitempty"`
	TotalLaunchCount *int `json:"total_launch_count,omitempty"`
	Url *string `json:"url,omitempty"`
	WikiUrl *string `json:"wiki_url,omitempty"`
}

// ReusableFirstStage is the typed data model for the reusable_first_stage entity.
type ReusableFirstStage struct {
}

// SpaceStation is the typed data model for the space_station entity.
type SpaceStation struct {
	Deorbited *string `json:"deorbited,omitempty"`
	Description *string `json:"description,omitempty"`
	Founded *string `json:"founded,omitempty"`
	Id *int `json:"id,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Name *string `json:"name,omitempty"`
	Orbit *string `json:"orbit,omitempty"`
	Owner *[]any `json:"owner,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// SpaceStationLoadMatch is the typed request payload for SpaceStation.LoadTyped.
type SpaceStationLoadMatch struct {
	Id int `json:"id"`
}

// SpaceStationListMatch mirrors the space_station fields as an all-optional match
// filter (Go analog of Partial<SpaceStation>).
type SpaceStationListMatch struct {
	Deorbited *string `json:"deorbited,omitempty"`
	Description *string `json:"description,omitempty"`
	Founded *string `json:"founded,omitempty"`
	Id *int `json:"id,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	Name *string `json:"name,omitempty"`
	Orbit *string `json:"orbit,omitempty"`
	Owner *[]any `json:"owner,omitempty"`
	Status *map[string]any `json:"status,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// Spacecraft is the typed data model for the spacecraft entity.
type Spacecraft struct {
	Agency *map[string]any `json:"agency,omitempty"`
	Capability *string `json:"capability,omitempty"`
	CrewCapacity *int `json:"crew_capacity,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Diameter *float64 `json:"diameter,omitempty"`
	Height *float64 `json:"height,omitempty"`
	History *string `json:"history,omitempty"`
	HumanRated *bool `json:"human_rated,omitempty"`
	Id *int `json:"id,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	InUse *bool `json:"in_use,omitempty"`
	MaidenFlight *string `json:"maiden_flight,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// SpacecraftLoadMatch is the typed request payload for Spacecraft.LoadTyped.
type SpacecraftLoadMatch struct {
	Id int `json:"id"`
}

// SpacecraftListMatch mirrors the spacecraft fields as an all-optional match
// filter (Go analog of Partial<Spacecraft>).
type SpacecraftListMatch struct {
	Agency *map[string]any `json:"agency,omitempty"`
	Capability *string `json:"capability,omitempty"`
	CrewCapacity *int `json:"crew_capacity,omitempty"`
	Detail *string `json:"detail,omitempty"`
	Diameter *float64 `json:"diameter,omitempty"`
	Height *float64 `json:"height,omitempty"`
	History *string `json:"history,omitempty"`
	HumanRated *bool `json:"human_rated,omitempty"`
	Id *int `json:"id,omitempty"`
	ImageUrl *string `json:"image_url,omitempty"`
	InUse *bool `json:"in_use,omitempty"`
	MaidenFlight *string `json:"maiden_flight,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *map[string]any `json:"type,omitempty"`
	Url *string `json:"url,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
