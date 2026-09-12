import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { Expedition, ExpeditionLoadMatch, ExpeditionListMatch } from '../LaunchLibrary2Types';
declare class ExpeditionEntity extends LaunchLibrary2EntityBase<Expedition> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: ExpeditionEntity): ExpeditionEntity;
    load(this: any, reqmatch?: ExpeditionLoadMatch, ctrl?: Control): Promise<ExpeditionEntity>;
    list(this: any, reqmatch?: ExpeditionListMatch, ctrl?: Control): Promise<ExpeditionEntity[]>;
}
export { ExpeditionEntity };
