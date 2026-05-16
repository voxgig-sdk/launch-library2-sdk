<?php
declare(strict_types=1);

// LaunchLibrary2 SDK utility: result_body

class LaunchLibrary2ResultBody
{
    public static function call(LaunchLibrary2Context $ctx): ?LaunchLibrary2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
