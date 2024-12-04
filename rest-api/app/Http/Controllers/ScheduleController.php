<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ScheduleController extends Controller
{
    public function createSchedule(Request $request)
    {
        $request->validate([
            'startTime' => ['required','date_format:H:i'],
            'endTime' => ['required','date_format:H:i','after:start_time'],
            'week_day' => ['required','numeric','between:1,7',
            Rule::unique('schedules')->where(fn ($query) => 
            $query->where('start_time', $request->startTime)
                  ->where('end_time', $request->endTime))],
        ]);

        $schedule = Schedule::create([ 
            'start_time' => $request->startTime,
            'end_time' => $request->endTime,
            'week_day' => $request->week_day
        ]);
        
        return response()->json([
            'message' => 'Turno creado con exito!',
            'schedule' => $schedule
        ],201);
    }

    public function listSchedules(){
        $schedules = Schedule::paginate(10);
        return response()->json($schedules);
    }

    public function getSchedule($id){
        $schedule = Schedule::find($id);
        if(!$schedule){
            return response()->json([
                'message' => 'Turno de ID: '.$id.' no encontrado.'
            ],404);
        }
        return response()->json($schedule);
    }
}
