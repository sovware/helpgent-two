<?php

namespace HelpGent\App\Repositories;

use wpdb;
use stdClass;
use Exception;
use HelpGent\App\DTO\ConversationDTO;
use HelpGent\App\Models\Attachment;
use HelpGent\App\Models\Conversation;
use HelpGent\WaxFramework\Database\Query\Builder;

class ConversationRepository {
    public ResponseRepository $response_repository;

    public function __construct( ResponseRepository $response_repository ) {
        $this->response_repository = $response_repository;
    }

    public function get( int $response_id, int $per_page, int $page, string $search = '' ) {
        $select_columns = $this->selected_columns();

        $conversations_query = Conversation::query()->select( $select_columns )->with(
            [
                'user'              => [$this, 'user_relation'],
                'user_guest'        => [$this, 'user_guest_relation'],
                'parent'            => function( Builder $query )use( $select_columns ) {
                    $query->select( $select_columns );
                },
                'parent.user'       => [$this, 'user_relation'],
                'parent.user_guest' => [$this, 'user_guest_relation'],
                'attachment'
            ]
        )->where( 'response_id', $response_id );

        $count_query = Conversation::query()->where( 'response_id', $response_id );

        if ( ! empty( $search ) ) {
            global $wpdb;
            /**
             * @var wpdb $wpdb;
             */
            $search = $wpdb->prepare( "%s", "%{$search}%" );
            $conversations_query->where_raw( "helpgent_conversations.message like {$search}" );
            $count_query->where_raw( "helpgent_conversations.message like {$search}" );
        }

        $conversations = $conversations_query->pagination( $per_page, $page );

        $conversations = array_map( [$this, 'prepare_conversation'] , $conversations );

        return [
            'conversations' => $conversations,
            'total'         => $count_query->count()
        ];
    }

    public function attachment( int $response_id, string $type, int $per_page, int $page, string $search = '' ) {
        $attachment_exists = Attachment::query( 'attachment' )->select( 1 )->where_column( 'attachment.id', 'conversation.attachment_id' )->limit( 1 );

        if ( 'all' !== $type ) {
            $attachment_exists->where( 'mime_type', $type );
        }

        $conversations_query = Conversation::query( 'conversation' )->with(
            [
                'user'              => [$this, 'user_relation'],
                'user_guest'        => [$this, 'user_guest_relation'],
                'parent',
                'parent.user'       => [$this, 'user_relation'],
                'parent.user_guest' => [$this, 'user_guest_relation'],
                'attachment'
            ]
        )->where( 'response_id', $response_id )->where( 'status', 'publish' )->where( 'attachment_id', '>', 0 )->where_exists( $attachment_exists );  

        $count_query   = Conversation::query( 'conversation' )->where( 'response_id', $response_id )->where( 'status', 'publish' )->where( 'attachment_id', '>', 0 )->where_exists( $attachment_exists );
        $conversations = $conversations_query->pagination( $per_page, $page );
        $conversations = array_map( [$this, 'prepare_conversation'] , $conversations );

        return [
            'conversations' => $conversations,
            'total'         => $count_query->count()
        ];
    }

    protected function selected_columns() {
        $removed_message = esc_html__( "This message was removed", "helpgent" );

        return "id, response_id, attachment_id, is_read, is_guest, created_by, agent_trigger, parent_id, parent_type, updated_at, status, created_at,
            CASE 
                WHEN status = 'trash' THEN '{$removed_message}' 
                ELSE message 
            END AS message";
    }

    public function user_relation( Builder $query ) {
        $query->select( 'users.ID', 'users.display_name', 'users.user_email' );
    }

    public function user_guest_relation( Builder $query ) {
        $query->select( 'helpgent_guest_users.id', 'helpgent_guest_users.name', 'helpgent_guest_users.email' );
    }

    private function prepare_conversation( stdClass &$conversation ) {
        if ( isset( $conversation->user->user_email ) ) {
            $avatar_url                     = get_avatar_url( $conversation->user->user_email );
            $conversation->user->avatar_url = $avatar_url;
            unset( $conversation->user->user_email );
        } elseif ( isset( $conversation->user_guest->email ) ) {
            $avatar_url                           = get_avatar_url( $conversation->user_guest->email );
            $conversation->user_guest->avatar_url = $avatar_url;
            unset( $conversation->user_guest->email );
        }

        if ( ! empty( $conversation->parent ) ) {
            $this->prepare_conversation( $conversation->parent );
        }

        return $conversation;
    }

    public function create( ConversationDTO $conversation_dto ) {
        $form_response = $this->response_repository->get_by_id( $conversation_dto->get_response_id() );

        if ( ! $form_response ) {
            throw new Exception( esc_html__( 'Form response not found', 'helpgent' ), 404 );
        }

        $data = [
            'response_id'   => $conversation_dto->get_response_id(),
            'is_read'       => $conversation_dto->get_is_read(),
            'is_guest'      => $conversation_dto->get_is_guest(),
            'parent_id'     => $conversation_dto->get_parent_id(),
            'parent_type'   => $conversation_dto->get_parent_type(),
            'created_by'    => $conversation_dto->get_created_by(),
            'agent_trigger' => $conversation_dto->get_agent_trigger(),
            'status'        => $conversation_dto->get_status(),
            'created_at'    => helpgent_now()
        ];

        $attachment_id = $conversation_dto->get_attachment_id();
        $message       = $conversation_dto->get_message();

        if ( 0 < $attachment_id ) {
            $data['attachment_id'] = $attachment_id;
        }

        if ( ! empty( $message ) ) {
            $data['message'] = $message;
        }

        return Conversation::query()->insert_get_id( $data );
    }

    public function update( ConversationDTO $conversation_dto ) {
        $conversation = Conversation::query()->where( 'id', $conversation_dto->get_id() )->where( 'response_id', $conversation_dto->get_response_id() )->first();

        if ( ! $conversation ) {
            throw new Exception( esc_html__( "Conversation not found.", "helpgent" ), 404 );
        }

        if ( 0 < $conversation->attachment_id ) {
            throw new Exception( esc_html__( "Sorry, you can't update the attachment.", "helpgent" ), 500 );
        }

        return Conversation::query()->where( 'id', $conversation_dto->get_id() )->where( 'response_id', $conversation_dto->get_response_id() )->update(
            [
                'message'    => $conversation_dto->get_message(),
                'updated_at' => helpgent_now()
            ]
        );
    }

    public function delete( int $id, int $response_id ) {
        $conversation = Conversation::query()->where( 'id', $id )->where( 'response_id', $response_id )->first();

        if ( ! $conversation ) {
            throw new Exception( esc_html__( "Conversation not found.", "helpgent" ), 404 );
        }

        return Conversation::query()->where( 'id', $id )->where( 'response_id', $response_id )->update(
            [
                'status' => 'trash'
            ]
        );
    }
}