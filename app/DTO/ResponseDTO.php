<?php

namespace HelpGent\App\DTO;

class ResponseDTO {
    private int $submission_id;

    private int $form_id;

    private int $screen_id;

    private string $input_id;

    private string $value;

    private int $is_attachment;

    public function __construct( int $submission_id, int $form_id, int $screen_id, string $input_id, string $value, int $is_attachment = 0 ) {
        $this->submission_id = $submission_id;
        $this->form_id       = $form_id;
        $this->screen_id     = $screen_id;
        $this->input_id      = $input_id;
        $this->value         = $value;
        $this->is_attachment = $is_attachment;
    }

    public function get_submission_id() {
        return $this->submission_id;
    }

    public function set_submission_id( int $submission_id ) {
        $this->submission_id = $submission_id;
    }

    public function get_form_id() {
        return $this->form_id;
    }

    public function set_form_id( int $form_id ) {
        $this->form_id = $form_id;
    }

    public function get_screen_id() {
        return $this->screen_id;
    }

    public function set_screen_id( int $screen_id ) {
        $this->screen_id = $screen_id;
    }

    public function get_input_id() {
        return $this->input_id;
    }

    public function set_input_id( int $input_id ) {
        $this->input_id = $input_id;
    }

    public function get_value() {
        return $this->value;
    }

    public function set_value( int $value ) {
        $this->value = $value;
    }

    public function get_is_attachment() {
        return $this->is_attachment;
    }

    public function set_is_attachment( int $is_attachment ) {
        $this->is_attachment = $is_attachment;
    }
}