<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::get('/buscar/{nome}', [GameController::class, 'search']);
