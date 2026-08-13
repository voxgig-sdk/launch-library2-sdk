-- Typed models for the LaunchLibrary2 SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Agency
---@field abbrev? string
---@field administrator? string
---@field country_code? string
---@field description? string
---@field founding_year? string
---@field id? number
---@field logo_url? string
---@field name? string
---@field type? string
---@field url? string

---@class AgencyLoadMatch
---@field id number

---@class AgencyListMatch
---@field abbrev? string
---@field administrator? string
---@field country_code? string
---@field description? string
---@field founding_year? string
---@field id? number
---@field logo_url? string
---@field name? string
---@field type? string
---@field url? string

---@class Astronaut
---@field bio? string
---@field date_of_birth? string
---@field date_of_death? string
---@field flights_count? number
---@field id? number
---@field name? string
---@field nationality? string
---@field profile_image? string
---@field spacewalks_count? number
---@field status? table
---@field type? table
---@field url? string

---@class AstronautLoadMatch
---@field id number

---@class AstronautListMatch
---@field bio? string
---@field date_of_birth? string
---@field date_of_death? string
---@field flights_count? number
---@field id? number
---@field name? string
---@field nationality? string
---@field profile_image? string
---@field spacewalks_count? number
---@field status? table
---@field type? table
---@field url? string

---@class Docking

---@class DockingEvent
---@field departure? string
---@field docking? string
---@field docking_location? table
---@field flight_vehicle? table
---@field id? number
---@field url? string

---@class DockingEventLoadMatch
---@field id number

---@class DockingEventListMatch
---@field departure? string
---@field docking? string
---@field docking_location? table
---@field flight_vehicle? table
---@field id? number
---@field url? string

---@class Event
---@field date? string
---@field description? string
---@field feature_image? string
---@field id? number
---@field location? string
---@field name? string
---@field news_url? string
---@field type? table
---@field url? string
---@field video_url? string

---@class EventLoadMatch
---@field id number

---@class EventListMatch
---@field date? string
---@field description? string
---@field feature_image? string
---@field id? number
---@field location? string
---@field name? string
---@field news_url? string
---@field type? table
---@field url? string
---@field video_url? string

---@class Expedition
---@field crew? table
---@field end? string
---@field id? number
---@field name? string
---@field spacestation? table
---@field start? string
---@field url? string

---@class ExpeditionLoadMatch
---@field id number

---@class ExpeditionListMatch
---@field crew? table
---@field end? string
---@field id? number
---@field name? string
---@field spacestation? table
---@field start? string
---@field url? string

---@class FirstStage
---@field apogee? number
---@field consecutive_successful_launches? number
---@field description? string
---@field diameter? number
---@field failed_launches? number
---@field family? string
---@field flights? number
---@field full_name? string
---@field gto_capacity? number
---@field id? number
---@field launch_mass? number
---@field launcher_config? table
---@field length? number
---@field leo_capacity? number
---@field maiden_flight? string
---@field manufacturer? table
---@field max_stage? number
---@field min_stage? number
---@field name? string
---@field pending_launches? number
---@field serial_number? string
---@field status? string
---@field successful_launches? number
---@field to_thrust? number
---@field type? string
---@field url? string
---@field variant? string

---@class FirstStageLoadMatch
---@field id number

---@class FirstStageListMatch
---@field apogee? number
---@field consecutive_successful_launches? number
---@field description? string
---@field diameter? number
---@field failed_launches? number
---@field family? string
---@field flights? number
---@field full_name? string
---@field gto_capacity? number
---@field id? number
---@field launch_mass? number
---@field launcher_config? table
---@field length? number
---@field leo_capacity? number
---@field maiden_flight? string
---@field manufacturer? table
---@field max_stage? number
---@field min_stage? number
---@field name? string
---@field pending_launches? number
---@field serial_number? string
---@field status? string
---@field successful_launches? number
---@field to_thrust? number
---@field type? string
---@field url? string
---@field variant? string

---@class Launch
---@field id? string
---@field image? string
---@field launch_service_provider? table
---@field mission? table
---@field name? string
---@field net? string
---@field pad? table
---@field probability? number
---@field rocket? table
---@field status? table
---@field url? string
---@field webcast_live? boolean
---@field window_end? string
---@field window_start? string

---@class LaunchLoadMatch
---@field id string

