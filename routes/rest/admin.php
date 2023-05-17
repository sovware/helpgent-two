<?php

use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\App\Http\Controllers\Admin\SubmissionController;
use HelpGent\WaxFramework\Routing\Route;

Route::group(
    'admin', function() {
        Route::resource( 'form', FormController::class );
        Route::get( 'submission', [SubmissionController::class, 'index'] );
        Route::delete( 'submission/{id}', [SubmissionController::class, 'delete'] );
        Route::post( 'submission/favorite', [SubmissionController::class, 'favorite'] );
    }, ['admin']
);
