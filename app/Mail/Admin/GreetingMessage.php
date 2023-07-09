<?php

namespace HelpGent\App\Mail\Admin;

use HelpGent\WaxFramework\View\View;
use HelpGent\App\Mail\Mailable;

class GreetingMessage extends Mailable {
    protected array $data;

    public function __construct() {
        $this->data = [
            'subject'                 => helpgent_get_setting( 'greeting_admin_email_subject', "Admin Welcome to Support" ),
            'enable_email_header'     => helpgent_get_setting( 'enable_email_header', true ),
            'header_background_color' => helpgent_get_setting( 'email_header_background_color', '#6551f2' ),
            'enable_email_footer'     => helpgent_get_setting( 'enable_email_footer', true ),
            'message'                 => helpgent_get_setting( 'greeting_admin_email_body', $this->email_default_body() )
        ];
    }

    public function get_body():string {
        $data = $this->data;

        $this->subject = $this->prepare( $data['subject'] );
        
        $data['message'] = $this->prepare( $data['message'] );
        $data['subject'] = $this->subject;

        return View::get( 'mail/index', $data );
    }

    private function email_default_body() {
        return "Dear {{NAME}},

            Thank You For Sharing Your Concern. 
            
            We have received your request. A support representative will get back to you within 24 hours.
            
            You can continue the conversation from the link {{CONVERSATION_LINK}}
            
            Thanks,
            The Administrator of {{SITE_NAME}}";
    }
}