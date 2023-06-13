<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\Models\Guest;
use HelpGent\App\Models\Submission;
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

        $submission_exists = Submission::query( 'submissions' )->select( 1 )->where_column( 'submissions.created_by', 'users.id' )->limit( 1 );

        $users =  User::query()
        ->select( 'users.display_name as name', 'user_email as email', '"registered" as user_type', 'NULL as phone' )
        ->where_exists( $submission_exists )->to_sql();

        $guests = Guest::query( 'guests' )->select( 'guests.name', 'guests.email', '"guest" as user_type', 'guests.phone' )->to_sql();

        $sql       = "({$users}) union all ({$guests}) limit {$per_page} offset {$offset}";
        $count_sql = "SELECT COUNT(*) AS total_count FROM (({$users}) union all ({$guests})) AS subquery";

        global $wpdb;        

        return [
            'contacts' => $wpdb->get_results( $sql ), // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
            'total'    => $wpdb->get_var( $count_sql ) // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
        ];
    }
}