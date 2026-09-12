import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Docking } from '../LaunchLibrary2Types';
declare class DockingEntity extends LaunchLibrary2EntityBase<Docking> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: DockingEntity): DockingEntity;
}
export { DockingEntity };
