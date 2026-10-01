"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LaunchEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.Launch();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'launch.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "UUID of the launch", "t": "`$STRING`", "key$": "id", "index$": 0 }, "image": { "a": true, "h": "Image", "n": "image", "r": false, "sh": "URL to launch image", "t": "`$STRING`", "key$": "image", "index$": 1 }, "launch_service_provider": { "a": true, "h": "Launch Service Provider", "n": "launch_service_provider", "r": false, "t": "`$OBJECT`", "key$": "launch_service_provider", "index$": 2 }, "mission": { "a": true, "h": "Mission", "n": "mission", "r": false, "t": "`$OBJECT`", "key$": "mission", "index$": 3 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the launch", "t": "`$STRING`", "key$": "name", "index$": 4 }, "net": { "a": true, "fo": "date-time", "h": "Net", "n": "net", "r": false, "sh": "Net Earliest Time (NET) for launch", "t": "`$STRING`", "key$": "net", "index$": 5 }, "pad": { "a": true, "h": "Pad", "n": "pad", "r": false, "t": "`$OBJECT`", "key$": "pad", "index$": 6 }, "probability": { "a": true, "h": "Probability", "n": "probability", "r": false, "sh": "Launch probability percentage", "t": "`$INTEGER`", "key$": "probability", "index$": 7 }, "rocket": { "a": true, "h": "Rocket", "n": "rocket", "r": false, "t": "`$OBJECT`", "key$": "rocket", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$OBJECT`", "key$": "status", "index$": 9 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "API URL for this launch", "t": "`$STRING`", "key$": "url", "index$": 10 }, "webcast_live": { "a": true, "h": "Webcast Live", "n": "webcast_live", "r": false, "sh": "Whether the webcast is currently live", "t": "`$BOOLEAN`", "key$": "webcast_live", "index$": 11 }, "window_end": { "a": true, "fo": "date-time", "h": "Window End", "n": "window_end", "r": false, "sh": "End of launch window", "t": "`$STRING`", "key$": "window_end", "index$": 12 }, "window_start": { "a": true, "fo": "date-time", "h": "Window Start", "n": "window_start", "r": false, "sh": "Start of launch window", "t": "`$STRING`", "key$": "window_start", "index$": 13 } }, "id": { "field": "id", "name": "id" }, "name": "launch", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /launch", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "lsp_id", "or": "lsp__id", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "lsp_name", "or": "lsp__name", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "rocket_configuration_id", "or": "rocket__configuration__id", "r": false, "t": "`$INTEGER`", "index$": 4 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 5 }, { "a": true, "k": "query", "n": "spacecraft_id", "or": "spacecraft__id", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/launch", "q": { "exist": ["limit", "lsp_id", "lsp_name", "offset", "rocket_configuration_id", "search", "spacecraft_id", "status"] }, "r": {}, "s": [{ "lit": "launch" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /launch/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/launch/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "launch" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "launch", "name__orig": "launch", "Name": "Launch", "name_": "launch", "name-": "launch", "NAME": "LAUNCH", "index$": 6 }, { "active": true, "entity": "launch", "key$": "BasicLaunchFlow", "kind": "basic", "name": "BasicLaunchFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "launch_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "launch_ref01", "srcdatavar": "launch_ref01_data", "suffix": "_dt0" }, "m": { "id": "launch01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-launch_ref01" } }], "index$": 1 }] }, 'Launch', { "GET /launch": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "description": "Number of results to return per page", "schema": { "type": "integer", "default": 10 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "The initial index from which to return the results", "schema": { "type": "integer", "default": 0 }, "index$": 1 }, { "name": "search", "in": "query", "description": "Search term to filter launches", "schema": { "type": "string" }, "index$": 2 }, { "name": "lsp__id", "in": "query", "description": "Filter by Launch Service Provider ID", "schema": { "type": "integer" }, "index$": 3 }, { "name": "lsp__name", "in": "query", "description": "Filter by Launch Service Provider name", "schema": { "type": "string" }, "index$": 4 }, { "name": "rocket__configuration__id", "in": "query", "description": "Filter by Launcher Configuration ID", "schema": { "type": "integer" }, "index$": 5 }, { "name": "spacecraft__id", "in": "query", "description": "Filter by Spacecraft ID", "schema": { "type": "integer" }, "index$": 6 }, { "name": "status", "in": "query", "description": "Filter by launch status", "schema": { "type": "string" }, "index$": 7 }] }, "GET /launch/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "UUID of the launch", "schema": { "type": "string" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let launch_ref01_data = Object.values(setup.data.existing.launch)[0];
        // LIST
        const launch_ref01_ent = client.Launch();
        const launch_ref01_match = {};
        const launch_ref01_list = (await launch_ref01_ent.list(launch_ref01_match)).map((e) => e.data());
        // LOAD
        const launch_ref01_match_dt0 = {};
        launch_ref01_match_dt0.id = launch_ref01_data.id;
        const launch_ref01_data_dt0 = (await launch_ref01_ent.load(launch_ref01_match_dt0)).data();
        (0, node_assert_1.default)(launch_ref01_data_dt0.id === launch_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/launch/LaunchTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['launch01', 'launch02', 'launch03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_LAUNCH_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_LAUNCH_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_LAUNCH_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.LaunchLibrary2SDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.LAUNCH_LIBRARY2_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=LaunchEntity.test.js.map