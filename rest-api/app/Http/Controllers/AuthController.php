<?php

namespace App\Http\Controllers;

use App\Models\User;
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
            'username' => ['required','max:20',Rule::unique('users','username')],
            'password' => ['required','min:5','max:20'],
            'email' => ['required','max:50','email'],
            'role_id' => ['required']
        ]);

        $user = User::create([
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'email' => $request->email,
            'role_id' => $request->role_id
        ]);

        $token = Auth::guard('api')->login($user);

        return response()->json([
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
            'username' => ['required','string','max:20'],
            'password' => ['required','string','max:20']
        ]);

        $credentials = $request->only('username', 'password');

        $token = Auth::guard('api')->attempt($credentials);
        if(!$token)
        {
            return response()->json([
                'message' => 'Intento de inicio de sesión fallido.'
            ],401);
        }

        $user = Auth::guard('api')->user();
        return response()->json([
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

        $role = $user->role->setHidden(['created_at','updated_at']);
        $user->setHidden(['role_id']);
        return response()->json($user);
    }

    //TODO: En front -> Comparar updated_at con fecha de emision del token. Si el updated at es reciente a emision cerrar sesion.
    public function updateCredentials(Request $request)
    {
        $request->validate([
            'oldPassword' => ['required','min:5','max:20'],
            'newPassword' => ['required','min:5','max:20'],
            'email' => ['required','email',Rule::unique('users','email')->ignore(Auth::user()->id,'id')]
        ],
        [
            'email.unique' => 'Ups! El e-mail ingresado ya se encuentra en uso.',
        ]);

        $user = User::find(Auth::user()->id);
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
