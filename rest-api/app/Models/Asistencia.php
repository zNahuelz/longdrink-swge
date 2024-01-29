<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Asistencia extends Model
{
    use HasFactory;

    protected $table = 'asistencias';

    protected $primaryKey = 'cod_asistencia';

    protected $fillable = [
        'fecha_asistencia',
        'hora_llegada',
        'estado',
        'cod_inscripcion',
    ];

    protected function inscripcion() : BelongsTo
    {
        return $this->belongsTo(Inscripcion::class,'cod_inscripcion', 'cod_inscripcion');
    }
}
