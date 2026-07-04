# Typed models for the LaunchLibrary2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Agency:
    abbrev: Optional[str] = None
    administrator: Optional[str] = None
    country_code: Optional[str] = None
    description: Optional[str] = None
    founding_year: Optional[str] = None
    id: Optional[int] = None
    logo_url: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class AgencyLoadMatch:
    id: int


@dataclass
class AgencyListMatch:
    abbrev: Optional[str] = None
    administrator: Optional[str] = None
    country_code: Optional[str] = None
    description: Optional[str] = None
    founding_year: Optional[str] = None
    id: Optional[int] = None
    logo_url: Optional[str] = None
    name: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Astronaut:
    bio: Optional[str] = None
    date_of_birth: Optional[str] = None
    date_of_death: Optional[str] = None
    flights_count: Optional[int] = None
    id: Optional[int] = None
    name: Optional[str] = None
    nationality: Optional[str] = None
    profile_image: Optional[str] = None
    spacewalks_count: Optional[int] = None
    status: Optional[dict] = None
    type: Optional[dict] = None
    url: Optional[str] = None


@dataclass
class AstronautLoadMatch:
    id: int


@dataclass
class AstronautListMatch:
    bio: Optional[str] = None
    date_of_birth: Optional[str] = None
    date_of_death: Optional[str] = None
    flights_count: Optional[int] = None
    id: Optional[int] = None
    name: Optional[str] = None
    nationality: Optional[str] = None
    profile_image: Optional[str] = None
    spacewalks_count: Optional[int] = None
    status: Optional[dict] = None
    type: Optional[dict] = None
    url: Optional[str] = None


@dataclass
class Docking:
    pass


@dataclass
class DockingEvent:
    departure: Optional[str] = None
    docking: Optional[str] = None
    docking_location: Optional[dict] = None
    flight_vehicle: Optional[dict] = None
    id: Optional[int] = None
    url: Optional[str] = None


@dataclass
class DockingEventLoadMatch:
    id: int


@dataclass
class DockingEventListMatch:
    departure: Optional[str] = None
    docking: Optional[str] = None
    docking_location: Optional[dict] = None
    flight_vehicle: Optional[dict] = None
    id: Optional[int] = None
    url: Optional[str] = None


@dataclass
class Event:
    date: Optional[str] = None
    description: Optional[str] = None
    feature_image: Optional[str] = None
    id: Optional[int] = None
    location: Optional[str] = None
    name: Optional[str] = None
    news_url: Optional[str] = None
    type: Optional[dict] = None
    url: Optional[str] = None
    video_url: Optional[str] = None


@dataclass
class EventLoadMatch:
    id: int


@dataclass
class EventListMatch:
    date: Optional[str] = None
    description: Optional[str] = None
    feature_image: Optional[str] = None
    id: Optional[int] = None
    location: Optional[str] = None
    name: Optional[str] = None
    news_url: Optional[str] = None
    type: Optional[dict] = None
    url: Optional[str] = None
    video_url: Optional[str] = None


@dataclass
class Expedition:
    crew: Optional[list] = None
    end: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    spacestation: Optional[dict] = None
    start: Optional[str] = None
    url: Optional[str] = None


@dataclass
class ExpeditionLoadMatch:
    id: int


@dataclass
class ExpeditionListMatch:
    crew: Optional[list] = None
    end: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    spacestation: Optional[dict] = None
    start: Optional[str] = None
    url: Optional[str] = None


@dataclass
class FirstStage:
    flight: Optional[int] = None
    id: Optional[int] = None
    launcher_config: Optional[dict] = None
    serial_number: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class FirstStageLoadMatch:
    id: int


@dataclass
class FirstStageListMatch:
    flight: Optional[int] = None
    id: Optional[int] = None
    launcher_config: Optional[dict] = None
    serial_number: Optional[str] = None
    status: Optional[str] = None
    type: Optional[str] = None
    url: Optional[str] = None


@dataclass
class Launch:
    id: Optional[str] = None
    image: Optional[str] = None
    launch_service_provider: Optional[dict] = None
    mission: Optional[dict] = None
    name: Optional[str] = None
    net: Optional[str] = None
    pad: Optional[dict] = None
    probability: Optional[int] = None
    rocket: Optional[dict] = None
    status: Optional[dict] = None
    url: Optional[str] = None
    webcast_live: Optional[bool] = None
    window_end: Optional[str] = None
    window_start: Optional[str] = None


@dataclass
class LaunchLoadMatch:
    id: str


@dataclass
class LaunchListMatch:
    id: Optional[str] = None
    image: Optional[str] = None
    launch_service_provider: Optional[dict] = None
    mission: Optional[dict] = None
    name: Optional[str] = None
    net: Optional[str] = None
    pad: Optional[dict] = None
    probability: Optional[int] = None
    rocket: Optional[dict] = None
    status: Optional[dict] = None
    url: Optional[str] = None
    webcast_live: Optional[bool] = None
    window_end: Optional[str] = None
    window_start: Optional[str] = None


@dataclass
class LaunchVehicle:
    apogee: Optional[int] = None
    consecutive_successful_launch: Optional[int] = None
    description: Optional[str] = None
    diameter: Optional[float] = None
    failed_launch: Optional[int] = None
    family: Optional[str] = None
    full_name: Optional[str] = None
    gto_capacity: Optional[int] = None
    id: Optional[int] = None
    launch_mass: Optional[int] = None
    length: Optional[float] = None
    leo_capacity: Optional[int] = None
    maiden_flight: Optional[str] = None
    manufacturer: Optional[dict] = None
    max_stage: Optional[int] = None
    min_stage: Optional[int] = None
    name: Optional[str] = None
    pending_launch: Optional[int] = None
    successful_launch: Optional[int] = None
    to_thrust: Optional[int] = None
    url: Optional[str] = None
    variant: Optional[str] = None


