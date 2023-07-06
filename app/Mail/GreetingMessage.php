<?php

namespace HelpGent\App\Mail;

use HelpGent\App\Utils\User;
use HelpGent\WaxFramework\View\View;

class GreetingMessage extends Mailable {
    protected User $user;

    public function __construct( User $user ) {
        $this->user = $user;
    }
    
    public function get_body():string {

        $this->subject = $this->prepare( helpgent_get_setting( 'greeting_email_subject', "Welcome to Support" ) );

        if ( $this->user->is_guest ) {
            $message = $this->prepare( helpgent_get_setting( 'greeting_guest_email_body' ) );
        } else {
            $message = $this->prepare( helpgent_get_setting( 'greeting_email_body' ) );
        }

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