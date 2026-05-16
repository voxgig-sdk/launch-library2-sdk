# LaunchLibrary2 SDK utility: make_context
require_relative '../core/context'
module LaunchLibrary2Utilities
  MakeContext = ->(ctxmap, basectx) {
    LaunchLibrary2Context.new(ctxmap, basectx)
  }
end
