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
