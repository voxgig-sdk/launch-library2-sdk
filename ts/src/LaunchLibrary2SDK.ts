// LaunchLibrary2 Ts SDK

import { AgencyEntity } from './entity/AgencyEntity'
import { AstronautEntity } from './entity/AstronautEntity'
import { DockingEntity } from './entity/DockingEntity'
import { DockingEventEntity } from './entity/DockingEventEntity'
import { EventEntity } from './entity/EventEntity'
import { ExpeditionEntity } from './entity/ExpeditionEntity'
import { FirstStageEntity } from './entity/FirstStageEntity'
import { LaunchEntity } from './entity/LaunchEntity'
import { LaunchVehicleEntity } from './entity/LaunchVehicleEntity'
import { LauncherEntity } from './entity/LauncherEntity'
import { LocationEntity } from './entity/LocationEntity'
import { PadEntity } from './entity/PadEntity'
import { ReusableFirstStageEntity } from './entity/ReusableFirstStageEntity'
import { SpaceStationEntity } from './entity/SpaceStationEntity'
import { SpacecraftEntity } from './entity/SpacecraftEntity'

export type * from './LaunchLibrary2Types'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { LaunchLibrary2EntityBase } from './LaunchLibrary2EntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class LaunchLibrary2SDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _agency?: AgencyEntity

  // Idiomatic facade: `client.agency.list()` / `client.agency.load({ id })`.
  get agency(): AgencyEntity {
    return (this._agency ??= new AgencyEntity(this, undefined))
  }

  /** @deprecated Use `client.agency` instead. */
  Agency(data?: any) {
    const self = this
    return new AgencyEntity(self,data)
  }


  _astronaut?: AstronautEntity

  // Idiomatic facade: `client.astronaut.list()` / `client.astronaut.load({ id })`.
  get astronaut(): AstronautEntity {
    return (this._astronaut ??= new AstronautEntity(this, undefined))
  }

  /** @deprecated Use `client.astronaut` instead. */
  Astronaut(data?: any) {
    const self = this
    return new AstronautEntity(self,data)
  }


  _docking?: DockingEntity

  // Idiomatic facade: `client.docking.list()` / `client.docking.load({ id })`.
  get docking(): DockingEntity {
    return (this._docking ??= new DockingEntity(this, undefined))
  }

  /** @deprecated Use `client.docking` instead. */
  Docking(data?: any) {
    const self = this
    return new DockingEntity(self,data)
  }


  _docking_event?: DockingEventEntity

  // Idiomatic facade: `client.docking_event.list()` / `client.docking_event.load({ id })`.
  get docking_event(): DockingEventEntity {
    return (this._docking_event ??= new DockingEventEntity(this, undefined))
  }

  /** @deprecated Use `client.docking_event` instead. */
  DockingEvent(data?: any) {
    const self = this
    return new DockingEventEntity(self,data)
  }


  _event?: EventEntity

  // Idiomatic facade: `client.event.list()` / `client.event.load({ id })`.
  get event(): EventEntity {
    return (this._event ??= new EventEntity(this, undefined))
  }

  /** @deprecated Use `client.event` instead. */
  Event(data?: any) {
    const self = this
    return new EventEntity(self,data)
  }


  _expedition?: ExpeditionEntity

  // Idiomatic facade: `client.expedition.list()` / `client.expedition.load({ id })`.
  get expedition(): ExpeditionEntity {
    return (this._expedition ??= new ExpeditionEntity(this, undefined))
  }

  /** @deprecated Use `client.expedition` instead. */
  Expedition(data?: any) {
    const self = this
    return new ExpeditionEntity(self,data)
  }


  _first_stage?: FirstStageEntity

  // Idiomatic facade: `client.first_stage.list()` / `client.first_stage.load({ id })`.
  get first_stage(): FirstStageEntity {
    return (this._first_stage ??= new FirstStageEntity(this, undefined))
  }

  /** @deprecated Use `client.first_stage` instead. */
  FirstStage(data?: any) {
    const self = this
    return new FirstStageEntity(self,data)
  }


  _launch?: LaunchEntity

  // Idiomatic facade: `client.launch.list()` / `client.launch.load({ id })`.
  get launch(): LaunchEntity {
    return (this._launch ??= new LaunchEntity(this, undefined))
  }

  /** @deprecated Use `client.launch` instead. */
  Launch(data?: any) {
    const self = this
    return new LaunchEntity(self,data)
  }


  _launch_vehicle?: LaunchVehicleEntity

  // Idiomatic facade: `client.launch_vehicle.list()` / `client.launch_vehicle.load({ id })`.
  get launch_vehicle(): LaunchVehicleEntity {
    return (this._launch_vehicle ??= new LaunchVehicleEntity(this, undefined))
  }

  /** @deprecated Use `client.launch_vehicle` instead. */
  LaunchVehicle(data?: any) {
    const self = this
    return new LaunchVehicleEntity(self,data)
  }


  _launcher?: LauncherEntity

  // Idiomatic facade: `client.launcher.list()` / `client.launcher.load({ id })`.
  get launcher(): LauncherEntity {
    return (this._launcher ??= new LauncherEntity(this, undefined))
  }

  /** @deprecated Use `client.launcher` instead. */
  Launcher(data?: any) {
    const self = this
    return new LauncherEntity(self,data)
  }


  _location?: LocationEntity

  // Idiomatic facade: `client.location.list()` / `client.location.load({ id })`.
  get location(): LocationEntity {
    return (this._location ??= new LocationEntity(this, undefined))
  }

  /** @deprecated Use `client.location` instead. */
  Location(data?: any) {
    const self = this
    return new LocationEntity(self,data)
  }


  _pad?: PadEntity

  // Idiomatic facade: `client.pad.list()` / `client.pad.load({ id })`.
  get pad(): PadEntity {
    return (this._pad ??= new PadEntity(this, undefined))
  }

  /** @deprecated Use `client.pad` instead. */
  Pad(data?: any) {
    const self = this
    return new PadEntity(self,data)
  }


  _reusable_first_stage?: ReusableFirstStageEntity

  // Idiomatic facade: `client.reusable_first_stage.list()` / `client.reusable_first_stage.load({ id })`.
  get reusable_first_stage(): ReusableFirstStageEntity {
    return (this._reusable_first_stage ??= new ReusableFirstStageEntity(this, undefined))
  }

  /** @deprecated Use `client.reusable_first_stage` instead. */
  ReusableFirstStage(data?: any) {
    const self = this
    return new ReusableFirstStageEntity(self,data)
  }


  _space_station?: SpaceStationEntity

  // Idiomatic facade: `client.space_station.list()` / `client.space_station.load({ id })`.
  get space_station(): SpaceStationEntity {
    return (this._space_station ??= new SpaceStationEntity(this, undefined))
  }

  /** @deprecated Use `client.space_station` instead. */
  SpaceStation(data?: any) {
    const self = this
    return new SpaceStationEntity(self,data)
  }


  _spacecraft?: SpacecraftEntity

  // Idiomatic facade: `client.spacecraft.list()` / `client.spacecraft.load({ id })`.
  get spacecraft(): SpacecraftEntity {
    return (this._spacecraft ??= new SpacecraftEntity(this, undefined))
  }

  /** @deprecated Use `client.spacecraft` instead. */
  Spacecraft(data?: any) {
    const self = this
    return new SpacecraftEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new LaunchLibrary2SDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return LaunchLibrary2SDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'LaunchLibrary2' }
  }

  toString() {
    return 'LaunchLibrary2 ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = LaunchLibrary2SDK


export {
  stdutil,

  BaseFeature,
  LaunchLibrary2EntityBase,

  LaunchLibrary2SDK,
  SDK,
}


