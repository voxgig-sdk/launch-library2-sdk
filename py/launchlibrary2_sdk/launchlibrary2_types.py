# Typed models for the LaunchLibrary2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Agency(TypedDict, total=False):
    abbrev: str
    administrator: str
    country_code: str
    description: str
    founding_year: str
    id: int
    logo_url: str
    name: str
    type: str
    url: str


class AgencyLoadMatch(TypedDict):
    id: int


class AgencyListMatch(TypedDict, total=False):
    abbrev: str
    administrator: str
    country_code: str
    description: str
    founding_year: str
    id: int
    logo_url: str
    name: str
    type: str
    url: str


class Astronaut(TypedDict, total=False):
    bio: str
    date_of_birth: str
    date_of_death: str
    flights_count: int
    id: int
    name: str
    nationality: str
    profile_image: str
    spacewalks_count: int
    status: dict
    type: dict
    url: str


class AstronautLoadMatch(TypedDict):
    id: int


class AstronautListMatch(TypedDict, total=False):
    bio: str
    date_of_birth: str
    date_of_death: str
    flights_count: int
    id: int
    name: str
    nationality: str
    profile_image: str
    spacewalks_count: int
    status: dict
    type: dict
    url: str


class Docking(TypedDict):
    pass


class DockingEvent(TypedDict, total=False):
    departure: str
    docking: str
    docking_location: dict
    flight_vehicle: dict
    id: int
    url: str


class DockingEventLoadMatch(TypedDict):
    id: int


class DockingEventListMatch(TypedDict, total=False):
    departure: str
    docking: str
    docking_location: dict
    flight_vehicle: dict
    id: int
    url: str


class Event(TypedDict, total=False):
    date: str
    description: str
    feature_image: str
    id: int
    location: str
    name: str
    news_url: str
    type: dict
    url: str
    video_url: str


class EventLoadMatch(TypedDict):
    id: int


class EventListMatch(TypedDict, total=False):
    date: str
    description: str
    feature_image: str
    id: int
    location: str
    name: str
    news_url: str
    type: dict
    url: str
    video_url: str


class Expedition(TypedDict, total=False):
    crew: list
    end: str
    id: int
    name: str
    spacestation: dict
    start: str
    url: str


class ExpeditionLoadMatch(TypedDict):
    id: int


class ExpeditionListMatch(TypedDict, total=False):
    crew: list
    end: str
    id: int
    name: str
    spacestation: dict
    start: str
    url: str


class FirstStage(TypedDict, total=False):
    apogee: int
    consecutive_successful_launches: int
    description: str
    diameter: float
    failed_launches: int
    family: str
    flights: int
    full_name: str
    gto_capacity: int
    id: int
    launch_mass: int
    launcher_config: dict
    length: float
    leo_capacity: int
    maiden_flight: str
    manufacturer: dict
    max_stage: int
    min_stage: int
    name: str
    pending_launches: int
    serial_number: str
    status: str
    successful_launches: int
    to_thrust: int
    type: str
    url: str
    variant: str


class FirstStageLoadMatch(TypedDict):
    id: int


class FirstStageListMatch(TypedDict, total=False):
    apogee: int
    consecutive_successful_launches: int
    description: str
    diameter: float
    failed_launches: int
    family: str
    flights: int
    full_name: str
    gto_capacity: int
    id: int
    launch_mass: int
    launcher_config: dict
    length: float
    leo_capacity: int
    maiden_flight: str
    manufacturer: dict
    max_stage: int
    min_stage: int
    name: str
    pending_launches: int
    serial_number: str
    status: str
    successful_launches: int
    to_thrust: int
    type: str
    url: str
    variant: str


class Launch(TypedDict, total=False):
    id: str
    image: str
    launch_service_provider: dict
    mission: dict
    name: str
    net: str
    pad: dict
    probability: int
    rocket: dict
    status: dict
    url: str
    webcast_live: bool
    window_end: str
    window_start: str


