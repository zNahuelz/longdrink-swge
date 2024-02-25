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

        $user = Usuario::create([
            'nombre_usuario' => $request->nombre_usuario,
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'activo' => true,
            'cod_rol' => $request->cod_rol
        ]);

        $token = Auth::guard('api')->login($user);

        return response()->json([
            'status' => 'OK',
            'message' => 'Usuario registrado con exito',
            'user' => $user,
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
                'status' => 'ERROR',
                'message' => 'Intento de inicio de sesión fallido.'
            ],401);
        }

        $user = Auth::guard('api')->user();
        return response()->json([
            'status' => 'OK',
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
                'message' => 'Error! Token expirado o invalido.'
            ],401);
        }

        $rol = $user->rol->setHidden(['cod_rol','created_at','updated_at']);
        return response()->json($user);
    }

    //TODO: En front -> Comparar updated_at con fecha de emision del token. Si el updated at es reciente a emision cerrar sesion.
    public function updateCredentials(Request $request)
    {
        $request->validate([
            'oldPassword' => ['required','min:5','max:20'],
            'newPassword' => ['required','min:5','max:20'],
            'email' => ['required','email',Rule::unique('usuarios','email')->ignore(Auth::user()->cod_usuario,'cod_usuario')]
        ],
        [
            'email.unique' => 'Ups! El e-mail ingresado ya se encuentra en uso.',
        ]);

        $user = Usuario::find(Auth::user()->cod_usuario);
        if($user == null)
        {
            return response()->json([
                'message' => 'Error! Usuario no encontrado.'
            ],404);
        }
        else
        {
            if(Hash::check($request->oldPassword,$user->password))
            {
                $user->update([
                    'password' => Hash::make($request->newPassword),
                    'email' => $request->email
                ]);
                return response()->json([
                    'message' => 'Credenciales actualizadas con exito.',
                    'usuario' => $user
                ],200);
            }
            else
            {
                return response()->json([
                    'message' => 'Error! Imposible actualizar contraseña, credenciales incorrectas.'
                ],400);
            }
        }
    }

}
