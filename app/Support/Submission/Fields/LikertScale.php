<?php

namespace HelpGent\App\Support\Submission\Fields;

use Exception;
use HelpGent\App\Support\Submission\Submission;
use WP_REST_Request;

class LikertScale extends Submission {
    public function validate( WP_REST_Request $wp_rest_request, array $field ) {
        if ( ! $wp_rest_request->has_param( $field['id'] ) ) {
            throw new Exception( $field['label'] . ' field is required.' );
        }
    }
}