---@class LaunchListMatch
---@field id? string
---@field image? string
---@field launch_service_provider? table
---@field mission? table
---@field name? string
---@field net? string
---@field pad? table
---@field probability? number
---@field rocket? table
---@field status? table
---@field url? string
---@field webcast_live? boolean
---@field window_end? string
---@field window_start? string

---@class LaunchVehicle
---@field apogee? number
---@field consecutive_successful_launches? number
---@field description? string
---@field diameter? number
---@field failed_launches? number
---@field family? string
---@field full_name? string
---@field gto_capacity? number
---@field id? number
---@field launch_mass? number
---@field length? number
---@field leo_capacity? number
---@field maiden_flight? string
---@field manufacturer? table
---@field max_stage? number
---@field min_stage? number
---@field name? string
---@field pending_launches? number
---@field successful_launches? number
---@field to_thrust? number
---@field url? string
---@field variant? string

---@class LaunchVehicleListMatch
---@field apogee? number
---@field consecutive_successful_launches? number
---@field description? string
---@field diameter? number
---@field failed_launches? number
---@field family? string
---@field full_name? string
---@field gto_capacity? number
---@field id? number
---@field launch_mass? number
---@field length? number
---@field leo_capacity? number
---@field maiden_flight? string
---@field manufacturer? table
---@field max_stage? number
---@field min_stage? number
---@field name? string
---@field pending_launches? number
---@field successful_launches? number
---@field to_thrust? number
---@field url? string
---@field variant? string

---@class Launcher
---@field abbrev? string
---@field administrator? string
---@field country_code? string
---@field description? string
---@field founding_year? string
---@field id? number
---@field logo_url? string
---@field name? string
---@field type? string
---@field url? string

---@class LauncherLoadMatch
---@field id number

---@class Location
---@field country_code? string
---@field id? number
---@field map_image? string
---@field name? string
---@field total_landing_count? number
---@field total_launch_count? number
---@field url? string

---@class LocationLoadMatch
---@field id number

---@class LocationListMatch
---@field country_code? string
---@field id? number
---@field map_image? string
---@field name? string
---@field total_landing_count? number
---@field total_launch_count? number
---@field url? string

---@class Pad
---@field agency_id? number
---@field country_code? string
---@field id? number
---@field info_url? string
---@field latitude? string
---@field location? table
---@field longitude? string
---@field map_image? string
---@field map_url? string
---@field name? string
---@field total_landing_count? number
---@field total_launch_count? number
---@field url? string
---@field wiki_url? string

---@class PadLoadMatch
---@field id number

---@class PadListMatch
---@field agency_id? number
---@field country_code? string
---@field id? number
---@field info_url? string
---@field latitude? string
---@field location? table
---@field longitude? string
---@field map_image? string
---@field map_url? string
---@field name? string
---@field total_landing_count? number
---@field total_launch_count? number
---@field url? string
---@field wiki_url? string

---@class ReusableFirstStage

---@class SpaceStation
---@field deorbited? string
---@field description? string
---@field founded? string
---@field id? number
---@field image_url? string
---@field name? string
---@field orbit? string
---@field owners? table
---@field status? table
---@field type? table
---@field url? string

---@class SpaceStationLoadMatch
---@field id number

---@class SpaceStationListMatch
---@field deorbited? string
---@field description? string
---@field founded? string
---@field id? number
---@field image_url? string
---@field name? string
---@field orbit? string
---@field owners? table
---@field status? table
---@field type? table
---@field url? string

---@class Spacecraft
---@field agency? table
---@field capability? string
---@field crew_capacity? number
---@field details? string
---@field diameter? number
---@field height? number
---@field history? string
---@field human_rated? boolean
---@field id? number
---@field image_url? string
---@field in_use? boolean
---@field maiden_flight? string
---@field name? string
---@field type? table
---@field url? string

---@class SpacecraftLoadMatch
---@field id number

---@class SpacecraftListMatch
---@field agency? table
---@field capability? string
---@field crew_capacity? number
---@field details? string
---@field diameter? number
---@field height? number
---@field history? string
---@field human_rated? boolean
---@field id? number
---@field image_url? string
---@field in_use? boolean
---@field maiden_flight? string
---@field name? string
---@field type? table
---@field url? string

local M = {}

return M
