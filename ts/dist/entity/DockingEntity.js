"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockingEntity = void 0;
const LaunchLibrary2EntityBase_1 = require("../LaunchLibrary2EntityBase");
// TODO: needs Entity superclass
class DockingEntity extends LaunchLibrary2EntityBase_1.LaunchLibrary2EntityBase {
    constructor(client, entopts) {
        super(client, entopts);
        this.name = 'docking';
        this.name_ = 'docking';
        this.Name = 'Docking';
    }
    make() {
        return new DockingEntity(this._client, this.entopts());
    }
}
exports.DockingEntity = DockingEntity;
//# sourceMappingURL=DockingEntity.js.map