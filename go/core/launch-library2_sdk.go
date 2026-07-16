package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/launch-library2-sdk/go/utility/struct"
)

type LaunchLibrary2SDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewLaunchLibrary2SDK(options map[string]any) *LaunchLibrary2SDK {
	sdk := &LaunchLibrary2SDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *LaunchLibrary2SDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *LaunchLibrary2SDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *LaunchLibrary2SDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *LaunchLibrary2SDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *LaunchLibrary2SDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Agency returns a Agency entity bound to this client.
// Idiomatic usage: client.Agency(nil).List(nil, nil) or
// client.Agency(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Agency(data map[string]any) LaunchLibrary2Entity {
	return NewAgencyEntityFunc(sdk, data)
}


// Astronaut returns a Astronaut entity bound to this client.
// Idiomatic usage: client.Astronaut(nil).List(nil, nil) or
// client.Astronaut(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Astronaut(data map[string]any) LaunchLibrary2Entity {
	return NewAstronautEntityFunc(sdk, data)
}


// Docking returns a Docking entity bound to this client.
// Idiomatic usage: client.Docking(nil).List(nil, nil) or
// client.Docking(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Docking(data map[string]any) LaunchLibrary2Entity {
	return NewDockingEntityFunc(sdk, data)
}


// DockingEvent returns a DockingEvent entity bound to this client.
// Idiomatic usage: client.DockingEvent(nil).List(nil, nil) or
// client.DockingEvent(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) DockingEvent(data map[string]any) LaunchLibrary2Entity {
	return NewDockingEventEntityFunc(sdk, data)
}


// Event returns a Event entity bound to this client.
// Idiomatic usage: client.Event(nil).List(nil, nil) or
// client.Event(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Event(data map[string]any) LaunchLibrary2Entity {
	return NewEventEntityFunc(sdk, data)
}


// Expedition returns a Expedition entity bound to this client.
// Idiomatic usage: client.Expedition(nil).List(nil, nil) or
// client.Expedition(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Expedition(data map[string]any) LaunchLibrary2Entity {
	return NewExpeditionEntityFunc(sdk, data)
}


// FirstStage returns a FirstStage entity bound to this client.
// Idiomatic usage: client.FirstStage(nil).List(nil, nil) or
// client.FirstStage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) FirstStage(data map[string]any) LaunchLibrary2Entity {
	return NewFirstStageEntityFunc(sdk, data)
}


// Launch returns a Launch entity bound to this client.
// Idiomatic usage: client.Launch(nil).List(nil, nil) or
// client.Launch(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Launch(data map[string]any) LaunchLibrary2Entity {
	return NewLaunchEntityFunc(sdk, data)
}


// LaunchVehicle returns a LaunchVehicle entity bound to this client.
// Idiomatic usage: client.LaunchVehicle(nil).List(nil, nil) or
// client.LaunchVehicle(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) LaunchVehicle(data map[string]any) LaunchLibrary2Entity {
	return NewLaunchVehicleEntityFunc(sdk, data)
}


// Launcher returns a Launcher entity bound to this client.
// Idiomatic usage: client.Launcher(nil).List(nil, nil) or
// client.Launcher(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Launcher(data map[string]any) LaunchLibrary2Entity {
	return NewLauncherEntityFunc(sdk, data)
}


// Location returns a Location entity bound to this client.
// Idiomatic usage: client.Location(nil).List(nil, nil) or
// client.Location(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Location(data map[string]any) LaunchLibrary2Entity {
	return NewLocationEntityFunc(sdk, data)
}


// Pad returns a Pad entity bound to this client.
// Idiomatic usage: client.Pad(nil).List(nil, nil) or
// client.Pad(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Pad(data map[string]any) LaunchLibrary2Entity {
	return NewPadEntityFunc(sdk, data)
}


// ReusableFirstStage returns a ReusableFirstStage entity bound to this client.
// Idiomatic usage: client.ReusableFirstStage(nil).List(nil, nil) or
// client.ReusableFirstStage(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) ReusableFirstStage(data map[string]any) LaunchLibrary2Entity {
	return NewReusableFirstStageEntityFunc(sdk, data)
}


// SpaceStation returns a SpaceStation entity bound to this client.
// Idiomatic usage: client.SpaceStation(nil).List(nil, nil) or
// client.SpaceStation(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) SpaceStation(data map[string]any) LaunchLibrary2Entity {
	return NewSpaceStationEntityFunc(sdk, data)
}


// Spacecraft returns a Spacecraft entity bound to this client.
// Idiomatic usage: client.Spacecraft(nil).List(nil, nil) or
// client.Spacecraft(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *LaunchLibrary2SDK) Spacecraft(data map[string]any) LaunchLibrary2Entity {
	return NewSpacecraftEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *LaunchLibrary2SDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewLaunchLibrary2SDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
