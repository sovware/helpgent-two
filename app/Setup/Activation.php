<?php

namespace HelpGent\App\Setup;

use HelpGent\App\Providers\MediaProtectionProvider;
use HelpGent\Database\Migrations\CreateDB;

class Activation {
    public function __construct() {
        ( new CreateDB )->execute();
        MediaProtectionProvider::after_plugin_activation();
        do_action( 'helpgent_after_activation' );
    }
}