class LaunchLoadMatch(TypedDict):
    id: str


class LaunchListMatch(TypedDict, total=False):
    id: str
    image: str
    launch_service_provider: dict
    mission: dict
    name: str
    net: str
    pad: dict
    probability: int
    rocket: dict
    status: dict
    url: str
    webcast_live: bool
    window_end: str
    window_start: str


class LaunchVehicle(TypedDict, total=False):
    apogee: int
    consecutive_successful_launches: int
    description: str
    diameter: float
    failed_launches: int
    family: str
    full_name: str
    gto_capacity: int
    id: int
    launch_mass: int
    length: float
    leo_capacity: int
    maiden_flight: str
    manufacturer: dict
    max_stage: int
    min_stage: int
    name: str
    pending_launches: int
    successful_launches: int
    to_thrust: int
    url: str
    variant: str


class LaunchVehicleListMatch(TypedDict, total=False):
    apogee: int
    consecutive_successful_launches: int
    description: str
    diameter: float
    failed_launches: int
    family: str
    full_name: str
    gto_capacity: int
    id: int
    launch_mass: int
    length: float
    leo_capacity: int
    maiden_flight: str
    manufacturer: dict
    max_stage: int
    min_stage: int
    name: str
    pending_launches: int
    successful_launches: int
    to_thrust: int
    url: str
    variant: str


class Launcher(TypedDict, total=False):
    abbrev: str
    administrator: str
    country_code: str
    description: str
    founding_year: str
    id: int
    logo_url: str
    name: str
    type: str
    url: str


class LauncherLoadMatch(TypedDict):
    id: int


class Location(TypedDict, total=False):
    country_code: str
    id: int
    map_image: str
    name: str
    total_landing_count: int
    total_launch_count: int
    url: str


class LocationLoadMatch(TypedDict):
    id: int


class LocationListMatch(TypedDict, total=False):
    country_code: str
    id: int
    map_image: str
    name: str
    total_landing_count: int
    total_launch_count: int
    url: str


class Pad(TypedDict, total=False):
    agency_id: int
    country_code: str
    id: int
    info_url: str
    latitude: str
    location: dict
    longitude: str
    map_image: str
    map_url: str
    name: str
    total_landing_count: int
    total_launch_count: int
    url: str
    wiki_url: str


class PadLoadMatch(TypedDict):
    id: int


class PadListMatch(TypedDict, total=False):
    agency_id: int
    country_code: str
    id: int
    info_url: str
    latitude: str
    location: dict
    longitude: str
    map_image: str
    map_url: str
    name: str
    total_landing_count: int
    total_launch_count: int
    url: str
    wiki_url: str


class ReusableFirstStage(TypedDict):
    pass


class SpaceStation(TypedDict, total=False):
    deorbited: str
    description: str
    founded: str
    id: int
    image_url: str
    name: str
    orbit: str
    owners: list
    status: dict
    type: dict
    url: str


class SpaceStationLoadMatch(TypedDict):
    id: int


class SpaceStationListMatch(TypedDict, total=False):
    deorbited: str
    description: str
    founded: str
    id: int
    image_url: str
    name: str
    orbit: str
    owners: list
    status: dict
    type: dict
    url: str


class Spacecraft(TypedDict, total=False):
    agency: dict
    capability: str
    crew_capacity: int
    details: str
    diameter: float
    height: float
    history: str
    human_rated: bool
    id: int
    image_url: str
    in_use: bool
    maiden_flight: str
    name: str
    type: dict
    url: str


class SpacecraftLoadMatch(TypedDict):
    id: int


class SpacecraftListMatch(TypedDict, total=False):
    agency: dict
    capability: str
    crew_capacity: int
    details: str
    diameter: float
    height: float
    history: str
    human_rated: bool
    id: int
    image_url: str
    in_use: bool
    maiden_flight: str
    name: str
    type: dict
    url: str
