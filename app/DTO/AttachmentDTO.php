<?php

namespace HelpGent\App\DTO;

class AttachmentDTO {

    private int $id;
    private string $title;
    private string $mime_type;
    private int $file_size;
    private string $storage;
    private int $created_by;
    private $file_id;
    private int $is_guest;

    public function __construct( string $title, string $mime_type, int $file_size, int $created_by, string $storage = 'local' ) {
        $this->id         = 0;
        $this->title      = $title;
        $this->mime_type  = $mime_type;
        $this->file_size  = $file_size;
        $this->storage    = $storage;
        $this->created_by = $created_by;
        $this->file_id    = null;
        $this->is_guest   = 0;
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

    public function set_title( string $title ) {
        $this->title = $title;
    }

    public function get_mime_type() {
        return $this->mime_type;
    }

    public function set_mime_type( string $mime_type ) {
        $this->mime_type = $mime_type;
    }

    public function get_file_size() {
        return $this->file_size;
    }

    public function set_file_size( int $file_size ) {
        $this->file_size = $file_size;
    }

    public function get_storage() {
        return $this->storage;
    }

    public function set_storage( string $storage ) {
        $this->storage = $storage;
    }

    public function get_file_id() {
        return $this->file_id;
    }

    public function set_file_id( string $file_id ) {
        $this->file_id = $file_id;
    }

    public function get_created_by() {
        return $this->created_by;
    }

    public function set_created_by( int $created_by ) {
        $this->created_by = $created_by;
    }

    public function get_is_guest() {
        return $this->is_guest;
    }

    public function set_is_guest( int $is_guest ) {
        $this->is_guest = $is_guest;
    }
}