<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Resources extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'document',
        'mime_type'
    ];

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, CourseResources::class);
    }

}
