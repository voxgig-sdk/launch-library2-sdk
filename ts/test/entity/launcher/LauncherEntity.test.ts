
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


describe('LauncherEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LAUNCHLIBRARY2_TEST_LIVE=TRUE.
  afterEach(liveDelay('LAUNCHLIBRARY2_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = LaunchLibrary2SDK.test()
    const ent = testsdk.Launcher()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LAUNCH_LIBRARY__TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'launcher.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LAUNCH_LIBRARY__TEST_LAUNCHER_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let launcher_ref01_data = Object.values(setup.data.existing.launcher)[0] as any

    // LOAD
    const launcher_ref01_ent = client.Launcher()
    const launcher_ref01_match_dt0: any = {}
    launcher_ref01_match_dt0.id = launcher_ref01_data.id
    const launcher_ref01_data_dt0 = await launcher_ref01_ent.load(launcher_ref01_match_dt0)
    assert(launcher_ref01_data_dt0.id === launcher_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/launcher/LauncherTestData.json')

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
    ['launcher01','launcher02','launcher03'],
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
  const idmapEnvVal = process.env['LAUNCH_LIBRARY__TEST_LAUNCHER_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LAUNCH_LIBRARY__TEST_LAUNCHER_ENTID': idmap,
    'LAUNCH_LIBRARY__TEST_LIVE': 'FALSE',
    'LAUNCH_LIBRARY__TEST_EXPLAIN': 'FALSE',
    'LAUNCH_LIBRARY__APIKEY': 'NONE',
  })

  idmap = env['LAUNCH_LIBRARY__TEST_LAUNCHER_ENTID']

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
  
