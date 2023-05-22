<?php

use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\App\Http\Controllers\Admin\SubmissionController;
use HelpGent\App\Http\Controllers\Admin\TagController;
use HelpGent\WaxFramework\Routing\Route;

Route::group(
    'admin', function () {
        Route::resource( 'form', FormController::class );
        Route::resource( 'tag', TagController::class, ['items' => ['show']] );
        Route::group(
            'submission', function () {
                Route::get( '/', [SubmissionController::class, 'index'] );
                Route::delete( '/{id}', [SubmissionController::class, 'delete'] );
                Route::post( 'favorite', [SubmissionController::class, 'favorite'] );
                Route::post( 'setup/tag', [SubmissionController::class, 'setup_tag'] );
                Route::group(
                    'status', function () {
                        Route::post( 'archive', [SubmissionController::class, 'update_archive_status'] );
                    } 
                );
            } 
        );
    }, ['admin']
);
