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
        )
        ->order_by_desc( 'id' )->pagination( $per_page, $page );

        $forms = array_map(
            function( $form ) {
                $form->available_pages  = json_decode( $form->available_pages );
                $form->user_info_fields = json_decode( $form->user_info_fields );
                return $form;
            }, $forms
        );
        return [
            'forms' => $forms,
            'total' => Form::query()->count()
        ];
    }

    public function create( FormDTO $form_dto ) {
        return Form::query()->insert_get_id(
            [
                'title'             => $form_dto->get_title(),
                'status'            => $form_dto->get_status(),
                'content'           => $form_dto->get_content(),
                'created_by'        => $form_dto->get_created_by(),
                'available_pages'   => wp_json_encode( $form_dto->get_available_pages() ),
                'collect_user_info' => $form_dto->get_collect_user_info(),
                'user_info_fields'  => wp_json_encode( $form_dto->get_user_info_fields() )
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
                'title'             => $form_dto->get_title(),
                'status'            => $form_dto->get_status(),
                'content'           => $form_dto->get_content(),
                'created_by'        => $form_dto->get_created_by(),
                'available_pages'   => wp_json_encode( $form_dto->get_available_pages() ),
                'collect_user_info' => $form_dto->get_collect_user_info(),
                'user_info_fields'  => wp_json_encode( $form_dto->get_user_info_fields() ),
                'updated_at'        => DateTime::now()
            ]
        );
    }

    public function update_status( int $id, string $status ) {
        $form = $this->get_by_id( $id );

        if ( ! $form ) {
            throw new Exception( esc_html__( 'Form not found', 'helpgent' ), 404 );
        }

        return Form::query()->where( 'id', $id )->update(
            [
                'status' => $status
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

    public function get_by_id_publish( int $id ) {
        return Form::query()->where( 'id', $id )->where( 'status', 'publish' )->first();
    }

    public function get_bubble_by_page_id( int $page_id ) {
        return Form::query()->where( 'status', 'publish' )->where( 'chat_bubble', 1 )
            ->where_raw( "(JSON_LENGTH(helpgent_forms.available_pages) = 0 or JSON_CONTAINS( JSON_UNQUOTE(JSON_EXTRACT(helpgent_forms.available_pages, '$')), JSON_QUOTE('{$page_id}'), '$'))" )
            ->get();
    }
}