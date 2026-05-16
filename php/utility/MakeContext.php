<?php
declare(strict_types=1);

// LaunchLibrary2 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class LaunchLibrary2MakeContext
{
    public static function call(array $ctxmap, ?LaunchLibrary2Context $basectx): LaunchLibrary2Context
    {
        return new LaunchLibrary2Context($ctxmap, $basectx);
    }
}
