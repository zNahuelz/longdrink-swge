<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tema extends Model
{
    use HasFactory;

    protected $table = 'temas';

    protected $primaryKey = 'cod_tema';

    protected $fillable = [
        'nombre',
        'ficha',
    ];

    protected function curso() : BelongsToMany
    {
        return $this->belongsToMany(Curso::class,'curso_tema','cod_tema','cod_curso');
    }
}
