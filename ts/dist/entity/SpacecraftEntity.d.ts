import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Spacecraft, SpacecraftLoadMatch, SpacecraftListMatch } from '../LaunchLibrary2Types';
declare class SpacecraftEntity extends LaunchLibrary2EntityBase<Spacecraft> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: SpacecraftEntity): SpacecraftEntity;
    load(this: any, reqmatch?: SpacecraftLoadMatch, ctrl?: Control): Promise<SpacecraftEntity>;
    list(this: any, reqmatch?: SpacecraftListMatch, ctrl?: Control): Promise<SpacecraftEntity[]>;
}
export { SpacecraftEntity };
