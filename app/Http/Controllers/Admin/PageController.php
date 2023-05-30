<?php

namespace HelpGent\App\Http\Controllers\Admin;

use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Models\Post;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class PageController extends Controller {
    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'ids'    => 'array',
                'search' => 'string'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $page = Post::query()->select( 'ID as id, post_title as title' )
            ->where( 'post_type', 'page' )
            ->order_by_desc( 'id' );
            
        if ( $wp_rest_request->has_param( 'ids' ) ) {
            $ids = map_deep( $wp_rest_request->get_param( 'ids' ), 'intval' );
            $page->where_in( 'ID', $ids );
        } elseif ( $wp_rest_request->has_param( 'search' ) ) {
            $page->where( 'post_title', 'like', "%{$wp_rest_request->get_param('search')}%" )->limit( 10 );
        } else {
            $page->limit( 10 );
        }
    
        return Response::send(
            [
                'pages' => $page->get()
            ]
        );
    }
}