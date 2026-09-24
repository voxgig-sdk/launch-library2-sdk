

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


describe('LaunchVehicleEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCH_LIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCH_LIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.LaunchVehicle()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY2_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'launch_vehicle.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"apogee":{"a":true,"h":"Apogee","n":"apogee","r":false,"sh":"Apogee in km","t":"`$INTEGER`","key$":"apogee","index$":0},"consecutive_successful_launches":{"a":true,"h":"Consecutive Successful Launches","n":"consecutive_successful_launches","r":false,"sh":"Number of consecutive successful launches","t":"`$INTEGER`","key$":"consecutive_successful_launches","index$":1},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the launcher","t":"`$STRING`","key$":"description","index$":2},"diameter":{"a":true,"h":"Diameter","n":"diameter","r":false,"sh":"Diameter in meters","t":"`$NUMBER`","key$":"diameter","index$":3},"failed_launches":{"a":true,"h":"Failed Launches","n":"failed_launches","r":false,"sh":"Number of failed launches","t":"`$INTEGER`","key$":"failed_launches","index$":4},"family":{"a":true,"h":"Family","n":"family","r":false,"sh":"Launcher family","t":"`$STRING`","key$":"family","index$":5},"full_name":{"a":true,"h":"Full Name","n":"full_name","r":false,"sh":"Full name of the launcher","t":"`$STRING`","key$":"full_name","index$":6},"gto_capacity":{"a":true,"h":"Gto Capacity","n":"gto_capacity","r":false,"sh":"GTO capacity in kg","t":"`$INTEGER`","key$":"gto_capacity","index$":7},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Configuration ID","t":"`$INTEGER`","key$":"id","index$":8},"launch_mass":{"a":true,"h":"Launch Mass","n":"launch_mass","r":false,"sh":"Launch mass in kg","t":"`$INTEGER`","key$":"launch_mass","index$":9},"length":{"a":true,"h":"Length","n":"length","r":false,"sh":"Length in meters","t":"`$NUMBER`","key$":"length","index$":10},"leo_capacity":{"a":true,"h":"Leo Capacity","n":"leo_capacity","r":false,"sh":"LEO capacity in kg","t":"`$INTEGER`","key$":"leo_capacity","index$":11},"maiden_flight":{"a":true,"fo":"date","h":"Maiden Flight","n":"maiden_flight","r":false,"sh":"Date of maiden flight","t":"`$STRING`","key$":"maiden_flight","index$":12},"manufacturer":{"a":true,"h":"Manufacturer","n":"manufacturer","r":false,"t":"`$OBJECT`","key$":"manufacturer","index$":13},"max_stage":{"a":true,"h":"Max Stage","n":"max_stage","r":false,"sh":"Maximum number of stages","t":"`$INTEGER`","key$":"max_stage","index$":14},"min_stage":{"a":true,"h":"Min Stage","n":"min_stage","r":false,"sh":"Minimum number of stages","t":"`$INTEGER`","key$":"min_stage","index$":15},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the launcher configuration","t":"`$STRING`","key$":"name","index$":16},"pending_launches":{"a":true,"h":"Pending Launches","n":"pending_launches","r":false,"sh":"Number of pending launches","t":"`$INTEGER`","key$":"pending_launches","index$":17},"successful_launches":{"a":true,"h":"Successful Launches","n":"successful_launches","r":false,"sh":"Number of successful launches","t":"`$INTEGER`","key$":"successful_launches","index$":18},"to_thrust":{"a":true,"h":"To Thrust","n":"to_thrust","r":false,"sh":"Takeoff thrust in kN","t":"`$INTEGER`","key$":"to_thrust","index$":19},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"API URL for this configuration","t":"`$STRING`","key$":"url","index$":20},"variant":{"a":true,"h":"Variant","n":"variant","r":false,"sh":"Variant of the launcher","t":"`$STRING`","key$":"variant","index$":21}},"id":{"field":"id","name":"id"},"name":"launch_vehicle","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /config/launcher","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"family","or":"family","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":10,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"manufacturer","or":"manufacturer","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":0,"k":"query","n":"offset","or":"offset","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"search","or":"search","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/config/launcher","q":{"exist":["family","limit","manufacturer","offset","search"]},"r":{},"s":[{"lit":"config"},{"lit":"launcher"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"launch_vehicle","name__orig":"launch_vehicle","Name":"LaunchVehicle","name_":"launch_vehicle","name-":"launch-vehicle","NAME":"LAUNCH_VEHICLE","index$":7}, {"active":true,"entity":"launch_vehicle","key$":"BasicLaunchVehicleFlow","kind":"basic","name":"BasicLaunchVehicleFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"launch_vehicle_ref01"}}],"index$":0}]}, 'LaunchVehicle', {"GET /config/launcher":{"protocol":"http","operationId":"getLauncherConfigs","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"key$":"count","type":"integer"},"next":{"key$":"next","nullable":true,"type":"string"},"previous":{"key$":"previous","nullable":true,"type":"string"},"results":{"items":{"properties":{"apogee":{"description":"Apogee in km","nullable":true,"type":"integer","key$":"apogee"},"consecutive_successful_launches":{"description":"Number of consecutive successful launches","type":"integer","key$":"consecutive_successful_launches"},"description":{"description":"Description of the launcher","type":"string","key$":"description"},"diameter":{"description":"Diameter in meters","nullable":true,"type":"number","key$":"diameter"},"failed_launches":{"description":"Number of failed launches","type":"integer","key$":"failed_launches"},"family":{"description":"Launcher family","type":"string","key$":"family"},"full_name":{"description":"Full name of the launcher","type":"string","key$":"full_name"},"gto_capacity":{"description":"GTO capacity in kg","nullable":true,"type":"integer","key$":"gto_capacity"},"id":{"description":"Configuration ID","type":"integer","key$":"id"},"launch_mass":{"description":"Launch mass in kg","nullable":true,"type":"integer","key$":"launch_mass"},"length":{"description":"Length in meters","nullable":true,"type":"number","key$":"length"},"leo_capacity":{"description":"LEO capacity in kg","nullable":true,"type":"integer","key$":"leo_capacity"},"maiden_flight":{"description":"Date of maiden flight","format":"date","nullable":true,"type":"string","key$":"maiden_flight"},"manufacturer":{"properties":{"abbrev":{"description":"Agency abbreviation","type":"string"},"administrator":{"description":"Agency administrator","nullable":true,"type":"string"},"country_code":{"description":"ISO country code","type":"string"},"description":{"description":"Agency description","nullable":true,"type":"string"},"founding_year":{"description":"Year agency was founded","nullable":true,"type":"string"},"id":{"description":"Agency ID","type":"integer"},"logo_url":{"description":"URL to agency logo","nullable":true,"type":"string"},"name":{"description":"Name of the agency","type":"string"},"type":{"description":"Type of agency","type":"string"},"url":{"description":"API URL for this agency","type":"string"}},"type":"object","x-ref":"#/components/schemas/Agency","key$":"manufacturer"},"max_stage":{"description":"Maximum number of stages","type":"integer","key$":"max_stage"},"min_stage":{"description":"Minimum number of stages","type":"integer","key$":"min_stage"},"name":{"description":"Name of the launcher configuration","type":"string","key$":"name"},"pending_launches":{"description":"Number of pending launches","type":"integer","key$":"pending_launches"},"successful_launches":{"description":"Number of successful launches","type":"integer","key$":"successful_launches"},"to_thrust":{"description":"Takeoff thrust in kN","nullable":true,"type":"integer","key$":"to_thrust"},"url":{"description":"API URL for this configuration","type":"string","key$":"url"},"variant":{"description":"Variant of the launcher","type":"string","key$":"variant"}},"type":"object","x-ref":"#/components/schemas/LauncherConfig","index$":0},"key$":"results","type":"array"}}}}}},"429":{"description":"Rate limit exceeded"}},"parameters":[{"name":"limit","in":"query","description":"Number of results to return per page","schema":{"type":"integer","default":10},"index$":0},{"name":"offset","in":"query","description":"The initial index from which to return the results","schema":{"type":"integer","default":0},"index$":1},{"name":"search","in":"query","description":"Search by launcher name","schema":{"type":"string"},"index$":2},{"name":"family","in":"query","description":"Filter by launcher family","schema":{"type":"string"},"index$":3},{"name":"manufacturer","in":"query","description":"Filter by manufacturer agency ID","schema":{"type":"integer"},"index$":4}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let launch_vehicle_ref01_data = Object.values(setup.data.existing.launch_vehicle)[0] as any

    // LIST
    const launch_vehicle_ref01_ent = client.LaunchVehicle()
    const launch_vehicle_ref01_match: any = {}

    const launch_vehicle_ref01_list = (await launch_vehicle_ref01_ent.list(launch_vehicle_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/launch_vehicle/LaunchVehicleTestData.json')

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
    ['launch_vehicle01','launch_vehicle02','launch_vehicle03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LAUNCH_LIBRARY2_TEST_LAUNCH_VEHICLE_ENTID': idmap,
    'LAUNCH_LIBRARY2_TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY2_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['LAUNCH_LIBRARY2_TEST_LAUNCH_VEHICLE_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY2_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LAUNCH_LIBRARY2_TEST_LAUNCH_VEHICLE_ENTID']
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
  
