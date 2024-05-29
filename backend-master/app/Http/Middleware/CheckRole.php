<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (! $user || ! in_array($user->role, $roles)) {
            $request->headers->set('Accept', 'application/json');

            $resp = [
                'success' => false,
                'message' => 'Not Allowed Role',
                'errorCode' => 401,
                'errorDetails' => []
            ];


            if(!empty($errorMessages)){
                $resp['data'] = $errorMessages;
            }
            return response()->json($resp);
        }

        return $next($request);
    }
}
