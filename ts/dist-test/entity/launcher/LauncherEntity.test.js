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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "abbrev": { "a": true, "h": "Abbrev", "n": "abbrev", "r": false, "sh": "Agency abbreviation", "t": "`$STRING`", "key$": "abbrev", "index$": 0 }, "administrator": { "a": true, "h": "Administrator", "n": "administrator", "r": false, "sh": "Agency administrator", "t": "`$STRING`", "key$": "administrator", "index$": 1 }, "country_code": { "a": true, "h": "Country Code", "n": "country_code", "r": false, "sh": "ISO country code", "t": "`$STRING`", "key$": "country_code", "index$": 2 }, "description": { "a": true, "h": "Description", "n": "description", "r": false, "sh": "Agency description", "t": "`$STRING`", "key$": "description", "index$": 3 }, "founding_year": { "a": true, "h": "Founding Year", "n": "founding_year", "r": false, "sh": "Year agency was founded", "t": "`$STRING`", "key$": "founding_year", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Agency ID", "t": "`$INTEGER`", "key$": "id", "index$": 5 }, "logo_url": { "a": true, "h": "Logo Url", "n": "logo_url", "r": false, "sh": "URL to agency logo", "t": "`$STRING`", "key$": "logo_url", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Name of the agency", "t": "`$STRING`", "key$": "name", "index$": 7 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "Type of agency", "t": "`$STRING`", "key$": "type", "index$": 8 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "API URL for this agency", "t": "`$STRING`", "key$": "url", "index$": 9 } }, "id": { "field": "id", "name": "id" }, "name": "launcher", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /config/launcher/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/config/launcher/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "lit": "config" }, { "lit": "launcher" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body.manufacturer`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "launcher", "name__orig": "launcher", "Name": "Launcher", "name_": "launcher", "name-": "launcher", "NAME": "LAUNCHER", "index$": 8 }, { "active": true, "entity": "launcher", "key$": "BasicLauncherFlow", "kind": "basic", "name": "BasicLauncherFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "launcher_ref01", "srcdatavar": "launcher_ref01_data", "suffix": "_dt0" }, "m": { "id": "launcher01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-launcher_ref01" } }], "index$": 0 }] }, 'Launcher', { "GET /config/launcher/{id}": { "protocol": "http", "operationId": "getLauncherConfigById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Configuration ID", "type": "integer" }, "url": { "description": "API URL for this configuration", "type": "string" }, "name": { "description": "Name of the launcher configuration", "type": "string" }, "family": { "description": "Launcher family", "type": "string" }, "full_name": { "description": "Full name of the launcher", "type": "string" }, "variant": { "description": "Variant of the launcher", "type": "string" }, "description": { "description": "Description of the launcher", "type": "string" }, "manufacturer": { "properties": { "abbrev": { "description": "Agency abbreviation", "type": "string", "key$": "abbrev" }, "administrator": { "description": "Agency administrator", "nullable": true, "type": "string", "key$": "administrator" }, "country_code": { "description": "ISO country code", "type": "string", "key$": "country_code" }, "description": { "description": "Agency description", "nullable": true, "type": "string", "key$": "description" }, "founding_year": { "description": "Year agency was founded", "nullable": true, "type": "string", "key$": "founding_year" }, "id": { "description": "Agency ID", "type": "integer", "key$": "id" }, "logo_url": { "description": "URL to agency logo", "nullable": true, "type": "string", "key$": "logo_url" }, "name": { "description": "Name of the agency", "type": "string", "key$": "name" }, "type": { "description": "Type of agency", "type": "string", "key$": "type" }, "url": { "description": "API URL for this agency", "type": "string", "key$": "url" } }, "type": "object", "x-ref": "#/components/schemas/Agency", "index$": 0 }, "min_stage": { "description": "Minimum number of stages", "type": "integer" }, "max_stage": { "description": "Maximum number of stages", "type": "integer" }, "length": { "description": "Length in meters", "nullable": true, "type": "number" }, "diameter": { "description": "Diameter in meters", "nullable": true, "type": "number" }, "maiden_flight": { "description": "Date of maiden flight", "format": "date", "nullable": true, "type": "string" }, "launch_mass": { "description": "Launch mass in kg", "nullable": true, "type": "integer" }, "leo_capacity": { "description": "LEO capacity in kg", "nullable": true, "type": "integer" }, "gto_capacity": { "description": "GTO capacity in kg", "nullable": true, "type": "integer" }, "to_thrust": { "description": "Takeoff thrust in kN", "nullable": true, "type": "integer" }, "apogee": { "description": "Apogee in km", "nullable": true, "type": "integer" }, "successful_launches": { "description": "Number of successful launches", "type": "integer" }, "consecutive_successful_launches": { "description": "Number of consecutive successful launches", "type": "integer" }, "failed_launches": { "description": "Number of failed launches", "type": "integer" }, "pending_launches": { "description": "Number of pending launches", "type": "integer" } }, "x-ref": "#/components/schemas/LauncherConfig" } } } }, "404": { "description": "Launcher configuration not found" } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "ID of the launcher configuration", "schema": { "type": "integer" }, "index$": 0 }], "securitySource": "unspecified" } });
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