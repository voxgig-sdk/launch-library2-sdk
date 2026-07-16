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

        # Add features in the resolved order (make_options puts an explicit
        # list order first, else defaults to test-first). Ordering matters: the
        # `test` feature installs the base mock transport and the transport
        # features (retry/cache/netsim/proxy/ratelimit) wrap whatever is
        # current, so `test` must be added before them to sit at the base.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            featureorder = vs.getpath(self.options, "__derived__.featureorder")
            if isinstance(featureorder, list):
                for fname in featureorder:
                    fopts = helpers.to_map(feature_opts.get(fname))
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


    def Agency(self, data=None) -> "AgencyEntity":
        """Entity factory: client.Agency().list() / client.Agency().load({"id": ...})."""
        from entity.agency_entity import AgencyEntity
        return AgencyEntity(self, data)


    def Astronaut(self, data=None) -> "AstronautEntity":
        """Entity factory: client.Astronaut().list() / client.Astronaut().load({"id": ...})."""
        from entity.astronaut_entity import AstronautEntity
        return AstronautEntity(self, data)


    def Docking(self, data=None) -> "DockingEntity":
        """Entity factory: client.Docking().list() / client.Docking().load({"id": ...})."""
        from entity.docking_entity import DockingEntity
        return DockingEntity(self, data)


    def DockingEvent(self, data=None) -> "DockingEventEntity":
        """Entity factory: client.DockingEvent().list() / client.DockingEvent().load({"id": ...})."""
        from entity.docking_event_entity import DockingEventEntity
        return DockingEventEntity(self, data)


    def Event(self, data=None) -> "EventEntity":
        """Entity factory: client.Event().list() / client.Event().load({"id": ...})."""
        from entity.event_entity import EventEntity
        return EventEntity(self, data)


    def Expedition(self, data=None) -> "ExpeditionEntity":
        """Entity factory: client.Expedition().list() / client.Expedition().load({"id": ...})."""
        from entity.expedition_entity import ExpeditionEntity
        return ExpeditionEntity(self, data)


    def FirstStage(self, data=None) -> "FirstStageEntity":
        """Entity factory: client.FirstStage().list() / client.FirstStage().load({"id": ...})."""
        from entity.first_stage_entity import FirstStageEntity
        return FirstStageEntity(self, data)


    def Launch(self, data=None) -> "LaunchEntity":
        """Entity factory: client.Launch().list() / client.Launch().load({"id": ...})."""
        from entity.launch_entity import LaunchEntity
        return LaunchEntity(self, data)


    def LaunchVehicle(self, data=None) -> "LaunchVehicleEntity":
        """Entity factory: client.LaunchVehicle().list() / client.LaunchVehicle().load({"id": ...})."""
        from entity.launch_vehicle_entity import LaunchVehicleEntity
        return LaunchVehicleEntity(self, data)


    def Launcher(self, data=None) -> "LauncherEntity":
        """Entity factory: client.Launcher().list() / client.Launcher().load({"id": ...})."""
        from entity.launcher_entity import LauncherEntity
        return LauncherEntity(self, data)


    def Location(self, data=None) -> "LocationEntity":
        """Entity factory: client.Location().list() / client.Location().load({"id": ...})."""
        from entity.location_entity import LocationEntity
        return LocationEntity(self, data)


    def Pad(self, data=None) -> "PadEntity":
        """Entity factory: client.Pad().list() / client.Pad().load({"id": ...})."""
        from entity.pad_entity import PadEntity
        return PadEntity(self, data)


    def ReusableFirstStage(self, data=None) -> "ReusableFirstStageEntity":
        """Entity factory: client.ReusableFirstStage().list() / client.ReusableFirstStage().load({"id": ...})."""
        from entity.reusable_first_stage_entity import ReusableFirstStageEntity
        return ReusableFirstStageEntity(self, data)


    def SpaceStation(self, data=None) -> "SpaceStationEntity":
        """Entity factory: client.SpaceStation().list() / client.SpaceStation().load({"id": ...})."""
        from entity.space_station_entity import SpaceStationEntity
        return SpaceStationEntity(self, data)


    def Spacecraft(self, data=None) -> "SpacecraftEntity":
        """Entity factory: client.Spacecraft().list() / client.Spacecraft().load({"id": ...})."""
        from entity.spacecraft_entity import SpacecraftEntity
        return SpacecraftEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "LaunchLibrary2SDK":
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


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.agency_entity import AgencyEntity
    from entity.astronaut_entity import AstronautEntity
    from entity.docking_entity import DockingEntity
    from entity.docking_event_entity import DockingEventEntity
    from entity.event_entity import EventEntity
    from entity.expedition_entity import ExpeditionEntity
    from entity.first_stage_entity import FirstStageEntity
    from entity.launch_entity import LaunchEntity
    from entity.launch_vehicle_entity import LaunchVehicleEntity
    from entity.launcher_entity import LauncherEntity
    from entity.location_entity import LocationEntity
    from entity.pad_entity import PadEntity
    from entity.reusable_first_stage_entity import ReusableFirstStageEntity
    from entity.space_station_entity import SpaceStationEntity
    from entity.spacecraft_entity import SpacecraftEntity
