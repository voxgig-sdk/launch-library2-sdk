-- LaunchLibrary2 SDK error

local LaunchLibrary2Error = {}
LaunchLibrary2Error.__index = LaunchLibrary2Error


function LaunchLibrary2Error.new(code, msg, ctx)
  local self = setmetatable({}, LaunchLibrary2Error)
  self.is_sdk_error = true
  self.sdk = "LaunchLibrary2"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function LaunchLibrary2Error:error()
  return self.msg
end


function LaunchLibrary2Error:__tostring()
  return self.msg
end


return LaunchLibrary2Error
