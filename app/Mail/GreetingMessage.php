<?php

namespace HelpGent\App\Mail;

use HelpGent\WaxFramework\View\View;

class GreetingMessage extends Mailable {
    protected array $data;

    public function __construct( bool $is_guest ) {
        if ( $is_guest ) {
            $message =  helpgent_get_setting( 'greeting_guest_email_body', $this->guest_email_default_body() );
        } else {
            $message = helpgent_get_setting( 'greeting_email_body', $this->email_default_body() );
        }

        $this->data = [
            'subject'                 => helpgent_get_setting( 'greeting_email_subject', "Welcome to Support" ),
            'enable_email_header'     => helpgent_get_setting( 'enable_email_header', true ),
            'header_background_color' => helpgent_get_setting( 'email_header_background_color', '#6551f2' ),
            'enable_email_footer'     => helpgent_get_setting( 'enable_email_footer', true ),
            'message'                 => $message
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
            
            username = {{USERNAME}}

            Thanks,
            The Administrator of {{SITE_NAME}}";
    }

    private function guest_email_default_body() {
        return "Dear {{NAME}},

        Thank You For Sharing Your Concern. 
        
        We have received your request. A support representative will get back to you within 24 hours.
        
        A guest token has been generated that can be used to access the conversation and it is valid until 30 days from now. You can continue conversation from the link {{VERIFICATION_LINK}}
        
        Thanks,
        The Administrator of {{SITE_NAME}}";
    }
}