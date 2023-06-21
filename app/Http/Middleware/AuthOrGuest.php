<?php

namespace HelpGent\App\Http\Middleware;

use WP_REST_Request;
use HelpGent\WaxFramework\Routing\Contracts\Middleware;

class AuthOrGuest implements Middleware {
    /**
    * Handle an incoming request.
    *
    * @param  WP_REST_Request  $wp_rest_request
    * @return bool
    */
    public function handle( WP_REST_Request $wp_rest_request ): bool {
        return is_user_logged_in() || ! empty( helpgent_get_valid_guest() );
    }
}