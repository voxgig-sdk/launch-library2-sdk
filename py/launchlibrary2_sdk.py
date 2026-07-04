# LaunchLibrary2 SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import LaunchLibrary2Utility
from core.spec import LaunchLibrary2Spec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import LaunchLibrary2BaseFeature
from features import _make_feature


class LaunchLibrary2SDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = LaunchLibrary2Utility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return LaunchLibrary2Utility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = LaunchLibrary2Spec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    @property
    def agency(self):
        """Idiomatic facade: client.agency.list() / client.agency.load({"id": ...})."""
        from entity.agency_entity import AgencyEntity
        cached = getattr(self, "_agency", None)
        if cached is None:
            cached = AgencyEntity(self, None)
            self._agency = cached
        return cached

    def Agency(self, data=None):
        # Deprecated: use client.agency instead.
        from entity.agency_entity import AgencyEntity
        return AgencyEntity(self, data)


    @property
    def astronaut(self):
        """Idiomatic facade: client.astronaut.list() / client.astronaut.load({"id": ...})."""
        from entity.astronaut_entity import AstronautEntity
        cached = getattr(self, "_astronaut", None)
        if cached is None:
            cached = AstronautEntity(self, None)
            self._astronaut = cached
        return cached

    def Astronaut(self, data=None):
        # Deprecated: use client.astronaut instead.
        from entity.astronaut_entity import AstronautEntity
        return AstronautEntity(self, data)


    @property
    def docking(self):
        """Idiomatic facade: client.docking.list() / client.docking.load({"id": ...})."""
        from entity.docking_entity import DockingEntity
        cached = getattr(self, "_docking", None)
        if cached is None:
            cached = DockingEntity(self, None)
            self._docking = cached
        return cached

    def Docking(self, data=None):
        # Deprecated: use client.docking instead.
        from entity.docking_entity import DockingEntity
        return DockingEntity(self, data)


    @property
    def docking_event(self):
        """Idiomatic facade: client.docking_event.list() / client.docking_event.load({"id": ...})."""
        from entity.docking_event_entity import DockingEventEntity
        cached = getattr(self, "_docking_event", None)
        if cached is None:
            cached = DockingEventEntity(self, None)
            self._docking_event = cached
        return cached

    def DockingEvent(self, data=None):
        # Deprecated: use client.docking_event instead.
        from entity.docking_event_entity import DockingEventEntity
        return DockingEventEntity(self, data)


    @property
    def event(self):
        """Idiomatic facade: client.event.list() / client.event.load({"id": ...})."""
        from entity.event_entity import EventEntity
        cached = getattr(self, "_event", None)
        if cached is None:
            cached = EventEntity(self, None)
            self._event = cached
        return cached

    def Event(self, data=None):
        # Deprecated: use client.event instead.
        from entity.event_entity import EventEntity
        return EventEntity(self, data)


    @property
    def expedition(self):
        """Idiomatic facade: client.expedition.list() / client.expedition.load({"id": ...})."""
        from entity.expedition_entity import ExpeditionEntity
        cached = getattr(self, "_expedition", None)
        if cached is None:
            cached = ExpeditionEntity(self, None)
            self._expedition = cached
        return cached

    def Expedition(self, data=None):
        # Deprecated: use client.expedition instead.
        from entity.expedition_entity import ExpeditionEntity
        return ExpeditionEntity(self, data)


    @property
    def first_stage(self):
        """Idiomatic facade: client.first_stage.list() / client.first_stage.load({"id": ...})."""
        from entity.first_stage_entity import FirstStageEntity
        cached = getattr(self, "_first_stage", None)
        if cached is None:
            cached = FirstStageEntity(self, None)
            self._first_stage = cached
        return cached

    def FirstStage(self, data=None):
        # Deprecated: use client.first_stage instead.
        from entity.first_stage_entity import FirstStageEntity
        return FirstStageEntity(self, data)


    @property
    def launch(self):
        """Idiomatic facade: client.launch.list() / client.launch.load({"id": ...})."""
        from entity.launch_entity import LaunchEntity
        cached = getattr(self, "_launch", None)
        if cached is None:
            cached = LaunchEntity(self, None)
            self._launch = cached
        return cached

    def Launch(self, data=None):
        # Deprecated: use client.launch instead.
        from entity.launch_entity import LaunchEntity
        return LaunchEntity(self, data)


    @property
    def launch_vehicle(self):
        """Idiomatic facade: client.launch_vehicle.list() / client.launch_vehicle.load({"id": ...})."""
        from entity.launch_vehicle_entity import LaunchVehicleEntity
        cached = getattr(self, "_launch_vehicle", None)
        if cached is None:
            cached = LaunchVehicleEntity(self, None)
            self._launch_vehicle = cached
        return cached

    def LaunchVehicle(self, data=None):
        # Deprecated: use client.launch_vehicle instead.
        from entity.launch_vehicle_entity import LaunchVehicleEntity
        return LaunchVehicleEntity(self, data)


    @property
    def launcher(self):
        """Idiomatic facade: client.launcher.list() / client.launcher.load({"id": ...})."""
        from entity.launcher_entity import LauncherEntity
        cached = getattr(self, "_launcher", None)
        if cached is None:
            cached = LauncherEntity(self, None)
            self._launcher = cached
        return cached

    def Launcher(self, data=None):
        # Deprecated: use client.launcher instead.
        from entity.launcher_entity import LauncherEntity
        return LauncherEntity(self, data)


    @property
    def location(self):
        """Idiomatic facade: client.location.list() / client.location.load({"id": ...})."""
        from entity.location_entity import LocationEntity
        cached = getattr(self, "_location", None)
        if cached is None:
            cached = LocationEntity(self, None)
            self._location = cached
        return cached

    def Location(self, data=None):
        # Deprecated: use client.location instead.
        from entity.location_entity import LocationEntity
        return LocationEntity(self, data)


    @property
    def pad(self):
        """Idiomatic facade: client.pad.list() / client.pad.load({"id": ...})."""
        from entity.pad_entity import PadEntity
        cached = getattr(self, "_pad", None)
        if cached is None:
            cached = PadEntity(self, None)
            self._pad = cached
        return cached

    def Pad(self, data=None):
        # Deprecated: use client.pad instead.
        from entity.pad_entity import PadEntity
        return PadEntity(self, data)


    @property
    def reusable_first_stage(self):
        """Idiomatic facade: client.reusable_first_stage.list() / client.reusable_first_stage.load({"id": ...})."""
        from entity.reusable_first_stage_entity import ReusableFirstStageEntity
        cached = getattr(self, "_reusable_first_stage", None)
        if cached is None:
            cached = ReusableFirstStageEntity(self, None)
            self._reusable_first_stage = cached
        return cached

    def ReusableFirstStage(self, data=None):
        # Deprecated: use client.reusable_first_stage instead.
        from entity.reusable_first_stage_entity import ReusableFirstStageEntity
        return ReusableFirstStageEntity(self, data)


    @property
    def space_station(self):
        """Idiomatic facade: client.space_station.list() / client.space_station.load({"id": ...})."""
        from entity.space_station_entity import SpaceStationEntity
        cached = getattr(self, "_space_station", None)
        if cached is None:
            cached = SpaceStationEntity(self, None)
            self._space_station = cached
        return cached

    def SpaceStation(self, data=None):
        # Deprecated: use client.space_station instead.
        from entity.space_station_entity import SpaceStationEntity
        return SpaceStationEntity(self, data)


    @property
    def spacecraft(self):
        """Idiomatic facade: client.spacecraft.list() / client.spacecraft.load({"id": ...})."""
        from entity.spacecraft_entity import SpacecraftEntity
        cached = getattr(self, "_spacecraft", None)
        if cached is None:
            cached = SpacecraftEntity(self, None)
            self._spacecraft = cached
        return cached

    def Spacecraft(self, data=None):
        # Deprecated: use client.spacecraft instead.
        from entity.spacecraft_entity import SpacecraftEntity
        return SpacecraftEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk
