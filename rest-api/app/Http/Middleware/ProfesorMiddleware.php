<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProfesorMiddleware
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
            $tipoUsuario = Auth::user()->rol->nombre;
            if($tipoUsuario == 'PROFESOR'){
                return $next($request);
            }
        }
        return response()->json([
            'status' => 'ERROR',
            'message' => 'Permisos insuficientes para realizar acción o token invalido.'
        ],401);
    }
}
