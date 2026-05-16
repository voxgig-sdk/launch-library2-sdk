
import { Context } from './Context'


class LaunchLibrary2Error extends Error {

  isLaunchLibrary2Error = true

  sdk = 'LaunchLibrary2'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  LaunchLibrary2Error
}

