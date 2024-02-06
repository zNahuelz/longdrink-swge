<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    //TODO: A modificar segun reglas del negocio. (Inscripcion -> Registro de alumno | Contratación -> Registro Profesor.)

    public function register(Request $request)
    {
        $request->validate([
            'nombre_usuario' => ['required','max:15',Rule::unique('usuarios','nombre_usuario')],
            'password' => ['required','min:5','max:20'],
            'email' => ['required','max:80','email'],
            'cod_rol' => ['required']
        ]);

        $usuario = Usuario::create([
            'nombre_usuario' => $request->nombre_usuario,
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'activo' => true,
            'cod_rol' => $request->cod_rol
        ]);

        $token = Auth::guard('api')->login($usuario);

        return response()->json([
            'estado' => 'OK',
            'mensaje' => 'Usuario registrado con exito',
            'usuario' => $usuario,
            'auth' => [
                'token' => $token,
                'type' => 'Bearer'
            ]
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required','string','email'],
            'password' => ['required','string']
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::guard('api')->attempt($credentials);
        if(!$token)
        {
            return response()->json([
                'estado' => 'ERROR',
                'mensaje' => 'Intento de inicio de sesión fallido.'
            ],401);
        }

        $usuario = Auth::guard('api')->user();
        return response()->json([
            'estado' => 'OK',
            'auth' => [
                'token' => $token,
                'type' => 'Bearer'
            ]
        ]);
    }

    //Mediante el token recibido del front podemos manejar los permisos con varios middlewares.
    public function profile(Request $request)
    {
        $user = auth()->user();
        if(!$user)
        {
            return response()->json([
                'mensaje' => 'Error! Token expirado o invalido.'
            ],401);
        }

        $rol = $user->rol->setHidden(['cod_rol','created_at','updated_at']);
        return response()->json($user);
    }

}
