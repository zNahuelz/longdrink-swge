<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inscripcion extends Model
{
    use HasFactory;

    protected $table = 'inscripciones';

    protected $primaryKey = 'cod_inscripcion';

    protected $fillable = [
        'fecha_inscripcion',
        'fecha_terminado',
        'estado',
        'seccion_cod_seccion',
        'alumno_cod_alumno',
        'turno_cod_turno',
    ];

    protected function seccion() : BelongsTo
    {
        return $this->belongsTo(Seccion::class, 'seccion_cod_seccion', 'cod_seccion');
    }
    protected function alumno() : BelongsTo
    {
        return $this->belongsTo(Alumno::class, 'alumno_cod_alumno', 'cod_alumno');
    }
    protected function turno() : BelongsTo
    {
        return $this->belongsTo(Turno::class, 'turno_cod_turno', 'cod_turno');
    }
    protected function asistencia() : HasMany
    {
        return $this->hasMany(Asistencia::class, 'cod_inscripcino', 'cod_inscripcino');
    }


}
