import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { SpaceStation, SpaceStationLoadMatch, SpaceStationListMatch } from '../LaunchLibrary2Types';
declare class SpaceStationEntity extends LaunchLibrary2EntityBase<SpaceStation> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: SpaceStationEntity): SpaceStationEntity;
    load(this: any, reqmatch?: SpaceStationLoadMatch, ctrl?: Control): Promise<SpaceStationEntity>;
    list(this: any, reqmatch?: SpaceStationListMatch, ctrl?: Control): Promise<SpaceStationEntity[]>;
}
export { SpaceStationEntity };
