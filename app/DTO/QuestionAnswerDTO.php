<?php

namespace HelpGent\App\DTO;

class QuestionAnswerDTO {
    private int $response_id;

    private int $form_id;

    private int $screen_id;

    private string $input_id;

    private string $value;

    private int $is_attachment;

    public function __construct( int $response_id, int $form_id, int $screen_id, string $input_id, string $value, int $is_attachment = 0 ) {
        $this->response_id   = $response_id;
        $this->form_id       = $form_id;
        $this->screen_id     = $screen_id;
        $this->input_id      = $input_id;
        $this->value         = $value;
        $this->is_attachment = $is_attachment;
    }

    public function get_response_id() {
        return $this->response_id;
    }

    public function set_response_id( int $response_id ) {
        $this->response_id = $response_id;
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