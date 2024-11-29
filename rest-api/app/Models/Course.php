<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'monthly_payment',
        'duration',
        'image',
        'section_id'
    ];

    /*     public function schedules(): HasMany
    {
        return $this->hasMany(CourseSchedules::class);
    }

    public function resources(): HasMany
    {
        return $this->hasMany(CourseResources::class);
    }
    */
    public function section(): BelongsToMany
    {
        return $this->belongsToMany(Section::class);
    } 

    public function schedules(): HasManyThrough
    {
        return $this->hasManyThrough(Schedule::class, CourseSchedules::class, 'course_id', 'id', 'id', 'schedule_id');
    }

    public function resources(): HasManyThrough
    {
        return $this->hasManyThrough(Resources::class, CourseResources::class, 'course_id', 'id', 'id', 'resource_id');
    }
}
