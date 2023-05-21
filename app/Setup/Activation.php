<?php

namespace HelpGent\App\Setup;

use HelpGent\App\Providers\MediaProtectionProvider;

class Activation {
    public function __construct() {
        MediaProtectionProvider::after_plugin_activation();
        do_action( 'helpgent_after_activation' );
    }
}