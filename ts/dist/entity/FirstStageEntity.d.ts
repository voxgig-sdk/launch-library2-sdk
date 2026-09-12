import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { FirstStage, FirstStageLoadMatch, FirstStageListMatch } from '../LaunchLibrary2Types';
declare class FirstStageEntity extends LaunchLibrary2EntityBase<FirstStage> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: FirstStageEntity): FirstStageEntity;
    load(this: any, reqmatch?: FirstStageLoadMatch, ctrl?: Control): Promise<FirstStageEntity>;
    list(this: any, reqmatch?: FirstStageListMatch, ctrl?: Control): Promise<FirstStageEntity[]>;
}
export { FirstStageEntity };
