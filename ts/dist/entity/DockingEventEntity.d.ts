import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { DockingEvent, DockingEventLoadMatch, DockingEventListMatch } from '../LaunchLibrary2Types';
declare class DockingEventEntity extends LaunchLibrary2EntityBase<DockingEvent> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: DockingEventEntity): DockingEventEntity;
    load(this: any, reqmatch?: DockingEventLoadMatch, ctrl?: Control): Promise<DockingEventEntity>;
    list(this: any, reqmatch?: DockingEventListMatch, ctrl?: Control): Promise<DockingEventEntity[]>;
}
export { DockingEventEntity };
