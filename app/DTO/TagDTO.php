<?php

namespace HelpGent\App\DTO;

class TagDTO {
    private string $title;

    private int $id;

    public function __construct( string $title ) {
        $this->title = $title;
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
}