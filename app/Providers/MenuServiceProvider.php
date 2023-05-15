<?php

namespace HelpGent\App\Providers;

use HelpGent\WaxFramework\Contracts\Provider;

class MenuServiceProvider implements Provider
{
    public function boot() {
        add_action( 'admin_menu', [$this, 'action_admin_menu'] );
    }

    public function action_admin_menu() {
        $page_url = admin_url( 'admin.php?page=helpgent' );
        $icon_dir = helpgent_dir( 'assets/svg/helpgent-icon.svg' );
        $icon     = file_get_contents( $icon_dir );
        $icon     = 'data:image/svg+xml;base64,' . base64_encode( $icon );

        add_menu_page( esc_html__( 'HelpGent', 'helpgent' ), esc_html__( 'HelpGent', 'helpgent' ), 'manage_options', 'helpgent-menu', function () { }, $icon, 5 );
        add_submenu_page( 'helpgent-menu', esc_html__( 'Overview', 'helpgent' ), esc_html__( 'Overview', 'helpgent' ), 'manage_options', 'helpgent', [$this, 'content'] );
        add_submenu_page( 'helpgent-menu', esc_html__( 'Analytics', 'helpgent' ), esc_html__( 'Analytics', 'helpgent' ), 'manage_options', $page_url . '#/analytics' );
        add_submenu_page( 'helpgent-menu', esc_html__( 'Forms', 'helpgent' ), esc_html__( 'Forms', 'helpgent' ), 'manage_options', $page_url . '#/forms' );
        add_submenu_page( 'helpgent-menu', esc_html__( 'Submissions', 'helpgent' ), esc_html__( 'Submissions', 'helpgent' ), 'manage_options', $page_url . '#/submissions' );
        add_submenu_page( 'helpgent-menu', esc_html__( 'Settings', 'helpgent' ), esc_html__( 'Settings', 'helpgent' ), 'manage_options', $page_url . '#/settings' );
        remove_submenu_page( 'helpgent-menu', 'helpgent-menu' );
    }

    public function content() {
        helpgent_render( '<div class="helpgent-root"></div>' );
    }
}