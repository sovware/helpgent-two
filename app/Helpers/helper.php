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

/**
 * @param string $path_type path | url
 * @return string Path
 */
function helpgent_get_upload_dir( string $path_type = 'path' ) : string {
	return helpgent_config( "storage.upload_dir_{$path_type}" );
}

/**
 * @param string $file_name
 * @param string $path_type path | url
 * @return string Path
 */
function helpgent_get_attachment_path( string $file_name, string $path_type = 'path' ) : string {
	return helpgent_get_upload_dir( $path_type ) . "/{$file_name}";
}

/**
 * @return int|null
 */
function helpgent_get_attachment_id( string $file_name ) {
	return 1;
}

function helpgent_render_media_file( string $file_path, bool $download = false ) : void {
	if ( ! is_file( $file_path ) ) {
		return;
	}

	ignore_user_abort( true );
	set_time_limit( 0 ); // disable the time limit for this script
	
	$mime = wp_check_filetype( $file_path );

	if ( false === $mime['type'] && function_exists( 'mime_content_type' ) ) {
		$mime['type'] = mime_content_type( $file_path );
	}
	if ( $mime['type'] ) {
		$mimetype = $mime['type'];
	} else {
		$mimetype = 'image/' . substr( $file_path, strrpos( $file_path, '.' ) + 1 );
	}

	header( 'Content-Type: ' . $mimetype );

	$download = ( ! empty( $_GET['download'] ) ) ? $_GET['download'] : $download;

	if ( $download || ( helpgent_is_file_image( $file_path ) == false && helpgent_is_mime_type_pdf( $mimetype ) == false && helpgent_is_mime_type_video( $mimetype ) == false && helpgent_is_mime_type_audio( $mimetype ) == false ) ) {
		$file_name = wp_basename( $file_path );
		header( "Content-Disposition: attachment; filename=$file_name" );
	}

	if ( false === strpos( $_SERVER['SERVER_SOFTWARE'], 'Microsoft-IIS' ) ) {
		header( 'Content-Length: ' . filesize( $file_path ) );
	}

	$last_modified = gmdate( 'D, d M Y H:i:s', filemtime( $file_path ) );
	$etag          = '"' . md5( $last_modified ) . '"';

	header( "Last-Modified: $last_modified GMT" );
	header( 'ETag: ' . $etag );
	header( 'Expires: ' . gmdate( 'D, d M Y H:i:s', time() + 100000000 ) . ' GMT' );
	header( 'X-Robots-Tag: none' );

	// Support for Conditional GET
	$client_etag = isset( $_SERVER['HTTP_IF_NONE_MATCH'] ) ? stripslashes( $_SERVER['HTTP_IF_NONE_MATCH'] ) : false;
	
	if ( ! isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) ) {
		$_SERVER['HTTP_IF_MODIFIED_SINCE'] = false;
	}

	$client_last_modified = trim( $_SERVER['HTTP_IF_MODIFIED_SINCE'] );
	
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


function helpgent_is_file_image( $file_path ) {
	preg_match( '/\.(gif|jpg|jpe?g|tiff|png|bmp|webp)$/i', $file_path, $matches );
	return ! empty( $matches );
}

function helpgent_is_mime_type_pdf( $mime_type ) {
	return $mime_type == "application/pdf";
}

function helpgent_is_mime_type_video( $mime_type ) {
	return strstr( $mime_type, "video/" );
}

function helpgent_is_mime_type_audio( $mime_type ) {
	return strstr( $mime_type, "audio/" );
}