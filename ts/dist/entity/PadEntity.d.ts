import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Pad, PadLoadMatch, PadListMatch } from '../LaunchLibrary2Types';
declare class PadEntity extends LaunchLibrary2EntityBase<Pad> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: PadEntity): PadEntity;
    load(this: any, reqmatch?: PadLoadMatch, ctrl?: Control): Promise<PadEntity>;
    list(this: any, reqmatch?: PadListMatch, ctrl?: Control): Promise<PadEntity[]>;
}
export { PadEntity };
