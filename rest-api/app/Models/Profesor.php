<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Profesor extends Model
{
    use HasFactory;

    protected $table = 'profesores';

    protected $primaryKey = 'cod_profesor';

    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'dni',
        'telefono',
        'fecha_contratacion',
        'cod_usuario',
    ];

    protected function usuario() : BelongsTo
    {
        return $this->belongsTo(Usuario::class, 'cod_usuario', 'cod_usuario');
    }

    protected function curso() : HasMany
    {
        return $this->hasMany(Curso::class,'cod_profesor','cod_profesor');
    }
}
