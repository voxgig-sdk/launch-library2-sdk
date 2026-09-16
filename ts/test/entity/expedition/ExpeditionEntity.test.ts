

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"crew","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"format":"date-time","name":"end","req":false,"short":"End date of the expedition","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Expedition ID","type":"`$INTEGER`","index$":2},{"active":true,"name":"name","req":false,"short":"Name of the expedition","type":"`$STRING`","index$":3},{"active":true,"name":"spacestation","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"format":"date-time","name":"start","req":false,"short":"Start date of the expedition","type":"`$STRING`","index$":5},{"active":true,"name":"url","req":false,"short":"API URL for this expedition","type":"`$STRING`","index$":6}],"id":{"field":"id","name":"id"},"name":"expedition","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"spacestation","orig":"spacestation","reqd":false,"type":"`$INTEGER`","index$":3}]},"contract":{"id":"GET /expedition","json":"{\"operationId\":\"getExpeditions\",\"parameters\":[{\"description\":\"Number of results to return per page\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":10,\"type\":\"integer\"}},{\"description\":\"The initial index from which to return the results\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Search by expedition name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by space station\",\"in\":\"query\",\"name\":\"spacestation\",\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"crew\":{\"items\":{\"properties\":{\"astronaut\":{\"properties\":{\"bio\":{\"description\":\"Biographical information\",\"type\":\"string\"},\"date_of_birth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"type\":\"string\"},\"date_of_death\":{\"description\":\"Date of death if applicable\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"flights_count\":{\"description\":\"Number of flights\",\"type\":\"integer\"},\"id\":{\"description\":\"Astronaut ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the astronaut\",\"type\":\"string\"},\"nationality\":{\"description\":\"Astronaut nationality\",\"type\":\"string\"},\"profile_image\":{\"description\":\"URL to profile image\",\"nullable\":true,\"type\":\"string\"},\"spacewalks_count\":{\"description\":\"Number of spacewalks\",\"type\":\"integer\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this astronaut\",\"type\":\"string\"}},\"type\":\"object\"},\"role\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"end\":{\"description\":\"End date of the expedition\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Expedition ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the expedition\",\"type\":\"string\"},\"spacestation\":{\"properties\":{\"deorbited\":{\"description\":\"Date the space station was deorbited\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"description\":{\"description\":\"Description of the space station\",\"type\":\"string\"},\"founded\":{\"description\":\"Date the space station was founded\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Space station ID\",\"type\":\"integer\"},\"image_url\":{\"description\":\"URL to space station image\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the space station\",\"type\":\"string\"},\"orbit\":{\"description\":\"Orbital information\",\"type\":\"string\"},\"owners\":{\"items\":{\"properties\":{\"abbrev\":{\"description\":\"Agency abbreviation\",\"type\":\"string\"},\"administrator\":{\"description\":\"Agency administrator\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"description\":{\"description\":\"Agency description\",\"nullable\":true,\"type\":\"string\"},\"founding_year\":{\"description\":\"Year agency was founded\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Agency ID\",\"type\":\"integer\"},\"logo_url\":{\"description\":\"URL to agency logo\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the agency\",\"type\":\"string\"},\"type\":{\"description\":\"Type of agency\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this agency\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this space station\",\"type\":\"string\"}},\"type\":\"object\"},\"start\":{\"description\":\"Start date of the expedition\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this expedition\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/expedition","segments":[{"lit":"expedition"}],"select":{"exist":["limit","offset","search","spacestation"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /expedition/{id}","json":"{\"operationId\":\"getExpeditionById\",\"parameters\":[{\"description\":\"ID of the expedition\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"crew\":{\"items\":{\"properties\":{\"astronaut\":{\"properties\":{\"bio\":{\"description\":\"Biographical information\",\"type\":\"string\"},\"date_of_birth\":{\"description\":\"Date of birth\",\"format\":\"date\",\"type\":\"string\"},\"date_of_death\":{\"description\":\"Date of death if applicable\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"flights_count\":{\"description\":\"Number of flights\",\"type\":\"integer\"},\"id\":{\"description\":\"Astronaut ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the astronaut\",\"type\":\"string\"},\"nationality\":{\"description\":\"Astronaut nationality\",\"type\":\"string\"},\"profile_image\":{\"description\":\"URL to profile image\",\"nullable\":true,\"type\":\"string\"},\"spacewalks_count\":{\"description\":\"Number of spacewalks\",\"type\":\"integer\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this astronaut\",\"type\":\"string\"}},\"type\":\"object\"},\"role\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"end\":{\"description\":\"End date of the expedition\",\"format\":\"date-time\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Expedition ID\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the expedition\",\"type\":\"string\"},\"spacestation\":{\"properties\":{\"deorbited\":{\"description\":\"Date the space station was deorbited\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"description\":{\"description\":\"Description of the space station\",\"type\":\"string\"},\"founded\":{\"description\":\"Date the space station was founded\",\"format\":\"date\",\"type\":\"string\"},\"id\":{\"description\":\"Space station ID\",\"type\":\"integer\"},\"image_url\":{\"description\":\"URL to space station image\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the space station\",\"type\":\"string\"},\"orbit\":{\"description\":\"Orbital information\",\"type\":\"string\"},\"owners\":{\"items\":{\"properties\":{\"abbrev\":{\"description\":\"Agency abbreviation\",\"type\":\"string\"},\"administrator\":{\"description\":\"Agency administrator\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"description\":{\"description\":\"Agency description\",\"nullable\":true,\"type\":\"string\"},\"founding_year\":{\"description\":\"Year agency was founded\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Agency ID\",\"type\":\"integer\"},\"logo_url\":{\"description\":\"URL to agency logo\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the agency\",\"type\":\"string\"},\"type\":{\"description\":\"Type of agency\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this agency\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"status\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this space station\",\"type\":\"string\"}},\"type\":\"object\"},\"start\":{\"description\":\"Start date of the expedition\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this expedition\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Expedition not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/expedition/{id}","segments":[{"lit":"expedition"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"expedition","name__orig":"expedition","Name":"Expedition","name_":"expedition","name-":"expedition","NAME":"EXPEDITION","index$":5}, {"active":true,"entity":"expedition","key$":"BasicExpeditionFlow","kind":"basic","name":"BasicExpeditionFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"expedition_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"expedition_ref01","srcdatavar":"expedition_ref01_data","suffix":"_dt0"},"match":{"id":"expedition01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-expedition_ref01"}}],"index$":1}]}, 'Expedition')
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
  
