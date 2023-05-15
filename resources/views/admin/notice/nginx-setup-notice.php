<?php defined( 'ABSPATH' ) || exit; ?>

<div class="notice notice-warning helpgent-nginx-instruction-notice">
    <p><?php _e( "It looks like you're using NGINX web server. NGINX doesn’t have .htaccess-type capability, HelpGent cannot modify your server configuration automatically for you. Here's how you can do it manually:", 'helpgent' ); ?></p>
    <p>
        <?php _e( "Update our rewrite rules on your NGINX server", 'helpgent' ); ?>
        <a href="#" class="helpgent-nginx-instruction-link"><?php _e( 'as per this instruction', 'helpgent' ); ?></a>:
    </p>

    <textarea readonly="" rows="2" style="<?php esc_attr_e( $textarea_style ) ?>"><?php echo esc_textarea( $rules ) ?></textarea>

    <div class="helpgent-nginx-instruction-content" style="display: none">
        <p><b><?php _e( 'Instruction:', 'helpgent' ); ?></b></p>
        <ul style="list-style: decimal; padding-left: 20px;">
            <li><?php _e( 'Copy the rewrite rules shown above', 'helpgent' ) ?></li>
            <li><?php _e( 'Find your website’s Nginx config file which is often located at /etc/nginx/site-available or /etc/nginx/conf/site-available (if you’re using Arch Linux)', 'helpgent' ) ?></li>
            <li>
                <?php _e( 'Paste the copied rules in the server block', 'helpgent' ) ?>
                <textarea readonly="" rows="10" style="<?php esc_attr_e( $textarea_style ) ?>"><?php echo esc_textarea( $server_block ) ?></textarea>
            </li>
        </ul>
    </div>

    <div class="helpgent-nginx-instruction-notice-footer" style="text-align: right; margin: 10px 0;">
        <a class="button button-primary" href="<?php esc_attr_e( $dismiss_link ); ?>"><?php _e( 'Dismiss', 'helpgent' ); ?></a>
    </div>
</div>

<script>
    const instructionLink = document.querySelector( '.helpgent-nginx-instruction-link' );

    instructionLink.addEventListener( 'click', function( e ) {
        e.preventDefault();

        const instructionContent = document.querySelector( '.helpgent-nginx-instruction-content' );

        if ( instructionContent.classList.contains( '--is-open' ) ) {
            instructionContent.style.display = 'none';
            instructionContent.classList.remove( '--is-open' );
        } else {
            instructionContent.style.display = 'block';
            instructionContent.classList.add( '--is-open' );
        }
    } );
</script>
