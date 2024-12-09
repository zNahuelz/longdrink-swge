<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ResourceMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check())
        {
            $userRole = Auth::user()->role->name;
            if($userRole == 'ADMINISTRADOR' || $userRole == 'DOCENTE' || $userRole == 'ALUMNO'){
                //$request->headers->set('Accept','application/json');
                return $next($request);
            }
        }
        return response()->json([
            'message' => 'Permisos insuficientes para realizar acción o archivo eliminado.'
        ],401);
    }
}
