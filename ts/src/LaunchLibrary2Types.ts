// Typed models for the LaunchLibrary2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Agency {
  abbrev?: string
  administrator?: string
  country_code?: string
  description?: string
  founding_year?: string
  id?: number
  logo_url?: string
  name?: string
  type?: string
  url?: string
}

export interface AgencyLoadMatch {
  id: number
}

export interface AgencyListMatch {
  agency_type?: string
  country_code?: string
  limit?: number
  offset?: number
  search?: string
}

export interface Astronaut {
  bio?: string
  date_of_birth?: string
  date_of_death?: string
  flights_count?: number
  id?: number
  name?: string
  nationality?: string
  profile_image?: string
  spacewalks_count?: number
  status?: Record<string, any>
  type?: Record<string, any>
  url?: string
}

export interface AstronautLoadMatch {
  id: number
}

export interface AstronautListMatch {
  limit?: number
  nationality?: string
  offset?: number
  search?: string
  status?: string
}

export interface Docking {
}

export interface DockingEvent {
  departure?: string
  docking?: string
  docking_location?: Record<string, any>
  flight_vehicle?: Record<string, any>
  id?: number
  url?: string
}

export interface DockingEventLoadMatch {
  id: number
}

export interface DockingEventListMatch {
  docking_location?: number
  limit?: number
  offset?: number
  spacestation?: number
}

export interface Event {
  date?: string
  description?: string
  feature_image?: string
  id?: number
  location?: string
  name?: string
  news_url?: string
  type?: Record<string, any>
  url?: string
  video_url?: string
}

export interface EventLoadMatch {
  id: number
}

export interface EventListMatch {
  limit?: number
  offset?: number
  search?: string
}

export interface Expedition {
  crew?: any[]
  end?: string
  id?: number
  name?: string
  spacestation?: Record<string, any>
  start?: string
  url?: string
}

export interface ExpeditionLoadMatch {
  id: number
}

export interface ExpeditionListMatch {
  limit?: number
  offset?: number
  search?: string
  spacestation?: number
}

export interface FirstStage {
  apogee?: number
  consecutive_successful_launches?: number
  description?: string
  diameter?: number
  failed_launches?: number
  family?: string
  flights?: number
  full_name?: string
  gto_capacity?: number
  id?: number
  launch_mass?: number
  launcher_config?: Record<string, any>
  length?: number
  leo_capacity?: number
  maiden_flight?: string
  manufacturer?: Record<string, any>
  max_stage?: number
  min_stage?: number
  name?: string
  pending_launches?: number
  serial_number?: string
  status?: string
  successful_launches?: number
  to_thrust?: number
  type?: string
  url?: string
  variant?: string
}

export interface FirstStageLoadMatch {
  id: number
}

export interface FirstStageListMatch {
  flight_number?: number
  limit?: number
  offset?: number
  serial_number?: string
}

export interface Launch {
  id?: string
  image?: string
  launch_service_provider?: Record<string, any>
  mission?: Record<string, any>
  name?: string
  net?: string
  pad?: Record<string, any>
  probability?: number
  rocket?: Record<string, any>
  status?: Record<string, any>
  url?: string
  webcast_live?: boolean
  window_end?: string
  window_start?: string
}

export interface LaunchLoadMatch {
  id: string
}

export interface LaunchListMatch {
  limit?: number
  lsp_id?: number
  lsp_name?: string
  offset?: number
  rocket_configuration_id?: number
  search?: string
  spacecraft_id?: number
  status?: string
}

export interface LaunchVehicle {
  apogee?: number
  consecutive_successful_launches?: number
  description?: string
  diameter?: number
  failed_launches?: number
  family?: string
  full_name?: string
  gto_capacity?: number
  id?: number
  launch_mass?: number
  length?: number
  leo_capacity?: number
  maiden_flight?: string
  manufacturer?: Record<string, any>
  max_stage?: number
  min_stage?: number
  name?: string
  pending_launches?: number
  successful_launches?: number
  to_thrust?: number
  url?: string
  variant?: string
}

export interface LaunchVehicleListMatch {
  family?: string
  limit?: number
  manufacturer?: number
  offset?: number
  search?: string
}

export interface Launcher {
  abbrev?: string
  administrator?: string
  country_code?: string
  description?: string
  founding_year?: string
  id?: number
  logo_url?: string
  name?: string
  type?: string
  url?: string
}

export interface LauncherLoadMatch {
  id: number
}

export interface Location {
  country_code?: string
  id?: number
  map_image?: string
  name?: string
  total_landing_count?: number
  total_launch_count?: number
  url?: string
}

export interface LocationLoadMatch {
  id: number
}

export interface LocationListMatch {
  country_code?: string
  limit?: number
  offset?: number
  search?: string
}

export interface Pad {
  agency_id?: number
  country_code?: string
  id?: number
  info_url?: string
  latitude?: string
  location?: Record<string, any>
  longitude?: string
  map_image?: string
  map_url?: string
  name?: string
  total_landing_count?: number
  total_launch_count?: number
  url?: string
  wiki_url?: string
}

export interface PadLoadMatch {
  id: number
}

export interface PadListMatch {
  limit?: number
  location?: number
  offset?: number
  search?: string
}

export interface ReusableFirstStage {
}

export interface SpaceStation {
  deorbited?: string
  description?: string
  founded?: string
  id?: number
  image_url?: string
  name?: string
  orbit?: string
  owners?: any[]
  status?: Record<string, any>
  type?: Record<string, any>
  url?: string
}

export interface SpaceStationLoadMatch {
  id: number
}

export interface SpaceStationListMatch {
  limit?: number
  offset?: number
  owner?: string
  search?: string
  status?: string
}

export interface Spacecraft {
  agency?: Record<string, any>
  capability?: string
  crew_capacity?: number
  details?: string
  diameter?: number
  height?: number
  history?: string
  human_rated?: boolean
  id?: number
  image_url?: string
  in_use?: boolean
  maiden_flight?: string
  name?: string
  type?: Record<string, any>
  url?: string
}

export interface SpacecraftLoadMatch {
  id: number
}

export interface SpacecraftListMatch {
  limit?: number
  offset?: number
  search?: string
  status?: string
}

