<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Models\Submission;
use HelpGent\App\Utils\DateTime;
use HelpGent\WaxFramework\Database\Query\Builder;

class SubmissionRepository {
    public function get( int $form_id, int $per_page, int $page, string $order_by, $tag_ids ) {
        if ( $per_page > 100 || $per_page < 10 ) {
            $per_page = 100;
        }

        if ( 0 >= $page ) {
            $page = 1;
        }

        $offset = ( $page - 1 ) * $per_page;

        $query = Submission::query()->with(
            [
                'tags',
                'user'                    => function ( Builder $query ) {
                    $query->select( 'users.ID', 'users.display_name' );
                },
                'user_guest'              => function ( Builder $query ) {
                    $query->select( 'helpgent_guest_users.id', 'helpgent_guest_users.name' );
                },
                'conversation'            => function ( Builder $query ) {
                    $query->order_by_desc( 'helpgent_conversations.id' );
                },
                'conversation.user'       => function ( Builder $query ) {
                    $query->select( 'users.ID', 'users.display_name' );
                },
                'conversation.user_guest' => function ( Builder $query ) {
                    $query->select( 'helpgent_guest_users.id', 'helpgent_guest_users.name' );
                }
            ] 
        )->where( 'form_id', $form_id )->order_by_desc( 'is_favorite' );

        // If find submissions of certain tags
        if ( ! empty( $tag_ids ) && is_array( $tag_ids ) ) {
            $tag_ids = map_deep( $tag_ids, 'intval' );
            $query->where_exists(
                function( Builder $query ) use( $tag_ids ) {
                    $query->select( 1 )
                        ->from( 'helpgent_submission_tag' )
                        ->where_column( 'helpgent_submission_tag.submission_id', 'helpgent_submissions.id' )
                        ->where_in( 'helpgent_submission_tag.tag_id', $tag_ids )
                        ->limit( 1 );
                }
            );
        }

        switch ( $order_by ) {
            case 'latest':
                $query->order_by_desc( 'updated_at' );
                break;
            case 'oldest':
                $query->order_by( 'updated_at' );
                break;
            case 'read':
                $query->order_by_raw( "(CASE WHEN status = 'read' THEN 0 WHEN status = 'unread' THEN 1 END)" );
                break;
            case 'unread':
                $query->order_by_raw( "(CASE WHEN status = 'unread' THEN 0 WHEN status = 'read' THEN 1 END)" );
                break;
        }

        return $query->limit( $per_page )->offset( $offset )->get();
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
    
    public function update_favorite_status( int $id, int $is_favorite ) {
        $form_submission = $this->get_by_id( $id );

        if ( ! $form_submission ) {
            throw new Exception( esc_html__( 'Form submission not found', 'helpgent' ), 404 );
        }

        return Submission::query()->where( 'id', $id )->update(
            [
                'is_favorite' => $is_favorite
            ]
        );
    }

    public function delete( int $id ) {
        $submission = $this->get_by_id( $id );
        if ( ! $submission ) {
            throw new Exception( esc_html__( 'Submission not found', 'helpgent' ), 404 );
        }
        return Submission::query()->where( 'id', $id )->delete();
    }
}