<?php

namespace HelpGent\App\DTO;

class AttachmentDTO {
    private $title;

    public function __construct( $title ) {
        $this->title = $title;
    }

    public function get_title() {
        return $this->title;
    }

    public function set_title( $title ) {
        $this->title = $title;
    }
}