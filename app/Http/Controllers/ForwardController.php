<?php

namespace HelpGent\App\Http\Controllers;

use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\ForwardRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class ForwardController extends Controller {
    public ForwardRepository $repository;

    public function __construct( ForwardRepository $repository ) {
        $this->repository = $repository;
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
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