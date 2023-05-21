<?php defined( 'ABSPATH' ) || exit;?>
<script>
    /**
     * Written menu activation js code in PHP file to avoid menu activation delay.
     */
    jQuery(($) => {
        /**
         * Add first menu hash url
         */
        $('.toplevel_page_helpgent-menu a.wp-first-item').attr('href', (index, href) => href + '#/overview');

        /**
         * Active menu on page load
         */
        let current_page = $('.wp-submenu a[href="' + location.href + '"]');
        helpgent_set_current_page(current_page);

        /**
         * Active menu onclick
         */
        $('.toplevel_page_helpgent-menu .wp-submenu a').on('click', function (event) {
            let current_page = $(this);
            if(current_page[0].href === '<?php helpgent_render( $pro_url )?>') {
                event.preventDefault();
                window.open('<?php helpgent_render( $pro_url )?>', '_blank');
            } else {
                helpgent_set_current_page(current_page);
            }
        })

        function helpgent_set_current_page(current_page) {
            current_page.closest('.wp-submenu').find('.current').removeClass('current');
            current_page.addClass('current');
            current_page.closest('li').addClass('current');
        }
    });
</script>
