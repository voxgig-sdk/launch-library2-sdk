

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


describe('LaunchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Launch()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'launch.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"UUID of the launch","t":"`$STRING`","key$":"id","index$":0},"image":{"a":true,"h":"Image","n":"image","r":false,"sh":"URL to launch image","t":"`$STRING`","key$":"image","index$":1},"launch_service_provider":{"a":true,"h":"Launch Service Provider","n":"launch_service_provider","r":false,"t":"`$OBJECT`","key$":"launch_service_provider","index$":2},"mission":{"a":true,"h":"Mission","n":"mission","r":false,"t":"`$OBJECT`","key$":"mission","index$":3},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the launch","t":"`$STRING`","key$":"name","index$":4},"net":{"a":true,"fo":"date-time","h":"Net","n":"net","r":false,"sh":"Net Earliest Time (NET) for launch","t":"`$STRING`","key$":"net","index$":5},"pad":{"a":true,"h":"Pad","n":"pad","r":false,"t":"`$OBJECT`","key$":"pad","index$":6},"probability":{"a":true,"h":"Probability","n":"probability","r":false,"sh":"Launch probability percentage","t":"`$INTEGER`","key$":"probability","index$":7},"rocket":{"a":true,"h":"Rocket","n":"rocket","r":false,"t":"`$OBJECT`","key$":"rocket","index$":8},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$OBJECT`","key$":"status","index$":9},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this launch","t":"`$STRING`","key$":"url","index$":10},"webcast_live":{"a":true,"h":"Webcast Live","n":"webcast_live","r":false,"sh":"Whether the webcast is currently live","t":"`$BOOLEAN`","key$":"webcast_live","index$":11},"window_end":{"a":true,"fo":"date-time","h":"Window End","n":"window_end","r":false,"sh":"End of launch window","t":"`$STRING`","key$":"window_end","index$":12},"window_start":{"a":true,"fo":"date-time","h":"Window Start","n":"window_start","r":false,"sh":"Start of launch window","t":"`$STRING`","key$":"window_start","index$":13}},"id":{"field":"id","name":"id"},"name":"launch","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /launch","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"lsp_id","or":"lsp_id","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"lsp_name","or":"lsp_name","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"rocket_configuration_id","or":"rocket_configuration_id","r":false,"t":"`$INTEGER`","index$":4},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":5},{"a":true,"k":"query","n":"spacecraft_id","or":"spacecraft_id","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/launch","q":{"exist":["limit","lsp_id","lsp_name","offset","rocket_configuration_id","search","spacecraft_id","status"]},"r":{},"s":[{"lit":"launch"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /launch/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/launch/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"launch"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"launch","name__orig":"launch","Name":"Launch","name_":"launch","name-":"launch","NAME":"LAUNCH","index$":6}, {"active":true,"entity":"launch","key$":"BasicLaunchFlow","kind":"basic","name":"BasicLaunchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"launch_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"launch_ref01","srcdatavar":"launch_ref01_data","suffix":"_dt0"},"m":{"id":"launch01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-launch_ref01"}}],"index$":1}]}, 'Launch', {"GET /launch":{"protocol":"http","operationId":"getLaunches","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"description":"Total number of launches","key$":"count","type":"integer"},"next":{"description":"URL to next page of results","key$":"next","nullable":true,"type":"string"},"previous":{"description":"URL to previous page of results","key$":"previous","nullable":true,"type":"string"},"results":{"items":{"properties":{"id":{"description":"UUID of the launch","type":"string","key$":"id"},"image":{"description":"URL to launch image","nullable":true,"type":"string","key$":"image"},"launch_service_provider":{"properties":{"id":{"type":"integer"},"name":{"type":"string"},"type":{"type":"string"}},"type":"object","key$":"launch_service_provider"},"mission":{"nullable":true,"properties":{"description":{"type":"string"},"id":{"type":"integer"},"name":{"type":"string"},"orbit":{"nullable":true,"type":"object"},"type":{"type":"string"}},"type":"object","key$":"mission"},"name":{"description":"Name of the launch","type":"string","key$":"name"},"net":{"description":"Net Earliest Time (NET) for launch","format":"date-time","type":"string","key$":"net"},"pad":{"properties":{"id":{"type":"integer"},"location":{"type":"object"},"name":{"type":"string"}},"type":"object","key$":"pad"},"probability":{"description":"Launch probability percentage","nullable":true,"type":"integer","key$":"probability"},"rocket":{"properties":{"configuration":{"type":"object"},"id":{"type":"integer"}},"type":"object","key$":"rocket"},"status":{"properties":{"id":{"type":"integer"},"name":{"type":"string"}},"type":"object","key$":"status"},"url":{"description":"API URL for this launch","type":"string","key$":"url"},"webcast_live":{"description":"Whether the webcast is currently live","type":"boolean","key$":"webcast_live"},"window_end":{"description":"End of launch window","format":"date-time","type":"string","key$":"window_end"},"window_start":{"description":"Start of launch window","format":"date-time","type":"string","key$":"window_start"}},"type":"object","x-ref":"#/components/schemas/Launch","index$":0},"key$":"results","type":"array"}}}}}},"429":{"description":"Rate limit exceeded (15 requests per hour for free tier)"}},"parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search term to filter launches","schema":{"type":"string"},"index$":2},{"name":"lsp__id","in":"query","description":"Filter by Launch Service Provider ID","schema":{"type":"integer"},"index$":3},{"name":"lsp__name","in":"query","description":"Filter by Launch Service Provider name","schema":{"type":"string"},"index$":4},{"name":"rocket__configuration__id","in":"query","description":"Filter by Launcher Configuration ID","schema":{"type":"integer"},"index$":5},{"name":"spacecraft__id","in":"query","description":"Filter by Spacecraft ID","schema":{"type":"integer"},"index$":6},{"name":"status","in":"query","description":"Filter by launch status","schema":{"type":"string"},"index$":7}],"securitySource":"unspecified"},"GET /launch/{id}":{"protocol":"http","operationId":"getLaunchById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"UUID of the launch","type":"string","key$":"id"},"url":{"description":"API URL for this launch","type":"string","key$":"url"},"name":{"description":"Name of the launch","type":"string","key$":"name"},"status":{"properties":{"id":{"type":"integer"},"name":{"type":"string"}},"type":"object","key$":"status"},"net":{"description":"Net Earliest Time (NET) for launch","format":"date-time","type":"string","key$":"net"},"window_end":{"description":"End of launch window","format":"date-time","type":"string","key$":"window_end"},"window_start":{"description":"Start of launch window","format":"date-time","type":"string","key$":"window_start"},"mission":{"nullable":true,"properties":{"description":{"type":"string"},"id":{"type":"integer"},"name":{"type":"string"},"orbit":{"nullable":true,"type":"object"},"type":{"type":"string"}},"type":"object","key$":"mission"},"pad":{"properties":{"id":{"type":"integer"},"location":{"type":"object"},"name":{"type":"string"}},"type":"object","key$":"pad"},"rocket":{"properties":{"configuration":{"type":"object"},"id":{"type":"integer"}},"type":"object","key$":"rocket"},"launch_service_provider":{"properties":{"id":{"type":"integer"},"name":{"type":"string"},"type":{"type":"string"}},"type":"object","key$":"launch_service_provider"},"image":{"description":"URL to launch image","nullable":true,"type":"string","key$":"image"},"webcast_live":{"description":"Whether the webcast is currently live","type":"boolean","key$":"webcast_live"},"probability":{"description":"Launch probability percentage","nullable":true,"type":"integer","key$":"probability"}},"x-ref":"#/components/schemas/Launch","index$":0}}}},"404":{"description":"Launch not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"UUID of the launch","schema":{"type":"string"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let launch_ref01_data = Object.values(setup.data.existing.launch)[0] as any

    // LIST
    const launch_ref01_ent = client.Launch()
    const launch_ref01_match: any = {}

    const launch_ref01_list = (await launch_ref01_ent.list(launch_ref01_match)).map((e: any) => e.data())


    // LOAD
    const launch_ref01_match_dt0: any = {}
    launch_ref01_match_dt0.id = launch_ref01_data.id
    const launch_ref01_data_dt0 = (await launch_ref01_ent.load(launch_ref01_match_dt0)).data()
    assert(launch_ref01_data_dt0.id === launch_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/launch/LaunchTestData.json')

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
    ['launch01','launch02','launch03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_LAUNCH_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_LAUNCH_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_LAUNCH_ENTID']
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
  
