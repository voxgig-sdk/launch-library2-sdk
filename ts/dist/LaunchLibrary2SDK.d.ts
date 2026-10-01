import { AgencyEntity } from './entity/AgencyEntity';
import { AstronautEntity } from './entity/AstronautEntity';
import { DockingEventEntity } from './entity/DockingEventEntity';
import { EventEntity } from './entity/EventEntity';
import { ExpeditionEntity } from './entity/ExpeditionEntity';
import { FirstStageEntity } from './entity/FirstStageEntity';
import { LaunchEntity } from './entity/LaunchEntity';
import { LauncherEntity } from './entity/LauncherEntity';
import { LocationEntity } from './entity/LocationEntity';
import { PadEntity } from './entity/PadEntity';
import { SpaceStationEntity } from './entity/SpaceStationEntity';
import { SpacecraftEntity } from './entity/SpacecraftEntity';
export type * from './LaunchLibrary2Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { LaunchLibrary2EntityBase } from './LaunchLibrary2EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class LaunchLibrary2SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Agency(entopts?: Record<string, any>): AgencyEntity;
    Astronaut(entopts?: Record<string, any>): AstronautEntity;
    DockingEvent(entopts?: Record<string, any>): DockingEventEntity;
    Event(entopts?: Record<string, any>): EventEntity;
    Expedition(entopts?: Record<string, any>): ExpeditionEntity;
    FirstStage(entopts?: Record<string, any>): FirstStageEntity;
    Launch(entopts?: Record<string, any>): LaunchEntity;
    Launcher(entopts?: Record<string, any>): LauncherEntity;
    Location(entopts?: Record<string, any>): LocationEntity;
    Pad(entopts?: Record<string, any>): PadEntity;
    SpaceStation(entopts?: Record<string, any>): SpaceStationEntity;
    Spacecraft(entopts?: Record<string, any>): SpacecraftEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): LaunchLibrary2SDK;
    tester(testopts?: any, sdkopts?: any): LaunchLibrary2SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof LaunchLibrary2SDK;
export { stdutil, config, BaseFeature, LaunchLibrary2EntityBase, LaunchLibrary2SDK, SDK, };
