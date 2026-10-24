

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


describe('DockingEventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.DockingEvent()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('docking_event hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of LaunchLibrary2SDK.test(offline).DockingEvent().stream('list')) { }
    }, /offline/)

    for await (const _item of LaunchLibrary2SDK.test(offline).DockingEvent()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = LaunchLibrary2SDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.DockingEvent().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of LaunchLibrary2SDK.test().DockingEvent().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new LaunchLibrary2SDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.DockingEvent().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.DockingEvent().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = LaunchLibrary2SDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.DockingEvent().list({"docking_location":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'docking_event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"departure":{"a":true,"fo":"date-time","h":"Departure","n":"departure","r":false,"sh":"Departure time","t":"`$STRING`","key$":"departure","index$":0},"docking":{"a":true,"fo":"date-time","h":"Docking","n":"docking","r":false,"sh":"Docking time","t":"`$STRING`","key$":"docking","index$":1},"docking_location":{"a":true,"h":"Docking Location","n":"docking_location","r":false,"t":"`$OBJECT`","key$":"docking_location","index$":2},"flight_vehicle":{"a":true,"h":"Flight Vehicle","n":"flight_vehicle","r":false,"t":"`$OBJECT`","key$":"flight_vehicle","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Docking event ID","t":"`$INTEGER`","key$":"id","index$":4},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this docking event","t":"`$STRING`","key$":"url","index$":5}},"id":{"field":"id","name":"id"},"name":"docking_event","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /docking_event","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"docking_location","or":"docking_location","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"spacestation","or":"spacestation","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/docking_event","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"docking_event"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /docking_event/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/docking_event/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"docking_event"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"docking_event","name__orig":"docking_event","Name":"DockingEvent","name_":"docking_event","name-":"docking-event","NAME":"DOCKING_EVENT","index$":2}, {"active":true,"entity":"docking_event","key$":"BasicDockingEventFlow","kind":"basic","name":"BasicDockingEventFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"docking_event_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"docking_event_ref01","srcdatavar":"docking_event_ref01_data","suffix":"_dt0"},"m":{"id":"docking_event01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-docking_event_ref01"}}],"index$":1}]}, 'DockingEvent', {"GET /docking_event":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"spacestation","in":"query","description":"Filter by space station","schema":{"type":"integer"},"index$":2},{"name":"docking_location","in":"query","description":"Filter by docking location","schema":{"type":"integer"},"index$":3}]},"GET /docking_event/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the docking event","schema":{"type":"integer"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let docking_event_ref01_data = Object.values(setup.data.existing.docking_event)[0] as any

    // LIST
    const docking_event_ref01_ent = client.DockingEvent()
    const docking_event_ref01_match: any = {}

    const docking_event_ref01_list = (await docking_event_ref01_ent.list(docking_event_ref01_match)).map((e: any) => e.data())


    // LOAD
    const docking_event_ref01_match_dt0: any = {}
    docking_event_ref01_match_dt0.id = docking_event_ref01_data.id
    const docking_event_ref01_data_dt0 = (await docking_event_ref01_ent.load(docking_event_ref01_match_dt0)).data()
    assert(docking_event_ref01_data_dt0.id === docking_event_ref01_data.id)


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
      '../../../../.sdk/test/entity/docking_event/DockingEventTestData.json')

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
    ['docking_event01','docking_event02','docking_event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_DOCKING_EVENT_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_DOCKING_EVENT_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_DOCKING_EVENT_ENTID']
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
  
