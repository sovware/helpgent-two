<?php

namespace HelpGent\App\Async;

use HelpGent\App\Models\Guest;
use HelpGent\WP_Background_Process;

class ExportCSV extends WP_Background_Process
{
    /**
     * @var string
     */
    protected $action = 'helpgent';

    protected function task( $item ) {
        sleep( 2 );

        ini_set( 'memory_limit', '512M' );

        error_log( "Start" );

        $total     = Guest::query()->count();
        $per_query = 50000;
        $guest     = Guest::query()
        // ->limit(100000)
        ->get();

        $fp = fopen( __DIR__ . '/data.csv', 'w' );

        // Write the headers
        $headers = array_keys( (array) $guest[0] );
        fputcsv( $fp, $headers );

        // Write the data
        foreach ( $guest as $row ) {
            fputcsv( $fp, (array) $row );
        }

        // Close the file pointer
        fclose( $fp );
        error_log( "End" );
        return false;
        // error_log(time());
        // $guest = Guest::query()->get();
        // error_log(time());
        // if ( Guest::query()->count() > 1000000 ) {
        //     return false;
        // }
        // Guest::query()->where('1', '1')->update(['updated_at' => helpgent_now()]);
        // error_log( time() );
    }

    function random_data() {
        $data = [];
        for ( $i = 0; $i < 2000; $i++ ) {
            $data[] = [
                "first_name"       => ucfirst( $this->str_random( 10 ) ),
                "last_name"        => ucfirst( $this->str_random( 10 ) ),
                "email"            => md5( uniqid() ) . "@gmail.com",
                "number"           => rand( 1000000000, 9999999999 ),
                "company"          => $this->str_random( 10 ),
                "token"            => md5( uniqid() ),
                "token_expires_at" => date( "Y-m-d H:i:s", strtotime( "+1 day" ) ),
                "created_at"       => date( "Y-m-d H:i:s" ),
            ];
        }
        return $data;
    }

    function str_random( $length = 16 ) {
        $pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return substr( str_shuffle( str_repeat( $pool, 5 ) ), 0, $length );
    }
}