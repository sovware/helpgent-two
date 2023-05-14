<?php

namespace HelpGent\App\Providers;

use HelpGent\WaxFramework\Contracts\Provider;

class MediaProtectionProvider implements Provider {

    public static $rewrite_endpoint = 'helpgent_media_protection';

    public function boot() {
        add_filter( 'mod_rewrite_rules', [ __CLASS__, 'htaccess_contents' ] );
        add_action( 'init', [ $this, 'add_rewrite_endpoint' ] );
        add_action( 'parse_query', [ $this, 'parse_query' ] );
    }

    public static function after_plugin_activation() {
        flush_rewrite_rules();
    }

    public static function after_plugin_deactivation() {
        remove_filter( 'mod_rewrite_rules', [ __CLASS__, 'htaccess_contents' ] );
        flush_rewrite_rules();
    }

    public static function htaccess_contents( string $rules ) : string {
        $endpoint   = self::$rewrite_endpoint;
        $upload_dir = str_replace( trailingslashit( site_url() ), '', helpgent_get_upload_dir( 'url' ) );
        $pattern    = $upload_dir . "\/([A-Za-z0-9_@.\/&+-]+)+\.([A-Za-z0-9_@.\/&+-]+)$ ";
        $path       = str_replace( trailingslashit( site_url() ), '', 'index.php' ) . "?{$endpoint}=$1&file_type=$2 [QSA,L]" . PHP_EOL;

        $newRule = "\n\n# Helpgent Media Protection Rewrite Rules" . PHP_EOL;
        $newRule .= "RewriteRule " . $pattern . $path;
		$newRule .= "# Helpgent Media Protection Rewrite Rules End\n" . PHP_EOL;

        return $newRule . $rules . PHP_EOL;
    }

    public function add_rewrite_endpoint() : void {
        add_rewrite_endpoint( self::$rewrite_endpoint, EP_ROOT );
    }

    public function parse_query( $query ) : void {
		$endpoint = self::$rewrite_endpoint;

		if ( ! isset( $query->query_vars[ $endpoint ] ) ) {
            return;
		}

        $file_name = $query->query_vars[ $endpoint ] . '.' . $_GET['file_type'];
        $this->render_media( $file_name );
    }

    public function render_media( string $file_name ) : void {
        // Validate The User
        $attachment_id = helpgent_get_attachment_id( $file_name );

        if ( ! $attachment_id || ! $this->can_user_access_attachment( $attachment_id, get_current_user_id() ) ) {
            return;
        }

        // Render The File
        helpgent_render_media_file( helpgent_get_attachment_path( $file_name ) );
    }

    public function can_user_access_attachment( int $attachment_id, int $user_id ) : bool {
        $can_user_access_attachment = true;
        $can_user_access_attachment = apply_filters( 'helpgent_can_user_access_attachment', $can_user_access_attachment, $attachment_id, $user_id );

        return $can_user_access_attachment;
    }

}