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
(0, node_test_1.describe)('LauncherEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('LAUNCH_LIBRARY2_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.LaunchLibrary2SDK.test();
        const ent = testsdk.Launcher();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'launcher.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "abbrev", "req": false, "short": "Agency abbreviation", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "administrator", "req": false, "short": "Agency administrator", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "country_code", "req": false, "short": "ISO country code", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "description", "req": false, "short": "Agency description", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "founding_year", "req": false, "short": "Year agency was founded", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "id", "req": false, "short": "Agency ID", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "logo_url", "req": false, "short": "URL to agency logo", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "name", "req": false, "short": "Name of the agency", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "type", "req": false, "short": "Type of agency", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "url", "req": false, "short": "API URL for this agency", "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "launcher", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /config/launcher/{id}", "json": "{\"operationId\":\"getLauncherConfigById\",\"parameters\":[{\"description\":\"ID of the launcher configuration\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"apogee\":{\"description\":\"Apogee in km\",\"nullable\":true,\"type\":\"integer\"},\"consecutive_successful_launches\":{\"description\":\"Number of consecutive successful launches\",\"type\":\"integer\"},\"description\":{\"description\":\"Description of the launcher\",\"type\":\"string\"},\"diameter\":{\"description\":\"Diameter in meters\",\"nullable\":true,\"type\":\"number\"},\"failed_launches\":{\"description\":\"Number of failed launches\",\"type\":\"integer\"},\"family\":{\"description\":\"Launcher family\",\"type\":\"string\"},\"full_name\":{\"description\":\"Full name of the launcher\",\"type\":\"string\"},\"gto_capacity\":{\"description\":\"GTO capacity in kg\",\"nullable\":true,\"type\":\"integer\"},\"id\":{\"description\":\"Configuration ID\",\"type\":\"integer\"},\"launch_mass\":{\"description\":\"Launch mass in kg\",\"nullable\":true,\"type\":\"integer\"},\"length\":{\"description\":\"Length in meters\",\"nullable\":true,\"type\":\"number\"},\"leo_capacity\":{\"description\":\"LEO capacity in kg\",\"nullable\":true,\"type\":\"integer\"},\"maiden_flight\":{\"description\":\"Date of maiden flight\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"manufacturer\":{\"properties\":{\"abbrev\":{\"description\":\"Agency abbreviation\",\"type\":\"string\"},\"administrator\":{\"description\":\"Agency administrator\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"description\":{\"description\":\"Agency description\",\"nullable\":true,\"type\":\"string\"},\"founding_year\":{\"description\":\"Year agency was founded\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Agency ID\",\"type\":\"integer\"},\"logo_url\":{\"description\":\"URL to agency logo\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the agency\",\"type\":\"string\"},\"type\":{\"description\":\"Type of agency\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this agency\",\"type\":\"string\"}},\"type\":\"object\"},\"max_stage\":{\"description\":\"Maximum number of stages\",\"type\":\"integer\"},\"min_stage\":{\"description\":\"Minimum number of stages\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the launcher configuration\",\"type\":\"string\"},\"pending_launches\":{\"description\":\"Number of pending launches\",\"type\":\"integer\"},\"successful_launches\":{\"description\":\"Number of successful launches\",\"type\":\"integer\"},\"to_thrust\":{\"description\":\"Takeoff thrust in kN\",\"nullable\":true,\"type\":\"integer\"},\"url\":{\"description\":\"API URL for this configuration\",\"type\":\"string\"},\"variant\":{\"description\":\"Variant of the launcher\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Launcher configuration not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/config/launcher/{id}", "segments": [{ "lit": "config" }, { "lit": "launcher" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.manufacturer`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "launcher", "name__orig": "launcher", "Name": "Launcher", "name_": "launcher", "name-": "launcher", "NAME": "LAUNCHER", "index$": 9 }, { "active": true, "entity": "launcher", "key$": "BasicLauncherFlow", "kind": "basic", "name": "BasicLauncherFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "launcher_ref01", "srcdatavar": "launcher_ref01_data", "suffix": "_dt0" }, "match": { "id": "launcher01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-launcher_ref01" } }], "index$": 0 }] }, 'Launcher');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let launcher_ref01_data = Object.values(setup.data.existing.launcher)[0];
        // LOAD
        const launcher_ref01_ent = client.Launcher();
        const launcher_ref01_match_dt0 = {};
        launcher_ref01_match_dt0.id = launcher_ref01_data.id;
        const launcher_ref01_data_dt0 = (await launcher_ref01_ent.load(launcher_ref01_match_dt0)).data();
        (0, node_assert_1.default)(launcher_ref01_data_dt0.id === launcher_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/launcher/LauncherTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.LaunchLibrary2SDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['launcher01', 'launcher02', 'launcher03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID': idmap,
        'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
        'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID'];
    const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID'];
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
//# sourceMappingURL=LauncherEntity.test.js.map