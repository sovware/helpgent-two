<?php

use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\WaxFramework\Routing\Route;

Route::group(
    'admin', function() {
        Route::resource( 'form', FormController::class );
    }, ['admin']
);