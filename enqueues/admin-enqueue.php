<?php

use HelpGent\WaxFramework\Enqueue\Enqueue;

defined( 'ABSPATH' ) || exit;

Enqueue::register_script( 'helpgent/store', 'build/js/queryStore' );

if ( 'helpgent_page_helpgent' === get_current_screen()->id ) {
    wp_enqueue_style( 'wp-components' );
    Enqueue::script( 'helpgent-admin-app', 'build/js/index' );
    Enqueue::style( 'wax-app-fonts-style', 'build/css/fonts' );
    Enqueue::style( 'wax-app-global-style', 'build/css/global' );
}
