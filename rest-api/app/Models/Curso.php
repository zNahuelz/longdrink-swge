<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Curso extends Model
{
    use HasFactory;

    protected $table = 'cursos';

    protected $primaryKey = 'cod_curso';

    protected $fillable = [
        'nombre',
        'descripcion',
        'mensualidad',
        'duracion',
        'visibilidad',
        'imagen',
        'activo',
        'cod_profesor',
        'cod_frecuencia',
    ];

    protected function profesor(): BelongsTo
    {
        return $this->belongsTo(Profesor::class, 'cod_profesor', 'cod_profesor');
    }

    protected function seccion(): HasMany
    {
        return $this->hasMany(Seccion::class,'cod_curso', 'cod_curso');
    }

    protected function frecuencia(): BelongsTo
    {
        return $this->belongsTo(Frecuencia::class,'cod_frecuencia', 'cod_frecuencia');
    }

    protected function turno(): BelongsToMany
    {
        return $this->belongsToMany(Turno::class,'curso_turno','cod_curso','cod_turno');
    }

    protected function tema(): BelongsToMany
    {
        return $this->belongsToMany(Tema::class,'curso_tema','cod_curso','cod_tema');
    }

    /*protected function curso_turno(): HasMany
    {
        return $this->hasMany(CursoTurno::class,'cod_curso','cod_curso');
    }
    protected function curso_tema(): HasMany
    {
        return $this->hasMany(CursoTema::class,'cod_curso','cod_curso');
    }*/


}
