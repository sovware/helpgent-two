<?php

use HelpGent\App\Http\Controllers\UserController;
use HelpGent\WaxFramework\Routing\Ajax;

Ajax::get( 'user/{id}', [UserController::class, 'index'], ['admin'] );
