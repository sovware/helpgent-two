<?php

namespace HelpGent\App\Support\Question\Fields;

use Exception;
use HelpGent\App\Support\Question\Question;
use WP_REST_Request;

class OpenEnded extends Question {
    public function validate( WP_REST_Request $wp_rest_request, array $field ) {
        if ( ! $wp_rest_request->has_param( $field['id'] ) ) {
            throw new Exception( $field['label'] . ' field is required.' );
        }
    }
}