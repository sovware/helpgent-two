<?php

namespace HelpGent\App\DTO;

class TagDTO {
    private string $title;

    private int $created_by;

    private int $id;

    public function __construct( string $title, int $created_by ) {
        $this->title      = $title;
        $this->created_by = $created_by;
    }

    public function get_title() {
        return $this->title;
    }

    public function set_title( string $title ) {
        $this->title = $title;
    }

    public function get_id() {
        return $this->id;
    }

    public function set_id( int $id ) {
        $this->id = $id;
    }

    public function get_created_by() {
        return $this->created_by;
    }

    public function set_created_by( int $created_by ) {
        $this->created_by = $created_by;
    }
}