<?php

namespace HelpGent\App\Mail;

use HelpGent\WaxFramework\View\View;

class NewMessage extends Mailable {
    protected array $data;

    public function __construct() {
        $this->data = [
            'subject'                 => helpgent_get_setting( 'new_message_email_subject', "New Message From {{REPLIER_NAME}}" ),
            'enable_email_header'     => helpgent_get_setting( 'enable_email_header', true ),
            'header_background_color' => helpgent_get_setting( 'email_header_background_color', '#6551f2' ),
            'enable_email_footer'     => helpgent_get_setting( 'enable_email_footer', true ),
            'message'                 => helpgent_get_setting( 'new_message_email_body', $this->email_default_body() )
        ];
    }

    public function get_body():string {
        $data = $this->data;

        $this->subject = $this->prepare( $data['subject'] );
        
        $data['message'] = $this->prepare( $data['message'] );
        $data['subject'] = $this->subject;

        return View::get( 'mail/index', $data );
    }

    public function email_default_body() {
        return "Dear {{NAME}},
        Message Details:
        {{MESSAGE}}
        Go to your conversation {{CONVERSATION_LINK}}";
    }
}