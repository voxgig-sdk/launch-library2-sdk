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

export type AgencyListMatch = Partial<Agency>

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

export type AstronautListMatch = Partial<Astronaut>

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

export type DockingEventListMatch = Partial<DockingEvent>

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

export type EventListMatch = Partial<Event>

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

export type ExpeditionListMatch = Partial<Expedition>

export interface FirstStage {
  flight?: number
  id?: number
  launcher_config?: Record<string, any>
  serial_number?: string
  status?: string
  type?: string
  url?: string
}

export interface FirstStageLoadMatch {
  id: number
}

export type FirstStageListMatch = Partial<FirstStage>

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

export type LaunchListMatch = Partial<Launch>

export interface LaunchVehicle {
  apogee?: number
  consecutive_successful_launch?: number
  description?: string
  diameter?: number
  failed_launch?: number
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
  pending_launch?: number
  successful_launch?: number
  to_thrust?: number
  url?: string
  variant?: string
}

export type LaunchVehicleListMatch = Partial<LaunchVehicle>

export interface Launcher {
  apogee?: number
  consecutive_successful_launch?: number
  description?: string
  diameter?: number
  failed_launch?: number
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
  pending_launch?: number
  successful_launch?: number
  to_thrust?: number
  url?: string
  variant?: string
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

export type LocationListMatch = Partial<Location>

export interface Pad {
  agency_id?: number
  id?: number
  info_url?: string
  latitude?: string
  location?: Record<string, any>
  longitude?: string
  map_image?: string
  map_url?: string
  name?: string
  total_launch_count?: number
  url?: string
  wiki_url?: string
}

export interface PadLoadMatch {
  id: number
}

export type PadListMatch = Partial<Pad>

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
  owner?: any[]
  status?: Record<string, any>
  type?: Record<string, any>
  url?: string
}

export interface SpaceStationLoadMatch {
  id: number
}

export type SpaceStationListMatch = Partial<SpaceStation>

export interface Spacecraft {
  agency?: Record<string, any>
  capability?: string
  crew_capacity?: number
  detail?: string
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

export type SpacecraftListMatch = Partial<Spacecraft>

