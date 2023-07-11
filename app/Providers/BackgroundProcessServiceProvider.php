<?php

namespace HelpGent\App\Providers;

use HelpGent\App\Async\ExportCSV;
use HelpGent\WaxFramework\Contracts\Provider;

class BackgroundProcessServiceProvider implements Provider {
    protected ExportCSV $export_csv;

    public function boot() {
        // $this->export_csv = new ExportCSV();
        // error_log( "Plugin load" );
        // add_action( 'admin_bar_menu', [ $this, 'admin_bar' ], 100 );
        // add_action( 'init', [ $this, 'process_handler' ] );
    }

    /**
     * Admin bar
     *
     * @param \WP_Admin_Bar $wp_admin_bar
     */
    public function admin_bar( $wp_admin_bar ) {
        if ( ! current_user_can( 'manage_options' ) ) {
            return;
        }

        $wp_admin_bar->add_menu(
            [
                'id'    => 'example-plugin',
                'title' => __( 'Background Process', 'example-plugin' ),
                'href'  => wp_nonce_url( admin_url( '?process=1' ), 'process' ),
            ] 
        );
    }

    /**
     * Process handler
     */
    public function process_handler() {
        if ( ! isset( $_GET['process'] ) || ! isset( $_GET['_wpnonce'] ) ) {
            return;
        }

        if ( ! wp_verify_nonce( $_GET['_wpnonce'], 'process' ) ) {
            return;
        }

        $this->export_csv->push_to_queue( 'helpgent-export-contacts' )->save()->dispatch();
    }
}