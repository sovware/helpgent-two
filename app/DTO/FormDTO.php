<?php

namespace HelpGent\App\DTO;

class FormDTO {
    private int $id;

    private string $title;

    private string $status;

    private string $content;

    private int $created_by;

    private array $available_pages;

    private int $is_chat_bubble;

    public function __construct( string $title, string $status, string $content, int $is_chat_bubble, array $available_pages, int $created_by ) {
        $this->title           = $title;
        $this->status          = $status;
        $this->content         = $content;
        $this->available_pages = $available_pages;
        $this->is_chat_bubble  = $is_chat_bubble;
        $this->created_by      = $created_by;
    }

    public function get_id() {
        return $this->id;
    }

    public function set_id( int $id ) {
        $this->id = $id;
    }

    public function get_title() {
        return $this->title;
    }

    public function set_title( $title ) {
        $this->title = $title;
    }

    public function get_status() {
        return $this->status;
    }

    public function set_status( $status ) {
        $this->status = $status;
    }

    public function get_content() {
        return $this->content;
    }

    public function set_content( $content ) {
        $this->content = $content;
    }

    public function get_created_by() {
        return $this->created_by;
    }

    public function set_created_by( $created_by ) {
        $this->created_by = $created_by;
    }

    public function get_available_pages() {
        return $this->available_pages;
    }

    public function set_available_pages( $available_pages ) {
        $this->available_pages = $available_pages;
    }

    public function get_is_chat_bubble() {
        return $this->is_chat_bubble;
    }

    public function set_is_chat_bubble( $is_chat_bubble ) {
        $this->is_chat_bubble = $is_chat_bubble;
    }
}