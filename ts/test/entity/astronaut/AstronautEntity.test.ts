

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bio","req":false,"short":"Biographical information","type":"`$STRING`","index$":0},{"active":true,"format":"date","name":"date_of_birth","req":false,"short":"Date of birth","type":"`$STRING`","index$":1},{"active":true,"format":"date","name":"date_of_death","req":false,"short":"Date of death if applicable","type":"`$STRING`","index$":2},{"active":true,"name":"flights_count","req":false,"short":"Number of flights","type":"`$INTEGER`","index$":3},{"active":true,"name":"id","req":false,"short":"Astronaut ID","type":"`$INTEGER`","index$":4},{"active":true,"name":"name","req":false,"short":"Name of the astronaut","type":"`$STRING`","index$":5},{"active":true,"name":"nationality","req":false,"short":"Astronaut nationality","type":"`$STRING`","index$":6},{"active":true,"name":"profile_image","req":false,"short":"URL to profile image","type":"`$STRING`","index$":7},{"active":true,"name":"spacewalks_count","req":false,"short":"Number of spacewalks","type":"`$INTEGER`","index$":8},{"active":true,"name":"status","req":false,"type":"`$OBJECT`","index$":9},{"active":true,"name":"type","req":false,"type":"`$OBJECT`","index$":10},{"active":true,"name":"url","req":false,"short":"API URL for this astronaut","type":"`$STRING`","index$":11}],"id":{"field":"id","name":"id"},"name":"astronaut","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"kind":"query","name":"nationality","orig":"nationality","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":2},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":3},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /astronaut","json":"{\"operationId\":\"getAstronauts\",\"parameters\":[{\"description\":\"Number of results to return per page\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":10,\"type\":\"integer\"}},{\"description\":\"The initial index from which to return the results\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Search by astronaut name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by astronaut status\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by nationality\",\"in\":\"query\",\"name\":\"nationality\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"bio\":{\"description\":\"Biographical information\",\"type\":\"string\"},\"date_of_birth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"type\":\"string\"},\"date_of_death\":{\"description\":\"Date of death if applicable\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"flights_count\":{\"description\":\"Number of flights\",\"type\":\"integer\"},\"id\":{\"description\":\"Astronaut ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the astronaut\",\"type\":\"string\"},\"nationality\":{\"description\":\"Astronaut nationality\",\"type\":\"string\"},\"profile_image\":{\"description\":\"URL to profile image\",\"nullable\":true,\"type\":\"string\"},\"spacewalks_count\":{\"description\":\"Number of spacewalks\",\"type\":\"integer\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this astronaut\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/astronaut","segments":[{"lit":"astronaut"}],"select":{"exist":["limit","nationality","offset","search","status"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /astronaut/{id}","json":"{\"operationId\":\"getAstronautById\",\"parameters\":[{\"description\":\"ID of the astronaut\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bio\":{\"description\":\"Biographical information\",\"type\":\"string\"},\"date_of_birth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"type\":\"string\"},\"date_of_death\":{\"description\":\"Date of death if applicable\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"flights_count\":{\"description\":\"Number of flights\",\"type\":\"integer\"},\"id\":{\"description\":\"Astronaut ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the astronaut\",\"type\":\"string\"},\"nationality\":{\"description\":\"Astronaut nationality\",\"type\":\"string\"},\"profile_image\":{\"description\":\"URL to profile image\",\"nullable\":true,\"type\":\"string\"},\"spacewalks_count\":{\"description\":\"Number of spacewalks\",\"type\":\"integer\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this astronaut\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Astronaut not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/astronaut/{id}","segments":[{"lit":"astronaut"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"astronaut","name__orig":"astronaut","Name":"Astronaut","name_":"astronaut","name-":"astronaut","NAME":"ASTRONAUT","index$":1}, {"active":true,"entity":"astronaut","key$":"BasicAstronautFlow","kind":"basic","name":"BasicAstronautFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"astronaut_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"astronaut_ref01","srcdatavar":"astronaut_ref01_data","suffix":"_dt0"},"match":{"id":"astronaut01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-astronaut_ref01"}}],"index$":1}]}, 'Astronaut')
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
  
