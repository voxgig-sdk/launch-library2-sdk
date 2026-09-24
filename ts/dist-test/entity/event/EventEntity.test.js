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
(0, node_test_1.describe)('EventEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.Event();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'event.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "date": { "a": true, "fo": "date-time", "h": "Date", "n": "date", "r": false, "sh": "Event date and time", "t": "`$STRING`", "key$": "date", "index$": 0 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Description of the event", "t": "`$STRING`", "key$": "description", "index$": 1 }, "feature_image": { "a": true, "h": "Feature Image", "n": "feature_image", "r": false, "sh": "URL to feature image", "t": "`$STRING`", "key$": "feature_image", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Event ID", "t": "`$INTEGER`", "key$": "id", "index$": 3 }, "location": { "a": true, "h": "Location", "n": "location", "r": false, "sh": "Event location", "t": "`$STRING`", "key$": "location", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the event", "t": "`$STRING`", "key$": "name", "index$": 5 }, "news_url": { "a": true, "h": "News Url", "n": "news_url", "r": false, "sh": "URL to news article", "t": "`$STRING`", "key$": "news_url", "index$": 6 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "t": "`$OBJECT`", "key$": "type", "index$": 7 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "API URL for this event", "t": "`$STRING`", "key$": "url", "index$": 8 }, "video_url": { "a": true, "h": "Video Url", "n": "video_url", "r": false, "sh": "URL to video", "t": "`$STRING`", "key$": "video_url", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "event", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /event", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 10, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": 0, "k": "query", "n": "offset", "or": "offset", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "k": "query", "n": "search", "or": "search", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/event", "q": { "exist": ["limit", "offset", "search"] }, "r": {}, "s": [{ "lit": "event" }], "t": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /event/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/event/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "event" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.type`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "event", "name__orig": "event", "Name": "Event", "name_": "event", "name-": "event", "NAME": "EVENT", "index$": 3 }, { "active": true, "entity": "event", "key$": "BasicEventFlow", "kind": "basic", "name": "BasicEventFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "event_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "event_ref01", "srcdatavar": "event_ref01_data", "suffix": "_dt0" }, "m": { "id": "event01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-event_ref01" } }], "index$": 1 }] }, 'Event', { "GET /event": { "protocol": "http", "operationId": "getEvents", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "count": { "key$": "count", "type": "integer" }, "next": { "key$": "next", "nullable": true, "type": "string" }, "previous": { "key$": "previous", "nullable": true, "type": "string" }, "results": { "items": { "properties": { "date": { "description": "Event date and time", "format": "date-time", "type": "string", "key$": "date" }, "description": { "description": "Description of the event", "type": "string", "key$": "description" }, "feature_image": { "description": "URL to feature image", "nullable": true, "type": "string", "key$": "feature_image" }, "id": { "description": "Event ID", "type": "integer", "key$": "id" }, "location": { "description": "Event location", "nullable": true, "type": "string", "key$": "location" }, "name": { "description": "Name of the event", "type": "string", "key$": "name" }, "news_url": { "description": "URL to news article", "nullable": true, "type": "string", "key$": "news_url" }, "type": { "properties": { "id": { "type": "integer", "key$": "id" }, "name": { "type": "string", "key$": "name" } }, "type": "object", "key$": "type" }, "url": { "description": "API URL for this event", "type": "string", "key$": "url" }, "video_url": { "description": "URL to video", "nullable": true, "type": "string", "key$": "video_url" } }, "type": "object", "x-ref": "#/components/schemas/Event", "index$": 0 }, "key$": "results", "type": "array" } } } } } }, "429": { "description": "Rate limit exceeded" } }, "parameters": [{ "name": "limit", "in": "query", "description": "Number of results to return per page", "schema": { "type": "integer", "default": 10 }, "index$": 0 }, { "name": "offset", "in": "query", "description": "The initial index from which to return the results", "schema": { "type": "integer", "default": 0 }, "index$": 1 }, { "name": "search", "in": "query", "description": "Search term to filter events", "schema": { "type": "string" }, "index$": 2 }], "securitySource": "unspecified" }, "GET /event/{id}": { "protocol": "http", "operationId": "getEventById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Event ID", "type": "integer" }, "url": { "description": "API URL for this event", "type": "string" }, "name": { "description": "Name of the event", "type": "string" }, "type": { "properties": { "id": { "type": "integer", "key$": "id" }, "name": { "type": "string", "key$": "name" } }, "type": "object", "index$": 0 }, "description": { "description": "Description of the event", "type": "string" }, "location": { "description": "Event location", "nullable": true, "type": "string" }, "date": { "description": "Event date and time", "format": "date-time", "type": "string" }, "news_url": { "description": "URL to news article", "nullable": true, "type": "string" }, "video_url": { "description": "URL to video", "nullable": true, "type": "string" }, "feature_image": { "description": "URL to feature image", "nullable": true, "type": "string" } }, "x-ref": "#/components/schemas/Event" } } } }, "404": { "description": "Event not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the event", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let event_ref01_data = Object.values(setup.data.existing.event)[0];
        // LIST
        const event_ref01_ent = client.Event();
        const event_ref01_match = {};
        const event_ref01_list = (await event_ref01_ent.list(event_ref01_match)).map((e) => e.data());
        // LOAD
        const event_ref01_match_dt0 = {};
        event_ref01_match_dt0.id = event_ref01_data.id;
        const event_ref01_data_dt0 = (await event_ref01_ent.load(event_ref01_match_dt0)).data();
        (0, node_assert_1.default)(event_ref01_data_dt0.id === event_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/event/EventTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['event01', 'event02', 'event03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_EVENT_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_EVENT_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_EVENT_ENTID'];
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
//# sourceMappingURL=EventEntity.test.js.map