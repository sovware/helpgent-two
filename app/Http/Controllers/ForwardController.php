<?php

namespace HelpGent\App\Http\Controllers;

use HelpGent\App\DTO\ConversationDTO;
use HelpGent\App\DTO\ConversationForwardDTO;
use HelpGent\App\DTO\ResponseDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\ConversationRepository;
use HelpGent\App\Repositories\ForwardRepository;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class ForwardController extends Controller {
    public ForwardRepository $repository;

    public ConversationRepository $conversation_repository;

    public ResponseRepository $response_repository;

    public function __construct( ForwardRepository $repository, ConversationRepository $conversation_repository, ResponseRepository $response_repository ) {
        $this->repository              = $repository;
        $this->conversation_repository = $conversation_repository;
        $this->response_repository     = $response_repository;
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'conversation_id' => 'required|numeric',
                'forward_to'      => 'required|string|accepted:user,response',
                'forward_to_id'   => 'required|numeric',
                'message'         => 'string'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $conversation_id = (int) $wp_rest_request->get_param( 'conversation_id' );
        $conversation    = $this->conversation_repository->get_by_id( $conversation_id );

        if ( ! $conversation ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, Conversation not found", 'helpgent' )
                ], 500
            );
        }

        $forward_to            = $wp_rest_request->get_param( 'forward_to' );
        $forward_to_id         = (int) $wp_rest_request->get_param( 'forward_to_id' );
        $message               = (string) $wp_rest_request->get_param( 'message' );
        $user                  = helpgent_get_current_user();
        $conversation_response = $this->response_repository->get_by_id( $conversation->response_id );

        if ( $user->is_user ) {
            if ( 'user' === $forward_to ) {
                return Response::send(
                    [
                        'message' => esc_html__( "Sorry, you are not allowed to send message any specific user", 'helpgent' )
                    ], 500
                );
            }

            if ( intval( $conversation_response->created_by ) !== $user->id || intval( $conversation_response->is_guest ) !== intval( $user->is_guest ) ) {
                return Response::send(
                    [
                        'message' => esc_html__( "Sorry, you can't forward this message", 'helpgent' )
                    ], 500
                );
            }

            $response = $this->response_repository->get_by_id( $forward_to_id );

            if ( intval( $response->created_by ) !== $user->id || intval( $response->is_guest ) !== intval( $user->is_guest ) ) {
                return Response::send(
                    [
                        'message' => esc_html__( "Sorry, you can't forward messages in this conversation", 'helpgent' )
                    ], 500
                );
            }
        }

        if ( 'user' === $forward_to ) {
            $response_dto = new ResponseDTO( (int) $conversation_response->form_id, $forward_to_id, 0, 0, 'active' );
            $response_id  = $this->response_repository->create( $response_dto );

            $user_id  = $forward_to_id;
            $is_guest = 0;
        } else {
            $user_id     = $user->id;
            $is_guest    = $user->is_guest;
            $response_id = $forward_to_id;
        }

        $forward_dto = new ConversationForwardDTO( $conversation->id, $conversation->message, $conversation->attachment_id );
        $forward_id  = $this->repository->create( $forward_dto );

        $conversation_dto = new ConversationDTO( $response_id, $message, $user_id, 0, $is_guest, 0, $forward_id );
        $this->conversation_repository->create( $conversation_dto );

        return Response::send(
            [
                'message' => esc_html__( "Messages forward successfully!", "helpgent" )
            ] 
        );
    }

    public function users( Validator $validator, WP_REST_Request $wp_rest_request ) {
        if ( helpgent_get_current_user()->is_user ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, you are not eligible to get the users list", 'helpgent' )
                ], 500
            );
        }

        $validator->validate(
            [
                'search'   => 'string',
                'per_page' => 'integer',
                'page'     => 'integer'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        return Response::send(
            $this->repository->users(
                intval( $wp_rest_request->get_param( 'per_page' ) ), 
                intval( $wp_rest_request->get_param( 'page' ) ),
                (string) $wp_rest_request->get_param( 'search' )
            )
        );
    }

    public function responses( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'search'      => 'string',
                'per_page'    => 'integer',
                'page'        => 'integer',
                'response_id' => 'required|integer'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $user = helpgent_get_current_user();

        return Response::send(
            $this->repository->responses(
                intval( $wp_rest_request->get_param( 'response_id' ) ),
                intval( $wp_rest_request->get_param( 'per_page' ) ), 
                intval( $wp_rest_request->get_param( 'page' ) ),
                (string) $wp_rest_request->get_param( 'search' ),
                $user->is_user ? $user->id : 0,
                $user->is_guest
            )
        );
    }
}