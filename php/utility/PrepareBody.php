<?php
declare(strict_types=1);

// LaunchLibrary2 SDK utility: prepare_body

class LaunchLibrary2PrepareBody
{
    public static function call(LaunchLibrary2Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
