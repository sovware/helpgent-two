<?php

namespace HelpGent\App\Http\Controllers;

use Exception;
use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\SubmissionRepository;
use HelpGent\App\Support\Submission\Submission;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use stdClass;
use WP_REST_Request;

class SubmissionController extends Controller {
    public SubmissionRepository $submission_repository;

    public FormRepository $form_repository;

    public WP_REST_Request $wp_rest_request;

    public stdClass $form;

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

        /**
         * Guest permission check
         */
        if ( '0' == $form->is_guest_allowed && ! is_user_logged_in() ) {
            return Response::send(
                [
                    'message' => esc_html__( "Please login to submit the form", "helpgent" )
                ], 500
            );
        }

        $this->wp_rest_request = $wp_rest_request;
        $this->form            = $form;

        if ( $wp_rest_request->has_param( 'token' ) ) {
            return $this->process_token_request();
        }
        return $this->process_first_request();
    }

    private function process_first_request() {
        try {
            $submission_dto = new SubmissionDTO(
                $this->wp_rest_request->get_param( 'form_id' ),
                get_current_user_id()
            );

            /**
             * Validate screen to screen logic map
             */
            $field = $this->validate_logic_map();

            /**
             * Get input field handler by field type and validate input.
             */
            $field_handler = $this->field_handler( $field['type'] );

            $field_handler->validate( $this->wp_rest_request, $field );

            /**
             * Creating a new submission.
             */
            $submission_id = $this->submission_repository->create( $submission_dto );

            /**
             * Storing submission response.
             */
            $field_handler->save_response( $this->wp_rest_request, $field, $submission_id );

            /**
             * Generating and storing token to identify the subsequent response on this submission.
             */
            $token = 'submission_token-' . base64_encode( wp_generate_uuid4() . '-' . time() );

            $this->form_repository->add_meta( $this->form->id, $token, $submission_id );

            return Response::send( ['token' => $token], 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ], $exception->getCode()
            );
        }
    }

    private function process_token_request() {
        $token         = $this->wp_rest_request->get_param( 'token' );
        $submission_id = $this->form_repository->get_meta_value( $this->form->id, $token );
        $submission    = $this->submission_repository->get_by_id( $submission_id );

        if ( ! $submission ) {
            return Response::send(
                [
                    'message' => esc_html__( "Submission Not Found", "helpgent" )
                ], 404
            );
        }

        $form_id = intval( $this->wp_rest_request->get_param( 'form_id' ) );

        if ( $form_id != $submission->form_id ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, Something was wrong!", "helpgent" )
                ], 404
            );
        }

        try {
            /**
             * Validate screen to screen logic map
             */
            $field = $this->validate_logic_map();

            /**
             * Get input field handler by field type and validate input.
             */
            $field_handler = $this->field_handler( $field['type'] );

            $field_handler->validate( $this->wp_rest_request, $field );

            /**
             * Storing submission response.
             */
            $field_handler->save_response( $this->wp_rest_request, $field, $submission_id );

            return Response::send( [], 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ], $exception->getCode()
            );
        }
    }

    private function validate_logic_map() {
        $screens = $this->screens();

        $screen_key = array_search( $this->wp_rest_request->get_param( 'screen_id' ), array_column( $screens,  'id' ), true );

        if ( ! is_int( $screen_key ) ) {
            throw new Exception( __( "Form Screen Not Found", "helpgent" ), 500 );
        }

        $screen = $screens[$screen_key];

        if ( ! isset( $screen['fields'][0] ) ) {
            return false;
        }

        return $screen['fields'][0];
    }

    private function field_handler( string $field_type ):Submission {
        $field_handler_class = helpgent_config( "submission-fields-handlers.{$field_type}" );

        if ( ! class_exists( $field_handler_class ) ) {
            throw new Exception( __( 'Field handler not found', 'helpgent' ), 500 );
        }

        $field_handler = helpgent_make( $field_handler_class );

        if ( ! $field_handler instanceof Submission ) {
            throw new Exception( __( 'Please use a valid field handler', 'helpgent' ), 500 );
        }

        return $field_handler;
    }

    private function screens() {
        return [
            [
                'id'     => "1",
                'title'  => "Welcome Screen",
                'fields' => [
                    [
                        'id'    => 'first_name',
                        'type'  => 'text',
                        'label' => 'First Name'
                    ]
                ]
            ],
            [
                'id'     => "2",
                'title'  => "Information",
                'fields' => [
                    [
                        'id'    => 'profile_image',
                        'type'  => 'file',
                        'label' => 'Profile Image'
                    ]
                ]
            ],
            [
                'id'     => "3",
                'title'  => "Final Screen",
                'fields' => []
            ]
        ];
    }
}