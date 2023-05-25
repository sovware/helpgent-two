<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\DTO\FormDTO;
use HelpGent\App\Models\Form;
use HelpGent\App\Utils\DateTime;
use HelpGent\WaxFramework\Database\Query\Builder;

class FormRepository {
    public function get( int $per_page, int $page ) {
        $forms = Form::query()
        ->with_count(
            'submissions as total_submissions', function( Builder $query ) {
                $query->where( 'status', 'active' );
            } 
        )
        ->with(
            'user', function ( Builder $query ) {
                $query->select( 'users.ID', 'users.display_name' );
            },
        )->pagination( $per_page, $page );

        return [
            'forms' => $forms,
            'total' => Form::query()->count()
        ];
    }

    public function create( FormDTO $form_dto ) {
        return Form::query()->insert_get_id(
            [
                'title'      => $form_dto->get_title(),
                'status'     => $form_dto->get_status(),
                'content'    => $form_dto->get_content(),
                'created_by' => $form_dto->get_created_by()
            ]
        );
    }
    
    public function update( FormDTO $form_dto ) {
        $form = $this->get_by_id( $form_dto->get_id() );

        if ( ! $form ) {
            throw new Exception( esc_html__( 'Form not found', 'helpgent' ), 404 );
        }

        return Form::query()->where( 'id', $form_dto->get_id() )->update(
            [
                'title'      => $form_dto->get_title(),
                'status'     => $form_dto->get_status(),
                'content'    => $form_dto->get_content(),
                'created_by' => $form_dto->get_created_by(),
                'updated_at' => DateTime::now()
            ]
        );
    }

    public function delete( int $id ) {
        $form = $this->get_by_id( $id );

        if ( ! $form ) {
            throw new Exception( esc_html__( 'Form not found', 'helpgent' ), 404 );
        }

        return Form::query()->where( 'id', $id )->delete();
    }

    public function get_by_id( int $id ) {
        return Form::query()->where( 'id', $id )->first();
    }
}