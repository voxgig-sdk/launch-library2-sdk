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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "departure": { "a": true, "fo": "date-time", "h": "Departure", "n": "departure", "r": false, "sh": "Departure time", "t": "`$STRING`", "key$": "departure", "index$": 0 }, "docking": { "a": true, "fo": "date-time", "h": "Docking", "n": "docking", "r": false, "sh": "Docking time", "t": "`$STRING`", "key$": "docking", "index$": 1 }, "docking_location": { "a": true, "h": "Docking Location", "n": "docking_location", "r": false, "t": "`$OBJECT`", "key$": "docking_location", "index$": 2 }, "flight_vehicle": { "a": true, "h": "Flight Vehicle", "n": "flight_vehicle", "r": false, "t": "`$OBJECT`", "key$": "flight_vehicle", "index$": 3 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Docking event ID", "t": "`$INTEGER`", "key$": "id", "index$": 4 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "API URL for this docking event", "t": "`$STRING`", "key$": "url", "index$": 5 } }, "id": { "field": "id", "name": "id" }, "name": "docking_event", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /docking_event", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "docking_location", "or": "docking_location", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "k": "query", "n": "spacestation", "or": "spacestation", "r": false, "t": "`$INTEGER`", "index$": 3 }] }, "k": "http", "m": "GET", "o": "/docking_event", "q": { "exist": ["docking_location", "limit", "offset", "spacestation"] }, "r": {}, "s": [{ "lit": "docking_event" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /docking_event/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/docking_event/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "docking_event" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "docking_event", "name__orig": "docking_event", "Name": "DockingEvent", "name_": "docking_event", "name-": "docking-event", "NAME": "DOCKING_EVENT", "index$": 2 }, { "active": true, "entity": "docking_event", "key$": "BasicDockingEventFlow", "kind": "basic", "name": "BasicDockingEventFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "docking_event_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "docking_event_ref01", "srcdatavar": "docking_event_ref01_data", "suffix": "_dt0" }, "m": { "id": "docking_event01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-docking_event_ref01" } }], "index$": 1 }] }, 'DockingEvent', { "GET /docking_event": { "protocol": "http", "operationId": "getDockingEvents", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "count": { "key$": "count", "type": "integer" }, "next": { "key$": "next", "nullable": true, "type": "string" }, "previous": { "key$": "previous", "nullable": true, "type": "string" }, "results": { "items": { "properties": { "departure": { "description": "Departure time", "format": "date-time", "nullable": true, "type": "string", "key$": "departure" }, "docking": { "description": "Docking time", "format": "date-time", "nullable": true, "type": "string", "key$": "docking" }, "docking_location": { "properties": { "id": { "type": "integer" }, "name": { "type": "string" }, "spacestation": { "properties": { "deorbited": { "description": "Date the space station was deorbited", "format": "date", "nullable": true, "type": "string" }, "description": { "description": "Description of the space station", "type": "string" }, "founded": { "description": "Date the space station was founded", "format": "date", "type": "string" }, "id": { "description": "Space station ID", "type": "integer" }, "image_url": { "description": "URL to space station image", "nullable": true, "type": "string" }, "name": { "description": "Name of the space station", "type": "string" }, "orbit": { "description": "Orbital information", "type": "string" }, "owners": { "items": { "properties": { "abbrev": { "description": "Agency abbreviation", "type": "string" }, "administrator": { "description": "Agency administrator", "nullable": true, "type": "string" }, "country_code": { "description": "ISO country code", "type": "string" }, "description": { "description": "Agency description", "nullable": true, "type": "string" }, "founding_year": { "description": "Year agency was founded", "nullable": true, "type": "string" }, "id": { "description": "Agency ID", "type": "integer" }, "logo_url": { "description": "URL to agency logo", "nullable": true, "type": "string" }, "name": { "description": "Name of the agency", "type": "string" }, "type": { "description": "Type of agency", "type": "string" }, "url": { "description": "API URL for this agency", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Agency" }, "type": "array" }, "status": { "properties": { "id": { "type": "integer" }, "name": { "type": "string" } }, "type": "object" }, "type": { "properties": { "id": { "type": "integer" }, "name": { "type": "string" } }, "type": "object" }, "url": { "description": "API URL for this space station", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/SpaceStation" } }, "type": "object", "key$": "docking_location" }, "flight_vehicle": { "properties": { "id": { "type": "integer" }, "spacecraft": { "type": "object" } }, "type": "object", "key$": "flight_vehicle" }, "id": { "description": "Docking event ID", "type": "integer", "key$": "id" }, "url": { "description": "API URL for this docking event", "type": "string", "key$": "url" } }, "type": "object", "x-ref": "#/components/schemas/DockingEvent", "index$": 0 }, "key$": "results", "type": "array" } } } } } }, "429": { "description": "Rate limit exceeded" } }, "parameters": [{ "name": "limit", "in": "query", "description": "Number of results to return per page", "schema": { "type": "integer", "default": 10 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "The initial index from which to return the results", "schema": { "type": "integer", "default": 0 }, "index$": 1 }, { "name": "spacestation", "in": "query", "description": "Filter by space station", "schema": { "type": "integer" }, "index$": 2 }, { "name": "docking_location", "in": "query", "description": "Filter by docking location", "schema": { "type": "integer" }, "index$": 3 }], "securitySource": "unspecified" }, "GET /docking_event/{id}": { "protocol": "http", "operationId": "getDockingEventById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Docking event ID", "type": "integer", "key$": "id" }, "url": { "description": "API URL for this docking event", "type": "string", "key$": "url" }, "docking": { "description": "Docking time", "format": "date-time", "nullable": true, "type": "string", "key$": "docking" }, "departure": { "description": "Departure time", "format": "date-time", "nullable": true, "type": "string", "key$": "departure" }, "flight_vehicle": { "properties": { "id": { "type": "integer" }, "spacecraft": { "type": "object" } }, "type": "object", "key$": "flight_vehicle" }, "docking_location": { "properties": { "id": { "type": "integer" }, "name": { "type": "string" }, "spacestation": { "properties": { "deorbited": { "description": "Date the space station was deorbited", "format": "date", "nullable": true, "type": "string" }, "description": { "description": "Description of the space station", "type": "string" }, "founded": { "description": "Date the space station was founded", "format": "date", "type": "string" }, "id": { "description": "Space station ID", "type": "integer" }, "image_url": { "description": "URL to space station image", "nullable": true, "type": "string" }, "name": { "description": "Name of the space station", "type": "string" }, "orbit": { "description": "Orbital information", "type": "string" }, "owners": { "items": { "properties": { "abbrev": { "description": "Agency abbreviation", "type": "string" }, "administrator": { "description": "Agency administrator", "nullable": true, "type": "string" }, "country_code": { "description": "ISO country code", "type": "string" }, "description": { "description": "Agency description", "nullable": true, "type": "string" }, "founding_year": { "description": "Year agency was founded", "nullable": true, "type": "string" }, "id": { "description": "Agency ID", "type": "integer" }, "logo_url": { "description": "URL to agency logo", "nullable": true, "type": "string" }, "name": { "description": "Name of the agency", "type": "string" }, "type": { "description": "Type of agency", "type": "string" }, "url": { "description": "API URL for this agency", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/Agency" }, "type": "array" }, "status": { "properties": { "id": { "type": "integer" }, "name": { "type": "string" } }, "type": "object" }, "type": { "properties": { "id": { "type": "integer" }, "name": { "type": "string" } }, "type": "object" }, "url": { "description": "API URL for this space station", "type": "string" } }, "type": "object", "x-ref": "#/components/schemas/SpaceStation" } }, "type": "object", "key$": "docking_location" } }, "x-ref": "#/components/schemas/DockingEvent", "index$": 0 } } } }, "404": { "description": "Docking event not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the docking event", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
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