@dataclass
class LaunchVehicleListMatch:
    apogee: Optional[int] = None
    consecutive_successful_launch: Optional[int] = None
    description: Optional[str] = None
    diameter: Optional[float] = None
    failed_launch: Optional[int] = None
    family: Optional[str] = None
    full_name: Optional[str] = None
    gto_capacity: Optional[int] = None
    id: Optional[int] = None
    launch_mass: Optional[int] = None
    length: Optional[float] = None
    leo_capacity: Optional[int] = None
    maiden_flight: Optional[str] = None
    manufacturer: Optional[dict] = None
    max_stage: Optional[int] = None
    min_stage: Optional[int] = None
    name: Optional[str] = None
    pending_launch: Optional[int] = None
    successful_launch: Optional[int] = None
    to_thrust: Optional[int] = None
    url: Optional[str] = None
    variant: Optional[str] = None


@dataclass
class Launcher:
    apogee: Optional[int] = None
    consecutive_successful_launch: Optional[int] = None
    description: Optional[str] = None
    diameter: Optional[float] = None
    failed_launch: Optional[int] = None
    family: Optional[str] = None
    full_name: Optional[str] = None
    gto_capacity: Optional[int] = None
    id: Optional[int] = None
    launch_mass: Optional[int] = None
    length: Optional[float] = None
    leo_capacity: Optional[int] = None
    maiden_flight: Optional[str] = None
    manufacturer: Optional[dict] = None
    max_stage: Optional[int] = None
    min_stage: Optional[int] = None
    name: Optional[str] = None
    pending_launch: Optional[int] = None
    successful_launch: Optional[int] = None
    to_thrust: Optional[int] = None
    url: Optional[str] = None
    variant: Optional[str] = None


@dataclass
class LauncherLoadMatch:
    id: int


@dataclass
class Location:
    country_code: Optional[str] = None
    id: Optional[int] = None
    map_image: Optional[str] = None
    name: Optional[str] = None
    total_landing_count: Optional[int] = None
    total_launch_count: Optional[int] = None
    url: Optional[str] = None


@dataclass
class LocationLoadMatch:
    id: int


@dataclass
class LocationListMatch:
    country_code: Optional[str] = None
    id: Optional[int] = None
    map_image: Optional[str] = None
    name: Optional[str] = None
    total_landing_count: Optional[int] = None
    total_launch_count: Optional[int] = None
    url: Optional[str] = None


@dataclass
class Pad:
    agency_id: Optional[int] = None
    id: Optional[int] = None
    info_url: Optional[str] = None
    latitude: Optional[str] = None
    location: Optional[dict] = None
    longitude: Optional[str] = None
    map_image: Optional[str] = None
    map_url: Optional[str] = None
    name: Optional[str] = None
    total_launch_count: Optional[int] = None
    url: Optional[str] = None
    wiki_url: Optional[str] = None


@dataclass
class PadLoadMatch:
    id: int


@dataclass
class PadListMatch:
    agency_id: Optional[int] = None
    id: Optional[int] = None
    info_url: Optional[str] = None
    latitude: Optional[str] = None
    location: Optional[dict] = None
    longitude: Optional[str] = None
    map_image: Optional[str] = None
    map_url: Optional[str] = None
    name: Optional[str] = None
    total_launch_count: Optional[int] = None
    url: Optional[str] = None
    wiki_url: Optional[str] = None


@dataclass
class ReusableFirstStage:
    pass


@dataclass
class SpaceStation:
    deorbited: Optional[str] = None
    description: Optional[str] = None
    founded: Optional[str] = None
    id: Optional[int] = None
    image_url: Optional[str] = None
    name: Optional[str] = None
    orbit: Optional[str] = None
    owner: Optional[list] = None
    status: Optional[dict] = None
    type: Optional[dict] = None
    url: Optional[str] = None


@dataclass
class SpaceStationLoadMatch:
    id: int


@dataclass
class SpaceStationListMatch:
    deorbited: Optional[str] = None
    description: Optional[str] = None
    founded: Optional[str] = None
    id: Optional[int] = None
    image_url: Optional[str] = None
    name: Optional[str] = None
    orbit: Optional[str] = None
    owner: Optional[list] = None
    status: Optional[dict] = None
    type: Optional[dict] = None
    url: Optional[str] = None


@dataclass
class Spacecraft:
    agency: Optional[dict] = None
    capability: Optional[str] = None
    crew_capacity: Optional[int] = None
    detail: Optional[str] = None
    diameter: Optional[float] = None
    height: Optional[float] = None
    history: Optional[str] = None
    human_rated: Optional[bool] = None
    id: Optional[int] = None
    image_url: Optional[str] = None
    in_use: Optional[bool] = None
    maiden_flight: Optional[str] = None
    name: Optional[str] = None
    type: Optional[dict] = None
    url: Optional[str] = None


@dataclass
class SpacecraftLoadMatch:
    id: int


@dataclass
class SpacecraftListMatch:
    agency: Optional[dict] = None
    capability: Optional[str] = None
    crew_capacity: Optional[int] = None
    detail: Optional[str] = None
    diameter: Optional[float] = None
    height: Optional[float] = None
    history: Optional[str] = None
    human_rated: Optional[bool] = None
    id: Optional[int] = None
    image_url: Optional[str] = None
    in_use: Optional[bool] = None
    maiden_flight: Optional[str] = None
    name: Optional[str] = None
    type: Optional[dict] = None
    url: Optional[str] = None

