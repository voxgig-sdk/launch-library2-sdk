# frozen_string_literal: true

# Typed models for the LaunchLibrary2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Agency entity data model.
#
# @!attribute [rw] abbrev
#   @return [String, nil]
#
# @!attribute [rw] administrator
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] founding_year
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] logo_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Agency = Struct.new(
  :abbrev,
  :administrator,
  :country_code,
  :description,
  :founding_year,
  :id,
  :logo_url,
  :name,
  :type,
  :url,
  keyword_init: true
)

# Request payload for Agency#load.
#
# @!attribute [rw] id
#   @return [Integer]
AgencyLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Agency#list.
#
# @!attribute [rw] abbrev
#   @return [String, nil]
#
# @!attribute [rw] administrator
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] founding_year
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] logo_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
AgencyListMatch = Struct.new(
  :abbrev,
  :administrator,
  :country_code,
  :description,
  :founding_year,
  :id,
  :logo_url,
  :name,
  :type,
  :url,
  keyword_init: true
)

# Astronaut entity data model.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] date_of_birth
#   @return [String, nil]
#
# @!attribute [rw] date_of_death
#   @return [String, nil]
#
# @!attribute [rw] flights_count
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nationality
#   @return [String, nil]
#
# @!attribute [rw] profile_image
#   @return [String, nil]
#
# @!attribute [rw] spacewalks_count
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Astronaut = Struct.new(
  :bio,
  :date_of_birth,
  :date_of_death,
  :flights_count,
  :id,
  :name,
  :nationality,
  :profile_image,
  :spacewalks_count,
  :status,
  :type,
  :url,
  keyword_init: true
)

# Request payload for Astronaut#load.
#
# @!attribute [rw] id
#   @return [Integer]
AstronautLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Astronaut#list.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] date_of_birth
#   @return [String, nil]
#
# @!attribute [rw] date_of_death
#   @return [String, nil]
#
# @!attribute [rw] flights_count
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nationality
#   @return [String, nil]
#
# @!attribute [rw] profile_image
#   @return [String, nil]
#
# @!attribute [rw] spacewalks_count
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
AstronautListMatch = Struct.new(
  :bio,
  :date_of_birth,
  :date_of_death,
  :flights_count,
  :id,
  :name,
  :nationality,
  :profile_image,
  :spacewalks_count,
  :status,
  :type,
  :url,
  keyword_init: true
)

# Docking entity data model.
class Docking
end

# DockingEvent entity data model.
#
# @!attribute [rw] departure
#   @return [String, nil]
#
# @!attribute [rw] docking
#   @return [String, nil]
#
# @!attribute [rw] docking_location
#   @return [Hash, nil]
#
# @!attribute [rw] flight_vehicle
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DockingEvent = Struct.new(
  :departure,
  :docking,
  :docking_location,
  :flight_vehicle,
  :id,
  :url,
  keyword_init: true
)

# Request payload for DockingEvent#load.
#
# @!attribute [rw] id
#   @return [Integer]
DockingEventLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for DockingEvent#list.
#
# @!attribute [rw] departure
#   @return [String, nil]
#
# @!attribute [rw] docking
#   @return [String, nil]
#
# @!attribute [rw] docking_location
#   @return [Hash, nil]
#
# @!attribute [rw] flight_vehicle
#   @return [Hash, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
DockingEventListMatch = Struct.new(
  :departure,
  :docking,
  :docking_location,
  :flight_vehicle,
  :id,
  :url,
  keyword_init: true
)

# Event entity data model.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] feature_image
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] news_url
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] video_url
#   @return [String, nil]
Event = Struct.new(
  :date,
  :description,
  :feature_image,
  :id,
  :location,
  :name,
  :news_url,
  :type,
  :url,
  :video_url,
  keyword_init: true
)

# Request payload for Event#load.
#
# @!attribute [rw] id
#   @return [Integer]
EventLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Event#list.
#
# @!attribute [rw] date
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] feature_image
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] location
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] news_url
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] video_url
#   @return [String, nil]
EventListMatch = Struct.new(
  :date,
  :description,
  :feature_image,
  :id,
  :location,
  :name,
  :news_url,
  :type,
  :url,
  :video_url,
  keyword_init: true
)

# Expedition entity data model.
#
# @!attribute [rw] crew
#   @return [Array, nil]
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] spacestation
#   @return [Hash, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Expedition = Struct.new(
  :crew,
  :end,
  :id,
  :name,
  :spacestation,
  :start,
  :url,
  keyword_init: true
)

