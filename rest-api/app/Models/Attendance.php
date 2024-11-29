<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'attendance_date',
        'arrival_time',
        'status',
        'registration_id'
    ];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(Registration::class,'registration_id','id');
    }
}
