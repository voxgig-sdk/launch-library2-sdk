<?php
declare(strict_types=1);

// LaunchLibrary2 SDK utility: feature_add

class LaunchLibrary2FeatureAdd
{
    public static function call(LaunchLibrary2Context $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
