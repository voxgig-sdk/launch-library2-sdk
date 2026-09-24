"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchLibrary2Error = void 0;
class LaunchLibrary2Error extends Error {
    isLaunchLibrary2Error = true;
    sdk = 'LaunchLibrary2';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.LaunchLibrary2Error = LaunchLibrary2Error;
//# sourceMappingURL=LaunchLibrary2Error.js.map