package voxgiglaunchlibrary2sdk

import (
	"github.com/voxgig-sdk/launch-library2-sdk/go/core"
	"github.com/voxgig-sdk/launch-library2-sdk/go/entity"
	"github.com/voxgig-sdk/launch-library2-sdk/go/feature"
	_ "github.com/voxgig-sdk/launch-library2-sdk/go/utility"
)

// Type aliases preserve external API.
type LaunchLibrary2SDK = core.LaunchLibrary2SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type LaunchLibrary2Entity = core.LaunchLibrary2Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type LaunchLibrary2Error = core.LaunchLibrary2Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAgencyEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewAgencyEntity(client, entopts)
	}
	core.NewAstronautEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewAstronautEntity(client, entopts)
	}
	core.NewDockingEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewDockingEntity(client, entopts)
	}
	core.NewDockingEventEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewDockingEventEntity(client, entopts)
	}
	core.NewEventEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewEventEntity(client, entopts)
	}
	core.NewExpeditionEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewExpeditionEntity(client, entopts)
	}
	core.NewFirstStageEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewFirstStageEntity(client, entopts)
	}
	core.NewLaunchEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewLaunchEntity(client, entopts)
	}
	core.NewLaunchVehicleEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewLaunchVehicleEntity(client, entopts)
	}
	core.NewLauncherEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewLauncherEntity(client, entopts)
	}
	core.NewLocationEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewLocationEntity(client, entopts)
	}
	core.NewPadEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewPadEntity(client, entopts)
	}
	core.NewReusableFirstStageEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewReusableFirstStageEntity(client, entopts)
	}
	core.NewSpaceStationEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewSpaceStationEntity(client, entopts)
	}
	core.NewSpacecraftEntityFunc = func(client *core.LaunchLibrary2SDK, entopts map[string]any) core.LaunchLibrary2Entity {
		return entity.NewSpacecraftEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewLaunchLibrary2SDK = core.NewLaunchLibrary2SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewLaunchLibrary2SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *LaunchLibrary2SDK  { return NewLaunchLibrary2SDK(nil) }
func Test() *LaunchLibrary2SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
