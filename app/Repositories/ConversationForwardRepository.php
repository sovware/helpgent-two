<?php

namespace HelpGent\App\Repositories;
use HelpGent\App\DTO\ConversationForwardDTO;
use HelpGent\App\Models\ConversationForward;

class ConversationForwardRepository {
    public function create( ConversationForwardDTO $conversation_forward_dto ) {
        return ConversationForward::query()->insert_get_id(
            [
                'conversation_id' => $conversation_forward_dto->get_conversation_id(),
                'message'         => $conversation_forward_dto->get_message(),
                'is_attachment'   => $conversation_forward_dto->get_is_attachment()
            ]
        );
    }

    public function update( ConversationForwardDTO $conversation_forward_dto ) {
        return ConversationForward::query()->where( 'id', $conversation_forward_dto->get_id() )->update(
            [
                'conversation_id' => $conversation_forward_dto->get_conversation_id(),
                'message'         => $conversation_forward_dto->get_message(),
                'is_attachment'   => $conversation_forward_dto->get_is_attachment(),
                'updated_at'      => helpgent_now()
            ]
        );
    }
}