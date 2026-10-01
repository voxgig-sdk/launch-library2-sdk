

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


describe('FirstStageEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.FirstStage()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'first_stage.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"flights":{"a":true,"h":"Flights","n":"flights","r":false,"sh":"Number of flights","t":"`$INTEGER`","key$":"flights","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"First stage ID","t":"`$INTEGER`","key$":"id","index$":1},"launcher_config":{"a":true,"h":"Launcher Config","n":"launcher_config","r":false,"t":"`$OBJECT`","key$":"launcher_config","index$":2},"serial_number":{"a":true,"h":"Serial Number","n":"serial_number","r":false,"sh":"Serial number of the first stage","t":"`$STRING`","key$":"serial_number","index$":3},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Current status","t":"`$STRING`","key$":"status","index$":4},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of first stage","t":"`$STRING`","key$":"type","index$":5},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this first stage","t":"`$STRING`","key$":"url","index$":6}},"id":{"field":"id","name":"id"},"name":"first_stage","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /firststage","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"flight_number","or":"flight_number","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"serial_number","or":"serial_number","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/firststage","q":{"exist":["flight_number","limit","offset","serial_number"]},"r":{},"s":[{"lit":"firststage"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /firststage/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/firststage/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"firststage"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"first_stage","name__orig":"first_stage","Name":"FirstStage","name_":"first_stage","name-":"first-stage","NAME":"FIRST_STAGE","index$":5}, {"active":true,"entity":"first_stage","key$":"BasicFirstStageFlow","kind":"basic","name":"BasicFirstStageFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"first_stage_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"first_stage_ref01","srcdatavar":"first_stage_ref01_data","suffix":"_dt0"},"m":{"id":"first_stage01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-first_stage_ref01"}}],"index$":1}]}, 'FirstStage', {"GET /firststage":{"protocol":"http","parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"serial_number","in":"query","description":"Filter by serial number","schema":{"type":"string"},"index$":2},{"name":"flight_number","in":"query","description":"Filter by flight number","schema":{"type":"integer"},"index$":3}]},"GET /firststage/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"description":"ID of the first stage","schema":{"type":"integer"},"index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let first_stage_ref01_data = Object.values(setup.data.existing.first_stage)[0] as any

    // LIST
    const first_stage_ref01_ent = client.FirstStage()
    const first_stage_ref01_match: any = {}

    const first_stage_ref01_list = (await first_stage_ref01_ent.list(first_stage_ref01_match)).map((e: any) => e.data())


    // LOAD
    const first_stage_ref01_match_dt0: any = {}
    first_stage_ref01_match_dt0.id = first_stage_ref01_data.id
    const first_stage_ref01_data_dt0 = (await first_stage_ref01_ent.load(first_stage_ref01_match_dt0)).data()
    assert(first_stage_ref01_data_dt0.id === first_stage_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/first_stage/FirstStageTestData.json')

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
    ['first_stage01','first_stage02','first_stage03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_FIRST_STAGE_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_FIRST_STAGE_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_FIRST_STAGE_ENTID']
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
  
