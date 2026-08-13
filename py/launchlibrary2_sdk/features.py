# LaunchLibrary2 SDK feature factory

from launchlibrary2_sdk.feature.base_feature import LaunchLibrary2BaseFeature
from launchlibrary2_sdk.feature.test_feature import LaunchLibrary2TestFeature


def _make_feature(name):
    features = {
        "base": lambda: LaunchLibrary2BaseFeature(),
        "test": lambda: LaunchLibrary2TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
