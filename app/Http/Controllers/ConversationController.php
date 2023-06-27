<?php

namespace HelpGent\App\Http\Controllers;

use Exception;
use HelpGent\App\DTO\ConversationDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Models\Conversation;
use HelpGent\App\Repositories\ConversationRepository;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class ConversationController extends Controller {
    public ResponseRepository $response_repository;

    public ConversationRepository $conversation_repository;

    public function __construct( ConversationRepository $conversation_repository, ResponseRepository $response_repository ) {
        $this->conversation_repository = $conversation_repository;
        $this->response_repository     = $response_repository;
    }

    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'response_id' => 'required|numeric',
                'per_page'    => 'numeric',
                'page'        => 'numeric',
                'search'      => 'string'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $user        = helpgent_get_current_user();
        $response_id = intval( $wp_rest_request->get_param( 'response_id' ) );

        if ( $user->is_user && ! $this->response_repository->verify_user( $response_id, $user->id, $user->is_guest ) ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, you are not allowed access this response conversations", 'helpgent' )
                ], 500
            );
        }

        return Response::send(
            $this->conversation_repository->get( 
                $response_id, 
                intval( $wp_rest_request->get_param( 'per_page' ) ), 
                intval( $wp_rest_request->get_param( 'page' ) ), 
                (string) $wp_rest_request->get_param( 'search' ) 
            )
        );
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'response_id'   => 'required|numeric',
                'message'       => 'string',
                'attachment_id' => 'integer',
                'parent_id'     => 'integer|min:1'
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
         * Requested message and attachment validation
         */
        $attachment_id = intval( $wp_rest_request->get_param( 'attachment_id' ) );
        $message       = (string) $wp_rest_request->get_param( 'message' );
        
        if ( empty( $message ) && 0 >= $attachment_id ) {
            return Response::send(
                [
                    'messages' => [
                        'message' => [
                            "The message field is required"
                        ]
                    ]
                ], 422
            );
        }

        $user        = helpgent_get_current_user();
        $response_id = intval( $wp_rest_request->get_param( 'response_id' ) );

        if ( $user->is_user && ! $this->response_repository->verify_user( $response_id, $user->id, $user->is_guest ) ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, you are not allowed access this response conversations", 'helpgent' )
                ], 500
            );
        }
    
        $conversation_dto = new ConversationDTO(
            $response_id,
            $message,
            $user->id,
            $attachment_id,
            $user->is_guest,
            intval( $wp_rest_request->get_param( 'parent_id' ) )
        );

        try {
            do_action( 'helpgent_before_store_conversation', $conversation_dto, $wp_rest_request );
            
            $conversation_id = $this->conversation_repository->create( $conversation_dto );

            $conversation_dto->set_id( $conversation_id );

            do_action( 'helpgent_after_store_conversation', $conversation_dto, $wp_rest_request );
            return Response::send( [], 201 );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function update( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'          => 'required|numeric',
                'response_id' => 'required|numeric',
                'message'     => 'required|string'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $user        = helpgent_get_current_user();
        $response_id = intval( $wp_rest_request->get_param( 'response_id' ) );

        if ( $user->is_user && ! $this->response_repository->verify_user( $response_id, $user->id, $user->is_guest ) ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, you are not allowed access this response conversations", 'helpgent' )
                ], 500
            );
        }

        $message = $wp_rest_request->get_param( 'message' );

        $conversation_dto = new ConversationDTO( $response_id, $message );

        $conversation_dto->set_id( intval( $wp_rest_request->get_param( 'id' ) ) );

        try {
            do_action( 'helpgent_before_update_conversation', $conversation_dto, $wp_rest_request );

            $this->conversation_repository->update( $conversation_dto );

            do_action( 'helpgent_before_update_conversation', $conversation_dto, $wp_rest_request );
            return Response::send(
                [
                    'message' => esc_html__( "Conversation updated successfully!", 'helpgent' )
                ] 
            );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function delete( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'          => 'required|numeric',
                'response_id' => 'required|numeric'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $user        = helpgent_get_current_user();
        $response_id = intval( $wp_rest_request->get_param( 'response_id' ) );

        if ( $user->is_user && ! $this->response_repository->verify_user( $response_id, $user->id, $user->is_guest ) ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, you are not allowed access this response conversations", 'helpgent' )
                ], 500
            );
        }
    
        try {
            $this->conversation_repository->delete( intval( $wp_rest_request->get_param( 'id' ) ), $response_id );
            return Response::send( [] );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function attachment( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'type'        => 'required|string',
                'response_id' => 'required|numeric'
            ]
        );
    
        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $user        = helpgent_get_current_user();
        $response_id = intval( $wp_rest_request->get_param( 'response_id' ) );

        if ( $user->is_user && ! $this->response_repository->verify_user( $response_id, $user->id, $user->is_guest ) ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, you are not allowed access this response conversations", 'helpgent' )
                ], 500
            );
        }

        return Response::send(
            $this->conversation_repository->attachment( 
                $response_id, 
                $wp_rest_request->get_param( 'type' ),
                intval( $wp_rest_request->get_param( 'per_page' ) ), 
                intval( $wp_rest_request->get_param( 'page' ) )
            )
        );
    }

    public function get_by_id( int $id ) {
        return Conversation::query()->where( 'id', $id )->first();
    }
}