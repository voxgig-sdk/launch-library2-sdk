

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


describe('SpacecraftEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Spacecraft()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'spacecraft.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"agency","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"capability","req":false,"short":"Spacecraft capability","type":"`$STRING`","index$":1},{"active":true,"name":"crew_capacity","req":false,"short":"Crew capacity","type":"`$INTEGER`","index$":2},{"active":true,"name":"details","req":false,"short":"Detailed information","type":"`$STRING`","index$":3},{"active":true,"name":"diameter","req":false,"short":"Diameter in meters","type":"`$NUMBER`","index$":4},{"active":true,"name":"height","req":false,"short":"Height in meters","type":"`$NUMBER`","index$":5},{"active":true,"name":"history","req":false,"short":"Historical information","type":"`$STRING`","index$":6},{"active":true,"name":"human_rated","req":false,"short":"Whether the spacecraft is human-rated","type":"`$BOOLEAN`","index$":7},{"active":true,"name":"id","req":false,"short":"Spacecraft configuration ID","type":"`$INTEGER`","index$":8},{"active":true,"name":"image_url","req":false,"short":"URL to spacecraft image","type":"`$STRING`","index$":9},{"active":true,"name":"in_use","req":false,"short":"Whether the spacecraft is currently in use","type":"`$BOOLEAN`","index$":10},{"active":true,"format":"date","name":"maiden_flight","req":false,"short":"Date of maiden flight","type":"`$STRING`","index$":11},{"active":true,"name":"name","req":false,"short":"Name of the spacecraft","type":"`$STRING`","index$":12},{"active":true,"name":"type","req":false,"type":"`$OBJECT`","index$":13},{"active":true,"name":"url","req":false,"short":"API URL for this configuration","type":"`$STRING`","index$":14}],"id":{"field":"id","name":"id"},"name":"spacecraft","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":10,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":0,"kind":"query","name":"offset","orig":"offset","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"search","orig":"search","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"status","orig":"status","reqd":false,"type":"`$STRING`","index$":3}]},"contract":{"id":"GET /config/spacecraft","json":"{\"operationId\":\"getSpacecraftConfigs\",\"parameters\":[{\"description\":\"Number of results to return per page\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":10,\"type\":\"integer\"}},{\"description\":\"The initial index from which to return the results\",\"in\":\"query\",\"name\":\"offset\",\"schema\":{\"default\":0,\"type\":\"integer\"}},{\"description\":\"Search by spacecraft name\",\"in\":\"query\",\"name\":\"search\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Filter by status\",\"in\":\"query\",\"name\":\"status\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"count\":{\"type\":\"integer\"},\"next\":{\"nullable\":true,\"type\":\"string\"},\"previous\":{\"nullable\":true,\"type\":\"string\"},\"results\":{\"items\":{\"properties\":{\"agency\":{\"properties\":{\"abbrev\":{\"description\":\"Agency abbreviation\",\"type\":\"string\"},\"administrator\":{\"description\":\"Agency administrator\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"description\":{\"description\":\"Agency description\",\"nullable\":true,\"type\":\"string\"},\"founding_year\":{\"description\":\"Year agency was founded\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Agency ID\",\"type\":\"integer\"},\"logo_url\":{\"description\":\"URL to agency logo\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the agency\",\"type\":\"string\"},\"type\":{\"description\":\"Type of agency\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this agency\",\"type\":\"string\"}},\"type\":\"object\"},\"capability\":{\"description\":\"Spacecraft capability\",\"type\":\"string\"},\"crew_capacity\":{\"description\":\"Crew capacity\",\"nullable\":true,\"type\":\"integer\"},\"details\":{\"description\":\"Detailed information\",\"type\":\"string\"},\"diameter\":{\"description\":\"Diameter in meters\",\"nullable\":true,\"type\":\"number\"},\"height\":{\"description\":\"Height in meters\",\"nullable\":true,\"type\":\"number\"},\"history\":{\"description\":\"Historical information\",\"type\":\"string\"},\"human_rated\":{\"description\":\"Whether the spacecraft is human-rated\",\"type\":\"boolean\"},\"id\":{\"description\":\"Spacecraft configuration ID\",\"type\":\"integer\"},\"image_url\":{\"description\":\"URL to spacecraft image\",\"nullable\":true,\"type\":\"string\"},\"in_use\":{\"description\":\"Whether the spacecraft is currently in use\",\"type\":\"boolean\"},\"maiden_flight\":{\"description\":\"Date of maiden flight\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the spacecraft\",\"type\":\"string\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this configuration\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"429\":{\"description\":\"Rate limit exceeded\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/config/spacecraft","segments":[{"lit":"config"},{"lit":"spacecraft"}],"select":{"exist":["limit","offset","search","status"]},"transform":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /config/spacecraft/{id}","json":"{\"operationId\":\"getSpacecraftConfigById\",\"parameters\":[{\"description\":\"ID of the spacecraft configuration\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"agency\":{\"properties\":{\"abbrev\":{\"description\":\"Agency abbreviation\",\"type\":\"string\"},\"administrator\":{\"description\":\"Agency administrator\",\"nullable\":true,\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"description\":{\"description\":\"Agency description\",\"nullable\":true,\"type\":\"string\"},\"founding_year\":{\"description\":\"Year agency was founded\",\"nullable\":true,\"type\":\"string\"},\"id\":{\"description\":\"Agency ID\",\"type\":\"integer\"},\"logo_url\":{\"description\":\"URL to agency logo\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the agency\",\"type\":\"string\"},\"type\":{\"description\":\"Type of agency\",\"type\":\"string\"},\"url\":{\"description\":\"API URL for this agency\",\"type\":\"string\"}},\"type\":\"object\"},\"capability\":{\"description\":\"Spacecraft capability\",\"type\":\"string\"},\"crew_capacity\":{\"description\":\"Crew capacity\",\"nullable\":true,\"type\":\"integer\"},\"details\":{\"description\":\"Detailed information\",\"type\":\"string\"},\"diameter\":{\"description\":\"Diameter in meters\",\"nullable\":true,\"type\":\"number\"},\"height\":{\"description\":\"Height in meters\",\"nullable\":true,\"type\":\"number\"},\"history\":{\"description\":\"Historical information\",\"type\":\"string\"},\"human_rated\":{\"description\":\"Whether the spacecraft is human-rated\",\"type\":\"boolean\"},\"id\":{\"description\":\"Spacecraft configuration ID\",\"type\":\"integer\"},\"image_url\":{\"description\":\"URL to spacecraft image\",\"nullable\":true,\"type\":\"string\"},\"in_use\":{\"description\":\"Whether the spacecraft is currently in use\",\"type\":\"boolean\"},\"maiden_flight\":{\"description\":\"Date of maiden flight\",\"format\":\"date\",\"nullable\":true,\"type\":\"string\"},\"name\":{\"description\":\"Name of the spacecraft\",\"type\":\"string\"},\"type\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"}},\"type\":\"object\"},\"url\":{\"description\":\"API URL for this configuration\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Spacecraft configuration not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/config/spacecraft/{id}","segments":[{"lit":"config"},{"lit":"spacecraft"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"spacecraft","name__orig":"spacecraft","Name":"Spacecraft","name_":"spacecraft","name-":"spacecraft","NAME":"SPACECRAFT","index$":14}, {"active":true,"entity":"spacecraft","key$":"BasicSpacecraftFlow","kind":"basic","name":"BasicSpacecraftFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"spacecraft_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"spacecraft_ref01","srcdatavar":"spacecraft_ref01_data","suffix":"_dt0"},"match":{"id":"spacecraft01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-spacecraft_ref01"}}],"index$":1}]}, 'Spacecraft')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let spacecraft_ref01_data = Object.values(setup.data.existing.spacecraft)[0] as any

    // LIST
    const spacecraft_ref01_ent = client.Spacecraft()
    const spacecraft_ref01_match: any = {}

    const spacecraft_ref01_list = (await spacecraft_ref01_ent.list(spacecraft_ref01_match)).map((e: any) => e.data())


    // LOAD
    const spacecraft_ref01_match_dt0: any = {}
    spacecraft_ref01_match_dt0.id = spacecraft_ref01_data.id
    const spacecraft_ref01_data_dt0 = (await spacecraft_ref01_ent.load(spacecraft_ref01_match_dt0)).data()
    assert(spacecraft_ref01_data_dt0.id === spacecraft_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/spacecraft/SpacecraftTestData.json')

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
    ['spacecraft01','spacecraft02','spacecraft03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_SPACECRAFT_ENTID']
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
  
