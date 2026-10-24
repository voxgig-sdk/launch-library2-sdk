

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


describe('AstronautEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Astronaut()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('astronaut hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LaunchLibrary2SDK.test(offline).Astronaut().stream('list')) { }
    }, /offline/)

    for await (const _item of LaunchLibrary2SDK.test(offline).Astronaut()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LaunchLibrary2SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Astronaut().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LaunchLibrary2SDK.test().Astronaut().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LaunchLibrary2SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Astronaut().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Astronaut().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LaunchLibrary2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Astronaut().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'astronaut.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bio":{"a":true,"h":"Bio","n":"bio","r":false,"sh":"Biographical information","t":"`$STRING`","key$":"bio","index$":0},"date_of_birth":{"a":true,"fo":"date","h":"Date Of Birth","n":"date_of_birth","r":false,"sh":"Date of birth","t":"`$STRING`","key$":"date_of_birth","index$":1},"date_of_death":{"a":true,"fo":"date","h":"Date Of Death","n":"date_of_death","r":false,"sh":"Date of death if applicable","t":"`$STRING`","key$":"date_of_death","index$":2},"flights_count":{"a":true,"h":"Flights Count","n":"flights_count","r":false,"sh":"Number of flights","t":"`$INTEGER`","key$":"flights_count","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Astronaut ID","t":"`$INTEGER`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the astronaut","t":"`$STRING`","key$":"name","index$":5},"nationality":{"a":true,"h":"Nationality","n":"nationality","r":false,"sh":"Astronaut nationality","t":"`$STRING`","key$":"nationality","index$":6},"profile_image":{"a":true,"h":"Profile Image","n":"profile_image","r":false,"sh":"URL to profile image","t":"`$STRING`","key$":"profile_image","index$":7},"spacewalks_count":{"a":true,"h":"Spacewalks Count","n":"spacewalks_count","r":false,"sh":"Number of spacewalks","t":"`$INTEGER`","key$":"spacewalks_count","index$":8},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$OBJECT`","key$":"status","index$":9},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$OBJECT`","key$":"type","index$":10},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this astronaut","t":"`$STRING`","key$":"url","index$":11}},"id":{"field":"id","name":"id"},"name":"astronaut","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /astronaut","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"nationality","or":"nationality","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/astronaut","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"astronaut"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /astronaut/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/astronaut/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"astronaut"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"astronaut","name__orig":"astronaut","Name":"Astronaut","name_":"astronaut","name-":"astronaut","NAME":"ASTRONAUT","index$":1}, {"active":true,"entity":"astronaut","key$":"BasicAstronautFlow","kind":"basic","name":"BasicAstronautFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"astronaut_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"astronaut_ref01","srcdatavar":"astronaut_ref01_data","suffix":"_dt0"},"m":{"id":"astronaut01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-astronaut_ref01"}}],"index$":1}]}, 'Astronaut', {"GET /astronaut":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by astronaut name","schema":{"type":"string"},"index$":2},{"name":"status","in":"query","description":"Filter by astronaut status","schema":{"type":"string"},"index$":3},{"name":"nationality","in":"query","description":"Filter by nationality","schema":{"type":"string"},"index$":4}]},"GET /astronaut/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the astronaut","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let astronaut_ref01_data = Object.values(setup.data.existing.astronaut)[0] as any

    // LIST
    const astronaut_ref01_ent = client.Astronaut()
    const astronaut_ref01_match: any = {}

    const astronaut_ref01_list = (await astronaut_ref01_ent.list(astronaut_ref01_match)).map((e: any) => e.data())


    // LOAD
    const astronaut_ref01_match_dt0: any = {}
    astronaut_ref01_match_dt0.id = astronaut_ref01_data.id
    const astronaut_ref01_data_dt0 = (await astronaut_ref01_ent.load(astronaut_ref01_match_dt0)).data()
    assert(astronaut_ref01_data_dt0.id === astronaut_ref01_data.id)


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
      '../../../../.sdk/test/entity/astronaut/AstronautTestData.json')

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
    ['astronaut01','astronaut02','astronaut03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_ASTRONAUT_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_ASTRONAUT_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_ASTRONAUT_ENTID']
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
  
