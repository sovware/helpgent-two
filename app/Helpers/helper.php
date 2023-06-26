<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Repositories\AttachmentRepository;
use HelpGent\App\Repositories\SettingsRepository;
use HelpGent\WaxFramework\App;
use HelpGent\DI\Container;
use HelpGent\App\Utils\DateTime;
use HelpGent\App\Models\Guest;
use HelpGent\App\Utils\User;

function helpgent():App {
    return App::$instance;
}

function helpgent_config( string $config_key ) {
    return helpgent()::$config->get( $config_key );
}

function helpgent_app_config( string $config_key ) {
    return helpgent_config( "app.{$config_key}" );
}

function helpgent_version() {
    return helpgent_app_config( 'version' );
}

function helpgent_container():Container {
    return helpgent()::$container;
}

function helpgent_singleton( string $class ) {
    return helpgent_container()->get( $class );
}

function helpgent_make( string $class ) {
    return helpgent_container()->make( $class );
}

function helpgent_url( string $url = '' ) {
    return helpgent()::get_url( $url );
}

function helpgent_dir( string $dir = '' ) {
    return helpgent()::get_dir( $dir );
}

function helpgent_render( string $content ) {
    //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    echo $content;
}

/**
 * @param string $file
 * @return string Path
 */
function helpgent_upload_dir( string $file = '' ) : string {
    return WP_CONTENT_DIR . '/uploads/helpgent/' . \ltrim( $file, '/' );
}

/**
 * @param string $file
 * @return string Path
 */
function helpgent_upload_url( string $file = '' ) : string {
    return WP_CONTENT_URL . '/uploads/helpgent/' . \ltrim( $file, '/' );
}

/**
 * @return int|null
 */
function helpgent_get_attachment_id( string $file_name ) {
    $attachment_repository = helpgent_singleton( AttachmentRepository::class );
    $attachment            = $attachment_repository->get_by_title( $file_name );

    if ( empty( $attachment ) ) {
        return null;
    }

    return ( int ) $attachment->id;
}

function helpgent_render_media_file( string $file_path, bool $download = false ) : void {
    if ( ! is_file( $file_path ) ) {
        return;
    }

    ignore_user_abort( true );
    set_time_limit( 0 ); // disable the time limit for this script

    $mimetype = helpgent_get_file_mime_type( $file_path );

    header( 'Content-Type: ' . $mimetype );

    // phpcs:ignore WordPress.Security.NonceVerification.Recommended, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
    $download = ( ! empty( $_GET['download'] ) ) ? $_GET['download'] : $download;

    if ( $download || ! helpgent_is_the_file_printable( $file_path ) ) {
        $file_name = wp_basename( $file_path );
        header( "Content-Disposition: attachment; filename=$file_name" );
    }

    // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
    if ( isset( $_SERVER['SERVER_SOFTWARE'] ) && false === strpos( wp_unslash( $_SERVER['SERVER_SOFTWARE'] ), 'Microsoft-IIS' ) ) {
        header( 'Content-Length: ' . filesize( $file_path ) );
    }

    $last_modified = gmdate( 'D, d M Y H:i:s', filemtime( $file_path ) );
    $etag          = '"' . md5( $last_modified ) . '"';

    header( "Last-Modified: $last_modified GMT" );
    header( 'ETag: ' . $etag );
    header( 'Expires: ' . gmdate( 'D, d M Y H:i:s', time() + 100000000 ) . ' GMT' );
    header( 'X-Robots-Tag: none' );

    // Support for Conditional GET
    // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
    $client_etag = isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) ? wp_unslash( $_SERVER['HTTP_IF_NONE_MATCH'] ) : false;
    
    if ( ! isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) ) {
        $_SERVER['HTTP_IF_MODIFIED_SINCE'] = false;
    }

    // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
    $client_last_modified = trim( wp_unslash( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) );
    
    // If string is empty, return 0. If not, attempt to parse into a timestamp
    $client_modified_timestamp = $client_last_modified ? strtotime( $client_last_modified ) : 0;
    
    // Make a timestamp for our most recent modification...
    $modified_timestamp = strtotime( $last_modified );

    if ( ( $client_last_modified && $client_etag )
        ? ( ( $client_modified_timestamp >= $modified_timestamp ) && ( $client_etag == $etag ) )
        : ( ( $client_modified_timestamp >= $modified_timestamp ) || ( $client_etag == $etag ) )
    ) {
        status_header( 304 );
        exit;
    }

    status_header( 200 );
    readfile( $file_path );

    exit;
}

function helpgent_is_the_file_printable( string $file_path ) : bool {
    // Check if file is image
    preg_match( '/\.(gif|jpg|jpe?g|tiff|png|bmp|webp)$/i', $file_path, $matches );

    if ( ! empty( $matches ) ) {
        return true;
    }

    $mime_type = helpgent_get_file_mime_type( $file_path );

    // Check if file is PDF
    if ( $mime_type == "application/pdf" ) {
        return true;
    }
    
    // Check if file is video
    if ( strstr( $mime_type, "video/" ) ) {
        return true;
    }

    // Check if file is audio
    if ( strstr( $mime_type, "audio/" ) ) {
        return true;
    }

    return false;
}

