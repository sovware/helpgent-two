<?php

namespace HelpGent\App\DTO;

class SubmissionDTO {
    private int $id;

    private int $form_id;

    private string $status;

    private int $is_important;

    /**
     * @var string|null $ip
     */
    private $ip = null;

    /**
     * @var string|null $city
     */
    private $city = null;

    /**
     * @var string|null $country
     */
    private $country = null;

    private int $created_by;

    private int $is_guest = 0;

    public function __construct( int $form_id, int $created_by, int $is_guest = 0, int $is_important = 0, string $status = 'active' ) {
        $this->form_id      = $form_id;
        $this->status       = $status;
        $this->is_important = $is_important;
        $this->created_by   = $created_by;
        $this->is_important = $is_guest;
    }

    public function get_id() {
        return $this->id;
    }

    public function set_id( int $id ) {
        $this->id = $id;
    }

    public function get_form_id() {
        return $this->form_id;
    }

    public function set_form_id( int $form_id ) {
        $this->form_id = $form_id;
    }

    public function get_status() {
        return $this->status;
    }

    public function set_status( string $status ) {
        $this->status = $status;
    }

    public function get_is_important() {
        return $this->is_important;
    }

    public function set_is_important( int $is_important ) {
        $this->is_important = $is_important;
    }

    public function get_ip() {
        return $this->ip;
    }

    public function set_ip( string $ip ) {
        $this->ip = $ip;
    }

    public function get_city() {
        return $this->city;
    }

    public function set_city( string $city ) {
        $this->city = $city;
    }

    public function get_country() {
        return $this->country;
    }
    
    public function set_country( string $country ) {
        $this->country = $country;
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