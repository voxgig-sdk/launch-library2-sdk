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
(0, node_test_1.describe)('PadEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.Pad();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'pad.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "agency_id", "req": false, "short": "ID of the agency that operates this pad", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "country_code", "req": false, "short": "ISO country code", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "id", "req": false, "short": "Location ID", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "info_url", "req": false, "short": "URL to more information", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "latitude", "req": false, "short": "Latitude coordinate", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "location", "req": false, "type": "`$OBJECT`", "index$": 5 }, { "active": true, "name": "longitude", "req": false, "short": "Longitude coordinate", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "map_image", "req": false, "short": "URL to map image", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "map_url", "req": false, "short": "URL to map", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "name", "req": false, "short": "Name of the location", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "total_landing_count", "req": false, "short": "Total number of landings at this location", "type": "`$INTEGER`", "index$": 10 }, { "active": true, "name": "total_launch_count", "req": false, "short": "Total number of launches from this location", "type": "`$INTEGER`", "index$": 11 }, { "active": true, "name": "url", "req": false, "short": "API URL for this location", "type": "`$STRING`", "index$": 12 }, { "active": true, "name": "wiki_url", "req": false, "short": "Wikipedia URL", "type": "`$STRING`", "index$": 13 }], "id": { "field": "id", "name": "id" }, "name": "pad", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 10, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 0 }, { "active": true, "kind": "query", "name": "location", "orig": "location", "reqd": false, "type": "`$INTEGER`", "index$": 1 }, { "active": true, "example": 0, "kind": "query", "name": "offset", "orig": "offset", "reqd": false, "type": "`$INTEGER`", "index$": 2 }, { "active": true, "kind": "query", "name": "search", "orig": "search", "reqd": false, "type": "`$STRING`", "index$": 3 }] }, "contract": { "id": "GET /pad", "json": "{\"operationId\":\"getPads\",\"parameters\":[{\"description\":\"Number of results to return per page\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":10,\"type\":\"integer\"}},{\"description\":\"The initial index from which to return the results\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Search by pad name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by location ID\",\"in\":\"query\",\"name\":\"location\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"agency_id\":{\"description\":\"ID of the agency that operates this pad\",\"nullable\":true,\"type\":\"integer\"},\"id\":{\"description\":\"Pad ID\",\"type\":\"integer\"},\"info_url\":{\"description\":\"URL to more information\",\"nullable\":true,\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"type\":\"string\"},\"location\":{\"properties\":{\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"id\":{\"description\":\"Location ID\",\"type\":\"integer\"},\"map_image\":{\"description\":\"URL to map image\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the location\",\"type\":\"string\"},\"total_landing_count\":{\"description\":\"Total number of landings at this location\",\"type\":\"integer\"},\"total_launch_count\":{\"description\":\"Total number of launches from this location\",\"type\":\"integer\"},\"url\":{\"description\":\"API URL for this location\",\"type\":\"string\"}},\"type\":\"object\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"type\":\"string\"},\"map_image\":{\"description\":\"URL to map image\",\"nullable\":true,\"type\":\"string\"},\"map_url\":{\"description\":\"URL to map\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the pad\",\"type\":\"string\"},\"total_launch_count\":{\"description\":\"Total number of launches from this pad\",\"type\":\"integer\"},\"url\":{\"description\":\"API URL for this pad\",\"type\":\"string\"},\"wiki_url\":{\"description\":\"Wikipedia URL\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/pad", "segments": [{ "lit": "pad" }], "select": { "exist": ["limit", "location", "offset", "search"] }, "transform": { "req": "`reqdata`", "res": "`body.results`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /pad/{id}", "json": "{\"operationId\":\"getPadById\",\"parameters\":[{\"description\":\"ID of the pad\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"agency_id\":{\"description\":\"ID of the agency that operates this pad\",\"nullable\":true,\"type\":\"integer\"},\"id\":{\"description\":\"Pad ID\",\"type\":\"integer\"},\"info_url\":{\"description\":\"URL to more information\",\"nullable\":true,\"type\":\"string\"},\"latitude\":{\"description\":\"Latitude coordinate\",\"type\":\"string\"},\"location\":{\"properties\":{\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"id\":{\"description\":\"Location ID\",\"type\":\"integer\"},\"map_image\":{\"description\":\"URL to map image\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the location\",\"type\":\"string\"},\"total_landing_count\":{\"description\":\"Total number of landings at this location\",\"type\":\"integer\"},\"total_launch_count\":{\"description\":\"Total number of launches from this location\",\"type\":\"integer\"},\"url\":{\"description\":\"API URL for this location\",\"type\":\"string\"}},\"type\":\"object\"},\"longitude\":{\"description\":\"Longitude coordinate\",\"type\":\"string\"},\"map_image\":{\"description\":\"URL to map image\",\"nullable\":true,\"type\":\"string\"},\"map_url\":{\"description\":\"URL to map\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the pad\",\"type\":\"string\"},\"total_launch_count\":{\"description\":\"Total number of launches from this pad\",\"type\":\"integer\"},\"url\":{\"description\":\"API URL for this pad\",\"type\":\"string\"},\"wiki_url\":{\"description\":\"Wikipedia URL\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Pad not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/pad/{id}", "segments": [{ "lit": "pad" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.location`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "pad", "name__orig": "pad", "Name": "Pad", "name_": "pad", "name-": "pad", "NAME": "PAD", "index$": 11 }, { "active": true, "entity": "pad", "key$": "BasicPadFlow", "kind": "basic", "name": "BasicPadFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "pad_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "pad_ref01", "srcdatavar": "pad_ref01_data", "suffix": "_dt0" }, "match": { "id": "pad01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-pad_ref01" } }], "index$": 1 }] }, 'Pad');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let pad_ref01_data = Object.values(setup.data.existing.pad)[0];
        // LIST
        const pad_ref01_ent = client.Pad();
        const pad_ref01_match = {};
        const pad_ref01_list = (await pad_ref01_ent.list(pad_ref01_match)).map((e) => e.data());
        // LOAD
        const pad_ref01_match_dt0 = {};
        pad_ref01_match_dt0.id = pad_ref01_data.id;
        const pad_ref01_data_dt0 = (await pad_ref01_ent.load(pad_ref01_match_dt0)).data();
        (0, node_assert_1.default)(pad_ref01_data_dt0.id === pad_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/pad/PadTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['pad01', 'pad02', 'pad03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_PAD_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_PAD_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_PAD_ENTID'];
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
//# sourceMappingURL=PadEntity.test.js.map