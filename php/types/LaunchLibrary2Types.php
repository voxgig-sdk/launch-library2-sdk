<?php
declare(strict_types=1);

// Typed models for the LaunchLibrary2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Agency entity data model. */
class Agency
{
    public ?string $abbrev = null;
    public ?string $administrator = null;
    public ?string $country_code = null;
    public ?string $description = null;
    public ?string $founding_year = null;
    public ?int $id = null;
    public ?string $logo_url = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Request payload for Agency#load. */
class AgencyLoadMatch
{
    public int $id;
}

/** Match filter for Agency#list (any subset of Agency fields). */
class AgencyListMatch
{
    public ?string $abbrev = null;
    public ?string $administrator = null;
    public ?string $country_code = null;
    public ?string $description = null;
    public ?string $founding_year = null;
    public ?int $id = null;
    public ?string $logo_url = null;
    public ?string $name = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Astronaut entity data model. */
class Astronaut
{
    public ?string $bio = null;
    public ?string $date_of_birth = null;
    public ?string $date_of_death = null;
    public ?int $flights_count = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $nationality = null;
    public ?string $profile_image = null;
    public ?int $spacewalks_count = null;
    public ?array $status = null;
    public ?array $type = null;
    public ?string $url = null;
}

/** Request payload for Astronaut#load. */
class AstronautLoadMatch
{
    public int $id;
}

/** Match filter for Astronaut#list (any subset of Astronaut fields). */
class AstronautListMatch
{
    public ?string $bio = null;
    public ?string $date_of_birth = null;
    public ?string $date_of_death = null;
    public ?int $flights_count = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?string $nationality = null;
    public ?string $profile_image = null;
    public ?int $spacewalks_count = null;
    public ?array $status = null;
    public ?array $type = null;
    public ?string $url = null;
}

/** Docking entity data model. */
class Docking
{
}

/** DockingEvent entity data model. */
class DockingEvent
{
    public ?string $departure = null;
    public ?string $docking = null;
    public ?array $docking_location = null;
    public ?array $flight_vehicle = null;
    public ?int $id = null;
    public ?string $url = null;
}

/** Request payload for DockingEvent#load. */
class DockingEventLoadMatch
{
    public int $id;
}

/** Match filter for DockingEvent#list (any subset of DockingEvent fields). */
class DockingEventListMatch
{
    public ?string $departure = null;
    public ?string $docking = null;
    public ?array $docking_location = null;
    public ?array $flight_vehicle = null;
    public ?int $id = null;
    public ?string $url = null;
}

/** Event entity data model. */
class Event
{
    public ?string $date = null;
    public ?string $description = null;
    public ?string $feature_image = null;
    public ?int $id = null;
    public ?string $location = null;
    public ?string $name = null;
    public ?string $news_url = null;
    public ?array $type = null;
    public ?string $url = null;
    public ?string $video_url = null;
}

/** Request payload for Event#load. */
class EventLoadMatch
{
    public int $id;
}

/** Match filter for Event#list (any subset of Event fields). */
class EventListMatch
{
    public ?string $date = null;
    public ?string $description = null;
    public ?string $feature_image = null;
    public ?int $id = null;
    public ?string $location = null;
    public ?string $name = null;
    public ?string $news_url = null;
    public ?array $type = null;
    public ?string $url = null;
    public ?string $video_url = null;
}

/** Expedition entity data model. */
class Expedition
{
    public ?array $crew = null;
    public ?string $end = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $spacestation = null;
    public ?string $start = null;
    public ?string $url = null;
}

/** Request payload for Expedition#load. */
class ExpeditionLoadMatch
{
    public int $id;
}

/** Match filter for Expedition#list (any subset of Expedition fields). */
class ExpeditionListMatch
{
    public ?array $crew = null;
    public ?string $end = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?array $spacestation = null;
    public ?string $start = null;
    public ?string $url = null;
}

/** FirstStage entity data model. */
class FirstStage
{
    public ?int $flight = null;
    public ?int $id = null;
    public ?array $launcher_config = null;
    public ?string $serial_number = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Request payload for FirstStage#load. */
class FirstStageLoadMatch
{
    public int $id;
}

/** Match filter for FirstStage#list (any subset of FirstStage fields). */
class FirstStageListMatch
{
    public ?int $flight = null;
    public ?int $id = null;
    public ?array $launcher_config = null;
    public ?string $serial_number = null;
    public ?string $status = null;
    public ?string $type = null;
    public ?string $url = null;
}

/** Launch entity data model. */
class Launch
{
    public ?string $id = null;
    public ?string $image = null;
    public ?array $launch_service_provider = null;
    public ?array $mission = null;
    public ?string $name = null;
    public ?string $net = null;
    public ?array $pad = null;
    public ?int $probability = null;
    public ?array $rocket = null;
    public ?array $status = null;
    public ?string $url = null;
    public ?bool $webcast_live = null;
    public ?string $window_end = null;
    public ?string $window_start = null;
}

/** Request payload for Launch#load. */
class LaunchLoadMatch
{
    public string $id;
}

/** Match filter for Launch#list (any subset of Launch fields). */
class LaunchListMatch
{
    public ?string $id = null;
    public ?string $image = null;
    public ?array $launch_service_provider = null;
    public ?array $mission = null;
    public ?string $name = null;
    public ?string $net = null;
    public ?array $pad = null;
    public ?int $probability = null;
    public ?array $rocket = null;
    public ?array $status = null;
    public ?string $url = null;
    public ?bool $webcast_live = null;
    public ?string $window_end = null;
    public ?string $window_start = null;
}

/** LaunchVehicle entity data model. */
class LaunchVehicle
{
    public ?int $apogee = null;
    public ?int $consecutive_successful_launch = null;
    public ?string $description = null;
    public ?float $diameter = null;
    public ?int $failed_launch = null;
    public ?string $family = null;
    public ?string $full_name = null;
    public ?int $gto_capacity = null;
    public ?int $id = null;
    public ?int $launch_mass = null;
    public ?float $length = null;
    public ?int $leo_capacity = null;
    public ?string $maiden_flight = null;
    public ?array $manufacturer = null;
    public ?int $max_stage = null;
    public ?int $min_stage = null;
    public ?string $name = null;
    public ?int $pending_launch = null;
    public ?int $successful_launch = null;
    public ?int $to_thrust = null;
    public ?string $url = null;
    public ?string $variant = null;
}

/** Match filter for LaunchVehicle#list (any subset of LaunchVehicle fields). */
class LaunchVehicleListMatch
{
    public ?int $apogee = null;
    public ?int $consecutive_successful_launch = null;
    public ?string $description = null;
    public ?float $diameter = null;
    public ?int $failed_launch = null;
    public ?string $family = null;
    public ?string $full_name = null;
    public ?int $gto_capacity = null;
    public ?int $id = null;
    public ?int $launch_mass = null;
    public ?float $length = null;
    public ?int $leo_capacity = null;
    public ?string $maiden_flight = null;
    public ?array $manufacturer = null;
    public ?int $max_stage = null;
    public ?int $min_stage = null;
    public ?string $name = null;
    public ?int $pending_launch = null;
    public ?int $successful_launch = null;
    public ?int $to_thrust = null;
    public ?string $url = null;
    public ?string $variant = null;
}

/** Launcher entity data model. */
class Launcher
{
    public ?int $apogee = null;
    public ?int $consecutive_successful_launch = null;
    public ?string $description = null;
    public ?float $diameter = null;
    public ?int $failed_launch = null;
    public ?string $family = null;
    public ?string $full_name = null;
    public ?int $gto_capacity = null;
    public ?int $id = null;
    public ?int $launch_mass = null;
    public ?float $length = null;
    public ?int $leo_capacity = null;
    public ?string $maiden_flight = null;
    public ?array $manufacturer = null;
    public ?int $max_stage = null;
    public ?int $min_stage = null;
    public ?string $name = null;
    public ?int $pending_launch = null;
    public ?int $successful_launch = null;
    public ?int $to_thrust = null;
    public ?string $url = null;
    public ?string $variant = null;
}

/** Request payload for Launcher#load. */
class LauncherLoadMatch
{
    public int $id;
}

/** Location entity data model. */
class Location
{
    public ?string $country_code = null;
    public ?int $id = null;
    public ?string $map_image = null;
    public ?string $name = null;
    public ?int $total_landing_count = null;
    public ?int $total_launch_count = null;
    public ?string $url = null;
}

/** Request payload for Location#load. */
class LocationLoadMatch
{
    public int $id;
}

/** Match filter for Location#list (any subset of Location fields). */
class LocationListMatch
{
    public ?string $country_code = null;
    public ?int $id = null;
    public ?string $map_image = null;
    public ?string $name = null;
    public ?int $total_landing_count = null;
    public ?int $total_launch_count = null;
    public ?string $url = null;
}

/** Pad entity data model. */
class Pad
{
    public ?int $agency_id = null;
    public ?int $id = null;
    public ?string $info_url = null;
    public ?string $latitude = null;
    public ?array $location = null;
    public ?string $longitude = null;
    public ?string $map_image = null;
    public ?string $map_url = null;
    public ?string $name = null;
    public ?int $total_launch_count = null;
    public ?string $url = null;
    public ?string $wiki_url = null;
}

/** Request payload for Pad#load. */
class PadLoadMatch
{
    public int $id;
}

/** Match filter for Pad#list (any subset of Pad fields). */
class PadListMatch
{
    public ?int $agency_id = null;
    public ?int $id = null;
    public ?string $info_url = null;
    public ?string $latitude = null;
    public ?array $location = null;
    public ?string $longitude = null;
    public ?string $map_image = null;
    public ?string $map_url = null;
    public ?string $name = null;
    public ?int $total_launch_count = null;
    public ?string $url = null;
    public ?string $wiki_url = null;
}

/** ReusableFirstStage entity data model. */
class ReusableFirstStage
{
}

/** SpaceStation entity data model. */
class SpaceStation
{
    public ?string $deorbited = null;
    public ?string $description = null;
    public ?string $founded = null;
    public ?int $id = null;
    public ?string $image_url = null;
    public ?string $name = null;
    public ?string $orbit = null;
    public ?array $owner = null;
    public ?array $status = null;
    public ?array $type = null;
    public ?string $url = null;
}

/** Request payload for SpaceStation#load. */
class SpaceStationLoadMatch
{
    public int $id;
}

/** Match filter for SpaceStation#list (any subset of SpaceStation fields). */
class SpaceStationListMatch
{
    public ?string $deorbited = null;
    public ?string $description = null;
    public ?string $founded = null;
    public ?int $id = null;
    public ?string $image_url = null;
    public ?string $name = null;
    public ?string $orbit = null;
    public ?array $owner = null;
    public ?array $status = null;
    public ?array $type = null;
    public ?string $url = null;
}

/** Spacecraft entity data model. */
class Spacecraft
{
    public ?array $agency = null;
    public ?string $capability = null;
    public ?int $crew_capacity = null;
    public ?string $detail = null;
    public ?float $diameter = null;
    public ?float $height = null;
    public ?string $history = null;
    public ?bool $human_rated = null;
    public ?int $id = null;
    public ?string $image_url = null;
    public ?bool $in_use = null;
    public ?string $maiden_flight = null;
    public ?string $name = null;
    public ?array $type = null;
    public ?string $url = null;
}

/** Request payload for Spacecraft#load. */
class SpacecraftLoadMatch
{
    public int $id;
}

/** Match filter for Spacecraft#list (any subset of Spacecraft fields). */
class SpacecraftListMatch
{
    public ?array $agency = null;
    public ?string $capability = null;
    public ?int $crew_capacity = null;
    public ?string $detail = null;
    public ?float $diameter = null;
    public ?float $height = null;
    public ?string $history = null;
    public ?bool $human_rated = null;
    public ?int $id = null;
    public ?string $image_url = null;
    public ?bool $in_use = null;
    public ?string $maiden_flight = null;
    public ?string $name = null;
    public ?array $type = null;
    public ?string $url = null;
}

