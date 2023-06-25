<?php

namespace HelpGent\App\Support\Question;

use HelpGent\App\DTO\QuestionAnswerDTO;
use HelpGent\App\Repositories\QuestionAnswerRepository;
use WP_REST_Request;

abstract class Question {
    public QuestionAnswerRepository $question_answer_repository;

    public function __construct( QuestionAnswerRepository $question_answer_repository ) {
        $this->question_answer_repository = $question_answer_repository;
    }

    abstract public function validate( WP_REST_Request $wp_rest_request, array $field );

    public function save_answer( WP_REST_Request $wp_rest_request, array $field, int $response_id ) {
        $question_answer_dto = new QuestionAnswerDTO(
            $response_id,
            intval( $wp_rest_request->get_param( 'form_id' ) ),
            $wp_rest_request->get_param( 'screen_id' ),
            $field['id'],
            $wp_rest_request->get_param( $field['id'] )
        );

        return $this->question_answer_repository->create( $question_answer_dto );
    }
}