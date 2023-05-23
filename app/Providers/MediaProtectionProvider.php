<?php

namespace HelpGent\App\Providers;

use HelpGent\WaxFramework\Contracts\Provider;
use HelpGent\App\Repositories\AttachmentRepository;

class MediaProtectionProvider implements Provider {
    public static $rewrite_endpoint = 'helpgent_media_protection';

    public function boot() {
        add_action( 'init', [ $this, 'add_rewrite_endpoint' ] );
        add_action( 'parse_query', [ $this, 'parse_query' ] );
        add_action( 'wp_head', [ $this, 'action_wp_head' ] );
        add_action( 'admin_head', [ $this, 'action_wp_head' ] );
    }

    /**
     * Prints scripts or data in the head tag on the front end.
     *
     */
    public function action_wp_head() : void {
        
        ?>
            <script>
                var helpgent_localization = <?php helpgent_render(
                    json_encode(
                        [
                            'rest_url'   => get_rest_url( null, 'helpgent' ),
                            'rest_nonce' => wp_create_nonce( 'wp_rest' )
                        ]
                    )
                )?>
            </script>

        <?php
    }

    public static function after_plugin_activation() {
        flush_rewrite_rules();
    }

    public static function after_plugin_deactivation() {
        remove_filter( 'mod_rewrite_rules', [ __CLASS__, 'htaccess_contents' ] );
        flush_rewrite_rules();
    }

    public static function htaccess_contents( string $rules ) : string {
        $new_rule  = "\n\n# Helpgent Media Protection Rewrite Rules" . PHP_EOL;
        $new_rule .= self::get_apache_rewrite_rules();
        $new_rule .= "# Helpgent Media Protection Rewrite Rules End\n" . PHP_EOL;

        return $new_rule . $rules . PHP_EOL;
    }

    public function add_rewrite_endpoint() : void {
        add_rewrite_endpoint( self::$rewrite_endpoint, EP_ROOT );
    }

    public function parse_query( $query ) : void {
        $endpoint = self::$rewrite_endpoint;

        if ( ! isset( $query->query_vars[ $endpoint ] ) ) {
            return;
        }

        // phpcs:ignore WordPress.Security.NonceVerification.Recommended, WordPress.Security.ValidatedSanitizedInput.InputNotValidated, WordPress.Security.ValidatedSanitizedInput.MissingUnslash, WordPress.Security.ValidatedSanitizedInput.InputNotSanitized
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
        helpgent_render_media_file( helpgent_upload_dir( $file_name ) );
    }

    public function can_user_access_attachment( int $attachment_id, int $user_id ) : bool {
        $attachment_repository = helpgent_singleton( AttachmentRepository::class );
        $attachment            = $attachment_repository->get_by_id( $attachment_id );

        if ( empty( $attachment ) ) {
            return false;
        }

        $can_user_access_attachment = ( int ) $attachment->created_by === $user_id;
        $can_user_access_attachment = apply_filters( 'helpgent_can_user_access_attachment', $can_user_access_attachment, $attachment_id, $user_id );

        return $can_user_access_attachment;
    }

    public static function get_upload_dir_pattern() : string {
        $upload_dir = str_replace( trailingslashit( site_url() ), '', helpgent_upload_url() );
        return $upload_dir . "([A-Za-z0-9_@.\/&+-]+)+\.([A-Za-z0-9_@.\/&+-]+)$";
    }

    public static function get_apache_rewrite_rules() : string {
        $endpoint = self::$rewrite_endpoint;
        $pattern  = self::get_upload_dir_pattern();
        $path     = "index.php?{$endpoint}=$1&file_type=$2 [QSA,L]" . PHP_EOL;

        return "RewriteRule {$pattern} {$path}";
    }

    public static function get_nginx_rewrite_rules() : string {
        $endpoint = self::$rewrite_endpoint;
        $pattern  = self::get_upload_dir_pattern();
        $path     = "/index.php?{$endpoint}=$1&file_type=$2";

        return "rewrite $pattern \"{$path}\" last;";
    }
}