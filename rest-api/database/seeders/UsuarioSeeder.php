<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::create([ 'nombre_usuario' => 'ADM_admin',
        'contrasena' => Hash::make('admin'),
        'email' => 'administrador@longdrink.pe',
        'activo' => true,
        'cod_rol' => 1]);
    }
}
