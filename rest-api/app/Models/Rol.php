<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Rol extends Model
{
    use HasFactory;

    protected $table = 'roles'; //Asignar nombre de tabla.

    protected $primaryKey = 'cod_rol'; //Asignar nombre de PK.

    protected $fillable = [ //Definir atributos que pueden ser asignados.
        'nombre'
    ];

    public function usuario() : HasMany
    {
        return $this->hasMany(Usuario::class, 'cod_rol', 'cod_rol');
    }
}
