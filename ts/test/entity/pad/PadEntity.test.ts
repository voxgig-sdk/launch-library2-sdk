

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


describe('PadEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Pad()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'pad.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"agency_id":{"a":true,"h":"Agency Id","n":"agency_id","r":false,"sh":"ID of the agency that operates this pad","t":"`$INTEGER`","key$":"agency_id","index$":0},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":false,"sh":"ISO country code","t":"`$STRING`","key$":"country_code","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Location ID","t":"`$INTEGER`","key$":"id","index$":2},"info_url":{"a":true,"h":"Info Url","n":"info_url","r":false,"sh":"URL to more information","t":"`$STRING`","key$":"info_url","index$":3},"latitude":{"a":true,"h":"Latitude","n":"latitude","r":false,"sh":"Latitude coordinate","t":"`$STRING`","key$":"latitude","index$":4},"location":{"a":true,"h":"Location","n":"location","r":false,"t":"`$OBJECT`","key$":"location","index$":5},"longitude":{"a":true,"h":"Longitude","n":"longitude","r":false,"sh":"Longitude coordinate","t":"`$STRING`","key$":"longitude","index$":6},"map_image":{"a":true,"h":"Map Image","n":"map_image","r":false,"sh":"URL to map image","t":"`$STRING`","key$":"map_image","index$":7},"map_url":{"a":true,"h":"Map Url","n":"map_url","r":false,"sh":"URL to map","t":"`$STRING`","key$":"map_url","index$":8},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the location","t":"`$STRING`","key$":"name","index$":9},"total_landing_count":{"a":true,"h":"Total Landing Count","n":"total_landing_count","r":false,"sh":"Total number of landings at this location","t":"`$INTEGER`","key$":"total_landing_count","index$":10},"total_launch_count":{"a":true,"h":"Total Launch Count","n":"total_launch_count","r":false,"sh":"Total number of launches from this location","t":"`$INTEGER`","key$":"total_launch_count","index$":11},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this location","t":"`$STRING`","key$":"url","index$":12},"wiki_url":{"a":true,"h":"Wiki Url","n":"wiki_url","r":false,"sh":"Wikipedia URL","t":"`$STRING`","key$":"wiki_url","index$":13}},"id":{"field":"id","name":"id"},"name":"pad","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /pad","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"location","or":"location","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":3}]},"k":"http","m":"GET","o":"/pad","q":{"exist":["limit","location","offset","search"]},"r":{},"s":[{"lit":"pad"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /pad/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/pad/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"pad"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.location`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"pad","name__orig":"pad","Name":"Pad","name_":"pad","name-":"pad","NAME":"PAD","index$":10}, {"active":true,"entity":"pad","key$":"BasicPadFlow","kind":"basic","name":"BasicPadFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"pad_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"pad_ref01","srcdatavar":"pad_ref01_data","suffix":"_dt0"},"m":{"id":"pad01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-pad_ref01"}}],"index$":1}]}, 'Pad', {"GET /pad":{"protocol":"http","operationId":"getPads","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"key$":"count","type":"integer"},"next":{"key$":"next","nullable":true,"type":"string"},"previous":{"key$":"previous","nullable":true,"type":"string"},"results":{"items":{"properties":{"agency_id":{"description":"ID of the agency that operates this pad","nullable":true,"type":"integer","key$":"agency_id"},"id":{"description":"Pad ID","type":"integer","key$":"id"},"info_url":{"description":"URL to more information","nullable":true,"type":"string","key$":"info_url"},"latitude":{"description":"Latitude coordinate","type":"string","key$":"latitude"},"location":{"properties":{"country_code":{"description":"ISO country code","type":"string","key$":"country_code"},"id":{"description":"Location ID","type":"integer","key$":"id"},"map_image":{"description":"URL to map image","nullable":true,"type":"string","key$":"map_image"},"name":{"description":"Name of the location","type":"string","key$":"name"},"total_landing_count":{"description":"Total number of landings at this location","type":"integer","key$":"total_landing_count"},"total_launch_count":{"description":"Total number of launches from this location","type":"integer","key$":"total_launch_count"},"url":{"description":"API URL for this location","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Location","key$":"location"},"longitude":{"description":"Longitude coordinate","type":"string","key$":"longitude"},"map_image":{"description":"URL to map image","nullable":true,"type":"string","key$":"map_image"},"map_url":{"description":"URL to map","nullable":true,"type":"string","key$":"map_url"},"name":{"description":"Name of the pad","type":"string","key$":"name"},"total_launch_count":{"description":"Total number of launches from this pad","type":"integer","key$":"total_launch_count"},"url":{"description":"API URL for this pad","type":"string","key$":"url"},"wiki_url":{"description":"Wikipedia URL","nullable":true,"type":"string","key$":"wiki_url"}},"type":"object","x-ref":"#/components/schemas/Pad","index$":0},"key$":"results","type":"array"}}}}}},"429":{"description":"Rate limit exceeded"}},"parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by pad name","schema":{"type":"string"},"index$":2},{"name":"location","in":"query","description":"Filter by location ID","schema":{"type":"integer"},"index$":3}],"securitySource":"unspecified"},"GET /pad/{id}":{"protocol":"http","operationId":"getPadById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Pad ID","type":"integer"},"url":{"description":"API URL for this pad","type":"string"},"agency_id":{"description":"ID of the agency that operates this pad","nullable":true,"type":"integer"},"name":{"description":"Name of the pad","type":"string"},"info_url":{"description":"URL to more information","nullable":true,"type":"string"},"wiki_url":{"description":"Wikipedia URL","nullable":true,"type":"string"},"map_url":{"description":"URL to map","nullable":true,"type":"string"},"latitude":{"description":"Latitude coordinate","type":"string"},"longitude":{"description":"Longitude coordinate","type":"string"},"location":{"properties":{"country_code":{"description":"ISO country code","type":"string","key$":"country_code"},"id":{"description":"Location ID","type":"integer","key$":"id"},"map_image":{"description":"URL to map image","nullable":true,"type":"string","key$":"map_image"},"name":{"description":"Name of the location","type":"string","key$":"name"},"total_landing_count":{"description":"Total number of landings at this location","type":"integer","key$":"total_landing_count"},"total_launch_count":{"description":"Total number of launches from this location","type":"integer","key$":"total_launch_count"},"url":{"description":"API URL for this location","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Location","index$":0},"map_image":{"description":"URL to map image","nullable":true,"type":"string"},"total_launch_count":{"description":"Total number of launches from this pad","type":"integer"}},"x-ref":"#/components/schemas/Pad"}}}},"404":{"description":"Pad not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"ID of the pad","schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let pad_ref01_data = Object.values(setup.data.existing.pad)[0] as any

    // LIST
    const pad_ref01_ent = client.Pad()
    const pad_ref01_match: any = {}

    const pad_ref01_list = (await pad_ref01_ent.list(pad_ref01_match)).map((e: any) => e.data())


    // LOAD
    const pad_ref01_match_dt0: any = {}
    pad_ref01_match_dt0.id = pad_ref01_data.id
    const pad_ref01_data_dt0 = (await pad_ref01_ent.load(pad_ref01_match_dt0)).data()
    assert(pad_ref01_data_dt0.id === pad_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/pad/PadTestData.json')

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
    ['pad01','pad02','pad03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_PAD_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_PAD_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_PAD_ENTID']
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
  
