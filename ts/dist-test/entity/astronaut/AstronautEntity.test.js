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
(0, node_test_1.describe)('AstronautEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.Astronaut();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'astronaut.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "bio": { "a": true, "h": "Bio", "n": "bio", "r": false, "sh": "Biographical information", "t": "`$STRING`", "key$": "bio", "index$": 0 }, "date_of_birth": { "a": true, "fo": "date", "h": "Date Of Birth", "n": "date_of_birth", "r": false, "sh": "Date of birth", "t": "`$STRING`", "key$": "date_of_birth", "index$": 1 }, "date_of_death": { "a": true, "fo": "date", "h": "Date Of Death", "n": "date_of_death", "r": false, "sh": "Date of death if applicable", "t": "`$STRING`", "key$": "date_of_death", "index$": 2 }, "flights_count": { "a": true, "h": "Flights Count", "n": "flights_count", "r": false, "sh": "Number of flights", "t": "`$INTEGER`", "key$": "flights_count", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Astronaut ID", "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the astronaut", "t": "`$STRING`", "key$": "name", "index$": 5 }, "nationality": { "a": true, "h": "Nationality", "n": "nationality", "r": false, "sh": "Astronaut nationality", "t": "`$STRING`", "key$": "nationality", "index$": 6 }, "profile_image": { "a": true, "h": "Profile Image", "n": "profile_image", "r": false, "sh": "URL to profile image", "t": "`$STRING`", "key$": "profile_image", "index$": 7 }, "spacewalks_count": { "a": true, "h": "Spacewalks Count", "n": "spacewalks_count", "r": false, "sh": "Number of spacewalks", "t": "`$INTEGER`", "key$": "spacewalks_count", "index$": 8 }, "status": { "a": true, "h": "Status", "n": "status", "r": false, "t": "`$OBJECT`", "key$": "status", "index$": 9 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$OBJECT`", "key$": "type", "index$": 10 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "API URL for this astronaut", "t": "`$STRING`", "key$": "url", "index$": 11 } }, "id": { "field": "id", "name": "id" }, "name": "astronaut", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /astronaut", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "k": "query", "n": "nationality", "or": "nationality", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 3 }, { "a": true, "k": "query", "n": "status", "or": "status", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/astronaut", "q": { "exist": ["limit", "nationality", "offset", "search", "status"] }, "r": {}, "s": [{ "lit": "astronaut" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /astronaut/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/astronaut/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "astronaut" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "astronaut", "name__orig": "astronaut", "Name": "Astronaut", "name_": "astronaut", "name-": "astronaut", "NAME": "ASTRONAUT", "index$": 1 }, { "active": true, "entity": "astronaut", "key$": "BasicAstronautFlow", "kind": "basic", "name": "BasicAstronautFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "astronaut_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "astronaut_ref01", "srcdatavar": "astronaut_ref01_data", "suffix": "_dt0" }, "m": { "id": "astronaut01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-astronaut_ref01" } }], "index$": 1 }] }, 'Astronaut', { "GET /astronaut": { "protocol": "http", "parameters": [{ "name": "limit", "in": "query", "description": "Number of results to return per page", "schema": { "type": "integer", "default": 10 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "The initial index from which to return the results", "schema": { "type": "integer", "default": 0 }, "index$": 1 }, { "name": "search", "in": "query", "description": "Search by astronaut name", "schema": { "type": "string" }, "index$": 2 }, { "name": "status", "in": "query", "description": "Filter by astronaut status", "schema": { "type": "string" }, "index$": 3 }, { "name": "nationality", "in": "query", "description": "Filter by nationality", "schema": { "type": "string" }, "index$": 4 }] }, "GET /astronaut/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the astronaut", "schema": { "type": "integer" }, "index$": 0 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let astronaut_ref01_data = Object.values(setup.data.existing.astronaut)[0];
        // LIST
        const astronaut_ref01_ent = client.Astronaut();
        const astronaut_ref01_match = {};
        const astronaut_ref01_list = (await astronaut_ref01_ent.list(astronaut_ref01_match)).map((e) => e.data());
        // LOAD
        const astronaut_ref01_match_dt0 = {};
        astronaut_ref01_match_dt0.id = astronaut_ref01_data.id;
        const astronaut_ref01_data_dt0 = (await astronaut_ref01_ent.load(astronaut_ref01_match_dt0)).data();
        (0, node_assert_1.default)(astronaut_ref01_data_dt0.id === astronaut_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/astronaut/AstronautTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['astronaut01', 'astronaut02', 'astronaut03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_ASTRONAUT_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_ASTRONAUT_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_ASTRONAUT_ENTID'];
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
//# sourceMappingURL=AstronautEntity.test.js.map