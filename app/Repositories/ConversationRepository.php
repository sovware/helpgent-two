<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\DTO\ConversationDTO;
use HelpGent\App\Models\Conversation;
use HelpGent\App\Utils\DateTime;
use HelpGent\WaxFramework\Database\Query\Builder;
use stdClass;
use wpdb;

class ConversationRepository {
    public SubmissionRepository $submission_repository;

    public function __construct( SubmissionRepository $submission_repository ) {
        $this->submission_repository = $submission_repository;
    }

    public function get( int $submission_id, int $per_page, int $page, string $search = '' ) {
        $removed_message = esc_html__( "This message was removed", "helpgent" );

        $select_columns = "id, submission_id, is_attachment, is_read, is_guest, created_by, agent_trigger, parent_id, parent_type, updated_at, status, created_at,
            CASE 
                WHEN status = 'trash' THEN '{$removed_message}' 
                ELSE message 
            END AS message";

        $conversations_query =  Conversation::query()->select( $select_columns )->with(
            [
                'user'              => [$this, 'user_relation'],
                'user_guest'        => [$this, 'user_guest_relation'],
                'parent'            => function( Builder $query )use( $select_columns ) {
                    $query->select( $select_columns );
                },
                'parent.user'       => [$this, 'user_relation'],
                'parent.user_guest' => [$this, 'user_guest_relation'],
            ]
        )->where( 'submission_id', $submission_id );

        $count_query = Conversation::query()->where( 'submission_id', $submission_id );

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
            unset( $conversation->user_guest->user_email );
        }

        if ( ! empty( $conversation->parent ) ) {
            $this->prepare_conversation( $conversation->parent );
        }

        return $conversation;
    }

    public function create( ConversationDTO $conversation_dto ) {
        $form_submission = $this->submission_repository->get_by_id( $conversation_dto->get_submission_id() );

        if ( ! $form_submission ) {
            throw new Exception( esc_html__( 'Form submission not found', 'helpgent' ), 404 );
        }

        return Conversation::query()->insert(
            [
                'submission_id' => $conversation_dto->get_submission_id(),
                'message'       => $conversation_dto->get_message(),
                'is_attachment' => $conversation_dto->get_is_attachment(),
                'is_read'       => $conversation_dto->get_is_read(),
                'is_guest'      => $conversation_dto->get_is_guest(),
                'created_by'    => $conversation_dto->get_created_by(),
                'agent_trigger' => $conversation_dto->get_agent_trigger(),
                'status'        => $conversation_dto->get_status(),
                'created_at'    => DateTime::now()
            ]
        );
    }

    public function update( ConversationDTO $conversation_dto ) {

        $conversation = Conversation::query()->where( 'id', $conversation_dto->get_id() )->where( 'submission_id', $conversation_dto->get_submission_id() )->first();

        if ( ! $conversation ) {
            throw new Exception( esc_html__( "Conversation not found.", "helpgent" ), 404 );
        }

        if ( 1 == $conversation->is_attachment ) {
            throw new Exception( esc_html__( "Sorry, you can't update the attachment.", "helpgent" ), 404 );
        }

        return Conversation::query()->where( 'id', $conversation_dto->get_id() )->where( 'submission_id', $conversation_dto->get_submission_id() )->update(
            [
                'message'    => $conversation_dto->get_message(),
                'updated_at' => DateTime::now()
            ]
        );
    }

    public function delete( int $id, int $submission_id ) {
        
        $conversation = Conversation::query()->where( 'id', $id )->where( 'submission_id', $submission_id )->first();

        if ( ! $conversation ) {
            throw new Exception( esc_html__( "Conversation not found.", "helpgent" ), 404 );
        }

        return Conversation::query()->where( 'id', $id )->where( 'submission_id', $submission_id )->update(
            [
                'status' => 'trash'
            ]
        );
    }
}