# Request payload for Expedition#load.
#
# @!attribute [rw] id
#   @return [Integer]
ExpeditionLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Expedition#list.
#
# @!attribute [rw] crew
#   @return [Array, nil]
#
# @!attribute [rw] end
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] spacestation
#   @return [Hash, nil]
#
# @!attribute [rw] start
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ExpeditionListMatch = Struct.new(
  :crew,
  :end,
  :id,
  :name,
  :spacestation,
  :start,
  :url,
  keyword_init: true
)

# FirstStage entity data model.
#
# @!attribute [rw] apogee
#   @return [Integer, nil]
#
# @!attribute [rw] consecutive_successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Float, nil]
#
# @!attribute [rw] failed_launches
#   @return [Integer, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] flights
#   @return [Integer, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] gto_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] launch_mass
#   @return [Integer, nil]
#
# @!attribute [rw] launcher_config
#   @return [Hash, nil]
#
# @!attribute [rw] length
#   @return [Float, nil]
#
# @!attribute [rw] leo_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] maiden_flight
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [Hash, nil]
#
# @!attribute [rw] max_stage
#   @return [Integer, nil]
#
# @!attribute [rw] min_stage
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pending_launches
#   @return [Integer, nil]
#
# @!attribute [rw] serial_number
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] to_thrust
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] variant
#   @return [String, nil]
FirstStage = Struct.new(
  :apogee,
  :consecutive_successful_launches,
  :description,
  :diameter,
  :failed_launches,
  :family,
  :flights,
  :full_name,
  :gto_capacity,
  :id,
  :launch_mass,
  :launcher_config,
  :length,
  :leo_capacity,
  :maiden_flight,
  :manufacturer,
  :max_stage,
  :min_stage,
  :name,
  :pending_launches,
  :serial_number,
  :status,
  :successful_launches,
  :to_thrust,
  :type,
  :url,
  :variant,
  keyword_init: true
)

# Request payload for FirstStage#load.
#
# @!attribute [rw] id
#   @return [Integer]
FirstStageLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for FirstStage#list.
#
# @!attribute [rw] apogee
#   @return [Integer, nil]
#
# @!attribute [rw] consecutive_successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Float, nil]
#
# @!attribute [rw] failed_launches
#   @return [Integer, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] flights
#   @return [Integer, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] gto_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] launch_mass
#   @return [Integer, nil]
#
# @!attribute [rw] launcher_config
#   @return [Hash, nil]
#
# @!attribute [rw] length
#   @return [Float, nil]
#
# @!attribute [rw] leo_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] maiden_flight
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [Hash, nil]
#
# @!attribute [rw] max_stage
#   @return [Integer, nil]
#
# @!attribute [rw] min_stage
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pending_launches
#   @return [Integer, nil]
#
# @!attribute [rw] serial_number
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] to_thrust
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] variant
#   @return [String, nil]
FirstStageListMatch = Struct.new(
  :apogee,
  :consecutive_successful_launches,
  :description,
  :diameter,
  :failed_launches,
  :family,
  :flights,
  :full_name,
  :gto_capacity,
  :id,
  :launch_mass,
  :launcher_config,
  :length,
  :leo_capacity,
  :maiden_flight,
  :manufacturer,
  :max_stage,
  :min_stage,
  :name,
  :pending_launches,
  :serial_number,
  :status,
  :successful_launches,
  :to_thrust,
  :type,
  :url,
  :variant,
  keyword_init: true
)

# Launch entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] launch_service_provider
#   @return [Hash, nil]
#
# @!attribute [rw] mission
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] net
#   @return [String, nil]
#
# @!attribute [rw] pad
#   @return [Hash, nil]
#
# @!attribute [rw] probability
#   @return [Integer, nil]
#
# @!attribute [rw] rocket
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] webcast_live
#   @return [Boolean, nil]
#
# @!attribute [rw] window_end
#   @return [String, nil]
#
# @!attribute [rw] window_start
#   @return [String, nil]
Launch = Struct.new(
  :id,
  :image,
  :launch_service_provider,
  :mission,
  :name,
  :net,
  :pad,
  :probability,
  :rocket,
  :status,
  :url,
  :webcast_live,
  :window_end,
  :window_start,
  keyword_init: true
)

