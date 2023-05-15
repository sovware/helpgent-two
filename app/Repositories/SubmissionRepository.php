<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Models\Submission;

class SubmissionRepository {
    public function get() {
        return Submission::query()->get();
    }

    public function create( SubmissionDTO $submission_dto ) {
        return Submission::query()->insert_get_id(
            [
                'form_id'     => $submission_dto->get_form_id(),
                'status'      => $submission_dto->get_status(),
                'is_favorite' => $submission_dto->get_is_favorite(),
                'ip'          => $submission_dto->get_ip(),
                'city'        => $submission_dto->get_city(),
                'country'     => $submission_dto->get_country(),
                'created_by'  => $submission_dto->get_created_by(),
                'is_guest'    => $submission_dto->get_is_guest()
            ]
        );
    }

    public function update( SubmissionDTO $submission_dto ) {
        $form_submission = $this->get_by_id( $submission_dto->get_id() );

        if ( ! $form_submission ) {
            throw new Exception( esc_html__( 'Form submission not found', 'helpgent' ), 404 );
        }

        return Submission::query()->where( 'id', $submission_dto->get_id() )->update(
            [
                'form_id'     => $submission_dto->get_form_id(),
                'status'      => $submission_dto->get_status(),
                'is_favorite' => $submission_dto->get_is_favorite(),
                'ip'          => $submission_dto->get_ip(),
                'city'        => $submission_dto->get_city(),
                'country'     => $submission_dto->get_country(),
                'created_by'  => $submission_dto->get_created_by(),
                'is_guest'    => $submission_dto->get_is_guest()
            ]
        );
    }

    public function get_by_id( int $id ) {
        return Submission::query()->where( 'id', $id )->first();
    }
}