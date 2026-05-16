<?php
declare(strict_types=1);

// LaunchLibrary2 SDK utility: prepare_headers

class LaunchLibrary2PrepareHeaders
{
    public static function call(LaunchLibrary2Context $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
