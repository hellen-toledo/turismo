<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;

Route::get('/cities', [CityController::class, 'index']);
Route::get('/cities/{id}', [CityController::class, 'show']);
Route::post('/cities', [CityController::class, 'store']);
Route::delete('/cities/{id}', [CityController::class, 'destroy']);
Route::put('/cities/{id}', [CityController::class, 'update']);