<?php

namespace HelpGent\App\Mail;

use HelpGent\WaxFramework\View\View;

class NewMessage extends Mailable {
    public function get_body():string {
        $this->subject = $this->prepare( helpgent_get_setting( 'new_message_email_subject', "New Message From {{REPLIER_NAME}}" ) );
        $message       = $this->prepare( helpgent_get_setting( 'new_message_email_body', 'New' ) );

        return View::get(
            'mail/index', [
                'subject'                 => $this->subject,
                'enable_email_header'     => helpgent_get_setting( 'enable_email_header', true ),
                'header_background_color' => helpgent_get_setting( 'email_header_background_color', '#6551f2' ),
                'enable_email_footer'     => helpgent_get_setting( 'enable_email_footer', true ),
                'message'                 => $message
            ]
        );
    }
}