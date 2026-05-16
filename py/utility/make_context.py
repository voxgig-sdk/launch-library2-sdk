# LaunchLibrary2 SDK utility: make_context

from core.context import LaunchLibrary2Context


def make_context_util(ctxmap, basectx):
    return LaunchLibrary2Context(ctxmap, basectx)
