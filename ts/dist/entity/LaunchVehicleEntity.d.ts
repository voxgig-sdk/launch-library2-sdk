import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { Control } from '../types';
import type { LaunchVehicle, LaunchVehicleListMatch } from '../LaunchLibrary2Types';
declare class LaunchVehicleEntity extends LaunchLibrary2EntityBase<LaunchVehicle> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: LaunchVehicleEntity): LaunchVehicleEntity;
    list(this: any, reqmatch?: LaunchVehicleListMatch, ctrl?: Control): Promise<LaunchVehicleEntity[]>;
}
export { LaunchVehicleEntity };
