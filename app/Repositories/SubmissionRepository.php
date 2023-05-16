<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Models\Submission;
use HelpGent\App\Utils\DateTime;
use HelpGent\WaxFramework\Database\Query\Builder;

class SubmissionRepository {
    public function get( int $form_id, int $per_page, int $page ) {
        if ( $per_page > 100 || $per_page < 10 ) {
            $per_page = 100;
        }

        if ( 0 >= $page ) {
            $page = 1;
        }

        $offset = ( $page - 1 ) * $per_page;
        
        return Submission::query()
        ->with(
            [
                'conversation' => function ( Builder $query ) {
                    $query->order_by_desc( 'helpgent_conversations.id' );
                },
                'conversation.created_by_user',
                'conversation.created_by_guest'
            ] 
        )
        ->where( 'form_id', $form_id )
        ->order_by_desc( 'updated_at' )
        ->limit( $per_page )
        ->offset( $offset )
        ->get();
    }

    public function total( int $form_id ) {
        return Submission::query()->where( 'form_id', $form_id )->count();
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
                'is_guest'    => $submission_dto->get_is_guest(),
                'updated_at'  => DateTime::now()
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
                'is_guest'    => $submission_dto->get_is_guest(),
                'updated_at'  => DateTime::now()
            ]
        );
    }

    public function get_by_id( int $id ) {
        return Submission::query()->where( 'id', $id )->first();
    }
    
    public function delete( int $id ) {
        $submission = $this->get_by_id( $id );
        if ( ! $submission ) {
            throw new Exception( esc_html__( 'Submission not found', 'helpgent' ), 404 );
        }
        return Submission::query()->where( 'id', $id )->delete();
    }
}