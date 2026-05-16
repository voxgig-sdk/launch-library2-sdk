package = "voxgig-sdk-launch-library2"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/launch-library2-sdk.git"
}
description = {
  summary = "LaunchLibrary2 SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["launch-library2_sdk"] = "launch-library2_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
