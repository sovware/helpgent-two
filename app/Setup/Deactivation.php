<?php

namespace HelpGent\App\Setup;

use HelpGent\App\Providers\MediaProtectionProvider;

class Deactivation {

    public function __construct() {
        MediaProtectionProvider::after_plugin_deactivation();
        do_action( 'helpgent_after_deactivation' );
    }

}