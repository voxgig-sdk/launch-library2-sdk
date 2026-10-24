

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


describe('SpaceStationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.SpaceStation()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('space_station hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LaunchLibrary2SDK.test(offline).SpaceStation().stream('list')) { }
    }, /offline/)

    for await (const _item of LaunchLibrary2SDK.test(offline).SpaceStation()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LaunchLibrary2SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.SpaceStation().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LaunchLibrary2SDK.test().SpaceStation().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LaunchLibrary2SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.SpaceStation().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.SpaceStation().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LaunchLibrary2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.SpaceStation().list({"limit":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'space_station.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"deorbited":{"a":true,"fo":"date","h":"Deorbited","n":"deorbited","r":false,"sh":"Date the space station was deorbited","t":"`$STRING`","key$":"deorbited","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the space station","t":"`$STRING`","key$":"description","index$":1},"founded":{"a":true,"fo":"date","h":"Founded","n":"founded","r":false,"sh":"Date the space station was founded","t":"`$STRING`","key$":"founded","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Space station ID","t":"`$INTEGER`","key$":"id","index$":3},"image_url":{"a":true,"h":"Image Url","n":"image_url","r":false,"sh":"URL to space station image","t":"`$STRING`","key$":"image_url","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the space station","t":"`$STRING`","key$":"name","index$":5},"orbit":{"a":true,"h":"Orbit","n":"orbit","r":false,"sh":"Orbital information","t":"`$STRING`","key$":"orbit","index$":6},"owners":{"a":true,"h":"Owners","n":"owners","r":false,"t":"`$ARRAY`","key$":"owners","index$":7},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$OBJECT`","key$":"status","index$":8},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$OBJECT`","key$":"type","index$":9},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this space station","t":"`$STRING`","key$":"url","index$":10}},"id":{"field":"id","name":"id"},"name":"space_station","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /spacestation","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"owner","or":"owners","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/spacestation","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spacestation"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /spacestation/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/spacestation/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"spacestation"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"space_station","name__orig":"space_station","Name":"SpaceStation","name_":"space_station","name-":"space-station","NAME":"SPACE_STATION","index$":10}, {"active":true,"entity":"space_station","key$":"BasicSpaceStationFlow","kind":"basic","name":"BasicSpaceStationFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"space_station_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"space_station_ref01","srcdatavar":"space_station_ref01_data","suffix":"_dt0"},"m":{"id":"space_station01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-space_station_ref01"}}],"index$":1}]}, 'SpaceStation', {"GET /spacestation":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by space station name","schema":{"type":"string"},"index$":2},{"name":"status","in":"query","description":"Filter by status","schema":{"type":"string"},"index$":3},{"name":"owners","in":"query","description":"Filter by owners","schema":{"type":"string"},"index$":4}]},"GET /spacestation/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the space station","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let space_station_ref01_data = Object.values(setup.data.existing.space_station)[0] as any

    // LIST
    const space_station_ref01_ent = client.SpaceStation()
    const space_station_ref01_match: any = {}

    const space_station_ref01_list = (await space_station_ref01_ent.list(space_station_ref01_match)).map((e: any) => e.data())


    // LOAD
    const space_station_ref01_match_dt0: any = {}
    space_station_ref01_match_dt0.id = space_station_ref01_data.id
    const space_station_ref01_data_dt0 = (await space_station_ref01_ent.load(space_station_ref01_match_dt0)).data()
    assert(space_station_ref01_data_dt0.id === space_station_ref01_data.id)


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
      '../../../../.sdk/test/entity/space_station/SpaceStationTestData.json')

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
    ['space_station01','space_station02','space_station03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_SPACE_STATION_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_SPACE_STATION_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_SPACE_STATION_ENTID']
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
  
