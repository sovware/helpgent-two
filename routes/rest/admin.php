<?php

use HelpGent\App\Http\Controllers\Admin\ContactController;
use HelpGent\App\Http\Controllers\Admin\FormController;
use HelpGent\App\Http\Controllers\Admin\PageController;
use HelpGent\App\Http\Controllers\Admin\SettingsController;
use HelpGent\App\Http\Controllers\Admin\ResponseController;
use HelpGent\App\Http\Controllers\Admin\TagController;
use HelpGent\WaxFramework\Routing\Route;

Route::group(
    'admin', function () {
        Route::resource( 'form', FormController::class );
        Route::post( 'form/{id}/status', [FormController::class, 'update_status'] );
        Route::resource( 'tag', TagController::class, ['items' => ['show']] );
        Route::group(
            'response', function () {
                Route::delete( '{id}', [ResponseController::class, 'delete'] );
                Route::post( '{id}/important', [ResponseController::class, 'important'] );
                Route::post( 'setup/tag', [ResponseController::class, 'setup_tag'] );
                Route::post( '{id}/status', [ResponseController::class, 'update_status'] );
                Route::post( '{id}/read', [ResponseController::class, 'update_read'] );
            } 
        );
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
