<?php

namespace HelpGent\App\DTO;

class AttachmentFileDTO {

    private string $file_name;

    private int $file_size;

    private string $mime_type;

    private $file_url = null;

    /**
     * @var string|null
    */
    private $file_id = null;

    public function __construct( string $file_name, int $file_size, string $mime_type, $file_url = null, $file_id = null ) {
        $this->file_name = $file_name;
        $this->file_size = $file_size;
        $this->mime_type = $mime_type;
        $this->file_url  = $file_url;
        $this->file_id   = $file_id;
    }

    public function get_file_name() : string {
        return $this->file_name;
    }

    public function set_file_name( string $file_name ) : void {
        $this->file_name = $file_name;
    }

    public function get_file_size() : int {
        return $this->file_size;
    }

    public function set_file_size( int $file_size ) : void {
        $this->file_size = $file_size;
    }

    public function get_mime_type() : string {
        return $this->mime_type;
    }

    public function set_mime_type( string $mime_type ) : void {
        $this->mime_type = $mime_type;
    }

    /**
     * Get File URL
     * 
     * @return string|null
    */
    public function get_file_url() {
        return $this->file_url;
    }

    /**
     * Set File URL
     * 
     * @param string $file_url
     * @return void
    */
    public function set_file_url( string $file_url ) : void {
        $this->file_url = $file_url;
    }

    /**
     * Get File ID
     * 
     * @return string|null
    */
    public function get_file_id() {
        return $this->file_id;
    }

    /**
     * Set File ID
     * 
     * @param string $file_id
     * @return void
    */
    public function set_file_id( string $file_id ) : void {
        $this->file_id = $file_id;
    }
}