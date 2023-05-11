<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\WaxFramework\App;
use HelpGent\DI\Container;

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

function helpgent_url( string $url = '' ) {
    return helpgent()->get_url( $url );
}

function helpgent_dir( string $dir = '' ) {
    return helpgent()->get_dir( $dir );
}

function helpgent_render( string $content ) {
    //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    echo $content;
}

function helpgent_include_media_uploader_files() : void {
    require_once( ABSPATH . 'wp-admin/includes/image.php' );
    require_once( ABSPATH . 'wp-admin/includes/file.php' );
    require_once( ABSPATH . 'wp-admin/includes/media.php' );
}

function helpgent_prepare_upload_directory() : void {
    $upload_dir_path = helpgent_config( 'storage.upload_dir_path' );

    if ( file_exists( $upload_dir_path ) ) {
        return;
    }

    helpgent_create_upload_directory();
}

function helpgent_create_upload_directory() : void {
    $upload_dir_path = helpgent_config( 'storage.upload_dir_path' );

    // Create Upload Directory
    wp_mkdir_p( $upload_dir_path );

    // Create htaccess file
    $fh = fopen( $upload_dir_path . "/.htaccess", "w" );

    if ( $fh == false ) {
        return;
    }

    fputs( $fh, 'Deny from all' );
    fclose( $fh );
}

function helpgent_get_unique_key( string $prefix = '' ) : string {
    return $prefix . '_' . time();
}

function helpgent_get_extension_from_path( string $path ) : string {
    return pathinfo( $path, PATHINFO_EXTENSION );
}

function helpgent_exclude_extension_from_path( string $path ) : string {
    return preg_replace( '/[.]\w+$/', '', $path );
}

function helpgent_get_extension_from_mime_type( string $mime_type ) : string {
    return preg_replace( '/.+\//', '', $mime_type );
}