<?php

namespace HelpGent\App\Support\Submission\Fields;

use HelpGent\App\Support\Submission\Submission;
use WP_REST_Request;

class Text extends Submission {
    public function validate( WP_REST_Request $wp_rest_request, array $field ):bool {
        return true;
    }
}