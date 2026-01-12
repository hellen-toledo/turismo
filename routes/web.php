<?php

use Illuminate\Support\Facades\Route;

// Essa regra diz: "Qualquer coisa que o usuário digitar na URL,
// mande para a view 'welcome' onde o React está rodando."
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');