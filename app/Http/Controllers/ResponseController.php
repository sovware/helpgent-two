<?php

namespace HelpGent\App\Http\Controllers;

use Exception;
use HelpGent\App\DTO\ResponseDTO;
use HelpGent\App\DTO\ResponseReadDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Models\Guest;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\QuestionAnswerRepository;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\App\Support\Question\Question;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;
use stdClass;

class ResponseController extends Controller {
    public ResponseRepository $response_repository;

    public FormRepository $form_repository;

    public QuestionAnswerRepository $question_answer_repository;

    public WP_REST_Request $wp_rest_request;

    public stdClass $form;

    private string $token;

    private int $response_id;

    public function __construct( ResponseRepository $response_repository, FormRepository $form_repository, QuestionAnswerRepository $question_answer_repository ) {
        $this->response_repository        = $response_repository;
        $this->form_repository            = $form_repository;
        $this->question_answer_repository = $question_answer_repository;
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
            $response_read_dto = new ResponseReadDTO(
                intval( $wp_rest_request->get_param( 'per_page' ) ),
                intval( $wp_rest_request->get_param( 'page' ) ),
                $wp_rest_request->get_param( 'order_by' ),
                'active',
                [],
                (string) $wp_rest_request->get_param( 'search' )
            );
            $response_read_dto->set_created_by( $user->id );
            $response_read_dto->set_is_guest( $user->is_guest );
        } else {
            $response_read_dto = new ResponseReadDTO(
                intval( $wp_rest_request->get_param( 'per_page' ) ),
                intval( $wp_rest_request->get_param( 'page' ) ),
                $wp_rest_request->get_param( 'order_by' ),
                $wp_rest_request->get_param( 'status' ),
                $wp_rest_request->has_param( 'tag_ids' ) ? $wp_rest_request->get_param( 'tag_ids' ) : [],
                (string) $wp_rest_request->get_param( 'search' )
            );

            if ( $wp_rest_request->has_param( 'form_id' ) ) {
                $response_read_dto->set_form_id( intval( $wp_rest_request->get_param( 'form_id' ) ) );
            }
        }

        return Response::send(
            $this->response_repository->get( $response_read_dto )
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
                'form_id'           => 'required|numeric',
                'screen_id'         => 'required|string',
                'hg-response-token' => 'string',
                'submit'            => 'accepted:1',
                'delete'            => 'accepted:1'
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

        if ( $wp_rest_request->has_param( 'hg-response-token' ) ) {
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
             * Creating a new response.
             */
            $form_id = intval( $this->wp_rest_request->get_param( 'form_id' ) );

            $response_dto = new ResponseDTO(
                $form_id,
                get_current_user_id()
            );

            $response_id = $this->response_repository->create( $response_dto );

            /**
             * Storing response response.
             */
            $field_handler->save_answer( $this->wp_rest_request, $field, $response_id );

            /**
             * Generating and storing token to identify the subsequent response on this response.
             */
            $token = 'response_token-' . helpgent_generate_token();

            $this->form_repository->add_meta( $this->form->id, $token, $response_id );

            $this->token       = $token;
            $this->response_id = $response_id;

            $this->submit_form( $form_id, $response_id, $this->token );

            return Response::send( compact( 'token' ), 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ], $exception->getCode()
            );
        }
    }

    private function process_token_request() {
        $response = $this->get_response_by_token();

        if ( ! $response ) {
            return Response::send(
                [
                    'message' => esc_html__( "Response Not Found", "helpgent" )
                ], 404
            );
        }

        $form_id = intval( $this->wp_rest_request->get_param( 'form_id' ) );

        if ( $form_id != $response->form_id ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, Something was wrong!", "helpgent" )
                ], 404
            );
        }

        if ( $this->wp_rest_request->has_param( 'delete' ) ) {
            return $this->delete_response( $response );
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
             * Storing response response.
             */
            $field_handler->save_answer( $this->wp_rest_request, $field, $response->id );

            $this->submit_form( $form_id, $response->id, $this->wp_rest_request->get_param( 'hg-response-token' ) );

            return Response::send( [], 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ], $exception->getCode()
            );
        }
    }

    private function submit_form( $form_id, $response_id, $token ) {
        if ( ! $this->wp_rest_request->has_param( 'submit' ) ) {
            return;
        }

        $response = $this->response_repository->get_by_id( $response_id );

        if ( is_user_logged_in() ) {

            $user = wp_get_current_user();

            if ( $user->ID !== intval( $response->created_by ) ) {
                $this->response_repository->update_create_by( $response->id, $user->ID );
            }

            $this->response_repository->update_status( $response->id, 'active' );

            $auth_token = null;
        } else {
            $contact_info_submit = $this->response_repository->get_meta_value( $response->id ,'contact_info_submit' );

            if ( ! $contact_info_submit ) {
                throw new Exception( esc_html__( "Guest user required contact information", 'helpgent' ), 500 );
            }

            $guest = Guest::query()->where( 'id', $response->created_by )->first();

            if ( ! $guest ) {
                throw new Exception( esc_html__( "Guest user not found", 'helpgent' ), 404 );
            }

            $auth_token = $guest->token;

            $this->response_repository->update_status( $response->id, 'unverified' );
        }

        $this->form_repository->delete_meta( $form_id, $token );
        $this->response_repository->delete_meta( $response->id, 'contact_info_submit' );
        $this->response_repository->add_meta( $response->id, 'token', $token );

        $response->token = $token;

        do_action( 'helpgent_after_submit_form', $response, $auth_token );
    }

    private function get_response_by_token() {
        $token       = $this->wp_rest_request->get_param( 'hg-response-token' );
        $response_id = $this->form_repository->get_meta_value( $this->form->id, $token );
        return $this->response_repository->get_by_id( $response_id );
    }

    private function delete_response( stdClass $response ) {
        $this->question_answer_repository->delete_screen( $response->id, intval( $this->wp_rest_request->get_param( 'screen_id' ) ) );
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

    private function field_handler( string $field_type ):Question {
        $field_handler_class = helpgent_config( "response-fields-handlers.{$field_type}" );

        if ( ! class_exists( $field_handler_class ) ) {
            throw new Exception( __( 'Field handler not found', 'helpgent' ), 500 );
        }

        $field_handler = helpgent_make( $field_handler_class );

        if ( ! $field_handler instanceof Question ) {
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

