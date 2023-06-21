<?php

namespace HelpGent\App\Http\Controllers;

use Exception;
use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\DTO\SubmissionReadDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\App\Repositories\SubmissionRepository;
use HelpGent\App\Support\Submission\Submission;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;
use stdClass;

class SubmissionController extends Controller {
    public SubmissionRepository $submission_repository;

    public FormRepository $form_repository;

    public ResponseRepository $response_repository;

    public WP_REST_Request $wp_rest_request;

    public stdClass $form;

    private string $token;

    private int $response_id;

    private int $submission_id;

    public function __construct( SubmissionRepository $submission_repository, FormRepository $form_repository, ResponseRepository $response_repository ) {
        $this->submission_repository = $submission_repository;
        $this->form_repository       = $form_repository;
        $this->response_repository   = $response_repository;
    }

    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $user = helpgent_get_current_user();

        if ( $user->is_user ) {
            $validator->validate( $this->user_read_rule() );
        } else {
            $validator->validate( $this->admin_read_rules() );
        }

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        if ( $user->is_user ) {
            $submission_read_dto = new SubmissionReadDTO(
                intval( $wp_rest_request->get_param( 'per_page' ) ),
                intval( $wp_rest_request->get_param( 'page' ) ),
                $wp_rest_request->get_param( 'order_by' ),
                'active',
                [],
                (string) $wp_rest_request->get_param( 'search' )
            );
            $submission_read_dto->set_created_by( $user->id );
            $submission_read_dto->set_is_guest( $user->is_guest );
        } else {
            $submission_read_dto = new SubmissionReadDTO(
                intval( $wp_rest_request->get_param( 'per_page' ) ),
                intval( $wp_rest_request->get_param( 'page' ) ),
                $wp_rest_request->get_param( 'order_by' ),
                $wp_rest_request->get_param( 'status' ),
                $wp_rest_request->has_param( 'tag_ids' ) ? $wp_rest_request->get_param( 'tag_ids' ) : [],
                (string) $wp_rest_request->get_param( 'search' )
            );

            if ( $wp_rest_request->has_param( 'form_id' ) ) {
                $submission_read_dto->set_form_id( intval( $wp_rest_request->get_param( 'form_id' ) ) );
            }
        }

        return Response::send(
            $this->submission_repository->get( $submission_read_dto )
        );
    }

    protected function admin_read_rules() {
        return [
            'form_id'  => 'numeric',
            'per_page' => 'numeric',
            'page'     => 'numeric',
            'order_by' => 'required|string|accepted:read,unread,latest,oldest',
            'status'   => 'required|string|accepted:active,archive,trash',
            'tag_ids'  => 'array',
            'search'   => 'string'
        ];
    }

    protected function user_read_rule() {
        return [
            'per_page' => 'numeric',
            'page'     => 'numeric',
            'order_by' => 'required|string|accepted:read,unread,latest,oldest',
            'search'   => 'string'
        ];
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'form_id'   => 'required|numeric',
                'screen_id' => 'required|string',
                'token'     => 'string',
                'submit'    => 'accepted:1',
                'delete'    => 'accepted:1'
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
            $form_id = intval( $this->wp_rest_request->get_param( 'form_id' ) );

            $submission_dto = new SubmissionDTO(
                $form_id,
                get_current_user_id()
            );

            $submission_id = $this->submission_repository->create( $submission_dto );

            /**
             * Storing submission response.
             */
            $response_id = $field_handler->save_response( $this->wp_rest_request, $field, $submission_id );

            /**
             * Generating and storing token to identify the subsequent response on this submission.
             */
            $token = 'submission_token-' . helpgent_generate_token();

            $this->form_repository->add_meta( $this->form->id, $token, $submission_id );

            $this->token         = $token;
            $this->submission_id = $submission_id;

            $this->submit_form( $form_id, $submission_id, $this->token );

            return Response::send( compact( 'token', 'response_id' ), 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ], $exception->getCode()
            );
        }
    }

    private function process_token_request() {
        $submission = $this->get_submission_by_token();

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

        if ( $this->wp_rest_request->has_param( 'delete' ) ) {
            return $this->delete_response( $submission );
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
            $response_id = $field_handler->save_response( $this->wp_rest_request, $field, $submission->id );

            $this->submit_form( $form_id, $submission->id, $this->wp_rest_request->get_param( 'token' ) );

            return Response::send( compact( 'response_id' ), 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ], $exception->getCode()
            );
        }
    }

    private function submit_form( $form_id, $submission_id, $token ) {
        if ( ! $this->wp_rest_request->has_param( 'submit' ) ) {
            return;
        }

        if ( ! is_user_logged_in() && ! $this->submission_repository->get_meta_value( $submission_id ,'contact_info_submit' ) ) {
            throw new Exception( esc_html__( "Guest user required contact information", 'helpgent' ), 500 );
        }

        $this->form_repository->delete_meta( $form_id, $token );
        $this->submission_repository->delete_meta( $submission_id, 'contact_info_submit' );
        $this->submission_repository->update_status( $submission_id, 'active' );

        do_action( 'helpgent_after_submit_form', $submission_id );
    }

    private function get_submission_by_token() {
        $token         = $this->wp_rest_request->get_param( 'token' );
        $submission_id = $this->form_repository->get_meta_value( $this->form->id, $token );
        return $this->submission_repository->get_by_id( $submission_id );
    }

    private function delete_response( stdClass $submission ) {
        $this->response_repository->delete_screen( $submission->id, intval( $this->wp_rest_request->get_param( 'screen_id' ) ) );
        return Response::send( [] );
    }

    private function validate_logic_map() {
        $screens = $this->screens();
        // $form_content = json_decode( $this->form->content );

        // if ( empty( $form_content['screens'] ) ) {
        //     throw new Exception( __( "Form screens not found", "helpgent" ), 500 );
        // }

        // $screens    = $form_content['screens'];
        $screen_key = array_search( $this->wp_rest_request->get_param( 'screen_id' ), array_column( $screens,  'id' ), true );

        if ( ! is_int( $screen_key ) ) {
            throw new Exception( __( "Form screen not found", "helpgent" ), 500 );
        }

        $screen = $screens[$screen_key];

        if ( ! isset( $screen['fields'][0] ) ) {
            throw new Exception( __( "Sorry, Something was wrong!", "helpgent" ), 500 );
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
        // https://gist.github.com/tanjimhasan/4d2a813e673d11eab7c9073df2866444
        return [
            [
                'id'     => "1",
                'title'  => "Welcome Screen",
                'fields' => [
                    [
                        'id'    => 'first_name',
                        'type'  => 'short-text',
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
                        'type'  => 'file-upload',
                        'label' => 'Profile Image'
                    ]
                ]
            ],
            [
                'id'     => "3",
                'title'  => "Final Screen",
                'fields' => [
                    [
                        'id'    => 'contact-info',
                        'type'  => 'contact-info',
                        'label' => 'Contact'
                    ]
                ]
            ]
        ];
    }
}

