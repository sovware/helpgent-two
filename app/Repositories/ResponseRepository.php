<?php

namespace HelpGent\App\Repositories;

use wpdb;
use Exception;
use HelpGent\App\DTO\ResponseDTO;
use HelpGent\App\DTO\ResponseReadDTO;
use HelpGent\App\Models\Guest;
use HelpGent\App\Models\User;
use HelpGent\App\Models\Response;
use HelpGent\App\Models\ResponseTag;
use HelpGent\App\Models\ResponseMeta;
use HelpGent\WaxFramework\Database\Query\Builder;

class ResponseRepository {
    public function get( ResponseReadDTO $response_read_dto ) {
        $query = Response::query()->with(
            [
                'tags',
                'user'                    => [$this, 'user_relationship'],
                'user_guest'              => [$this, 'guest_user_relationship'],
                'conversation'            => function ( Builder $query ) {
                    $query->order_by_desc( 'helpgent_conversations.id' );
                },
                'conversation.forward',
                'conversation.user'       => [$this, 'user_relationship'],
                'conversation.user_guest' => [$this, 'guest_user_relationship']
            ] 
        )->where( 'status', $response_read_dto->get_status() );

        $count_query = Response::query()->where( 'status', $response_read_dto->get_status() );

        /**
         * If try to get specific form responses
         */
        if ( 0 !== $response_read_dto->get_form_id() ) {
            $query->where( 'form_id', $response_read_dto->get_form_id() );
            $count_query->where( 'form_id', $response_read_dto->get_form_id() );
        }

        /**
         * If try to get specific user responses
         */
        if ( 0 !== $response_read_dto->get_created_by() ) {
            /**
             * Is user type guest or registered user
             */
            $is_guest = $response_read_dto->get_is_guest() ? 1 : 0;
            $query->where( 'created_by', $response_read_dto->get_created_by() )->where( 'is_guest', $is_guest );
            $count_query->where( 'created_by', $response_read_dto->get_created_by() )->where( 'is_guest', $is_guest );
        }

        $tag_ids = $response_read_dto->get_tag_ids();

        // If find responses of certain tags
        if ( ! empty( $tag_ids ) ) {
            $tag_ids    = map_deep( $tag_ids, 'intval' );
            $tag_exists = ResponseTag::query()->select( 1 )
                            ->where_column( 'helpgent_response_tag.response_id', 'helpgent_responses.id' )
                            ->where_in( 'helpgent_response_tag.tag_id', $tag_ids )->limit( 1 );

            $query->where_exists( $tag_exists );
            $count_query->where_exists( $tag_exists );
        }

        if ( ! empty( $response_read_dto->get_search() ) ) {
            global $wpdb;
            /**
             * @var wpdb $wpdb;
             */
            $search = $wpdb->prepare( "%s", "%{$response_read_dto->get_search()}%" );
    
            $user_exists = User::query()->select( 1 )
                ->where( 'helpgent_responses.is_guest', 0 )
                ->where_column( 'helpgent_responses.created_by', 'users.ID' )
                ->where_raw( "(users.display_name like {$search} or users.user_email like {$search})" )
                ->limit( 1 );

            $guest_exists = Guest::query()->select( 1 )
                ->where( 'helpgent_responses.is_guest', 1 )
                ->where_column( 'helpgent_responses.created_by', 'helpgent_guest_users.id' )
                ->where_raw( "(helpgent_guest_users.first_name like {$search} or helpgent_guest_users.last_name like {$search} or helpgent_guest_users.email like $search)" )
                ->limit( 1 );
    
            $query->where_exists( $user_exists );
            $query->where_exists( $guest_exists, 'or' );
        }

        switch ( $response_read_dto->get_order_by() ) {
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
            'responses' => $query->pagination( $response_read_dto->get_per_page(), $response_read_dto->get_page() ),
            'total'     => $count_query->count()
        ] ;
    }

    public function user_relationship( Builder $query ) {
        $query->select( 'users.ID', 'users.display_name' );
    }

    public function guest_user_relationship( Builder $query ) {
        $query->select( 'helpgent_guest_users.id', 'helpgent_guest_users.first_name', 'helpgent_guest_users.last_name' );
    }

    public function total( int $form_id ) {
        return Response::query()->where( 'form_id', $form_id )->count();
    }

