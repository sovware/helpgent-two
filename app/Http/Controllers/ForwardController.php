<?php

namespace HelpGent\App\Http\Controllers;

use HelpGent\App\DTO\MessageDTO;
use HelpGent\App\DTO\MessageForwardDTO;
use HelpGent\App\DTO\ResponseDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\MessageRepository;
use HelpGent\App\Repositories\ForwardRepository;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class ForwardController extends Controller {
    public ForwardRepository $repository;

    public MessageRepository $message_repository;

    public ResponseRepository $response_repository;

    public function __construct( ForwardRepository $repository, MessageRepository $message_repository, ResponseRepository $response_repository ) {
        $this->repository          = $repository;
        $this->message_repository  = $message_repository;
        $this->response_repository = $response_repository;
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'parent_message_id' => 'required|numeric',
                'forward_to'        => 'required|string|accepted:user,response',
                'forward_to_id'     => 'required|numeric',
                'message'           => 'string'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $parent_message_id = (int) $wp_rest_request->get_param( 'parent_message_id' );
        $parent_message    = $this->message_repository->get_by_id( $parent_message_id );

        if ( ! $parent_message ) {
            return Response::send(
                [
                    'message' => esc_html__( "Sorry, Message not found", 'helpgent' )
                ], 500
            );
        }

        $forward_to       = $wp_rest_request->get_param( 'forward_to' );
        $forward_to_id    = (int) $wp_rest_request->get_param( 'forward_to_id' );
        $user             = helpgent_get_current_user();
        $message_response = $this->response_repository->get_by_id( $parent_message->response_id );

        if ( $user->is_user ) {
            if ( 'user' === $forward_to ) {
                return Response::send(
                    [
                        'message' => esc_html__( "Sorry, you are not allowed to send message any specific user", 'helpgent' )
                    ], 500
                );
            }

            if ( intval( $message_response->created_by ) !== $user->id || intval( $message_response->is_guest ) !== intval( $user->is_guest ) ) {
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
                        'message' => esc_html__( "Sorry, you can't forward messages in this message", 'helpgent' )
                    ], 500
                );
            }
        }

        if ( 'user' === $forward_to ) {
            $response_dto = new ResponseDTO( (int) $message_response->form_id, $forward_to_id, 0, 0, 'active' );
            $response_id  = $this->response_repository->create( $response_dto );

            $user_id  = $forward_to_id;
            $is_guest = 0;
        } else {
            $user_id     = $user->id;
            $is_guest    = $user->is_guest;
            $response_id = $forward_to_id;
        }

        $parent_forward_id = intval( $parent_message->forward_id );
        $message           = (string) $wp_rest_request->get_param( 'message' );
        $message_dto       = new MessageDTO( $response_id, $message, $user_id, 0, $is_guest );

        if ( ! empty( $message ) ) {
            $this->message_repository->create( $message_dto );
        }

        $message_dto->set_message( '' );

        if ( 0 !== $parent_forward_id ) {
            $message_dto->set_forward_id( $parent_forward_id );
        } else {
            $forward = $this->repository->get_by_message( (string) $parent_message->message, intval( $parent_message->attachment_id ) );

            if ( $forward ) {
                $forward_id = $forward->id;
            } else {
                $forward_dto = new MessageForwardDTO( $parent_message->message, $parent_message->attachment_id );
                $forward_id  = $this->repository->create( $forward_dto );
            }

            $message_dto->set_forward_id( $forward_id );
        }

        $this->message_repository->create( $message_dto );

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