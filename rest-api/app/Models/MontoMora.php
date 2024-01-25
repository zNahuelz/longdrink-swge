<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MontoMora extends Model
{
    use HasFactory;

    protected $table = 'monto_moras';

    protected $primaryKey = 'cod_monto';
}
