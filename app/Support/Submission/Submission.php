<?php

namespace HelpGent\App\Support\Submission;

use HelpGent\App\DTO\ResponseDTO;
use HelpGent\App\Repositories\ResponseRepository;
use WP_REST_Request;

abstract class Submission {
    public ResponseRepository $response_repository;

    public function __construct( ResponseRepository $response_repository ) {
        $this->response_repository = $response_repository;
    }

    abstract public function validate( WP_REST_Request $wp_rest_request, array $field );

    public function save_response( WP_REST_Request $wp_rest_request, array $field, int $submission_id ) {
        $response_dto = new ResponseDTO(
            $submission_id,
            intval( $wp_rest_request->get_param( 'form_id' ) ),
            $wp_rest_request->get_param( 'screen_id' ),
            $field['id'],
            $wp_rest_request->get_param( $field['id'] )
        );

        return $this->response_repository->create( $response_dto );
    }
}