<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MontoMora extends Model
{
    use HasFactory;

    protected $table = 'monto_moras';

    protected $primaryKey = 'cod_monto';

    protected $fillable = [
        'monto'
    ];

    protected function detalle_pago(): HasMany
    {
        return $this->hasMany(DetallePago::class, 'cod_monto_mora', 'cod_monto');
    }
}
