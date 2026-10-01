

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { LaunchLibrary2SDK, BaseFeature, stdutil } from '../../..'

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


describe('ExpeditionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Expedition()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'expedition.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"crew":{"a":true,"h":"Crew","n":"crew","r":false,"t":"`$ARRAY`","key$":"crew","index$":0},"end":{"a":true,"fo":"date-time","h":"End","n":"end","r":false,"sh":"End date of the expedition","t":"`$STRING`","key$":"end","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Expedition ID","t":"`$INTEGER`","key$":"id","index$":2},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the expedition","t":"`$STRING`","key$":"name","index$":3},"spacestation":{"a":true,"h":"Spacestation","n":"spacestation","r":false,"t":"`$OBJECT`","key$":"spacestation","index$":4},"start":{"a":true,"fo":"date-time","h":"Start","n":"start","r":false,"sh":"Start date of the expedition","t":"`$STRING`","key$":"start","index$":5},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this expedition","t":"`$STRING`","key$":"url","index$":6}},"id":{"field":"id","name":"id"},"name":"expedition","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /expedition","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"spacestation","or":"spacestation","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/expedition","q":{"exist":["limit","offset","search","spacestation"]},"r":{},"s":[{"lit":"expedition"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /expedition/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/expedition/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"expedition"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"expedition","name__orig":"expedition","Name":"Expedition","name_":"expedition","name-":"expedition","NAME":"EXPEDITION","index$":4}, {"active":true,"entity":"expedition","key$":"BasicExpeditionFlow","kind":"basic","name":"BasicExpeditionFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"expedition_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"expedition_ref01","srcdatavar":"expedition_ref01_data","suffix":"_dt0"},"m":{"id":"expedition01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-expedition_ref01"}}],"index$":1}]}, 'Expedition', {"GET /expedition":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by expedition name","schema":{"type":"string"},"index$":2},{"name":"spacestation","in":"query","description":"Filter by space station","schema":{"type":"integer"},"index$":3}]},"GET /expedition/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the expedition","schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let expedition_ref01_data = Object.values(setup.data.existing.expedition)[0] as any

    // LIST
    const expedition_ref01_ent = client.Expedition()
    const expedition_ref01_match: any = {}

    const expedition_ref01_list = (await expedition_ref01_ent.list(expedition_ref01_match)).map((e: any) => e.data())


    // LOAD
    const expedition_ref01_match_dt0: any = {}
    expedition_ref01_match_dt0.id = expedition_ref01_data.id
    const expedition_ref01_data_dt0 = (await expedition_ref01_ent.load(expedition_ref01_match_dt0)).data()
    assert(expedition_ref01_data_dt0.id === expedition_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/expedition/ExpeditionTestData.json')

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
    ['expedition01','expedition02','expedition03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_EXPEDITION_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_EXPEDITION_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_EXPEDITION_ENTID']
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
  
