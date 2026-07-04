package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/launch-library2-sdk/go"
	"github.com/voxgig-sdk/launch-library2-sdk/go/core"

	vs "github.com/voxgig-sdk/launch-library2-sdk/go/utility/struct"
)

func TestReusableFirstStageEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ReusableFirstStage(nil)
		if ent == nil {
			t.Fatal("expected non-nil ReusableFirstStageEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := reusable_first_stageBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "reusable_first_stage." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set LAUNCHLIBRARY__TEST_REUSABLE_FIRST_STAGE_ENTID JSON to run live")
			return
		}
		// Bootstrap entity data from existing test data (no create step in flow).
		reusableFirstStageRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.reusable_first_stage", setup.data)))
		var reusableFirstStageRef01Data map[string]any
		if len(reusableFirstStageRef01DataRaw) > 0 {
			reusableFirstStageRef01Data = core.ToMapAny(reusableFirstStageRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = reusableFirstStageRef01Data

	})
}

func reusable_first_stageBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "reusable_first_stage", "ReusableFirstStageTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read reusable_first_stage test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse reusable_first_stage test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"reusable_first_stage01", "reusable_first_stage02", "reusable_first_stage03"},
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
	entidEnvRaw := os.Getenv("LAUNCHLIBRARY__TEST_REUSABLE_FIRST_STAGE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"LAUNCHLIBRARY__TEST_REUSABLE_FIRST_STAGE_ENTID": idmap,
		"LAUNCHLIBRARY__TEST_LIVE":      "FALSE",
		"LAUNCHLIBRARY__TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["LAUNCHLIBRARY__TEST_REUSABLE_FIRST_STAGE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["LAUNCHLIBRARY__TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
