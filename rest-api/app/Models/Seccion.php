<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Seccion extends Model
{
    use HasFactory;

    protected $table = 'secciones';

    protected $primaryKey = 'cod_seccion';

    protected $fillable = [
        'nombre',
        'fecha_inicio',
        'fecha_final',
        'estado',
        'cod_curso',
    ];

    protected function inscripcion() : HasMany
    {
        return $this->hasMany(Inscripcion::class,'seccion_cod_seccion','cod_seccion');
    }

    protected function curso() : BelongsTo
    {
        return $this->belongsTo(Curso::class,'cod_curso','cod_curso');
    }
}
