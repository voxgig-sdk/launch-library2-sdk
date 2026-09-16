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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DockingEventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.DockingEvent();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'docking_event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "date-time", "name": "departure", "req": false, "short": "Departure time", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "date-time", "name": "docking", "req": false, "short": "Docking time", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "docking_location", "req": false, "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "flight_vehicle", "req": false, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "id", "req": false, "short": "Docking event ID", "type": "`$INTEGER`", "index$": 4 }, { "active": true, "name": "url", "req": false, "short": "API URL for this docking event", "type": "`$STRING`", "index$": 5 }], "id": { "field": "id", "name": "id" }, "name": "docking_event", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "docking_location", "orig": "docking_location", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "spacestation", "orig": "spacestation", "reqd": false, "type": "`$INTEGER`", "index$": 3 }] }, "contract": { "id": "GET /docking_event", "json": "{\"operationId\":\"getDockingEvents\",\"parameters\":[{\"description\":\"Number of results to return per page\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":10,\"type\":\"integer\"}},{\"description\":\"The initial index from which to return the results\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Filter by space station\",\"in\":\"query\",\"name\":\"spacestation\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"Filter by docking location\",\"in\":\"query\",\"name\":\"docking_location\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"departure\":{\"description\":\"Departure time\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"docking\":{\"description\":\"Docking time\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"docking_location\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"spacestation\":{\"properties\":{\"deorbited\":{\"description\":\"Date the space station was deorbited\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"description\":{\"description\":\"Description of the space station\",\"type\":\"string\"},\"founded\":{\"description\":\"Date the space station was founded\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Space station ID\",\"type\":\"integer\"},\"image_url\":{\"description\":\"URL to space station image\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the space station\",\"type\":\"string\"},\"orbit\":{\"description\":\"Orbital information\",\"type\":\"string\"},\"owners\":{\"items\":{\"properties\":{\"abbrev\":{\"description\":\"Agency abbreviation\",\"type\":\"string\"},\"administrator\":{\"description\":\"Agency administrator\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"description\":{\"description\":\"Agency description\",\"nullable\":true,\"type\":\"string\"},\"founding_year\":{\"description\":\"Year agency was founded\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Agency ID\",\"type\":\"integer\"},\"logo_url\":{\"description\":\"URL to agency logo\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the agency\",\"type\":\"string\"},\"type\":{\"description\":\"Type of agency\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this agency\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this space station\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"flight_vehicle\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"spacecraft\":{\"type\":\"object\"}},\"type\":\"object\"},\"id\":{\"description\":\"Docking event ID\",\"type\":\"integer\"},\"url\":{\"description\":\"API URL for this docking event\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/docking_event", "segments": [{ "lit": "docking_event" }], "select": { "exist": ["docking_location", "limit", "offset", "spacestation"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /docking_event/{id}", "json": "{\"operationId\":\"getDockingEventById\",\"parameters\":[{\"description\":\"ID of the docking event\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"departure\":{\"description\":\"Departure time\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"docking\":{\"description\":\"Docking time\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"docking_location\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"spacestation\":{\"properties\":{\"deorbited\":{\"description\":\"Date the space station was deorbited\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"description\":{\"description\":\"Description of the space station\",\"type\":\"string\"},\"founded\":{\"description\":\"Date the space station was founded\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Space station ID\",\"type\":\"integer\"},\"image_url\":{\"description\":\"URL to space station image\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the space station\",\"type\":\"string\"},\"orbit\":{\"description\":\"Orbital information\",\"type\":\"string\"},\"owners\":{\"items\":{\"properties\":{\"abbrev\":{\"description\":\"Agency abbreviation\",\"type\":\"string\"},\"administrator\":{\"description\":\"Agency administrator\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"description\":{\"description\":\"Agency description\",\"nullable\":true,\"type\":\"string\"},\"founding_year\":{\"description\":\"Year agency was founded\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Agency ID\",\"type\":\"integer\"},\"logo_url\":{\"description\":\"URL to agency logo\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the agency\",\"type\":\"string\"},\"type\":{\"description\":\"Type of agency\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this agency\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this space station\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"flight_vehicle\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"spacecraft\":{\"type\":\"object\"}},\"type\":\"object\"},\"id\":{\"description\":\"Docking event ID\",\"type\":\"integer\"},\"url\":{\"description\":\"API URL for this docking event\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Docking event not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/docking_event/{id}", "segments": [{ "lit": "docking_event" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "docking_event", "name__orig": "docking_event", "Name": "DockingEvent", "name_": "docking_event", "name-": "docking-event", "NAME": "DOCKING_EVENT", "index$": 3 }, { "active": true, "entity": "docking_event", "key$": "BasicDockingEventFlow", "kind": "basic", "name": "BasicDockingEventFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "docking_event_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "docking_event_ref01", "srcdatavar": "docking_event_ref01_data", "suffix": "_dt0" }, "match": { "id": "docking_event01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-docking_event_ref01" } }], "index$": 1 }] }, 'DockingEvent');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let docking_event_ref01_data = Object.values(setup.data.existing.docking_event)[0];
        // LIST
        const docking_event_ref01_ent = client.DockingEvent();
        const docking_event_ref01_match = {};
        const docking_event_ref01_list = (await docking_event_ref01_ent.list(docking_event_ref01_match)).map((e) => e.data());
        // LOAD
        const docking_event_ref01_match_dt0 = {};
        docking_event_ref01_match_dt0.id = docking_event_ref01_data.id;
        const docking_event_ref01_data_dt0 = (await docking_event_ref01_ent.load(docking_event_ref01_match_dt0)).data();
        (0, node_assert_1.default)(docking_event_ref01_data_dt0.id === docking_event_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/docking_event/DockingEventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['docking_event01', 'docking_event02', 'docking_event03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_DOCKING_EVENT_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_DOCKING_EVENT_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_DOCKING_EVENT_ENTID'];
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
//# sourceMappingURL=DockingEventEntity.test.js.map