    public function create( ResponseDTO $response_dto ) {
        return Response::query()->insert_get_id(
            [
                'form_id'      => $response_dto->get_form_id(),
                'status'       => $response_dto->get_status(),
                'is_important' => $response_dto->get_is_important(),
                'ip'           => $response_dto->get_ip(),
                'city'         => $response_dto->get_city(),
                'country'      => $response_dto->get_country(),
                'created_by'   => $response_dto->get_created_by(),
                'is_guest'     => $response_dto->get_is_guest()
            ]
        );
    }

    public function update( ResponseDTO $response_dto ) {
        $form_response = $this->get_by_id( $response_dto->get_id() );

        if ( ! $form_response ) {
            throw new Exception( esc_html__( 'Form response not found', 'helpgent' ), 404 );
        }

        return Response::query()->where( 'id', $response_dto->get_id() )->update(
            [
                'form_id'      => $response_dto->get_form_id(),
                'status'       => $response_dto->get_status(),
                'is_important' => $response_dto->get_is_important(),
                'ip'           => $response_dto->get_ip(),
                'city'         => $response_dto->get_city(),
                'country'      => $response_dto->get_country(),
                'created_by'   => $response_dto->get_created_by(),
                'is_guest'     => $response_dto->get_is_guest(),
                'updated_at'   => helpgent_now()
            ]
        );
    }

    public function update_create_by( int $id, int $created_by, int $is_guest = 0 ) {
        return Response::query()->where( 'id', $id )->update(
            [
                'created_by' => $created_by,
                'is_guest'   => $is_guest
            ]
        );
    }

    public function get_by_id( int $id ) {
        return Response::query()->where( 'id', $id )->first();
    }
    
    public function update_important_status( int $id, int $is_important ) {
        $form_response = $this->get_by_id( $id );

        if ( ! $form_response ) {
            throw new Exception( esc_html__( 'Form response not found', 'helpgent' ), 404 );
        }

        return Response::query()->where( 'id', $id )->update(
            [
                'is_important' => $is_important
            ]
        );
    }

    public function delete( int $id ) {
        $response = $this->get_by_id( $id );
        if ( ! $response ) {
            throw new Exception( esc_html__( 'Response not found', 'helpgent' ), 404 );
        }
        return Response::query()->where( 'id', $id )->delete();
    }

    public function update_status( int $id, string $status ) {
        $response = $this->get_by_id( $id );

        if ( ! $response ) {
            throw new Exception( esc_html__( 'Form response not found', 'helpgent' ), 404 );
        }

        return Response::query()->where( 'id', $id )->update(
            [
                'status' => $status
            ]
        );
    }

    public function update_read( int $id, int $is_read ) {
        $response = $this->get_by_id( $id );

        if ( ! $response ) {
            throw new Exception( esc_html__( 'Form response not found', 'helpgent' ), 404 );
        }

        return Response::query()->where( 'id', $id )->update(
            [
                'is_read' => $is_read
            ]
        );
    }

    public function get_meta( int $response_id, string $meta_key ) {
        return ResponseMeta::query()->where( 'response_id', $response_id )->where( 'meta_key', $meta_key )->first();
    }

    public function get_meta_value( int $response_id, string $meta_key ) {
        $meta = $this->get_meta( $response_id, $meta_key );
        if ( ! $meta ) {
            return false;
        }
        return $meta->meta_value;
    }

    public function add_meta( int $response_id, string $meta_key, string $meta_value ) {
        $meta = $this->get_meta( $response_id, $meta_key );

        if ( $meta ) {
            return false;
        }

        return ResponseMeta::query()->insert(
            [
                'response_id' => $response_id,
                'meta_key'    => $meta_key,
                'meta_value'  => $meta_value,
            ]
        );
    }

    public function update_meta( int $response_id, string $meta_key, string $meta_value ) {

        $update = ResponseMeta::query()->where( 'form_id', $response_id )->where( 'meta_key', $meta_key )->update(
            [
                'meta_value' => $meta_value,
            ]
        );

        if ( $update ) {
            return $update;
        }

        return ResponseMeta::query()->insert(
            [
                'response_id' => $response_id,
                'meta_key'    => $meta_key,
                'meta_value'  => $meta_value,
            ]
        );
    }

    public function delete_meta( int $response_id, string $meta_key ) {
        return ResponseMeta::query()->where( 'response_id', $response_id )->where( 'meta_key', $meta_key )->delete();
    }

    public function verify_user( int $id, int $created_by, int $is_guest = 0, string $status = 'active' ): bool {
        $response = Response::query()->where( 'id', $id )->where( 'created_by', $created_by )->where( 'is_guest', $is_guest )->where( 'status', $status )->first();
        return $response ? true : false;
    }
}