# Request payload for Launch#load.
#
# @!attribute [rw] id
#   @return [String]
LaunchLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Launch#list.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] image
#   @return [String, nil]
#
# @!attribute [rw] launch_service_provider
#   @return [Hash, nil]
#
# @!attribute [rw] mission
#   @return [Hash, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] net
#   @return [String, nil]
#
# @!attribute [rw] pad
#   @return [Hash, nil]
#
# @!attribute [rw] probability
#   @return [Integer, nil]
#
# @!attribute [rw] rocket
#   @return [Hash, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] webcast_live
#   @return [Boolean, nil]
#
# @!attribute [rw] window_end
#   @return [String, nil]
#
# @!attribute [rw] window_start
#   @return [String, nil]
LaunchListMatch = Struct.new(
  :id,
  :image,
  :launch_service_provider,
  :mission,
  :name,
  :net,
  :pad,
  :probability,
  :rocket,
  :status,
  :url,
  :webcast_live,
  :window_end,
  :window_start,
  keyword_init: true
)

# LaunchVehicle entity data model.
#
# @!attribute [rw] apogee
#   @return [Integer, nil]
#
# @!attribute [rw] consecutive_successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Float, nil]
#
# @!attribute [rw] failed_launches
#   @return [Integer, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] gto_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] launch_mass
#   @return [Integer, nil]
#
# @!attribute [rw] length
#   @return [Float, nil]
#
# @!attribute [rw] leo_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] maiden_flight
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [Hash, nil]
#
# @!attribute [rw] max_stage
#   @return [Integer, nil]
#
# @!attribute [rw] min_stage
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pending_launches
#   @return [Integer, nil]
#
# @!attribute [rw] successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] to_thrust
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] variant
#   @return [String, nil]
LaunchVehicle = Struct.new(
  :apogee,
  :consecutive_successful_launches,
  :description,
  :diameter,
  :failed_launches,
  :family,
  :full_name,
  :gto_capacity,
  :id,
  :launch_mass,
  :length,
  :leo_capacity,
  :maiden_flight,
  :manufacturer,
  :max_stage,
  :min_stage,
  :name,
  :pending_launches,
  :successful_launches,
  :to_thrust,
  :url,
  :variant,
  keyword_init: true
)

# Request payload for LaunchVehicle#list.
#
# @!attribute [rw] apogee
#   @return [Integer, nil]
#
# @!attribute [rw] consecutive_successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Float, nil]
#
# @!attribute [rw] failed_launches
#   @return [Integer, nil]
#
# @!attribute [rw] family
#   @return [String, nil]
#
# @!attribute [rw] full_name
#   @return [String, nil]
#
# @!attribute [rw] gto_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] launch_mass
#   @return [Integer, nil]
#
# @!attribute [rw] length
#   @return [Float, nil]
#
# @!attribute [rw] leo_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] maiden_flight
#   @return [String, nil]
#
# @!attribute [rw] manufacturer
#   @return [Hash, nil]
#
# @!attribute [rw] max_stage
#   @return [Integer, nil]
#
# @!attribute [rw] min_stage
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] pending_launches
#   @return [Integer, nil]
#
# @!attribute [rw] successful_launches
#   @return [Integer, nil]
#
# @!attribute [rw] to_thrust
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] variant
#   @return [String, nil]
LaunchVehicleListMatch = Struct.new(
  :apogee,
  :consecutive_successful_launches,
  :description,
  :diameter,
  :failed_launches,
  :family,
  :full_name,
  :gto_capacity,
  :id,
  :launch_mass,
  :length,
  :leo_capacity,
  :maiden_flight,
  :manufacturer,
  :max_stage,
  :min_stage,
  :name,
  :pending_launches,
  :successful_launches,
  :to_thrust,
  :url,
  :variant,
  keyword_init: true
)

# Launcher entity data model.
#
# @!attribute [rw] abbrev
#   @return [String, nil]
#
# @!attribute [rw] administrator
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] founding_year
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] logo_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Launcher = Struct.new(
  :abbrev,
  :administrator,
  :country_code,
  :description,
  :founding_year,
  :id,
  :logo_url,
  :name,
  :type,
  :url,
  keyword_init: true
)

# Request payload for Launcher#load.
#
# @!attribute [rw] id
#   @return [Integer]
LauncherLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Location entity data model.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] map_image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] total_landing_count
#   @return [Integer, nil]
#
# @!attribute [rw] total_launch_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Location = Struct.new(
  :country_code,
  :id,
  :map_image,
  :name,
  :total_landing_count,
  :total_launch_count,
  :url,
  keyword_init: true
)

# Request payload for Location#load.
#
# @!attribute [rw] id
#   @return [Integer]
LocationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Location#list.
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] map_image
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] total_landing_count
#   @return [Integer, nil]
#
# @!attribute [rw] total_launch_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
LocationListMatch = Struct.new(
  :country_code,
  :id,
  :map_image,
  :name,
  :total_landing_count,
  :total_launch_count,
  :url,
  keyword_init: true
)

