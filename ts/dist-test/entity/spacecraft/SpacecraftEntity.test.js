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
(0, node_test_1.describe)('SpacecraftEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.Spacecraft();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'spacecraft.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "agency": { "a": true, "h": "Agency", "n": "agency", "r": false, "t": "`$OBJECT`", "key$": "agency", "index$": 0 }, "capability": { "a": true, "h": "Capability", "n": "capability", "r": false, "sh": "Spacecraft capability", "t": "`$STRING`", "key$": "capability", "index$": 1 }, "crew_capacity": { "a": true, "h": "Crew Capacity", "n": "crew_capacity", "r": false, "sh": "Crew capacity", "t": "`$INTEGER`", "key$": "crew_capacity", "index$": 2 }, "details": { "a": true, "h": "Details", "n": "details", "r": false, "sh": "Detailed information", "t": "`$STRING`", "key$": "details", "index$": 3 }, "diameter": { "a": true, "h": "Diameter", "n": "diameter", "r": false, "sh": "Diameter in meters", "t": "`$NUMBER`", "key$": "diameter", "index$": 4 }, "height": { "a": true, "h": "Height", "n": "height", "r": false, "sh": "Height in meters", "t": "`$NUMBER`", "key$": "height", "index$": 5 }, "history": { "a": true, "h": "History", "n": "history", "r": false, "sh": "Historical information", "t": "`$STRING`", "key$": "history", "index$": 6 }, "human_rated": { "a": true, "h": "Human Rated", "n": "human_rated", "r": false, "sh": "Whether the spacecraft is human-rated", "t": "`$BOOLEAN`", "key$": "human_rated", "index$": 7 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Spacecraft configuration ID", "t": "`$INTEGER`", "key$": "id", "index$": 8 }, "image_url": { "a": true, "h": "Image Url", "n": "image_url", "r": false, "sh": "URL to spacecraft image", "t": "`$STRING`", "key$": "image_url", "index$": 9 }, "in_use": { "a": true, "h": "In Use", "n": "in_use", "r": false, "sh": "Whether the spacecraft is currently in use", "t": "`$BOOLEAN`", "key$": "in_use", "index$": 10 }, "maiden_flight": { "a": true, "fo": "date", "h": "Maiden Flight", "n": "maiden_flight", "r": false, "sh": "Date of maiden flight", "t": "`$STRING`", "key$": "maiden_flight", "index$": 11 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the spacecraft", "t": "`$STRING`", "key$": "name", "index$": 12 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$OBJECT`", "key$": "type", "index$": 13 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "API URL for this configuration", "t": "`$STRING`", "key$": "url", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "spacecraft", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /config/spacecraft", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/config/spacecraft", "q": { "exist": ["limit", "offset", "search", "status"] }, "r": {}, "s": [{ "lit": "config" }, { "lit": "spacecraft" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /config/spacecraft/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/config/spacecraft/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "config" }, { "lit": "spacecraft" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "spacecraft", "name__orig": "spacecraft", "Name": "Spacecraft", "name_": "spacecraft", "name-": "spacecraft", "NAME": "SPACECRAFT", "index$": 11 }, { "active": true, "entity": "spacecraft", "key$": "BasicSpacecraftFlow", "kind": "basic", "name": "BasicSpacecraftFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "spacecraft_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "spacecraft_ref01", "srcdatavar": "spacecraft_ref01_data", "suffix": "_dt0" }, "m": { "id": "spacecraft01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-spacecraft_ref01" } }], "index$": 1 }] }, 'Spacecraft', { "GET /config/spacecraft": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "description": "Number of results to return per page", "schema": { "type": "integer", "default": 10 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "The initial index from which to return the results", "schema": { "type": "integer", "default": 0 }, "index$": 1 }, { "name": "search", "in": "query", "description": "Search by spacecraft name", "schema": { "type": "string" }, "index$": 2 }, { "name": "status", "in": "query", "description": "Filter by status", "schema": { "type": "string" }, "index$": 3 }] }, "GET /config/spacecraft/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the spacecraft configuration", "schema": { "type": "integer" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let spacecraft_ref01_data = Object.values(setup.data.existing.spacecraft)[0];
        // LIST
        const spacecraft_ref01_ent = client.Spacecraft();
        const spacecraft_ref01_match = {};
        const spacecraft_ref01_list = (await spacecraft_ref01_ent.list(spacecraft_ref01_match)).map((e) => e.data());
        // LOAD
        const spacecraft_ref01_match_dt0 = {};
        spacecraft_ref01_match_dt0.id = spacecraft_ref01_data.id;
        const spacecraft_ref01_data_dt0 = (await spacecraft_ref01_ent.load(spacecraft_ref01_match_dt0)).data();
        (0, node_assert_1.default)(spacecraft_ref01_data_dt0.id === spacecraft_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/spacecraft/SpacecraftTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['spacecraft01', 'spacecraft02', 'spacecraft03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID'];
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
//# sourceMappingURL=SpacecraftEntity.test.js.map