<?php

namespace HelpGent\App\Providers\Admin;

use HelpGent\WaxFramework\Contracts\Provider;
use HelpGent\WaxFramework\View\View;

class MenuServiceProvider implements Provider
{
    public $pro_url = 'https://wpwax.com/helpgent';

    public function boot() {
        add_action( 'admin_menu', [$this, 'action_admin_menu'] );
        add_action( 'admin_head', [ $this, 'action_admin_head' ] );
    }

    /**
     * Loading menu activation js code only helpgent admin page
     */
    public function action_admin_head() : void {
        ?>
        <style>
            .wp-submenu-wrap a[href="<?php helpgent_render( $this->pro_url )?>"] {
                color: #f06060 !important; 
                font-weight: bold;
            }
        </style>

        <?php
        if ( 'helpgent_page_helpgent' === get_current_screen()->id ) {
            View::render( 'admin/menu-js', ['pro_url' => $this->pro_url] );
        }
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
        add_submenu_page( 'helpgent-menu', esc_html__( 'Go Pro', 'helpgent' ), esc_html__( 'Go Pro', 'helpgent' ), 'manage_options', $this->pro_url );
        remove_submenu_page( 'helpgent-menu', 'helpgent-menu' );
    }

    public function content() {
        helpgent_render( '<div class="helpgent-root"></div>' );
    }
}