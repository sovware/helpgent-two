<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\Models\Guest;
use HelpGent\App\Models\Response;
use HelpGent\App\Models\User;

class ContactRepository {
    public function get( int $per_page, int $page ) {
        $max_per_page = 100;
        $min_per_page = 10;

        if ( $per_page > $max_per_page || $per_page < $min_per_page ) {
            $per_page = $max_per_page;
        }

        if ( 0 >= $page ) {
            $page = 1;
        }
    
        $offset = ( $page - 1 ) * $per_page;

        $response_exists = Response::query( 'responses' )->select( 1 )->where_column( 'responses.created_by', 'users.id' )->limit( 1 );

        $users =  User::query()
        ->select( 'users.display_name as first_name', 'user_email as email', '"registered" as user_type', 'NULL as number', 'NULL as company' )
        ->where_exists( $response_exists )->to_sql();

        $guests = Guest::query( 'guests' )->select( 'guests.first_name', 'guests.email', '"guest" as user_type', 'guests.number', 'guests.company' )->to_sql();

        $sql       = "({$users}) union all ({$guests}) limit {$per_page} offset {$offset}";
        $count_sql = "SELECT COUNT(*) AS total_count FROM (({$users}) union all ({$guests})) AS subquery";

        global $wpdb;

        return [
            'contacts' => $wpdb->get_results( $sql ), // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
            'total'    => $wpdb->get_var( $count_sql ) // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
        ];
    }
}