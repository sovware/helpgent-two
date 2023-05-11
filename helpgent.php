<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\WaxFramework\App;

/**
 * Plugin Name:       HelpGent
 * Description:       This plugin is build with Wax framework
 * Version:           2.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Tested up to:      6.2
 * Author:            SovWare
 * Author URI:        http://github.com/sovware
 * License:           GPL v3 or later
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       helpgent
 * Domain Path:       /languages
 */

require_once __DIR__ . '/vendor/vendor-src/autoload.php';
require_once __DIR__ . '/app/Helpers/helper.php';

final class HelpGent {
    public static HelpGent $instance;

    public static function instance(): HelpGent {
        if ( empty( self::$instance ) ) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    public function load() {
        $application = App::instance();

        /**
         * Fires once activated plugins have loaded.
         *
         */
        add_action(
            'plugins_loaded', function () use ( $application ): void {

                do_action( 'before_load_helpgent' );

                $application->load( __FILE__, __DIR__ );

                do_action( 'after_load_helpgent' );
            }
        );
    }
}

HelpGent::instance()->load();


