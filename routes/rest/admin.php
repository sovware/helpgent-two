<?php

use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\App\Http\Controllers\Admin\SettingsController;
use HelpGent\App\Http\Controllers\Admin\SubmissionController;
use HelpGent\App\Http\Controllers\Admin\TagController;
use HelpGent\WaxFramework\Routing\Route;

Route::group(
    'admin', function () {
        Route::resource( 'form', FormController::class );
        Route::post( 'form/{id}/status', [FormController::class, 'update_status'] );
        Route::resource( 'tag', TagController::class, ['items' => ['show']] );
        Route::group(
            'submission', function () {
                Route::get( '/', [SubmissionController::class, 'index'] );
                Route::delete( '{id}', [SubmissionController::class, 'delete'] );
                Route::post( '{id}/important', [SubmissionController::class, 'important'] );
                Route::post( 'setup/tag', [SubmissionController::class, 'setup_tag'] );
                Route::post( '{id}/status', [SubmissionController::class, 'update_status'] );
                Route::post( '{id}/read', [SubmissionController::class, 'update_read'] );
            } 
        );
        Route::get( 'settings', [SettingsController::class, 'index'] );
        Route::post( 'settings', [SettingsController::class, 'update'] );
    }, ['admin']
);
