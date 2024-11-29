<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class TeacherController extends Controller
{
    public function hireTeacher(Request $request)
    {
        //TODO: Testear y modificar.
        $request->validate([
            'name' => ['required','regex:/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,30}$/'],
            'paternalSurname' => ['required','regex:/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,30}$/'],
            'maternalSurname' => ['required','regex:/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{1,30}$/'],
            'dni' => ['required','regex:/^[0-9]{8,9}$/',Rule::unique('teachers','dni')],
            'address' => ['required','max:100'],
            'phone' => ['required','regex:/^[1-9]\d{8}$/'],
            'hiringDate' => ['required','date','date_format:Y-m-d'], //** Vease https://www.php.net/manual/en/class.datetimeinterface.php
            'email' => ['required','email','max:50',Rule::unique('users','email')]
        ],
        [
            'dni.unique' => 'Ups! El DNI ingresado ya se encuentra en uso.',
            'email.unique' => 'Ups! El correo electrónico ingresado ya se encuentra en uso.'
        ]);
        $username = strtoupper(substr($request->name, 0, 1))
        .strtoupper(substr($request->paternalSurname, 0, 1))
        .strtoupper(substr($request->maternalSurname, 0, 1))
        .$request->dni;


        $password = Hash::make(strtoupper(substr($request->nombre, 0, 1)).$request->dni);
        $role = Role::where('name','PROFESOR')->first();

        $newUser = User::create([
            'username' => $username,
            'password' => $password,
            'email' => strtoupper($request->email),
            'role_id' => $role->id
        ]);
        //TODO -> Remove account if saving teacher fails.
        $teacherData = Teacher::create([
            'name' => strtoupper($request->name),
            'paternal_surname' => strtoupper($request->paternalSurname),
            'maternal_surname' => strtoupper($request->maternalSurname),
            'dni' => $request->dni,
            'address' => strtoupper($request->address),
            'phone' => $request->phone,
            'hiring_date' => $request->hiringDate,
            'user_id' => $newUser->id
        ]);

        return response()->json([
            'teacher' => $teacherData,
            'user' => $newUser
        ],201);
    }

    public function getTeachers()
    {
        $teachers = Teacher::paginate(1);
        return response()->json($teachers);
    }

    public function getTeacher($id)
    {
        $teacher = Teacher::find($id);
        if($teacher)
        {
            $teacher['usuario'];
            return response()->json($teacher);
        }
        else
        {
            return response()->json(['message' => 'Ups! Docente con ID '.$id.' no encontrado.'],404);
        }
    }
}
