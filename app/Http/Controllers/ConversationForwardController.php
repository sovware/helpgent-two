<?php

namespace HelpGent\App\Http\Controllers;

use HelpGent\App\Http\Controllers\Controller;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class ConversationForwardController extends Controller {
    public function index() {
        //
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
}