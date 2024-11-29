<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Teacher extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'paternal_surname',
        'maternal_surname',
        'dni',
        'phone',
        'address',
        'hiring_date',
        'dismissal_date',
        'user_id'
    ];

    protected $attributes = [
        'dismissal_date' => null,
    ];

    function usuario(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }

    function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }

}
