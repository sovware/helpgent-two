<?php

use HelpGent\App\Http\Controllers\UserController;
use HelpGent\WaxFramework\Routing\Route;

Route::get( 'user', [UserController::class, 'index'], ['admin'] );