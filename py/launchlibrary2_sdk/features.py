# LaunchLibrary2 SDK feature factory

from launchlibrary2_sdk.feature.base_feature import LaunchLibrary2BaseFeature
from launchlibrary2_sdk.feature.ratelimit_feature import LaunchLibrary2RatelimitFeature
from launchlibrary2_sdk.feature.retry_feature import LaunchLibrary2RetryFeature
from launchlibrary2_sdk.feature.test_feature import LaunchLibrary2TestFeature
from launchlibrary2_sdk.feature.timeout_feature import LaunchLibrary2TimeoutFeature


_FEATURES = {
    "base": lambda: LaunchLibrary2BaseFeature(),
    "ratelimit": lambda: LaunchLibrary2RatelimitFeature(),
    "retry": lambda: LaunchLibrary2RetryFeature(),
    "test": lambda: LaunchLibrary2TestFeature(),
    "timeout": lambda: LaunchLibrary2TimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
