<?php

namespace HelpGent\App\DTO;

class MessageForwardDTO {
    private int $id;
    
    /**
     * @var string|null $message
     */
    private $message;

    /**
     * @var string|null $attachment_id
     */
    private $attachment_id;

    public function __construct( $message = null, $attachment_id = null ) {
        $this->message       = $message;
        $this->attachment_id = $attachment_id;
    }

    public function get_id() {
        return $this->id;
    }

    public function set_id( int $id ) {
        $this->id = $id;
    }

    public function get_message() {
        return $this->message;
    }

    public function set_message( $message ) {
        $this->message = $message;
    }

    public function get_attachment_id() {
        return $this->attachment_id;
    }

    public function set_attachment_id( $attachment_id ) {
        $this->attachment_id = $attachment_id;
    }
}