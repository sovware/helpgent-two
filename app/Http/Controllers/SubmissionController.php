<?php

namespace HelpGent\App\Http\Controllers;

use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\SubmissionRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use stdClass;
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
                'form_id'   => 'required|numeric',
                'screen_id' => 'required|string',
                'token'     => 'string',
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        /**
         * Get submitted form by form_id
         */
        $form = $this->form_repository->get_by_id_publish( intval( $wp_rest_request->get_param( 'form_id' ) ) );

        if ( ! $form ) {
            return Response::send(
                [
                    'message' => esc_html__( "Form not found", "helpgent" )
                ], 404
            );
        }

        $is_guest_allowed = false;

        /**
         * Guest permission check
         */
        if ( ! $is_guest_allowed && ! is_user_logged_in() ) {
            return Response::send(
                [
                    'message' => esc_html__( "Please login to submit the form", "helpgent" )
                ], 500
            );
        }

        if ( $wp_rest_request->has_param( 'token' ) ) {
            return $this->process_token_request( $wp_rest_request, $form );
        }
        return $this->process_first_request( $wp_rest_request, $form );
    }

    private function process_first_request( WP_REST_Request $wp_rest_request, stdClass $form ) {
        $submission_dto = new SubmissionDTO(
            $wp_rest_request->get_param( 'form_id' ),
            get_current_user_id()
        );

        $form_input = $this->validate_form_input( $wp_rest_request, $form );

        $submission_id = $this->submission_repository->create( $submission_dto );
        $token         = 'submission_token-' . base64_encode( wp_generate_uuid4() . '-' . time() );

        $this->form_repository->add_meta( $form->id, $token, $submission_id );

        return Response::send( ['token' => $token] );
    }

    private function process_token_request( WP_REST_Request $wp_rest_request, stdClass $form ) {
        $token         = $wp_rest_request->get_param( 'token' );
        $submission_id = $this->form_repository->get_meta_value( $form->id, $token );

        if ( ! $submission_id ) {
            return Response::send(
                [
                    'message' => esc_html__( "Submission Not Found", "helpgent" )
                ], 404
            );
        }
    }

    private function validate_form_input( WP_REST_Request $wp_rest_request, stdClass $form ) {
        $content = $this->form_content( $form );
    }
    
    private function form_content( $form ) {
        return [
            [
                'id'     => 1,
                'title'  => "Welcome Screen",
                'fields' => [
                    [
                        'id'   => 'first_name',
                        'type' => 'text'
                    ]
                ]
            ],
            [
                'id'     => 2,
                'title'  => "Information",
                'fields' => [
                    [
                        'id'   => 'profile_image',
                        'type' => 'file'
                    ]
                ]
            ],
            [
                'id'     => 3,
                'title'  => "Final Screen",
                'fields' => []
            ]
        ];
    }
}