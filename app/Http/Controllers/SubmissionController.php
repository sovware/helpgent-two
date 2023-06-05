<?php

namespace HelpGent\App\Http\Controllers;

use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\SubmissionRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class SubmissionController extends Controller {
    public SubmissionRepository $submission_repository;

    public FormRepository $form_repository;

    public function __construct( SubmissionRepository $submission_repository, FormRepository $form_repository ) {
        $this->submission_repository = $submission_repository;
        $this->form_repository       = $form_repository;
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'form_id' => 'required|numeric'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form = $this->form_repository->get_by_id_publish( intval( $wp_rest_request->get_param( 'form_id' ) ) );

        if ( ! $form ) {
            return Response::send(
                [
                    'message' => esc_html__( "Form not found", "helpgent" )
                ], 404
            );
        }

        $is_guest_allowed = false;

        if ( ! $is_guest_allowed && ! is_user_logged_in() ) {
            return Response::send(
                [
                    'message' => esc_html__( "Please login to submit the form", "helpgent" )
                ], 500
            );
        }

        $submission_dto = new SubmissionDTO(
            $wp_rest_request->get_param( 'form_id' ),
            get_current_user_id()
        );

        $submission_id = $this->submission_repository->create( $submission_dto );

        return Response::send(
            [
                'submission_id' => $submission_id,
                'message'       => esc_html__( 'Submission Created Successfully!', 'helpgent' )
            ]
        );
    }
}