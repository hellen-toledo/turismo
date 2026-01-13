<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');


Route::middleware('guest')->group(function () {
    
    
    Route::get('/login', function () {
        return Inertia::render('Login');
    })->name('login');

    
    Route::post('/login', function (Request $request) {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            
            return redirect()->intended('/admin');
        }

        return back()->withErrors([
            'email' => 'As credenciais fornecidas estão incorretas.',
        ]);
    });
});


Route::middleware('auth')->group(function () {

    
    Route::get('/admin', function () {
        return Inertia::render('CityList');
    })->name('admin');

    
    Route::get('/admin/events', function () {
        return Inertia::render('EventList');
    })->name('admin.events');

    
    Route::get('/admin/create', function () {
        return Inertia::render('CityForm');
    });

    Route::get('/admin/edit/{id}', function ($id) {
        
        return Inertia::render('CityEdit', ['id' => $id]);
    });

    
    Route::post('/logout', function (Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    });
});