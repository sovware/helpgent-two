<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\Models\ResponseTag;

class ResponseTagRepository {
    public TagRepository $tag_repository;

    public ResponseRepository $response_repository;

    public function __construct( TagRepository $tag_repository, ResponseRepository $response_repository ) {
        $this->tag_repository      = $tag_repository;
        $this->response_repository = $response_repository;
    }

    public function add_or_remove( int $response_id, int $tag_id, int $created_by ) {
        $response = $this->response_repository->get_by_id( $response_id );

        if ( ! $response ) {
            throw new Exception( esc_html__( 'Form response not found', 'helpgent' ), 404 );
        }

        $tag = $this->tag_repository->get_by_id( $tag_id );

        if ( ! $tag ) {
            throw new Exception( esc_html__( 'Tag not found', 'helpgent' ), 404 );
        }

        $delete = ResponseTag::query()->where( 'tag_id', $tag_id )->where( 'response_id', $response_id )->delete();

        if ( 0 === $delete ) {
            ResponseTag::query()->insert(
                [
                    'tag_id'      => $tag_id,
                    'response_id' => $response_id,
                    'created_by'  => $created_by
                ]
            );
        }
    }
}