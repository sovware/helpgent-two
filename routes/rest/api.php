<?php

use HelpGent\App\Http\Controllers\MessageController;
use HelpGent\App\Http\Controllers\ForwardController;
use HelpGent\App\Http\Controllers\ResponseController;
use HelpGent\WaxFramework\Routing\Route; 
// use HelpGent\App\Http\Controllers\AttachmentController;

include __DIR__ . './admin.php';

// Route::resource( 'attachment', AttachmentController::class );

Route::post( 'response', [ ResponseController::class, 'store' ] );
Route::group(
    '/', function() {
        Route::get( 'response', [ResponseController::class, 'index'] );
        Route::group(
            'message', function() {
                Route::group(
                    'forward', function() {
                        Route::get( 'users', [ForwardController::class, 'users'] );
                        Route::get( 'responses', [ForwardController::class, 'responses'] );
                        Route::post( '/', [ForwardController::class, 'store'] );
                    }
                );
                Route::get( 'attachment', [MessageController::class, 'attachment'] );
                Route::post( 'read', [MessageController::class, 'read'] );
                Route::resource( '/', MessageController::class );
            }
        );
    }, ['auth_or_guest']
);

