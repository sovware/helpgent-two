<?php

namespace HelpGent\App\Providers;

use HelpGent\App\DTO\MessageDTO;
use HelpGent\App\Repositories\MessageRepository;
use HelpGent\WaxFramework\Contracts\Provider;
use HelpGent\App\Mail\GreetingMessage;
use HelpGent\App\Mail\NewMessage;

class EmailNotificationServiceProvider implements Provider {
    public function boot() {
        add_action( 'helpgent_before_store_message', [$this, 'new_message_email'] );
        add_action( 'helpgent_after_submit_form', [$this, 'greeting_email'] );
    }

    public function new_message_email( MessageDTO $message_dto ) {
        $enable_email_notification = helpgent_get_setting( 'enable_email_notification', 'no' );

        // if ( 'yes' !== $enable_email_notification ) {
        //     return;
        // }

        /**
         * // @var MessageRepository $message_repository
         */
        // $message_repository = helpgent_singleton( MessageRepository::class );

        // $message      = $message_repository->get_by_id( $message_dto->get_id() );
        $user         = helpgent_get_current_user();
        $placeholders = helpgent_get_email_placeholders(
            [
                "{{MESSAGE}}" => $message_dto->get_message()
            ], $user
        );

        $new_message_mail               = new NewMessage;
        $new_message_mail->placeholders = $placeholders;
        $new_message_mail->to           = 'testl@kds.com';
        $new_message_mail->send();
    }

    public function greeting_email( $response ) {
        // $enable_email_notification = helpgent_get_setting( 'enable_email_notification', 'no' );

        // if ( 'yes' !== $enable_email_notification ) {
        //     return;
        // }

        $user         = helpgent_get_current_user();
        $placeholders = helpgent_get_email_placeholders(
            [
                "{{MESSAGE}}" => "Getting Mail" // TODO need to pass message
            ], $user
        );

        $greeting_mail               = new GreetingMessage( $user );
        $greeting_mail->placeholders = $placeholders;
        $greeting_mail->send();
    } 
}

