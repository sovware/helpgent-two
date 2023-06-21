<?php

namespace HelpGent\App\Repositories;

use wpdb;
use Exception;
use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\DTO\SubmissionReadDTO;
use HelpGent\App\Models\Guest;
use HelpGent\App\Models\User;
use HelpGent\App\Models\Submission;
use HelpGent\App\Models\SubmissionTag;
use HelpGent\App\Models\SubmissionMeta;
use HelpGent\WaxFramework\Database\Query\Builder;

class SubmissionRepository {
    public function get( SubmissionReadDTO $submission_read_dto ) {
        $query = Submission::query()->with(
            [
                'tags',
                'user'                    => [$this, 'user_relationship'],
                'user_guest'              => [$this, 'guest_user_relationship'],
                'conversation'            => function ( Builder $query ) {
                    $query->order_by_desc( 'helpgent_conversations.id' );
                },
                'conversation.user'       => [$this, 'user_relationship'],
                'conversation.user_guest' => [$this, 'guest_user_relationship']
            ] 
        )->where( 'status', $submission_read_dto->get_status() );

        $count_query = Submission::query()->where( 'status', $submission_read_dto->get_status() );

        /**
         * If try to get specific form submissions
         */
        if ( 0 !== $submission_read_dto->get_form_id() ) {
            $query->where( 'form_id', $submission_read_dto->get_form_id() );
            $count_query->where( 'form_id', $submission_read_dto->get_form_id() );
        }

        /**
         * If try to get specific user submissions
         */
        if ( 0 !== $submission_read_dto->get_created_by() ) {
            /**
             * Is user type guest or registered user
             */
            $is_guest = $submission_read_dto->get_is_guest() ? 1 : 0;
            $query->where( 'created_by', $submission_read_dto->get_created_by() )->where( 'is_guest', $is_guest );
            $count_query->where( 'created_by', $submission_read_dto->get_created_by() )->where( 'is_guest', $is_guest );
        }

        $tag_ids = $submission_read_dto->get_tag_ids();

        // If find submissions of certain tags
        if ( ! empty( $tag_ids ) ) {
            $tag_ids    = map_deep( $tag_ids, 'intval' );
            $tag_exists = SubmissionTag::query()->select( 1 )
                            ->where_column( 'helpgent_submission_tag.submission_id', 'helpgent_submissions.id' )
                            ->where_in( 'helpgent_submission_tag.tag_id', $tag_ids )->limit( 1 );

            $query->where_exists( $tag_exists );
            $count_query->where_exists( $tag_exists );
        }

        if ( ! empty( $submission_read_dto->get_search() ) ) {
            global $wpdb;
            /**
             * @var wpdb $wpdb;
             */
            $search = $wpdb->prepare( "%s", "%{$submission_read_dto->get_search()}%" );
    
            $user_exists = User::query()->select( 1 )
                ->where( 'helpgent_submissions.is_guest', 0 )
                ->where_column( 'helpgent_submissions.created_by', 'users.ID' )
                ->where_raw( "(users.display_name like {$search} or users.user_email like {$search})" )
                ->limit( 1 );

            $guest_exists = Guest::query()->select( 1 )
                ->where( 'helpgent_submissions.is_guest', 1 )
                ->where_column( 'helpgent_submissions.created_by', 'helpgent_guest_users.id' )
                ->where_raw( "(helpgent_guest_users.first_name like {$search} or helpgent_guest_users.last_name like {$search} or helpgent_guest_users.email like $search)" )
                ->limit( 1 );
    
            $query->where_exists( $user_exists );
            $query->where_exists( $guest_exists, 'or' );
        }

        switch ( $submission_read_dto->get_order_by() ) {
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
            'submissions' => $query->pagination( $submission_read_dto->get_per_page(), $submission_read_dto->get_page() ),
            'total'       => $count_query->count()
        ] ;
    }

    protected function user_relationship( Builder $query ) {
        $query->select( 'users.ID', 'users.display_name' );
    }

    protected function guest_user_relationship( Builder $query ) {
        $query->select( 'helpgent_guest_users.id', 'helpgent_guest_users.first_name', 'helpgent_guest_users.last_name' );
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
                'is_guest'     => $submission_dto->get_is_guest()
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
                'updated_at'   => helpgent_now()
            ]
        );
    }

    public function update_create_by( int $id, int $created_by, int $is_guest = 0 ) {
        return Submission::query()->where( 'id', $id )->update(
            [
                'created_by' => $created_by,
                'is_guest'   => $is_guest
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

    public function get_meta( int $submission_id, string $meta_key ) {
        return SubmissionMeta::query()->where( 'submission_id', $submission_id )->where( 'meta_key', $meta_key )->first();
    }

    public function get_meta_value( int $submission_id, string $meta_key ) {
        $meta = $this->get_meta( $submission_id, $meta_key );
        if ( ! $meta ) {
            return false;
        }
        return $meta->meta_value;
    }

    public function add_meta( int $submission_id, string $meta_key, string $meta_value ) {
        $meta = $this->get_meta( $submission_id, $meta_key );

        if ( $meta ) {
            return false;
        }

        return SubmissionMeta::query()->insert(
            [
                'submission_id' => $submission_id,
                'meta_key'      => $meta_key,
                'meta_value'    => $meta_value,
            ]
        );
    }

    public function update_meta( int $submission_id, string $meta_key, string $meta_value ) {

        $update = SubmissionMeta::query()->where( 'form_id', $submission_id )->where( 'meta_key', $meta_key )->update(
            [
                'meta_value' => $meta_value,
            ]
        );

        if ( $update ) {
            return $update;
        }

        return SubmissionMeta::query()->insert(
            [
                'submission_id' => $submission_id,
                'meta_key'      => $meta_key,
                'meta_value'    => $meta_value,
            ]
        );
    }

    public function delete_meta( int $submission_id, string $meta_key ) {
        return SubmissionMeta::query()->where( 'submission_id', $submission_id )->where( 'meta_key', $meta_key )->delete();
    }

    public function verify_user( int $id, int $created_by, int $is_guest = 0, string $status = 'active' ): bool {
        $submission = Submission::query()->where( 'id', $id )->where( 'created_by', $created_by )->where( 'is_guest', $is_guest )->where( 'status', $status )->first();
        return $submission ? true : false;
    }
}