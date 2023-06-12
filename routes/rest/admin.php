<?php

use HelpGent\App\Http\Controllers\Admin\ContactController;
use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\App\Http\Controllers\Admin\PageController;
use HelpGent\App\Http\Controllers\Admin\SettingsController;
use HelpGent\App\Http\Controllers\Admin\SubmissionController;
use HelpGent\App\Http\Controllers\Admin\TagController;
use HelpGent\App\Http\Controllers\Admin\ConversationController;
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
        Route::resource( 'conversation', ConversationController::class );
        Route::get( 'settings', [SettingsController::class, 'index'] );
        Route::post( 'settings', [SettingsController::class, 'update'] );
        Route::get( 'page', [PageController::class, 'index'] );
        Route::group(
            'contact', function() {
                Route::get( '/', [ContactController::class, 'index'] );
            }
        );
    }, ['admin']
);
