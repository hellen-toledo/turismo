<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;

// Rota para listar todas as cidades
Route::get('/cities', [CityController::class, 'index']);

// Rota para ver detalhes de uma cidade
Route::get('/cities/{id}', [CityController::class, 'show']);

Route::post('/cities', [CityController::class, 'store']);