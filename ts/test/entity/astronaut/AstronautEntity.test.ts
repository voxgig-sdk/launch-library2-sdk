

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


describe('AstronautEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Astronaut()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'astronaut.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bio":{"a":true,"h":"Bio","n":"bio","r":false,"sh":"Biographical information","t":"`$STRING`","key$":"bio","index$":0},"date_of_birth":{"a":true,"fo":"date","h":"Date Of Birth","n":"date_of_birth","r":false,"sh":"Date of birth","t":"`$STRING`","key$":"date_of_birth","index$":1},"date_of_death":{"a":true,"fo":"date","h":"Date Of Death","n":"date_of_death","r":false,"sh":"Date of death if applicable","t":"`$STRING`","key$":"date_of_death","index$":2},"flights_count":{"a":true,"h":"Flights Count","n":"flights_count","r":false,"sh":"Number of flights","t":"`$INTEGER`","key$":"flights_count","index$":3},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Astronaut ID","t":"`$INTEGER`","key$":"id","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the astronaut","t":"`$STRING`","key$":"name","index$":5},"nationality":{"a":true,"h":"Nationality","n":"nationality","r":false,"sh":"Astronaut nationality","t":"`$STRING`","key$":"nationality","index$":6},"profile_image":{"a":true,"h":"Profile Image","n":"profile_image","r":false,"sh":"URL to profile image","t":"`$STRING`","key$":"profile_image","index$":7},"spacewalks_count":{"a":true,"h":"Spacewalks Count","n":"spacewalks_count","r":false,"sh":"Number of spacewalks","t":"`$INTEGER`","key$":"spacewalks_count","index$":8},"status":{"a":true,"h":"Status","n":"status","r":false,"t":"`$OBJECT`","key$":"status","index$":9},"type":{"a":true,"h":"Type","n":"type","r":false,"t":"`$OBJECT`","key$":"type","index$":10},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this astronaut","t":"`$STRING`","key$":"url","index$":11}},"id":{"field":"id","name":"id"},"name":"astronaut","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /astronaut","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"k":"query","n":"nationality","or":"nationality","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":3},{"a":true,"k":"query","n":"status","or":"status","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/astronaut","q":{"exist":["limit","nationality","offset","search","status"]},"r":{},"s":[{"lit":"astronaut"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /astronaut/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/astronaut/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"astronaut"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"astronaut","name__orig":"astronaut","Name":"Astronaut","name_":"astronaut","name-":"astronaut","NAME":"ASTRONAUT","index$":1}, {"active":true,"entity":"astronaut","key$":"BasicAstronautFlow","kind":"basic","name":"BasicAstronautFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"astronaut_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"astronaut_ref01","srcdatavar":"astronaut_ref01_data","suffix":"_dt0"},"m":{"id":"astronaut01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-astronaut_ref01"}}],"index$":1}]}, 'Astronaut', {"GET /astronaut":{"protocol":"http","operationId":"getAstronauts","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"key$":"count","type":"integer"},"next":{"key$":"next","nullable":true,"type":"string"},"previous":{"key$":"previous","nullable":true,"type":"string"},"results":{"items":{"properties":{"bio":{"description":"Biographical information","type":"string","key$":"bio"},"date_of_birth":{"description":"Date of birth","format":"date","type":"string","key$":"date_of_birth"},"date_of_death":{"description":"Date of death if applicable","format":"date","nullable":true,"type":"string","key$":"date_of_death"},"flights_count":{"description":"Number of flights","type":"integer","key$":"flights_count"},"id":{"description":"Astronaut ID","type":"integer","key$":"id"},"name":{"description":"Name of the astronaut","type":"string","key$":"name"},"nationality":{"description":"Astronaut nationality","type":"string","key$":"nationality"},"profile_image":{"description":"URL to profile image","nullable":true,"type":"string","key$":"profile_image"},"spacewalks_count":{"description":"Number of spacewalks","type":"integer","key$":"spacewalks_count"},"status":{"properties":{"id":{"type":"integer"},"name":{"type":"string"}},"type":"object","key$":"status"},"type":{"properties":{"id":{"type":"integer"},"name":{"type":"string"}},"type":"object","key$":"type"},"url":{"description":"API URL for this astronaut","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Astronaut","index$":0},"key$":"results","type":"array"}}}}}},"429":{"description":"Rate limit exceeded"}},"parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by astronaut name","schema":{"type":"string"},"index$":2},{"name":"status","in":"query","description":"Filter by astronaut status","schema":{"type":"string"},"index$":3},{"name":"nationality","in":"query","description":"Filter by nationality","schema":{"type":"string"},"index$":4}],"securitySource":"unspecified"},"GET /astronaut/{id}":{"protocol":"http","operationId":"getAstronautById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"description":"Astronaut ID","type":"integer","key$":"id"},"url":{"description":"API URL for this astronaut","type":"string","key$":"url"},"name":{"description":"Name of the astronaut","type":"string","key$":"name"},"status":{"properties":{"id":{"type":"integer"},"name":{"type":"string"}},"type":"object","key$":"status"},"type":{"properties":{"id":{"type":"integer"},"name":{"type":"string"}},"type":"object","key$":"type"},"date_of_birth":{"description":"Date of birth","format":"date","type":"string","key$":"date_of_birth"},"date_of_death":{"description":"Date of death if applicable","format":"date","nullable":true,"type":"string","key$":"date_of_death"},"nationality":{"description":"Astronaut nationality","type":"string","key$":"nationality"},"bio":{"description":"Biographical information","type":"string","key$":"bio"},"profile_image":{"description":"URL to profile image","nullable":true,"type":"string","key$":"profile_image"},"flights_count":{"description":"Number of flights","type":"integer","key$":"flights_count"},"spacewalks_count":{"description":"Number of spacewalks","type":"integer","key$":"spacewalks_count"}},"x-ref":"#/components/schemas/Astronaut","index$":0}}}},"404":{"description":"Astronaut not found"}},"parameters":[{"name":"id","in":"path","required":true,"description":"ID of the astronaut","schema":{"type":"integer"},"index$":0}],"securitySource":"unspecified"}})
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
  
