import { LaunchLibrary2EntityBase } from '../LaunchLibrary2EntityBase';
import type { LaunchLibrary2SDK } from '../LaunchLibrary2SDK';
import type { ReusableFirstStage } from '../LaunchLibrary2Types';
declare class ReusableFirstStageEntity extends LaunchLibrary2EntityBase<ReusableFirstStage> {
    constructor(client: LaunchLibrary2SDK, entopts: any);
    make(this: ReusableFirstStageEntity): ReusableFirstStageEntity;
}
export { ReusableFirstStageEntity };
