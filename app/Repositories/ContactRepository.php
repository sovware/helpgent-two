<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\Models\Guest;
use HelpGent\App\Models\Response;
use HelpGent\App\Models\User;
use HelpGent\App\Models\UserMeta;

class ContactRepository {
    public function get( int $per_page, int $page, int $max_per_page = 10, int $min_per_page = 10 ) {

        if ( $per_page > $max_per_page || $per_page < $min_per_page ) {
            $per_page = $max_per_page;
        }

        if ( 0 >= $page ) {
            $page = 1;
        }

        global $wpdb;

        $offset = ( $page - 1 ) * $per_page;

        $users =  User::query()
        ->select( 'users.ID as id', 'null as first_name', 'null as last_name', 'user_email as email', '"registered" as user_type', 'NULL as number', 'NULL as company' )
        ->where_exists( $this->response_exists() )->to_sql();

        $guests = Guest::query( 'guests' )->select( 'guests.id', 'guests.first_name', 'guests.last_name', 'guests.email', '"guest" as user_type', 'guests.number', 'guests.company' )->to_sql();

        $contacts = $wpdb->get_results( "({$users}) union all ({$guests}) limit {$per_page} offset {$offset}" );

        $user_ids = [];
        $users    = [];

        foreach ( $contacts as &$user ) {
            if ( 'registered' === $user->user_type ) {
                array_push( $users, $user );
                array_push( $user_ids, $user->id );
            } else {
                unset( $user->id );
            }
        }

        if ( ! empty( $user_ids ) ) {

            $users_meta = UserMeta::query()->where_in( 'user_id', $user_ids )->where_in( 'meta_key', ['first_name', 'last_name'] )->get();

            foreach ( $users as &$user ) {
                $meta = array_filter(
                    $users_meta, function ( $meta ) use( $user ) {
                        return $meta->user_id == $user->id;
                    }
                );

                foreach ( $meta as $item ) {
                    $user->{$item->meta_key} = $item->meta_value;
                }

                unset( $user->id );
            }
        }

        return $contacts;
    }

    public function export() {
        $temp_dir = helpgent_dir( "temp/contacts" );
        
        if ( ! is_dir( $temp_dir ) ) {
            mkdir( $temp_dir, 0777, true );
        }

        $file_name = "contacts-" . time() . ".csv";

        $csv_file = fopen( "$temp_dir/{$file_name}", 'w' );

        $total      = $this->total();
        $per_page   = 100000;
        $total_page = ceil( $total / $per_page ) + 1;

        $data = $this->get( $per_page, 1, $per_page );

        // Write the headers
        $headers = array_keys( (array) $data[0] );
        fputcsv( $csv_file, $headers );

        // Write the data
        $this->write_csv( $data, $csv_file );

        for ( $page = 2; $page < $total_page; $page++ ) { 
            $data = $this->get( $per_page, $page, $per_page );

            // Write the data
            $this->write_csv( $data, $csv_file );
        }

        fclose( $csv_file );

        return helpgent_url( "temp/contacts/{$file_name}" );
    }

    private function write_csv( array $data, $file ) {
        foreach ( $data as $row ) {
            fputcsv( $file, (array) $row );
        }
    }

    public function total() {
        return User::query()->where_exists( $this->response_exists() )->count() + Guest::query()->count();
    }

    protected function response_exists() {
        return Response::query( 'responses' )->select( 1 )->where_column( 'responses.created_by', 'users.id' )->limit( 1 );
    }
}
