<?php

use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\TaskController;
use App\Http\Controllers\api\UserController;
use Illuminate\Support\Facades\Route;

// Rota de login
Route::post('/login', [LoginController::class, 'login'])->name('login');

// Rotas de tarefas
Route::get('tasks', [TaskController::class, 'index']);
Route::post('tasks', [TaskController::class, 'store']);
Route::get('tasks/{task}', [TaskController::class, 'show']);
Route::put('tasks/{task}/status', [TaskController::class, 'updateStatus']);
Route::delete('tasks/{task}', [TaskController::class, 'destroy']);

// Rotas autenticadas
Route::middleware(['auth:sanctum'])->group(function () {
   

    // Rotas de usuários
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/users', [UserController::class, 'store']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);

    // Rota de logout
    Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
});
