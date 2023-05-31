<?php

namespace HelpGent\App\Providers;

use HelpGent\WaxFramework\Contracts\Provider;

class PreviewServiceProvider implements Provider
{
    /**
     * @return mixed
     */
    public function boot() {
        add_action( 'init', [$this, 'action_init'] );
        add_filter( 'query_vars', [$this, 'filter_query_vars'] );
        add_action( 'template_include', [ $this, 'filter_template_include' ] );
    }

    /**
     * Filters the path of the current template before including it.
     *
     * @param string $template The path of the template to include.
     * @return string The path of the template to include.
     */
    public function filter_template_include( string $template ) : string {
        if ( get_query_var( 'helpgent-preview' ) && is_user_logged_in() && in_array( 'administrator', wp_get_current_user()->roles ) ) {
            return helpgent_dir( 'resources\views\preview-template.php' );
        }
        return $template;
    }

    /**
     * Filters the query variables allowed before processing.
     *
     * @param string[] $public_query_vars The array of allowed query variable names.
     * @return string[] The array of allowed query variable names.
     */
    public function filter_query_vars( array $public_query_vars ): array {
        $public_query_vars[] = 'helpgent-preview';
        return $public_query_vars;
    }

    /**
     * Fires after WordPress has finished loading but before any headers are sent.
     */
    public function action_init(): void {
        add_rewrite_rule( 'helpgent-preview/([a-z0-9-]+)[/]?$', 'index.php?helpgent-preview=$matches[1]', 'top' );
    }
}
