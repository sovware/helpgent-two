<?php

use HelpGent\WaxFramework\Enqueue\Enqueue;

defined( 'ABSPATH' ) || exit;

Enqueue::register_script( 'helpgent/store', 'build/js/store' );

Enqueue::script( 'wax-app-script', 'build/js/app' );
// Enqueue::style( 'wax-app-style', 'build/css/app' );
