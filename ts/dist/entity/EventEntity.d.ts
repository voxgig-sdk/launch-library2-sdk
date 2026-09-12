import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Event, EventLoadMatch, EventListMatch } from '../LaunchLibrary2Types';
declare class EventEntity extends LaunchLibrary2EntityBase<Event> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: EventEntity): EventEntity;
    load(this: any, reqmatch?: EventLoadMatch, ctrl?: Control): Promise<EventEntity>;
    list(this: any, reqmatch?: EventListMatch, ctrl?: Control): Promise<EventEntity[]>;
}
export { EventEntity };
