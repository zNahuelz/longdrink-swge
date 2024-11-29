<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Registration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_date',
        'appoved_course',
        'section_id',
        'student_id'
    ];

    function student(): BelongsTo
    {
        return $this->belongsTo(Student::class,'student_id','id');
    }

    function section(): BelongsTo
    {
        return $this->belongsTo(Section::class,'section_id','id');
    }

    function attendaces(): HasMany
    {
        return $this->hasMany(Attendance::class,'id','id'); //TODO: ???
    }
}
