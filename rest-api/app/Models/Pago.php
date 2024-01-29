<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'pagos';

    protected $primaryKey = 'cod_pago';

    protected $fillable = [
        'fecha_pago',
        'fecha_vencimiento',
        'estado',
        'descripcion',
        'cod_alumno',
    ];

    protected function alumno() : BelongsTo
    {
        return $this->belongsTo(Alumno::class, 'cod_alumno', 'cod_alumno');
    }

    protected function detallePago(): HasOne
    {
        return $this->hasOne(DetallePago::class,'cod_pago','cod_pago');
    }

    
}
