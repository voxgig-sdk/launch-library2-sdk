import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Launch, LaunchLoadMatch, LaunchListMatch } from '../LaunchLibrary2Types';
declare class LaunchEntity extends LaunchLibrary2EntityBase<Launch> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: LaunchEntity): LaunchEntity;
    load(this: any, reqmatch?: LaunchLoadMatch, ctrl?: Control): Promise<LaunchEntity>;
    list(this: any, reqmatch?: LaunchListMatch, ctrl?: Control): Promise<LaunchEntity[]>;
}
export { LaunchEntity };
