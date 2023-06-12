<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\DTO\ResponseDTO;
use HelpGent\App\Models\Response;

class ResponseRepository {
    public function get_submission_response( int $submission_id, int $form_id ) {
        return Response::query()->where( 'submission_id', $submission_id )->where( 'form_id', $form_id )->get();
    }

    public function create( ResponseDTO $response_dto ) {
        return Response::query()->insert_get_id(
            [
                'submission_id' => $response_dto->get_submission_id(),
                'form_id'       => $response_dto->get_form_id(),
                'screen_id'     => $response_dto->get_screen_id(),
                'input_id'      => $response_dto->get_input_id(),
                'value'         => $response_dto->get_value(),
                'is_attachment' => $response_dto->get_is_attachment()
            ]
        );
    }

    public function delete_screen( int $submission_id, int $screen_id ) {
        return Response::query()->where( 'submission_id', $submission_id )->where( 'screen_id', $screen_id )->delete();
    }
}