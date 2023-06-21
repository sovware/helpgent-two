<?php

use HelpGent\App\Http\Controllers\ConversationController;
use HelpGent\App\Http\Controllers\SubmissionController;
use HelpGent\WaxFramework\Routing\Route; 
// use HelpGent\App\Http\Controllers\AttachmentController;

include __DIR__ . './admin.php';

// Route::resource( 'attachment', AttachmentController::class );

Route::post( 'submission', [ SubmissionController::class, 'store' ] );
Route::group(
    '/', function() {
        Route::get( 'submission', [SubmissionController::class, 'index'] );
        Route::resource( 'conversation', ConversationController::class );
    }, ['auth_or_guest']
);

