<?php

use HelpGent\WaxFramework\Enqueue\Enqueue;

defined( 'ABSPATH' ) || exit;

Enqueue::register_script( 'helpgent/store', 'build/js/queryStore' );

if ( 'helpgent_page_helpgent' === get_current_screen()->id ) {
    Enqueue::script( 'helpgent-admin-app', 'build/js/index' );
}
// Enqueue::style( 'wax-app-style', 'build/css/app' );
