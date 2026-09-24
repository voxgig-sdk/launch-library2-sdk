// Typed models for the LaunchLibrary2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/launch-library2-sdk/go/core"
)

// Agency is the typed data model for the agency entity.
type Agency struct {
}

// AgencyLoadMatch is the typed request payload for Agency.LoadTyped.
type AgencyLoadMatch struct {
	Id int `json:"id"`
}

// AgencyListMatch is the typed request payload for Agency.ListTyped.
type AgencyListMatch struct {
	AgencyType *string `json:"agency_type,omitempty"`
	CountryCode *string `json:"country_code,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Astronaut is the typed data model for the astronaut entity.
type Astronaut struct {
}

// AstronautLoadMatch is the typed request payload for Astronaut.LoadTyped.
type AstronautLoadMatch struct {
	Id int `json:"id"`
}

// AstronautListMatch is the typed request payload for Astronaut.ListTyped.
type AstronautListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Nationality *string `json:"nationality,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
	Status *string `json:"status,omitempty"`
}

// DockingEvent is the typed data model for the docking_event entity.
type DockingEvent struct {
}

// DockingEventLoadMatch is the typed request payload for DockingEvent.LoadTyped.
type DockingEventLoadMatch struct {
	Id int `json:"id"`
}

// DockingEventListMatch is the typed request payload for DockingEvent.ListTyped.
type DockingEventListMatch struct {
	DockingLocation *int `json:"docking_location,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Spacestation *int `json:"spacestation,omitempty"`
}

// Event is the typed data model for the event entity.
type Event struct {
}

// EventLoadMatch is the typed request payload for Event.LoadTyped.
type EventLoadMatch struct {
	Id int `json:"id"`
}

// EventListMatch is the typed request payload for Event.ListTyped.
type EventListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Expedition is the typed data model for the expedition entity.
type Expedition struct {
}

// ExpeditionLoadMatch is the typed request payload for Expedition.LoadTyped.
type ExpeditionLoadMatch struct {
	Id int `json:"id"`
}

// ExpeditionListMatch is the typed request payload for Expedition.ListTyped.
type ExpeditionListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
	Spacestation *int `json:"spacestation,omitempty"`
}

// FirstStage is the typed data model for the first_stage entity.
type FirstStage struct {
}

// FirstStageLoadMatch is the typed request payload for FirstStage.LoadTyped.
type FirstStageLoadMatch struct {
	Id int `json:"id"`
}

// FirstStageListMatch is the typed request payload for FirstStage.ListTyped.
type FirstStageListMatch struct {
	FlightNumber *int `json:"flight_number,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	SerialNumber *string `json:"serial_number,omitempty"`
}

// Launch is the typed data model for the launch entity.
type Launch struct {
}

// LaunchLoadMatch is the typed request payload for Launch.LoadTyped.
type LaunchLoadMatch struct {
	Id string `json:"id"`
}

// LaunchListMatch is the typed request payload for Launch.ListTyped.
type LaunchListMatch struct {
	Limit *int `json:"limit,omitempty"`
	LspId *int `json:"lsp_id,omitempty"`
	LspName *string `json:"lsp_name,omitempty"`
	Offset *int `json:"offset,omitempty"`
	RocketConfigurationId *int `json:"rocket_configuration_id,omitempty"`
	Search *string `json:"search,omitempty"`
	SpacecraftId *int `json:"spacecraft_id,omitempty"`
	Status *string `json:"status,omitempty"`
}

// LaunchVehicle is the typed data model for the launch_vehicle entity.
type LaunchVehicle struct {
}

// LaunchVehicleListMatch is the typed request payload for LaunchVehicle.ListTyped.
type LaunchVehicleListMatch struct {
	Family *string `json:"family,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Manufacturer *int `json:"manufacturer,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Launcher is the typed data model for the launcher entity.
type Launcher struct {
}

// LauncherLoadMatch is the typed request payload for Launcher.LoadTyped.
type LauncherLoadMatch struct {
	Id int `json:"id"`
}

// Location is the typed data model for the location entity.
type Location struct {
}

// LocationLoadMatch is the typed request payload for Location.LoadTyped.
type LocationLoadMatch struct {
	Id int `json:"id"`
}

// LocationListMatch is the typed request payload for Location.ListTyped.
type LocationListMatch struct {
	CountryCode *string `json:"country_code,omitempty"`
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
}

// Pad is the typed data model for the pad entity.
type Pad struct {
}

// PadLoadMatch is the typed request payload for Pad.LoadTyped.
type PadLoadMatch struct {
	Id int `json:"id"`
}

// PadListMatch is the typed request payload for Pad.ListTyped.
type PadListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Location *int `json:"location,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
}

// SpaceStation is the typed data model for the space_station entity.
type SpaceStation struct {
}

// SpaceStationLoadMatch is the typed request payload for SpaceStation.LoadTyped.
type SpaceStationLoadMatch struct {
	Id int `json:"id"`
}

// SpaceStationListMatch is the typed request payload for SpaceStation.ListTyped.
type SpaceStationListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Owner *string `json:"owner,omitempty"`
	Search *string `json:"search,omitempty"`
	Status *string `json:"status,omitempty"`
}

// Spacecraft is the typed data model for the spacecraft entity.
type Spacecraft struct {
}

// SpacecraftLoadMatch is the typed request payload for Spacecraft.LoadTyped.
type SpacecraftLoadMatch struct {
	Id int `json:"id"`
}

// SpacecraftListMatch is the typed request payload for Spacecraft.ListTyped.
type SpacecraftListMatch struct {
	Limit *int `json:"limit,omitempty"`
	Offset *int `json:"offset,omitempty"`
	Search *string `json:"search,omitempty"`
	Status *string `json:"status,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
