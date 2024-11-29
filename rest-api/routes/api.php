<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeacherController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::group([
    'prefix' => '/auth'
], function ($router){
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/profile',[AuthController::class, 'profile']);
    Route::post('/update_credentials',[AuthController::class, 'updateCredentials'])->middleware(AuthMiddleware::class);
});


Route::group([
    'prefix' => '/teacher',
    'middleware' => AdminMiddleware::class,
], function ($router){
    Route::post('/', [TeacherController::class, 'hireTeacher']);
    Route::get('/list', [TeacherController::class, 'getTeachers']);
    Route::get('/{id}', [TeacherController::class, 'getTeacher']);
});
