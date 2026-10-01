import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Launcher, LauncherLoadMatch, LauncherListMatch } from '../LaunchLibrary2Types';
declare class LauncherEntity extends LaunchLibrary2EntityBase<Launcher> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: LauncherEntity): LauncherEntity;
    load(this: any, reqmatch?: LauncherLoadMatch, ctrl?: Control): Promise<LauncherEntity>;
    list(this: any, reqmatch?: LauncherListMatch, ctrl?: Control): Promise<LauncherEntity[]>;
}
export { LauncherEntity };
