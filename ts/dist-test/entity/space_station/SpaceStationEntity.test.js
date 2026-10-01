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
(0, node_test_1.describe)('SpaceStationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.SpaceStation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'space_station.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "deorbited": { "a": true, "fo": "date", "h": "Deorbited", "n": "deorbited", "r": false, "sh": "Date the space station was deorbited", "t": "`$STRING`", "key$": "deorbited", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the space station", "t": "`$STRING`", "key$": "description", "index$": 1 }, "founded": { "a": true, "fo": "date", "h": "Founded", "n": "founded", "r": false, "sh": "Date the space station was founded", "t": "`$STRING`", "key$": "founded", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Space station ID", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "image_url": { "a": true, "h": "Image Url", "n": "image_url", "r": false, "sh": "URL to space station image", "t": "`$STRING`", "key$": "image_url", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the space station", "t": "`$STRING`", "key$": "name", "index$": 5 }, "orbit": { "a": true, "h": "Orbit", "n": "orbit", "r": false, "sh": "Orbital information", "t": "`$STRING`", "key$": "orbit", "index$": 6 }, "owners": { "a": true, "h": "Owners", "n": "owners", "r": false, "t": "`$ARRAY`", "key$": "owners", "index$": 7 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$OBJECT`", "key$": "status", "index$": 8 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$OBJECT`", "key$": "type", "index$": 9 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "API URL for this space station", "t": "`$STRING`", "key$": "url", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "space_station", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /spacestation", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "owner", "or": "owners", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/spacestation", "q": { "exist": ["limit", "offset", "owner", "search", "status"] }, "r": {}, "s": [{ "lit": "spacestation" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /spacestation/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/spacestation/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "spacestation" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "space_station", "name__orig": "space_station", "Name": "SpaceStation", "name_": "space_station", "name-": "space-station", "NAME": "SPACE_STATION", "index$": 10 }, { "active": true, "entity": "space_station", "key$": "BasicSpaceStationFlow", "kind": "basic", "name": "BasicSpaceStationFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "space_station_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "space_station_ref01", "srcdatavar": "space_station_ref01_data", "suffix": "_dt0" }, "m": { "id": "space_station01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-space_station_ref01" } }], "index$": 1 }] }, 'SpaceStation', { "GET /spacestation": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "description": "Number of results to return per page", "schema": { "type": "integer", "default": 10 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "The initial index from which to return the results", "schema": { "type": "integer", "default": 0 }, "index$": 1 }, { "name": "search", "in": "query", "description": "Search by space station name", "schema": { "type": "string" }, "index$": 2 }, { "name": "status", "in": "query", "description": "Filter by status", "schema": { "type": "string" }, "index$": 3 }, { "name": "owners", "in": "query", "description": "Filter by owners", "schema": { "type": "string" }, "index$": 4 }] }, "GET /spacestation/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the space station", "schema": { "type": "integer" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let space_station_ref01_data = Object.values(setup.data.existing.space_station)[0];
        // LIST
        const space_station_ref01_ent = client.SpaceStation();
        const space_station_ref01_match = {};
        const space_station_ref01_list = (await space_station_ref01_ent.list(space_station_ref01_match)).map((e) => e.data());
        // LOAD
        const space_station_ref01_match_dt0 = {};
        space_station_ref01_match_dt0.id = space_station_ref01_data.id;
        const space_station_ref01_data_dt0 = (await space_station_ref01_ent.load(space_station_ref01_match_dt0)).data();
        (0, node_assert_1.default)(space_station_ref01_data_dt0.id === space_station_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/space_station/SpaceStationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['space_station01', 'space_station02', 'space_station03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_SPACE_STATION_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_SPACE_STATION_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_SPACE_STATION_ENTID'];
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
//# sourceMappingURL=SpaceStationEntity.test.js.map