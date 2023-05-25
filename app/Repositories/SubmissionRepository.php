<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Models\Submission;
use HelpGent\App\Models\SubmissionTag;
use HelpGent\App\Utils\DateTime;
use HelpGent\WaxFramework\Database\Query\Builder;

class SubmissionRepository {
    public function get( int $form_id, int $per_page, int $page, string $order_by, string $status, $tag_ids ) {
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
        )->where( 'form_id', $form_id )->where( 'status', $status );
        
        $count_query = Submission::query()->where( 'form_id', $form_id )->where( 'status', $status );

        // If find submissions of certain tags
        if ( ! empty( $tag_ids ) && is_array( $tag_ids ) ) {
            $tag_ids    = map_deep( $tag_ids, 'intval' );
            $tag_exists = SubmissionTag::query()->select( 1 )
                            ->where_column( 'helpgent_submission_tag.submission_id', 'helpgent_submissions.id' )
                            ->where_in( 'helpgent_submission_tag.tag_id', $tag_ids )->limit( 1 );

            $query->where_exists( $tag_exists );
            $count_query->where_exists( $tag_exists );
        }

        switch ( $order_by ) {
            case 'latest':
                $query->order_by_desc( 'updated_at' );
                break;
            case 'oldest':
                $query->order_by( 'updated_at' );
                break;
            case 'read':
                $query->order_by_desc( 'is_read' );
                break;
            case 'unread':
                $query->order_by( 'is_read' );
                break;
        }

        return [
            'submissions' => $query->pagination( $per_page, $page ),
            'total'       => $count_query->count()
        ] ;
    }

    public function total( int $form_id ) {
        return Submission::query()->where( 'form_id', $form_id )->count();
    }

    public function create( SubmissionDTO $submission_dto ) {
        return Submission::query()->insert_get_id(
            [
                'form_id'      => $submission_dto->get_form_id(),
                'status'       => $submission_dto->get_status(),
                'is_important' => $submission_dto->get_is_important(),
                'ip'           => $submission_dto->get_ip(),
                'city'         => $submission_dto->get_city(),
                'country'      => $submission_dto->get_country(),
                'created_by'   => $submission_dto->get_created_by(),
                'is_guest'     => $submission_dto->get_is_guest(),
                'updated_at'   => DateTime::now()
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
                'form_id'      => $submission_dto->get_form_id(),
                'status'       => $submission_dto->get_status(),
                'is_important' => $submission_dto->get_is_important(),
                'ip'           => $submission_dto->get_ip(),
                'city'         => $submission_dto->get_city(),
                'country'      => $submission_dto->get_country(),
                'created_by'   => $submission_dto->get_created_by(),
                'is_guest'     => $submission_dto->get_is_guest(),
                'updated_at'   => DateTime::now()
            ]
        );
    }

    public function get_by_id( int $id ) {
        return Submission::query()->where( 'id', $id )->first();
    }
    
    public function update_important_status( int $id, int $is_important ) {
        $form_submission = $this->get_by_id( $id );

        if ( ! $form_submission ) {
            throw new Exception( esc_html__( 'Form submission not found', 'helpgent' ), 404 );
        }

        return Submission::query()->where( 'id', $id )->update(
            [
                'is_important' => $is_important
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

    public function update_status( int $id, string $status ) {
        $submission = $this->get_by_id( $id );

        if ( ! $submission ) {
            throw new Exception( esc_html__( 'Form submission not found', 'helpgent' ), 404 );
        }

        return Submission::query()->where( 'id', $id )->update(
            [
                'status' => $status
            ]
        );
    }

    public function update_read( int $id, int $is_read ) {
        $submission = $this->get_by_id( $id );

        if ( ! $submission ) {
            throw new Exception( esc_html__( 'Form submission not found', 'helpgent' ), 404 );
        }

        return Submission::query()->where( 'id', $id )->update(
            [
                'is_read' => $is_read
            ]
        );
    }
}