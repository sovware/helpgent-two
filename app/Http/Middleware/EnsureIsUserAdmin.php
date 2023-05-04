<?php

namespace HelpGent\App\Http\Middleware;

use HelpGent\WaxFramework\Routing\Contracts\Middleware;
use WP_REST_Request;

class EnsureIsUserAdmin implements Middleware
{
    /**
    * Handle an incoming request.
    *
    * @param  WP_REST_Request  $wp_rest_request
    * @return bool
    */
    public function handle( WP_REST_Request $wp_rest_request ): bool {
        return current_user_can( 'manage_options' );
    }
}