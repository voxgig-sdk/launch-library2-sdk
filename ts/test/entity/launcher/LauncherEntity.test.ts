

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LaunchLibrary2SDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('LauncherEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Launcher()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('launcher hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LaunchLibrary2SDK.test(offline).Launcher().stream('list')) { }
    }, /offline/)

    for await (const _item of LaunchLibrary2SDK.test(offline).Launcher()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LaunchLibrary2SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Launcher().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LaunchLibrary2SDK.test().Launcher().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LaunchLibrary2SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Launcher().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Launcher().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LaunchLibrary2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Launcher().list({"family":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'launcher.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"apogee":{"a":true,"h":"Apogee","n":"apogee","r":false,"sh":"Apogee in km","t":"`$INTEGER`","key$":"apogee","index$":0},"consecutive_successful_launches":{"a":true,"h":"Consecutive Successful Launches","n":"consecutive_successful_launches","r":false,"sh":"Number of consecutive successful launches","t":"`$INTEGER`","key$":"consecutive_successful_launches","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the launcher","t":"`$STRING`","key$":"description","index$":2},"diameter":{"a":true,"h":"Diameter","n":"diameter","r":false,"sh":"Diameter in meters","t":"`$NUMBER`","key$":"diameter","index$":3},"failed_launches":{"a":true,"h":"Failed Launches","n":"failed_launches","r":false,"sh":"Number of failed launches","t":"`$INTEGER`","key$":"failed_launches","index$":4},"family":{"a":true,"h":"Family","n":"family","r":false,"sh":"Launcher family","t":"`$STRING`","key$":"family","index$":5},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":false,"sh":"Full name of the launcher","t":"`$STRING`","key$":"full_name","index$":6},"gto_capacity":{"a":true,"h":"Gto Capacity","n":"gto_capacity","r":false,"sh":"GTO capacity in kg","t":"`$INTEGER`","key$":"gto_capacity","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Configuration ID","t":"`$INTEGER`","key$":"id","index$":8},"launch_mass":{"a":true,"h":"Launch Mass","n":"launch_mass","r":false,"sh":"Launch mass in kg","t":"`$INTEGER`","key$":"launch_mass","index$":9},"length":{"a":true,"h":"Length","n":"length","r":false,"sh":"Length in meters","t":"`$NUMBER`","key$":"length","index$":10},"leo_capacity":{"a":true,"h":"Leo Capacity","n":"leo_capacity","r":false,"sh":"LEO capacity in kg","t":"`$INTEGER`","key$":"leo_capacity","index$":11},"maiden_flight":{"a":true,"fo":"date","h":"Maiden Flight","n":"maiden_flight","r":false,"sh":"Date of maiden flight","t":"`$STRING`","key$":"maiden_flight","index$":12},"manufacturer":{"a":true,"h":"Manufacturer","n":"manufacturer","r":false,"t":"`$OBJECT`","key$":"manufacturer","index$":13},"max_stage":{"a":true,"h":"Max Stage","n":"max_stage","r":false,"sh":"Maximum number of stages","t":"`$INTEGER`","key$":"max_stage","index$":14},"min_stage":{"a":true,"h":"Min Stage","n":"min_stage","r":false,"sh":"Minimum number of stages","t":"`$INTEGER`","key$":"min_stage","index$":15},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the launcher configuration","t":"`$STRING`","key$":"name","index$":16},"pending_launches":{"a":true,"h":"Pending Launches","n":"pending_launches","r":false,"sh":"Number of pending launches","t":"`$INTEGER`","key$":"pending_launches","index$":17},"successful_launches":{"a":true,"h":"Successful Launches","n":"successful_launches","r":false,"sh":"Number of successful launches","t":"`$INTEGER`","key$":"successful_launches","index$":18},"to_thrust":{"a":true,"h":"To Thrust","n":"to_thrust","r":false,"sh":"Takeoff thrust in kN","t":"`$INTEGER`","key$":"to_thrust","index$":19},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this configuration","t":"`$STRING`","key$":"url","index$":20},"variant":{"a":true,"h":"Variant","n":"variant","r":false,"sh":"Variant of the launcher","t":"`$STRING`","key$":"variant","index$":21}},"id":{"field":"id","name":"id"},"name":"launcher","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /config/launcher","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"family","or":"family","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"manufacturer","or":"manufacturer","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/config/launcher","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"config"},{"lit":"launcher"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /config/launcher/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/config/launcher/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"config"},{"lit":"launcher"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"launcher","name__orig":"launcher","Name":"Launcher","name_":"launcher","name-":"launcher","NAME":"LAUNCHER","index$":7}, {"active":true,"entity":"launcher","key$":"BasicLauncherFlow","kind":"basic","name":"BasicLauncherFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"launcher_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"launcher_ref01","srcdatavar":"launcher_ref01_data","suffix":"_dt0"},"m":{"id":"launcher01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-launcher_ref01"}}],"index$":1}]}, 'Launcher', {"GET /config/launcher":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by launcher name","schema":{"type":"string"},"index$":2},{"name":"family","in":"query","description":"Filter by launcher family","schema":{"type":"string"},"index$":3},{"name":"manufacturer","in":"query","description":"Filter by manufacturer agency ID","schema":{"type":"integer"},"index$":4}]},"GET /config/launcher/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the launcher configuration","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let launcher_ref01_data = Object.values(setup.data.existing.launcher)[0] as any

    // LIST
    const launcher_ref01_ent = client.Launcher()
    const launcher_ref01_match: any = {}

    const launcher_ref01_list = (await launcher_ref01_ent.list(launcher_ref01_match)).map((e: any) => e.data())


    // LOAD
    const launcher_ref01_match_dt0: any = {}
    launcher_ref01_match_dt0.id = launcher_ref01_data.id
    const launcher_ref01_data_dt0 = (await launcher_ref01_ent.load(launcher_ref01_match_dt0)).data()
    assert(launcher_ref01_data_dt0.id === launcher_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/launcher/LauncherTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = LaunchLibrary2SDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['launcher01','launcher02','launcher03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_LAUNCHER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new LaunchLibrary2SDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
