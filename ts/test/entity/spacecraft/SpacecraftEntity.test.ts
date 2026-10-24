

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


describe('SpacecraftEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Spacecraft()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('spacecraft hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LaunchLibrary2SDK.test(offline).Spacecraft().stream('list')) { }
    }, /offline/)

    for await (const _item of LaunchLibrary2SDK.test(offline).Spacecraft()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LaunchLibrary2SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Spacecraft().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LaunchLibrary2SDK.test().Spacecraft().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LaunchLibrary2SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Spacecraft().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Spacecraft().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LaunchLibrary2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Spacecraft().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'spacecraft.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agency":{"a":true,"h":"Agency","n":"agency","r":false,"t":"`$OBJECT`","key$":"agency","index$":0},"capability":{"a":true,"h":"Capability","n":"capability","r":false,"sh":"Spacecraft capability","t":"`$STRING`","key$":"capability","index$":1},"crew_capacity":{"a":true,"h":"Crew Capacity","n":"crew_capacity","r":false,"sh":"Crew capacity","t":"`$INTEGER`","key$":"crew_capacity","index$":2},"details":{"a":true,"h":"Details","n":"details","r":false,"sh":"Detailed information","t":"`$STRING`","key$":"details","index$":3},"diameter":{"a":true,"h":"Diameter","n":"diameter","r":false,"sh":"Diameter in meters","t":"`$NUMBER`","key$":"diameter","index$":4},"height":{"a":true,"h":"Height","n":"height","r":false,"sh":"Height in meters","t":"`$NUMBER`","key$":"height","index$":5},"history":{"a":true,"h":"History","n":"history","r":false,"sh":"Historical information","t":"`$STRING`","key$":"history","index$":6},"human_rated":{"a":true,"h":"Human Rated","n":"human_rated","r":false,"sh":"Whether the spacecraft is human-rated","t":"`$BOOLEAN`","key$":"human_rated","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Spacecraft configuration ID","t":"`$INTEGER`","key$":"id","index$":8},"image_url":{"a":true,"h":"Image Url","n":"image_url","r":false,"sh":"URL to spacecraft image","t":"`$STRING`","key$":"image_url","index$":9},"in_use":{"a":true,"h":"In Use","n":"in_use","r":false,"sh":"Whether the spacecraft is currently in use","t":"`$BOOLEAN`","key$":"in_use","index$":10},"maiden_flight":{"a":true,"fo":"date","h":"Maiden Flight","n":"maiden_flight","r":false,"sh":"Date of maiden flight","t":"`$STRING`","key$":"maiden_flight","index$":11},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the spacecraft","t":"`$STRING`","key$":"name","index$":12},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$OBJECT`","key$":"type","index$":13},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this configuration","t":"`$STRING`","key$":"url","index$":14}},"id":{"field":"id","name":"id"},"name":"spacecraft","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /config/spacecraft","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/config/spacecraft","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"config"},{"lit":"spacecraft"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /config/spacecraft/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/config/spacecraft/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"config"},{"lit":"spacecraft"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"spacecraft","name__orig":"spacecraft","Name":"Spacecraft","name_":"spacecraft","name-":"spacecraft","NAME":"SPACECRAFT","index$":11}, {"active":true,"entity":"spacecraft","key$":"BasicSpacecraftFlow","kind":"basic","name":"BasicSpacecraftFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"spacecraft_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"spacecraft_ref01","srcdatavar":"spacecraft_ref01_data","suffix":"_dt0"},"m":{"id":"spacecraft01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-spacecraft_ref01"}}],"index$":1}]}, 'Spacecraft', {"GET /config/spacecraft":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by spacecraft name","schema":{"type":"string"},"index$":2},{"name":"status","in":"query","description":"Filter by status","schema":{"type":"string"},"index$":3}]},"GET /config/spacecraft/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the spacecraft configuration","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let spacecraft_ref01_data = Object.values(setup.data.existing.spacecraft)[0] as any

    // LIST
    const spacecraft_ref01_ent = client.Spacecraft()
    const spacecraft_ref01_match: any = {}

    const spacecraft_ref01_list = (await spacecraft_ref01_ent.list(spacecraft_ref01_match)).map((e: any) => e.data())


    // LOAD
    const spacecraft_ref01_match_dt0: any = {}
    spacecraft_ref01_match_dt0.id = spacecraft_ref01_data.id
    const spacecraft_ref01_data_dt0 = (await spacecraft_ref01_ent.load(spacecraft_ref01_match_dt0)).data()
    assert(spacecraft_ref01_data_dt0.id === spacecraft_ref01_data.id)


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
      '../../../../.sdk/test/entity/spacecraft/SpacecraftTestData.json')

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
    ['spacecraft01','spacecraft02','spacecraft03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID']
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
  
