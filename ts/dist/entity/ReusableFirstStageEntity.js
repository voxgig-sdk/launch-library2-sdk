"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReusableFirstStageEntity = void 0;
const LaunchLibrary2EntityBase_1 = require("../LaunchLibrary2EntityBase");
// TODO: needs Entity superclass
class ReusableFirstStageEntity extends LaunchLibrary2EntityBase_1.LaunchLibrary2EntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'reusable_first_stage';
        this.name_ = 'reusable_first_stage';
        this.Name = 'ReusableFirstStage';
    }
    make() {
        return new ReusableFirstStageEntity(this._client, this.entopts());
    }
}
exports.ReusableFirstStageEntity = ReusableFirstStageEntity;
//# sourceMappingURL=ReusableFirstStageEntity.js.map