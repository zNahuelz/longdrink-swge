<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Alumno extends Model
{
    use HasFactory;

    protected $table = 'alumnos';

    protected $primaryKey = 'cod_alumno';

    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'dni',
        'telefono',
        'activo',
        'cod_usuario',
    ];

    protected function usuario() : BelongsTo
    {
        return $this->belongsTo(Usuario::class,'cod_usuario','cod_usuario');
    }

    protected function pago() : HasMany
    {
        return $this->hasMany(Pago::class, 'cod_alumno','cod_alumno');
    }

    protected function inscripcion() : HasMany
    {
        return $this->hasMany(Inscripcion::class,'cod_alumno', 'cod_alumno');
    }
}