function helpgent_get_file_mime_type( string $file_path ) : string {
    $mime = wp_check_filetype( $file_path );

    if ( false === $mime['type'] && function_exists( 'mime_content_type' ) ) {
        $mime['type'] = mime_content_type( $file_path );
    }

    if ( $mime['type'] ) {
        $mime_type = $mime['type'];
    } else {
        $mime_type = 'image/' . substr( $file_path, strrpos( $file_path, '.' ) + 1 );
    }

    return $mime_type;
}

function helpgent_include_media_uploader_files() : void {
    require_once( ABSPATH . "wp-admin" . '/includes/image.php' );
    require_once( ABSPATH . "wp-admin" . '/includes/file.php' );
    require_once( ABSPATH . "wp-admin" . '/includes/media.php' );
}

function helpgent_prepare_upload_directory() : void {
    if ( is_dir( helpgent_upload_dir() ) ) {
        return;
    }

    // Create Upload Directory
    wp_mkdir_p( helpgent_upload_dir() );
}

function helpgent_get_unique_key( string $prefix = '' ) {
    return $prefix . '_' . time();
}

function helpgent_get_extension_from_path( string $path ) : string {
    return pathinfo( $path, PATHINFO_EXTENSION );
}

function helpgent_get_server_name() {
    global $is_apache;

    if ( $is_apache ) {
        return 'apache';
    }

    // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
    $server_info = isset( $_SERVER['SERVER_SOFTWARE'] ) ? wp_unslash( $_SERVER['SERVER_SOFTWARE'] ) : '';

    $servers = [
        'nginx',
        'iis',
    ];

    foreach ( $servers as $server ) {
        if ( strpos( strtolower( $server_info ), $server ) !== false ) {
            return $server;
        }
    }

    return '';
}

function helpgent_get_setting( string $key, $default = null ) {
    /**
     * @var SettingsRepository $setting_repository
     */
    $setting_repository = helpgent_singleton( SettingsRepository::class );
    $settings           = $setting_repository->db_settings();
    return isset( $settings[$key] ) ? $settings[$key] : $default;
}

function helpgent_get_current_page_id() {
    $page_id = 0;

    // Check if we are on a WooCommerce page
    if ( function_exists( 'is_woocommerce' ) ) {
        if ( is_cart() ) {
            $page_id = wc_get_page_id( 'cart' );
        } elseif ( is_checkout() ) {
            $page_id = wc_get_page_id( 'checkout' );
        } elseif ( is_account_page() ) {
            $page_id = wc_get_page_id( 'myaccount' );
        } elseif ( is_shop() ) {
            $page_id = wc_get_page_id( 'shop' );
        }
    }

    if ( $page_id === 0 ) {
        $page_id = get_queried_object_id();
    }

    return $page_id;
}

/**
 * Get current user ip address
 *
 * @return string|null
 */
function helpgent_user_ip_address() {
    // Check for shared Internet/ISP IP
    if ( ! empty( $_SERVER['HTTP_CLIENT_IP'] ) && filter_var( $_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP ) ) { //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        return sanitize_text_field( wp_unslash( $_SERVER['HTTP_CLIENT_IP'] ) );
    }

    // Check for IP addresses passed by proxies
    if ( ! empty( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) { //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        // Extract IP addresses
        $ip_addresses = explode(
            ',', sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_FORWARDED_FOR'] ) )
        );

        // Check each IP address
        foreach ( $ip_addresses as $ip ) {
            $ip = trim( $ip );
            if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
                return $ip;
            }
        }
    }

    // Check for the remote IP address
    if ( ! empty( $_SERVER['REMOTE_ADDR'] ) && filter_var( $_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP ) ) { //phpcs:ignore WordPress.Security.ValidatedSanitizedInput.MissingUnslash
        return sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) );
    }

    return null;
}

function helpgent_generate_token() {
    $time   = microtime( true );
    $random = bin2hex( random_bytes( 5 ) );
    $token  = $random . $time;
    return $token;
}

function helpgent_now() {
    return DateTime::now();
}

function helpgent_get_valid_guest() {
    if ( empty( $_REQUEST['token'] ) ) { //phpcs:ignore WordPress.Security.NonceVerification.Recommended
        return null;
    }

    global $helpgent_guest_user;

    if ( $helpgent_guest_user ) {
        return $helpgent_guest_user;
    }

    $token = sanitize_text_field( wp_unslash( $_REQUEST['token'] ) ); //phpcs:ignore WordPress.Security.NonceVerification.Recommended

    $helpgent_guest_user = Guest::query()->where( 'token', $token )->where( 'token_expires_at', '>', date( 'Y-m-d H:i:s', time() ) )->first();

    return $helpgent_guest_user;
}

/**
 * Get current user data.
 *
 * @return User|bool
 */
function helpgent_get_current_user() {
    global $helpgent_user;

    if ( ! is_null( $helpgent_user ) ) {
        return $helpgent_user;
    }

    $guest = helpgent_get_valid_guest();

    $user = false;

    if ( $guest ) {
        $user = new User(
            $guest->id,
            $guest->email,
            $guest->first_name,
            $guest->last_name,
            "",
            ['helpgent_guest'],
            $guest->created_at,
            true,
            true
        );
    } else {
        $registered_user = wp_get_current_user();

        if ( ! $registered_user ) {
            return $user;
        }

        $user = new User(
            $registered_user->ID,
            $registered_user->user_email,
            $registered_user->display_name,
            "",
            $registered_user->user_nicename,
            $registered_user->roles,
            $registered_user->user_registered,
            ! in_array( 'administrator', $registered_user->roles )
        );
    }

    $helpgent_user = $user;

    return $user;
}