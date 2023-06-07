<?php

use HelpGent\App\Http\Controllers\SubmissionController;
use HelpGent\WaxFramework\Routing\Route;
// use HelpGent\App\Http\Controllers\AttachmentController;

include __DIR__ . './admin.php';

Route::post( 'submission', [ SubmissionController::class, 'store' ] );
// Route::resource( 'attachment', AttachmentController::class );