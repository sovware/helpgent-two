<?php

namespace HelpGent\App\Providers;

use HelpGent\WaxFramework\Contracts\Provider;

class LocalizationServiceProvider implements Provider {
    public function boot() {
        add_action( 'admin_head', [ $this, 'action_admin_head' ] );
        add_action( 'wp_head', [ $this, 'action_wp_head' ] );
    }

    public function action_admin_head() : void {
        $data                 = $this->common();
        $data['translations'] = $this->admin_translations();
        ?>
        <script>
            var helpgent_localization = <?php helpgent_render( json_encode( $data ) );?>
        </script>
        <?php
    }

    public function action_wp_head() : void {
        $data = $this->common();
        ?>
        <script>
            var helpgent_localization = <?php helpgent_render( json_encode( $data ) );?>
        </script>
        <?php
    }

    public function admin_translations() {
        return apply_filters(
            'helpgent_admin_translations', [
                'default'    => esc_html__( 'Default', 'helpgent' ),
                'all_forms'  => esc_html__( 'All Forms', 'helpgent' ),
                'create_new' => esc_html__( 'Create New', 'helpgent' ),
                'settings'   => esc_html__( 'Settings', 'helpgent' ),
            ]
        );
    }

    public function common() {
        return [
            'rest_url'   => get_rest_url( null, 'helpgent' ),
            'rest_nonce' => wp_create_nonce( 'wp_rest' )
        ];
    }
}