<?php
declare(strict_types=1);

// LaunchLibrary2 SDK base feature

class LaunchLibrary2BaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(LaunchLibrary2Context $ctx, array $options): void {}
    public function PostConstruct(LaunchLibrary2Context $ctx): void {}
    public function PostConstructEntity(LaunchLibrary2Context $ctx): void {}
    public function SetData(LaunchLibrary2Context $ctx): void {}
    public function GetData(LaunchLibrary2Context $ctx): void {}
    public function GetMatch(LaunchLibrary2Context $ctx): void {}
    public function SetMatch(LaunchLibrary2Context $ctx): void {}
    public function PrePoint(LaunchLibrary2Context $ctx): void {}
    public function PreSpec(LaunchLibrary2Context $ctx): void {}
    public function PreRequest(LaunchLibrary2Context $ctx): void {}
    public function PreResponse(LaunchLibrary2Context $ctx): void {}
    public function PreResult(LaunchLibrary2Context $ctx): void {}
    public function PreDone(LaunchLibrary2Context $ctx): void {}
    public function PreUnexpected(LaunchLibrary2Context $ctx): void {}
}
