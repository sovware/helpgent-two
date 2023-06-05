<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Repositories\FormRepository;
use HelpGent\WaxFramework\View\View;

get_header();

$id = intval( get_query_var( 'helpgent-preview' ) );

/**
 * @var FormRepository $form_repository
 */
$form_repository = helpgent_singleton( FormRepository::class );

$form = $form_repository->get_by_id( $id );

if ( ! $form ) {
    esc_html_e( 'Helpgent form not found', 'helpgent' );
} else {
    View::render( 'form-content', compact( 'form' ) );
}

get_footer();