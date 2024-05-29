<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): Request
    {
        $request->headers->set('Accept', 'application/json');

        $resp = [
            'success' => false,
            'message' => 'Unauthenticated',
            'errorCode' => 401,
            'errorDetails' => []
        ];


        if(!empty($errorMessages)){
            $resp['data'] = $errorMessages;
        }
        abort(response($resp, 401));
    }
}
