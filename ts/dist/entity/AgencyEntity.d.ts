import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Agency, AgencyLoadMatch, AgencyListMatch } from '../LaunchLibrary2Types';
declare class AgencyEntity extends LaunchLibrary2EntityBase<Agency> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: AgencyEntity): AgencyEntity;
    load(this: any, reqmatch?: AgencyLoadMatch, ctrl?: Control): Promise<AgencyEntity>;
    list(this: any, reqmatch?: AgencyListMatch, ctrl?: Control): Promise<AgencyEntity[]>;
}
export { AgencyEntity };
