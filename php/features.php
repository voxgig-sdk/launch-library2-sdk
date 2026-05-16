<?php
declare(strict_types=1);

// LaunchLibrary2 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class LaunchLibrary2Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new LaunchLibrary2BaseFeature();
            case "test":
                return new LaunchLibrary2TestFeature();
            default:
                return new LaunchLibrary2BaseFeature();
        }
    }
}
