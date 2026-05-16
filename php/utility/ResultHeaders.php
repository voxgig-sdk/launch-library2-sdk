<?php
declare(strict_types=1);

// LaunchLibrary2 SDK utility: result_headers

class LaunchLibrary2ResultHeaders
{
    public static function call(LaunchLibrary2Context $ctx): ?LaunchLibrary2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
