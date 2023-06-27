<?php

namespace HelpGent\App\DTO;

class ConversationForwardDTO {
    private int $id;

    private int $conversation_id;
    
    /**
     * @var string|null $message
     */
    private $message;

    /**
     * @var string|null $attachment_id
     */
    private $attachment_id;

    public function __construct( int $conversation_id, $message = null, $attachment_id = null ) {
        $this->conversation_id = $conversation_id;
        $this->message         = $message;
        $this->attachment_id   = $attachment_id;
    }

    public function get_id() {
        return $this->id;
    }

    public function set_id( int $id ) {
        $this->id = $id;
    }

    public function get_conversation_id() {
        return $this->conversation_id;
    }

    public function set_conversation_id( int $conversation_id ) {
        $this->conversation_id = $conversation_id;
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