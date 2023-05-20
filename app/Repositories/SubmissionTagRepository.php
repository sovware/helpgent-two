<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\Models\SubmissionTag;

class SubmissionTagRepository {
    public TagRepository $tag_repository;

    public SubmissionRepository $submission_repository;

    public function __construct( TagRepository $tag_repository, SubmissionRepository $submission_repository ) {
        $this->tag_repository        = $tag_repository;
        $this->submission_repository = $submission_repository;
    }

    public function add_or_remove( int $submission_id, int $tag_id ) {
        $submission = $this->submission_repository->get_by_id( $submission_id );

        if ( ! $submission ) {
            throw new Exception( esc_html__( 'Form submission not found', 'helpgent' ), 404 );
        }

        $tag = $this->tag_repository->get_by_id( $tag_id );

        if ( ! $tag ) {
            throw new Exception( esc_html__( 'Tag not found', 'helpgent' ), 404 );
        }

        $delete = SubmissionTag::query()->where( 'tag_id', $tag_id )->where( 'submission_id', $submission_id )->delete();

        if ( 0 === $delete ) {
            SubmissionTag::query()->insert(
                [
                    'tag_id'        => $tag_id,
                    'submission_id' => $submission_id
                ]
            );
        }
    }
}