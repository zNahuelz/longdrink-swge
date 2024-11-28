<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'paternal_surname',
        'maternal_surname',
        'dni',
        'phone',
        'user_id',
    ];

    protected function usuario() : BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }

    protected function registration() : HasMany
    {
        return $this->hasMany(Registration::class,'id');
    }
}
