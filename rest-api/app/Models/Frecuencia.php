<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Frecuencia extends Model
{
    use HasFactory;

    protected $table = 'frecuencias';

    protected $primaryKey = 'cod_frecuencia';

    protected $fillable = [
        'nombre'
    ];

    protected function curso() : HasMany
    {
        return $this->hasMany(Curso::class,'cod_frecuencia','cod_frecuencia');
    }
}
