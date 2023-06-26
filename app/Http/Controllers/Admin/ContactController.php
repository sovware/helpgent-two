<?php

namespace HelpGent\App\Http\Controllers\Admin;

use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\ContactRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class ContactController extends Controller {
    public ContactRepository $contact_repository;

    public function __construct( ContactRepository $contact_repository ) {
        $this->contact_repository = $contact_repository;
    }

    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'per_page' => 'numeric|min:1',
                'page'     => 'numeric|min:1'
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
            $this->contact_repository->get(
                intval( $wp_rest_request->get_param( 'per_page' ) ), 
                intval( $wp_rest_request->get_param( 'page' ) ), 
            )
        );
    }
}