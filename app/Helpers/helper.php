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

/**
 * Include Media Uploader Files
 *
 * @return void
 */
function helpgent_include_media_uploader_files() {
	require_once( ABSPATH . "wp-admin" . '/includes/image.php' );
	require_once( ABSPATH . "wp-admin" . '/includes/file.php' );
	require_once( ABSPATH . "wp-admin" . '/includes/media.php' );
}

/**
 * Prepare Upload Directory
 *
 * @return void
 */
function helpgent_prepare_upload_directory() {
	$upload_dir_path = helpgent_config( 'storage.upload_dir_path' );

	if ( file_exists( $upload_dir_path ) ) {
		return;
	}

	helpgent_create_upload_directory();
}

/**
 * Create Upload Directory
 *
 * @return void
 */
function helpgent_create_upload_directory() {
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

/**
 * Get Unique Key
 *
 * @param string $prefix
 * @return string Unique Key
 */
function helpgent_get_unique_key( $prefix = '' ) {
	return $prefix . '_' . time();
}

/**
 * Get Extension From Path
 *
 * @param string $path
 * @return string Extension
 */
function helpgent_get_extension_from_path( $path ) : string {
	return pathinfo( $path, PATHINFO_EXTENSION );
}

/**
 * Exclude Extension From Path
 *
 * @param string $path
 * @return string Path without extension
 */
function helpgent_exclude_extension_from_path( $path ) : string {
	return preg_replace( '/[.]\w+$/', '', $path );
}

/**
 * Get Extension From Mime Type
 *
 * @param string $mime_type
 * @return string Extension
 */
function helpgent_get_extension_from_mime_type( $mime_type ) : string {
	return preg_replace( '/.+\//', '', $mime_type );
}


/**
 * Get Options
 *
 * @return array Options
 */
function helpgent_get_options( $hide_secret_options = true ) {
	$secret_option_keys = [ 'helpgent_license' ];
	$options            = get_option( 'helpgent_options', [] );

	if ( ! $hide_secret_options ) {
		return $options;
	}

	foreach( $secret_option_keys as $secret_key ) {

		if ( isset( $options[ $secret_key ] ) ) {
			unset( $options[ $secret_key ] );
		}

	}

	return $options;
}

/**
 * Get Option
 *
 * @param string $option_key
 * @param mixed $default
 *
 * @return mixed Option
 */
function helpgent_get_option( $option_key = '', $default = '' ) {
	$options = helpgent_get_options();

	if ( ! isset( $options[ $option_key ] ) || '' === $options[ $option_key ] ) {
		return $default;
	}

	return $options[ $option_key ];
}

/**
 * Sets or Update Option
 *
 * @param string $option_key
 * @param mixed $value
 *
 * @return void
 */
function helpgent_update_option( $option_key = '', $value = '' ) {
	$options = helpgent_get_options();

	$options[ $option_key ] = $value;

	update_option( 'helpgent_options', $options );
}

/**
 * Sets or Update Options
 *
 * @param array $options
 * @return array $options
 */
function helpgent_update_options( $new_options = [] ) {
	$old_options = helpgent_get_options();

	$options = array_merge( $old_options, $new_options );

	update_option( 'helpgent_options', $options );

	return $options;
}

/**
 * Sets or Update Option
 *
 * @return void
 */
function helpgent_delete_option( $option_key = '' ) {
	$options = helpgent_get_options();

	if ( ! isset( $options[ $option_key ] ) ) {
		return;
	}

	unset( $options[ $option_key ] );

	update_option( 'helpgent_options', $options );
}

/**
 * Sets or Update Option
 *
 * @param array $deleting_options
 * @return array $options
 */
function helpgent_delete_options( $option_keys = [] ) {
	$options = helpgent_get_options();

	if ( empty( $options ) ) {
		return;
	}

	foreach ( $option_keys as $key ) {

		if ( ! isset( $options[ $key ] )) {
			continue;
		}

		unset( $options[ $key ] );
	}

	update_option( 'helpgent_options', $options );

	return $options;
}
