<?php

use HelpGent\App\Http\Controllers\SubmissionController;
use HelpGent\WaxFramework\Routing\Route;

include __DIR__ . './admin.php';

Route::post( 'submission', [SubmissionController::class, 'store'] );