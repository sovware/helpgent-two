<?php

namespace HelpGent\App\Support\Question\Fields;

use Exception;
use HelpGent\App\DTO\QuestionAnswerDTO;
use HelpGent\App\Support\Question\Question;
use WP_REST_Request;

class FileUpload extends Question {
    public function validate( WP_REST_Request $wp_rest_request, array $field ) {
        if ( ! $wp_rest_request->has_param( $field['id'] ) ) {
            throw new Exception( $field['label'] . ' field is required.' );
        }
        return true;
    }

    public function save_answer( WP_REST_Request $wp_rest_request, array $field, int $response_id ) {
        $question_answer_dto = new QuestionAnswerDTO(
            $response_id,
            intval( $wp_rest_request->get_param( 'form_id' ) ),
            $wp_rest_request->get_param( 'screen_id' ),
            $field['id'],
            intval( $wp_rest_request->get_param( $field['id'] ) ),
            1
        );

        return $this->question_answer_repository->create( $question_answer_dto );
    }
}