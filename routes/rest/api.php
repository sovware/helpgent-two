<?php

use HelpGent\App\Http\Controllers\ConversationController;
use HelpGent\App\Http\Controllers\ResponseController;
use HelpGent\WaxFramework\Routing\Route; 
// use HelpGent\App\Http\Controllers\AttachmentController;

include __DIR__ . './admin.php';

// Route::resource( 'attachment', AttachmentController::class );

Route::post( 'response', [ ResponseController::class, 'store' ] );
Route::group(
    '/', function() {
        Route::get( 'response', [ResponseController::class, 'index'] );
        Route::get( 'conversation/attachment', [ConversationController::class, 'attachment'] );
        Route::resource( 'conversation', ConversationController::class );
    }, ['auth_or_guest']
);

