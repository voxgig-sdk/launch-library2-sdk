import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Astronaut, AstronautLoadMatch, AstronautListMatch } from '../LaunchLibrary2Types';
declare class AstronautEntity extends LaunchLibrary2EntityBase<Astronaut> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: AstronautEntity): AstronautEntity;
    load(this: any, reqmatch?: AstronautLoadMatch, ctrl?: Control): Promise<AstronautEntity>;
    list(this: any, reqmatch?: AstronautListMatch, ctrl?: Control): Promise<AstronautEntity[]>;
}
export { AstronautEntity };