# Pad entity data model.
#
# @!attribute [rw] agency_id
#   @return [Integer, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] info_url
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] longitude
#   @return [String, nil]
#
# @!attribute [rw] map_image
#   @return [String, nil]
#
# @!attribute [rw] map_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] total_landing_count
#   @return [Integer, nil]
#
# @!attribute [rw] total_launch_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] wiki_url
#   @return [String, nil]
Pad = Struct.new(
  :agency_id,
  :country_code,
  :id,
  :info_url,
  :latitude,
  :location,
  :longitude,
  :map_image,
  :map_url,
  :name,
  :total_landing_count,
  :total_launch_count,
  :url,
  :wiki_url,
  keyword_init: true
)

# Request payload for Pad#load.
#
# @!attribute [rw] id
#   @return [Integer]
PadLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Pad#list.
#
# @!attribute [rw] agency_id
#   @return [Integer, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] info_url
#   @return [String, nil]
#
# @!attribute [rw] latitude
#   @return [String, nil]
#
# @!attribute [rw] location
#   @return [Hash, nil]
#
# @!attribute [rw] longitude
#   @return [String, nil]
#
# @!attribute [rw] map_image
#   @return [String, nil]
#
# @!attribute [rw] map_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] total_landing_count
#   @return [Integer, nil]
#
# @!attribute [rw] total_launch_count
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
#
# @!attribute [rw] wiki_url
#   @return [String, nil]
PadListMatch = Struct.new(
  :agency_id,
  :country_code,
  :id,
  :info_url,
  :latitude,
  :location,
  :longitude,
  :map_image,
  :map_url,
  :name,
  :total_landing_count,
  :total_launch_count,
  :url,
  :wiki_url,
  keyword_init: true
)

# ReusableFirstStage entity data model.
class ReusableFirstStage
end

# SpaceStation entity data model.
#
# @!attribute [rw] deorbited
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] founded
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] orbit
#   @return [String, nil]
#
# @!attribute [rw] owners
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
SpaceStation = Struct.new(
  :deorbited,
  :description,
  :founded,
  :id,
  :image_url,
  :name,
  :orbit,
  :owners,
  :status,
  :type,
  :url,
  keyword_init: true
)

# Request payload for SpaceStation#load.
#
# @!attribute [rw] id
#   @return [Integer]
SpaceStationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for SpaceStation#list.
#
# @!attribute [rw] deorbited
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] founded
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] orbit
#   @return [String, nil]
#
# @!attribute [rw] owners
#   @return [Array, nil]
#
# @!attribute [rw] status
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
SpaceStationListMatch = Struct.new(
  :deorbited,
  :description,
  :founded,
  :id,
  :image_url,
  :name,
  :orbit,
  :owners,
  :status,
  :type,
  :url,
  keyword_init: true
)

# Spacecraft entity data model.
#
# @!attribute [rw] agency
#   @return [Hash, nil]
#
# @!attribute [rw] capability
#   @return [String, nil]
#
# @!attribute [rw] crew_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Float, nil]
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] history
#   @return [String, nil]
#
# @!attribute [rw] human_rated
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] in_use
#   @return [Boolean, nil]
#
# @!attribute [rw] maiden_flight
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Spacecraft = Struct.new(
  :agency,
  :capability,
  :crew_capacity,
  :details,
  :diameter,
  :height,
  :history,
  :human_rated,
  :id,
  :image_url,
  :in_use,
  :maiden_flight,
  :name,
  :type,
  :url,
  keyword_init: true
)

# Request payload for Spacecraft#load.
#
# @!attribute [rw] id
#   @return [Integer]
SpacecraftLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Spacecraft#list.
#
# @!attribute [rw] agency
#   @return [Hash, nil]
#
# @!attribute [rw] capability
#   @return [String, nil]
#
# @!attribute [rw] crew_capacity
#   @return [Integer, nil]
#
# @!attribute [rw] details
#   @return [String, nil]
#
# @!attribute [rw] diameter
#   @return [Float, nil]
#
# @!attribute [rw] height
#   @return [Float, nil]
#
# @!attribute [rw] history
#   @return [String, nil]
#
# @!attribute [rw] human_rated
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] image_url
#   @return [String, nil]
#
# @!attribute [rw] in_use
#   @return [Boolean, nil]
#
# @!attribute [rw] maiden_flight
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [Hash, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
SpacecraftListMatch = Struct.new(
  :agency,
  :capability,
  :crew_capacity,
  :details,
  :diameter,
  :height,
  :history,
  :human_rated,
  :id,
  :image_url,
  :in_use,
  :maiden_flight,
  :name,
  :type,
  :url,
  keyword_init: true
)

