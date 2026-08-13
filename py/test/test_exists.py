# LaunchLibrary2 SDK exists test

import pytest
from launchlibrary2_sdk import LaunchLibrary2SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = LaunchLibrary2SDK.test(None, None)
        assert testsdk is not None
