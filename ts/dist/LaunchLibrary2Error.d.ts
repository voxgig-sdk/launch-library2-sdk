import { Context } from './Context';
declare class LaunchLibrary2Error extends Error {
    isLaunchLibrary2Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { LaunchLibrary2Error };
