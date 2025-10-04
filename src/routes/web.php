<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Auth/Login', [
        'name' => '....'
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Home');
});
