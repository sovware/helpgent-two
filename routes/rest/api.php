<?php

use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\App\Http\Controllers\SubmissionController;
use HelpGent\WaxFramework\Routing\Route;
// use HelpGent\App\Http\Controllers\AttachmentController;

Route::group(
    'admin', function() {
        Route::resource( 'form', FormController::class );
    }, ['admin']
);

Route::post( 'submission', [ SubmissionController::class, 'store' ] );
// Route::resource( 'attachment', AttachmentController::class );
