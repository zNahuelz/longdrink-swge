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
            'contrasena' => ['required','min:5','max:20'],
            'email' => ['required','max:80','regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/'],
            'cod_rol' => ['required']
        ]);

        $usuario = Usuario::create([
            'nombre_usuario' => $request->nombre_usuario,
            'contrasena' => Hash::make($request->contrasena),
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
}
