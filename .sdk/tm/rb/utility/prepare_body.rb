# LaunchLibrary2 SDK utility: prepare_body
require_relative 'media'
module LaunchLibrary2Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return LaunchLibrary2Utilities.raw_body(ctx.reqdata) if LaunchLibrary2Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
