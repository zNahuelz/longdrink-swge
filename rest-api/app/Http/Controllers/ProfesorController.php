<?php

namespace App\Http\Controllers;

use App\Models\Profesor;
use App\Models\Rol;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfesorController extends Controller
{
    public function contratarProfesor(Request $request)
    {
        //TODO: Testear y modificar.
        $request->validate([
            'nombre' => ['required','regex:/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,50}$/'],
            'apellido_paterno' => ['required','regex:/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,25}$/'],
            'apellido_materno' => ['required','regex:/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,25}$/'],
            'dni' => ['required','regex:/^[0-9]{8,9}$/',Rule::unique('profesores','dni')],
            'telefono' => ['required','regex:/^[1-9]\d{8}$/'],
            'fecha_contratacion' => ['required','date','date_format:Y-m-d'], //** Vease https://www.php.net/manual/en/class.datetimeinterface.php
            'email' => ['required','email','max:80',Rule::unique('usuarios','email')]
        ]);
        $nombreUsuario = strtoupper(substr($request->nombre, 0, 1))
        .strtoupper(substr($request->apellido_paterno, 0, 1))
        .strtoupper(substr($request->apellido_materno, 0, 1))
        .$request->dni;


        $contrasena = Hash::make(strtoupper(substr($request->nombre, 0, 1)).$request->dni);
        $rol = Rol::where('nombre','PROFESOR')->first();

        $usuario = Usuario::create([
            'nombre_usuario' => $nombreUsuario,
            'password' => $contrasena,
            'email' => strtoupper($request->email),
            'activo' => true,
            'cod_rol' => $rol->cod_rol
        ]);

        $profesor = Profesor::create([
            'nombre' => strtoupper($request->nombre),
            'apellido_paterno' => strtoupper($request->apellido_paterno),
            'apellido_materno' => strtoupper($request->apellido_materno),
            'dni' => $request->dni,
            'telefono' => $request->telefono,
            'fecha_contratacion' => $request->fecha_contratacion,
            'cod_usuario' => $usuario->cod_usuario
        ]);

        return response()->json([
            'profesor' => $profesor,
            'usuario' => $usuario
        ],201);
    }
}
