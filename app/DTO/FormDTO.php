<?php

namespace HelpGent\App\DTO;

class FormDTO {
    private int $id;

    private string $title;

    private string $status;

    private string $content;

    private int $created_by;

    public function __construct( string $title, string $status, string $content, int $created_by ) {
        $this->title      = $title;
        $this->status     = $status;
        $this->content    = $content;
        $this->created_by = $created_by;
    }

    public function get_id() {
        return $this->title;
    }

    public function set_id( int $id ) {
        $this->title = $id;
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
}