<?php

namespace HelpGent\App\Support\Submission\Fields;

use HelpGent\App\DTO\ResponseDTO;
use HelpGent\App\Support\Submission\Submission;
use WP_REST_Request;

class File extends Submission {
    public function validate( WP_REST_Request $wp_rest_request, array $field ):bool {
        return true;
    }

    public function save_response( WP_REST_Request $wp_rest_request, array $field, int $submission_id ) {
        $response_dto = new ResponseDTO(
            $submission_id,
            intval( $wp_rest_request->get_param( 'form_id' ) ),
            $wp_rest_request->get_param( 'screen_id' ),
            $field['id'],
            intval( $wp_rest_request->get_param( $field['id'] ) ),
            1
        );

        return $this->response_repository->create( $response_dto );
    }
}