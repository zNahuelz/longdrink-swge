<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Turno extends Model
{
    use HasFactory;

    protected $table = 'turnos';

    protected $primaryKey = 'cod_turno';

    protected $fillable = [
        'nombre',
        'hora_inicio',
        'hora_fin',
    ];

    protected function curso(): BelongsToMany
    {
        return $this->belongsToMany(Curso::class,'curso_turno','cod_turno','cod_curso');
    }

    protected function inscripcion() : HasMany
    {
        return $this->hasMany(Inscripcion::class,'turno_cod_turno','cod_turno');
    }
}
