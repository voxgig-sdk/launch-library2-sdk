package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/launch-library2-sdk"
	"github.com/voxgig-sdk/launch-library2-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestDockingEventEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.DockingEvent(nil)
		if ent == nil {
			t.Fatal("expected non-nil DockingEventEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := docking_eventBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "docking_event." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set LAUNCHLIBRARY__TEST_DOCKING_EVENT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		dockingEventRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.docking_event", setup.data)))
		var dockingEventRef01Data map[string]any
		if len(dockingEventRef01DataRaw) > 0 {
			dockingEventRef01Data = core.ToMapAny(dockingEventRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = dockingEventRef01Data

		// LIST
		dockingEventRef01Ent := client.DockingEvent(nil)
		dockingEventRef01Match := map[string]any{}

		dockingEventRef01ListResult, err := dockingEventRef01Ent.List(dockingEventRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, dockingEventRef01ListOk := dockingEventRef01ListResult.([]any)
		if !dockingEventRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", dockingEventRef01ListResult)
		}

		// LOAD
		dockingEventRef01MatchDt0 := map[string]any{
			"id": dockingEventRef01Data["id"],
		}
		dockingEventRef01DataDt0Loaded, err := dockingEventRef01Ent.Load(dockingEventRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		dockingEventRef01DataDt0LoadResult := core.ToMapAny(dockingEventRef01DataDt0Loaded)
		if dockingEventRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if dockingEventRef01DataDt0LoadResult["id"] != dockingEventRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func docking_eventBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "docking_event", "DockingEventTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read docking_event test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse docking_event test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"docking_event01", "docking_event02", "docking_event03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("LAUNCHLIBRARY__TEST_DOCKING_EVENT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LAUNCHLIBRARY__TEST_DOCKING_EVENT_ENTID": idmap,
		"LAUNCHLIBRARY__TEST_LIVE":      "FALSE",
		"LAUNCHLIBRARY__TEST_EXPLAIN":   "FALSE",
		"LAUNCHLIBRARY__APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["LAUNCHLIBRARY__TEST_DOCKING_EVENT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LAUNCHLIBRARY__TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["LAUNCHLIBRARY__APIKEY"],
			},
			extra,
		})
		client = sdk.NewLaunchLibrary2SDK(core.ToMapAny(mergedOpts))
	}

	live := env["LAUNCHLIBRARY__TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["LAUNCHLIBRARY__TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
