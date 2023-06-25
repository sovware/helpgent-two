<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\DTO\QuestionAnswerDTO;
use HelpGent\App\Models\QuestionAnswers;

class QuestionAnswerRepository {
    public function get_response_response( int $response_id, int $form_id ) {
        return QuestionAnswers::query()->where( 'response_id', $response_id )->where( 'form_id', $form_id )->get();
    }

    public function create( QuestionAnswerDTO $question_answer_dto ) {
        return QuestionAnswers::query()->insert_get_id(
            [
                'response_id'   => $question_answer_dto->get_response_id(),
                'form_id'       => $question_answer_dto->get_form_id(),
                'screen_id'     => $question_answer_dto->get_screen_id(),
                'input_id'      => $question_answer_dto->get_input_id(),
                'value'         => $question_answer_dto->get_value(),
                'is_attachment' => $question_answer_dto->get_is_attachment()
            ]
        );
    }

    public function delete_screen( int $response_id, int $screen_id ) {
        return QuestionAnswers::query()->where( 'response_id', $response_id )->where( 'screen_id', $screen_id )->delete();
    }
}