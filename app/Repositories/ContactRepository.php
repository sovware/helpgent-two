<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\Models\Guest;
use HelpGent\App\Models\Submission;
use HelpGent\App\Models\User;

class ContactRepository {
    public function get() {
        $submission_exists = Submission::query( 'submissions' )->select( 1 )->where_column( 'submissions.created_by', 'users.id' )->limit( 1 );

        $users =  User::query()
        ->select( 'users.display_name as name', 'user_email as email', '"registered" as user_type', 'NULL as phone' )
        ->where_exists( $submission_exists )->to_sql();

        $guests = Guest::query( 'guests' )->select( 'guests.name', 'guests.email', '"guest" as user_type', 'guests.phone' )->to_sql();

        $sql = "({$users}) union all ({$guests})";

        global $wpdb;

        //phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared
        return $wpdb->get_results( $sql );
    }
}