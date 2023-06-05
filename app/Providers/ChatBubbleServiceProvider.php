<?php

namespace HelpGent\App\Providers;

use HelpGent\App\Repositories\FormRepository;
use HelpGent\WaxFramework\Contracts\Provider;

class ChatBubbleServiceProvider implements Provider {
    public function boot() {
        add_action( 'wp_footer', [ $this, 'action_wp_footer' ] );
    }

    /**
     * Prints scripts or data before the closing body tag on the front end.
     */
    public function action_wp_footer() : void {
        /**
         * @var FormRepository $form_repository
         */
        $form_repository = helpgent_singleton( FormRepository::class );
        $forms           = $form_repository->get_bubble_by_page_id( helpgent_get_current_page_id() );

        // error_log( print_r( $forms, true ) );
    }
}