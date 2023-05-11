<?php

use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\WaxFramework\Routing\Route;
// use HelpGent\App\Http\Controllers\AttachmentController;

Route::group(
    'admin', function() {
        Route::resource( 'form', FormController::class );
    }, ['admin']
);

// Route::resource( 'attachment', AttachmentController::class );