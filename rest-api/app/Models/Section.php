<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 
        'start_date',
        'end_date',
        'course_id',
        'teacher_id',
        'schedule_id',
    ];

    public function courses(): HasOne
    {
        return $this->hasOne(Course::class);
    }
}
