<?php

namespace HelpGent\App\DTO;

class ConversationForwardDTO {
    private int $id;

    private int $conversation_id;
    
    private string $message;
    
    private int $is_attachment;

    public function __construct( int $conversation_id, string $message, int $is_attachment ) {
        $this->conversation_id = $conversation_id;
        $this->message         = $message;
        $this->is_attachment   = $is_attachment;
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

    public function set_message( string $message ) {
        $this->message = $message;
    }

    public function get_is_attachment() {
        return $this->is_attachment;
    }

    public function set_is_attachment( int $is_attachment ) {
        $this->is_attachment = $is_attachment;
    }
}