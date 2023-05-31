<?php

namespace HelpGent\App\Providers;

use HelpGent\App\Repositories\FormRepository;
use HelpGent\WaxFramework\Contracts\Provider;
use HelpGent\WaxFramework\View\View;

class ShortCodeServiceProvider implements Provider {
    public function boot() {
        add_action( 'init', [ $this, 'action_init' ] );
    }

    /**
     * Fires after WordPress has finished loading but before any headers are sent.
     *
     */
    public function action_init() : void {
        add_shortcode( "Helpgent_Form", [$this, 'content'] );
    }

    public function content( $attr ) {

        if ( ! is_array( $attr ) || empty( $attr['id'] ) ) {
            return;
        }

        $id = intval( $attr['id'] );

        /**
         * @var FormRepository $form_repository
         */
        $form_repository = helpgent_singleton( FormRepository::class );

        $form = $form_repository->get_by_id_publish( $id );

        if ( ! $form ) {
            return;
        }

        return View::get( 'form-content', compact( 'form' ) );
    }
}