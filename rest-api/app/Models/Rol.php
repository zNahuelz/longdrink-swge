<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    use HasFactory;

    protected $table = 'roles'; //Asignar nombre de tabla.

    protected $primaryKey = 'cod_rol'; //Asignar nombre de PK.

    protected $fillable = [ //Definir atributos que pueden ser asignados.
        'nombre'
    ];
}
