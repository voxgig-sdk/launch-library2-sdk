package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAgencyEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewAstronautEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewDockingEventEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewEventEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewExpeditionEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewFirstStageEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewLaunchEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewLauncherEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewLocationEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewPadEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewSpaceStationEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

var NewSpacecraftEntityFunc func(client *LaunchLibrary2SDK, entopts map[string]any) LaunchLibrary2Entity

