<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DetallePago extends Model
{
    use HasFactory;

    protected $table = 'detalle_pagos';

    protected $primaryKey = 'cod_detalle_pago';

    protected $fillable = [
        'concepto',
        'monto',
        'sub_total',
        'total',
        'cod_pago',
        'cod_monto_mora',
    ];

    protected function monto_mora() : BelongsTo
    {
        return $this->belongsTo(MontoMora::class, 'cod_monto_mora', 'cod_monto');
    }

    protected function pago() : BelongsTo
    {
        return $this->belongsTo(Pago::class,'cod_pago', 'cod_pago');
    }
}
