<?php

namespace HelpGent\App\Providers;

use HelpGent\WaxFramework\Contracts\Provider;

class LocalizationServiceProvider implements Provider {
    public function boot() {
        add_action( 'wp_head', [ $this, 'action_wp_head' ] );
        add_action( 'admin_head', [ $this, 'action_wp_head' ] );
    }

    public function action_wp_head() : void {
        $data = [
            'rest_url'   => get_rest_url( null, 'helpgent' ),
            'rest_nonce' => wp_create_nonce( 'wp_rest' )
        ];
        ?>
        <script>
            var helpgent_localization = <?php helpgent_render( json_encode( $data ) );?>
        </script>
        <?php
    }
}