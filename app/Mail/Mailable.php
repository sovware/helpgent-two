<?php

namespace HelpGent\App\Mail;

abstract class Mailable {
    public string $to;

    public string $subject;

    public array $headers = [];

    public array $placeholders = [];

    public string $content_type = 'text/html';

    abstract public function get_body(): string;

    protected function prepare( string $content ) {
        return nl2br( strtr( $content, $this->placeholders ) );
    }

    public function send() {
        $headers   = $this->headers;
        $headers[] = "content-type: {$this->content_type}";
        $body      = $this->get_body();
        return wp_mail( $this->to, html_entity_decode( $this->subject ), $body, $headers );
    }
}