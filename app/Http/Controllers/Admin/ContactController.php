<?php

namespace HelpGent\App\Http\Controllers\Admin;

use HelpGent\App\Async\ExportCSV;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Models\Guest;
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

    public function export() {
        $temp_dir = helpgent_dir( "temp/contacts" );
        
        if ( ! is_dir( $temp_dir ) ) {
            mkdir( $temp_dir, 0777, true );
        }

        $file_name = time();
        $file_name = "contacts-{$file_name}.csv";

        $csv_file = fopen( "$temp_dir/{$file_name}", 'w' );

        $total      = Guest::query()->count();
        $per_page   = 100000;
        $total_page = ceil( $total / $per_page ) + 1;

        $guests = Guest::query()->pagination( $per_page, 1, $per_page );

        // Write the headers
        $headers = array_keys( (array) $guests[0] );
        fputcsv( $csv_file, $headers );

        // Write the data
        foreach ( $guests as $row ) {
            fputcsv( $csv_file, (array) $row );
        }

        for ( $page = 2; $page < $total_page; $page++ ) { 
            $guests = Guest::query()->pagination( $per_page, $page, $per_page );

            // Write the data
            foreach ( $guests as $row ) {
                fputcsv( $csv_file, (array) $row );
            }
        }

        fclose( $csv_file );

        return Response::send(
            [
                'csv_path' =>  helpgent_url( "temp/contacts/{$file_name}" )
            ]
        );
    }
}