<?php

namespace HelpGent\App\DTO;

class SubmissionReadDTO {
    private int $form_id = 0;

    private int $per_page;
    
    private int $page;

    private string $order_by;

    private string $status;
    
    private array $tag_ids;
    
    private string $search;

    private int $created_by = 0;

    private bool $is_guest;

    public function __construct( int $per_page, int $page, string $order_by, string $status, array $tag_ids = [], string $search = '' ) {
        $this->per_page = $per_page;
        $this->page     = $page;
        $this->order_by = $order_by;
        $this->status   = $status;
        $this->tag_ids  = $tag_ids;
        $this->search   =  $search;
    }

    public function get_form_id() {
        return $this->form_id;
    }

    public function set_form_id( int $form_id ) {
        $this->form_id = $form_id;
    }

    public function get_per_page() {
        return $this->per_page;
    }

    public function set_per_page( int $per_page ) {
        $this->per_page = $per_page;
    }

    public function get_page() {
        return $this->page;
    }

    public function set_page( int $page ) {
        $this->page = $page;
    }

    public function get_order_by() {
        return $this->order_by;
    }

    public function set_order_by( string $order_by ) {
        $this->order_by = $order_by;
    }

    public function get_status() {
        return $this->status;
    }

    public function set_status( string $status ) {
        $this->status = $status;
    }

    public function get_tag_ids() {
        return $this->tag_ids;
    }

    public function set_tag_ids( array $tag_ids ) {
        $this->tag_ids = $tag_ids;
    }

    public function get_search() {
        return $this->search;
    }

    public function set_search( string $search ) {
        $this->search = $search;
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

    public function set_is_guest( bool $is_guest ) {
        $this->is_guest = $is_guest;
    }
}