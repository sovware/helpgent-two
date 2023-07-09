<?php

namespace HelpGent\App\Providers;

use HelpGent\App\DTO\MessageDTO;
use HelpGent\App\Models\Guest;
use HelpGent\App\Repositories\GuestRepository;
use HelpGent\App\Repositories\MessageRepository;
use HelpGent\App\Models\User;
use HelpGent\WaxFramework\Contracts\Provider;
use HelpGent\App\Mail\GreetingMessage;
use HelpGent\App\Mail\Admin\GreetingMessage as AdminGreetingMessage;
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

        // $admin_email_event = helpgent_get_setting( 'admin_email_event', 'first_message' );
        /**
         * // @var MessageRepository $message_repository
         */
        // $message_repository = helpgent_singleton( MessageRepository::class );

        // $message      = $message_repository->get_by_id( $message_dto->get_id() );

              // if ( 1 == $response->is_guest ) {
        //     /**
        //      * @var GuestRepository $guest_repository
        //      */
        //     $guest_repository = helpgent_singleton( GuestRepository::class );
        //     $guest            = $guest_repository->get_by_id( $response->created_by );
            
        // } else {
        //     $user = User::query()->where( 'ID', $response->created_by )->first();
        // }
        $user         = helpgent_get_current_user();
        $placeholders = helpgent_get_email_placeholders(
            [
                "{{MESSAGE}}" => $message_dto->get_message()
            ], $user
        );

        $new_message_mail               = new NewMessage;
        $new_message_mail->placeholders = $placeholders;
        $new_message_mail->to           = $user->email;
        $new_message_mail->send();
    }

    public function greeting_email( $response ) {
        $enable_email_notification = helpgent_get_setting( 'enable_email_notification', 'yes' );

        if ( 'yes' !== $enable_email_notification ) {
            return;
        }

        /**
         * User notification
         */
        $user          = helpgent_get_current_user( true );
        $dashboard_url = helpgent_get_dashboard_page_url();

        $verification_link = add_query_arg( 'hg-auth-token', $user->token, $dashboard_url );
        $verification_link = add_query_arg( 'verification', true, $verification_link );
        $verification_link = sprintf( '<a href="%s" style="color: #1b83fb;">%s</a>', $verification_link, $verification_link );

        $placeholders  = helpgent_get_email_placeholders( [], $user );
        $greeting_mail = new GreetingMessage( $user->is_guest );

        $placeholders["{{VERIFICATION_LINK}}"] = $verification_link;

        $greeting_mail->placeholders = $placeholders;
        $greeting_mail->to           = $user->email;
        $greeting_mail->send();

        /**
         * Admin notification
         */
        $greeting_mail = new AdminGreetingMessage;
        $users         = get_users( ['role' => 'administrator'] );

        foreach ( $users as $user ) {
            $placeholders["{{NAME}}"]              = $user->display_name;
            $placeholders["{{USERNAME}}"]          = $user->data->user_nicename;
            $placeholders["{{CONVERSATION_LINK}}"] = $dashboard_url;
            $greeting_mail->placeholders           = $placeholders;
            $greeting_mail->to                     = $user->data->user_email;
            $greeting_mail->send();
        }
    } 
}

