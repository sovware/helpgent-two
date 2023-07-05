<?php

namespace HelpGent\App\Repositories;

use wpdb;
use stdClass;
use Exception;
use HelpGent\App\DTO\MessageDTO;
use HelpGent\App\Models\Attachment;
use HelpGent\App\Models\Message;
use HelpGent\WaxFramework\Database\Query\Builder;

class MessageRepository {
    public ResponseRepository $response_repository;

    public function __construct( ResponseRepository $response_repository ) {
        $this->response_repository = $response_repository;
    }

    public function get( int $response_id, int $per_page, int $page, string $search = '' ) {
        $select_columns = $this->selected_columns();

        $messages_query = Message::query()->select( $select_columns )->with(
            [
                'user'              => [$this, 'user_relation'],
                'user_guest'        => [$this, 'user_guest_relation'],
                'parent'            => function( Builder $query )use( $select_columns ) {
                    $query->select( $select_columns );
                },
                'parent.user'       => [$this, 'user_relation'],
                'parent.user_guest' => [$this, 'user_guest_relation'],
                'attachment',
                'forward.attachment'
            ]
        )->where( 'response_id', $response_id );

        $count_query = Message::query()->where( 'response_id', $response_id );

        if ( ! empty( $search ) ) {
            global $wpdb;
            /**
             * @var wpdb $wpdb;
             */
            $search = $wpdb->prepare( "%s", "%{$search}%" );
            $messages_query->where_raw( "helpgent_messages.message like {$search}" );
            $count_query->where_raw( "helpgent_messages.message like {$search}" );
        }

        $messages = $messages_query->pagination( $per_page, $page );

        $messages = array_map( [$this, 'prepare_message'] , $messages );

        return [
            'messages' => $messages,
            'total'    => $count_query->count()
        ];
    }

    public function attachment( int $response_id, string $type, int $per_page, int $page, string $search = '' ) {
        $attachment_exists = Attachment::query( 'attachment' )->select( 1 )->where_column( 'attachment.id', 'message.attachment_id' )->limit( 1 );

        if ( 'all' !== $type ) {
            $attachment_exists->where( 'mime_type', $type );
        }

        $messages_query = Message::query( 'message' )->with(
            [
                'user'              => [$this, 'user_relation'],
                'user_guest'        => [$this, 'user_guest_relation'],
                'parent',
                'parent.user'       => [$this, 'user_relation'],
                'parent.user_guest' => [$this, 'user_guest_relation'],
                'attachment'
            ]
        )->where( 'response_id', $response_id )->where( 'status', 'publish' )->where( 'attachment_id', '>', 0 )->where_exists( $attachment_exists );  

        $count_query = Message::query( 'message' )->where( 'response_id', $response_id )->where( 'status', 'publish' )->where( 'attachment_id', '>', 0 )->where_exists( $attachment_exists );
        $messages    = $messages_query->pagination( $per_page, $page );
        $messages    = array_map( [$this, 'prepare_message'] , $messages );

        return [
            'messages' => $messages,
            'total'    => $count_query->count()
        ];
    }

    protected function selected_columns() {
        $removed_message = esc_html__( "This message was removed", "helpgent" );

        return "id, response_id, attachment_id, is_read, is_guest, created_by, agent_trigger, parent_id, forward_id, updated_at, status, created_at,
            CASE 
                WHEN status = 'trash' THEN '{$removed_message}' 
                ELSE message 
            END AS message";
    }

    public function user_relation( Builder $query ) {
        $query->select( 'users.ID', 'users.display_name', 'users.user_email' );
    }

    public function user_guest_relation( Builder $query ) {
        $query->select( 'helpgent_guest_users.id', 'helpgent_guest_users.first_name', 'helpgent_guest_users.last_name', 'helpgent_guest_users.email' );
    }

