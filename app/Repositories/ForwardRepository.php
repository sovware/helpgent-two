<?php

namespace HelpGent\App\Repositories;

use HelpGent\App\DTO\ConversationForwardDTO;
use HelpGent\App\Models\ConversationForward;
use HelpGent\App\Models\Guest;
use HelpGent\App\Models\Response;
use HelpGent\App\Models\User;
use HelpGent\WaxFramework\Database\Query\Builder;
use stdClass;

class ForwardRepository {
    public function create( ConversationForwardDTO $conversation_forward_dto ) {
        return ConversationForward::query()->insert_get_id(
            [
                'conversation_id' => $conversation_forward_dto->get_conversation_id(),
                'message'         => $conversation_forward_dto->get_message(),
                'attachment_id'   => $conversation_forward_dto->get_attachment_id()
            ]
        );
    }

    public function update( ConversationForwardDTO $conversation_forward_dto ) {
        return ConversationForward::query()->where( 'id', $conversation_forward_dto->get_id() )->update(
            [
                'conversation_id' => $conversation_forward_dto->get_conversation_id(),
                'message'         => $conversation_forward_dto->get_message(),
                'attachment_id'   => $conversation_forward_dto->get_attachment_id(),
                'updated_at'      => helpgent_now()
            ]
        );
    }

    public function users( int $per_page, int $page, string $search = '' ) {
        $current_user = helpgent_get_current_user();
        $users        = User::query()->select( 'users.ID', 'users.display_name', 'users.user_email' )->where( 'ID', '!=', $current_user->id );
        $count_users  = User::query()->where( 'ID', '!=', $current_user->id );

        if ( ! empty( $search ) ) {
            $search = "%{$search}%";
            $users->where( 'display_name', 'like', $search )->or_where( 'user_nicename', 'like', $search )->or_where( 'user_email', 'like', $search );
            $count_users->where( 'display_name', 'like', $search )->or_where( 'user_nicename', 'like', $search )->or_where( 'user_email', 'like', $search );
        }

        $users = $users->pagination( $per_page, $page, 100, 5 );

        $users = array_map(
            function( $user ) {
                $user->avatar_url = get_avatar_url( $user->user_email );
                unset( $user->user_email );
                return $user;
            }, $users
        );

        return [
            'users' => $users,
            'total' => $count_users->count(),
        ];
    }

    public function responses( int $response_id, int $per_page, int $page, string $search = '', int $created_by = 0, int $is_guest = 0 ) {
        $user  = User::query( 'users' )->select( 1 )->where( 'responses.is_guest', 0 )->where_column( 'users.ID', 'responses.created_by' )->limit( 1 );
        $guest = Guest::query( 'guest' )->select( 1 )->where( 'responses.is_guest', 1 )->where_column( 'guest.id', 'responses.created_by' )->limit( 1 );

        if ( ! empty( $search ) ) {
            $user->where( 'users.display_name', 'like', "%{$search}%" );
            $guest->where( "CONCAT(guest.first_name, ' ', guest.last_name)", "like", "%{$search}%" );
        }

        $exists_sql = "( exists ( {$user->to_sql()} ) or exists ( {$guest->to_sql()} ) )";

        $count_query = Response::query( 'responses' )->where( 'status', 'active' )->where_raw( $exists_sql );
        $responses   = Response::query( 'responses' )->with(
            [
                'user'         => [$this, 'user_relationship'],
                'user_guest'   => [$this, 'guest_user_relationship'],
                'conversation' => function ( Builder $query ) {
                    $query->order_by_desc( 'helpgent_conversations.id' );
                }
            ] 
        )->where( 'status', 'active' )->where_raw( $exists_sql );

        if ( 0 !== $created_by ) {
            $responses->where( 'created_by', $created_by )->where( 'is_guest', $is_guest );
            $count_query->where( 'created_by', $created_by )->where( 'is_guest', $is_guest );
        }

        $responses = $responses->pagination( $per_page, $page, 100, 5 );

        $total = $count_query->count();

        $responses = array_map( [$this, 'prepare_responses'] , $responses );

        return compact( 'responses', 'total' );
    }

    private function prepare_responses( stdClass &$response ) {
        if ( isset( $response->user->user_email ) ) {
            $avatar_url                 = get_avatar_url( $response->user->user_email );
            $response->user->avatar_url = $avatar_url;
            unset( $response->user->user_email );
        } elseif ( isset( $response->user_guest->email ) ) {
            $avatar_url                       = get_avatar_url( $response->user_guest->email );
            $response->user_guest->avatar_url = $avatar_url;
            unset( $response->user_guest->email );
        }

        if ( ! empty( $response->parent ) ) {
            $this->prepare_responses( $response->parent );
        }

        return $response;
    }

    public function user_relationship( Builder $query ) {
        $query->select( 'users.ID', 'users.display_name', 'users.user_email' );
    }

    public function guest_user_relationship( Builder $query ) {
        $query->select( 'helpgent_guest_users.id', 'helpgent_guest_users.first_name', 'helpgent_guest_users.last_name', 'helpgent_guest_users.email' );
    }
}
