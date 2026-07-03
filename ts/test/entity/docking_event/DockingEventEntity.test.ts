
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { LaunchLibrary2SDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('DockingEventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCHLIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCHLIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.DockingEvent()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY__TEST_LIVE
    for (const op of ['list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'docking_event.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LAUNCH_LIBRARY__TEST_DOCKING_EVENT_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let docking_event_ref01_data = Object.values(setup.data.existing.docking_event)[0] as any

    // LIST
    const docking_event_ref01_ent = client.DockingEvent()
    const docking_event_ref01_match: any = {}

    const docking_event_ref01_list = await docking_event_ref01_ent.list(docking_event_ref01_match)


    // LOAD
    const docking_event_ref01_match_dt0: any = {}
    docking_event_ref01_match_dt0.id = docking_event_ref01_data.id
    const docking_event_ref01_data_dt0 = await docking_event_ref01_ent.load(docking_event_ref01_match_dt0)
    assert(docking_event_ref01_data_dt0.id === docking_event_ref01_data.id)


  })
})



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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['LAUNCH_LIBRARY__TEST_DOCKING_EVENT_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LAUNCH_LIBRARY__TEST_DOCKING_EVENT_ENTID': idmap,
    'LAUNCH_LIBRARY__TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY__TEST_EXPLAIN': 'FALSE',
    'LAUNCH_LIBRARY__APIKEY': 'NONE',
  })

  idmap = env['LAUNCH_LIBRARY__TEST_DOCKING_EVENT_ENTID']

  const live = 'TRUE' === env.LAUNCH_LIBRARY__TEST_LIVE

  if (live) {
    client = new LaunchLibrary2SDK(merge([
      {
        apikey: env.LAUNCH_LIBRARY__APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LAUNCH_LIBRARY__TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