    private function prepare_message( stdClass &$message ) {
        if ( isset( $message->user->user_email ) ) {
            $avatar_url                = get_avatar_url( $message->user->user_email );
            $message->user->avatar_url = $avatar_url;
            unset( $message->user->user_email );
        } elseif ( isset( $message->user_guest->email ) ) {
            $avatar_url                      = get_avatar_url( $message->user_guest->email );
            $message->user_guest->avatar_url = $avatar_url;
            unset( $message->user_guest->email );
        }

        if ( ! empty( $message->parent ) ) {
            $this->prepare_message( $message->parent );
        }

        return $message;
    }

    public function create( MessageDTO $message_dto ) {
        $form_response = $this->response_repository->get_by_id( $message_dto->get_response_id() );

        if ( ! $form_response ) {
            throw new Exception( esc_html__( 'Form response not found', 'helpgent' ), 404 );
        }

        $data = [
            'response_id'   => $message_dto->get_response_id(),
            'is_read'       => $message_dto->get_is_read(),
            'is_guest'      => $message_dto->get_is_guest(),
            'parent_id'     => $message_dto->get_parent_id(),
            'forward_id'    => $message_dto->get_forward_id(),
            'created_by'    => $message_dto->get_created_by(),
            'agent_trigger' => $message_dto->get_agent_trigger(),
            'status'        => $message_dto->get_status(),
            'created_at'    => helpgent_now()
        ];

        $attachment_id = $message_dto->get_attachment_id();
        $message       = $message_dto->get_message();

        if ( 0 < $attachment_id ) {
            $data['attachment_id'] = $attachment_id;
        }

        if ( ! empty( $message ) ) {
            $data['message'] = $message;
        }

        return Message::query()->insert_get_id( $data );
    }

    public function update( MessageDTO $message_dto ) {
        $message = Message::query()->where( 'id', $message_dto->get_id() )->where( 'response_id', $message_dto->get_response_id() )->first();

        if ( ! $message ) {
            throw new Exception( esc_html__( "Message not found.", "helpgent" ), 404 );
        }

        $user = helpgent_get_current_user();

        if ( $user->id !== intval( $message->created_by ) || intval( $user->is_guest ) !== intval( $message->is_guest ) ) {
            throw new Exception( esc_html__( "Sorry, you can't update this message", "helpgent" ), 500 );
        }

        if ( 0 < $message->attachment_id ) {
            throw new Exception( esc_html__( "Sorry, you can't update the attachment.", "helpgent" ), 500 );
        }

        return Message::query()->where( 'id', $message_dto->get_id() )->where( 'response_id', $message_dto->get_response_id() )->update(
            [
                'message'    => $message_dto->get_message(),
                'updated_at' => helpgent_now()
            ]
        );
    }

    public function delete( int $id, int $response_id ) {
        $message = Message::query()->where( 'id', $id )->where( 'response_id', $response_id )->first();

        if ( ! $message ) {
            throw new Exception( esc_html__( "Message not found.", "helpgent" ), 404 );
        }

        $user = helpgent_get_current_user();

        if ( $user->id !== intval( $message->created_by ) || intval( $user->is_guest ) !== intval( $message->is_guest ) ) {
            throw new Exception( esc_html__( "Sorry, you can't delete this message", "helpgent" ), 500 );
        }

        /**
         * TODO: Need to delete attachment
         */
        $delete = Message::query()->where( 'id', $id )->where( 'response_id', $response_id )->update(
            [
                'status'        => 'trash',
                'message'       => '',
                'attachment_id' => 0,
                'forward_id'    => 0
            ]
        );

        $forward_id = intval( $message->forward_id );

        if ( $message->id !== 0 && ! $this->get_by_forward_id_first( $forward_id ) ) {
            /**
             * @var ForwardRepository $forward_repository
             */
            $forward_repository = helpgent_singleton( ForwardRepository::class );
            $forward_repository->delete( $forward_id );
        }

        return $delete;
    }

    public function get_by_id( int $id ) {
        return Message::query()->where( 'id', $id )->first();
    }

    public function get_by_forward_id_first( int $forward_id ) {
        return Message::query()->where( 'forward_id', $forward_id )->first();
    }
}