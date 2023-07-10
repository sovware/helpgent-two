<?php

namespace HelpGent\App\Providers;

use HelpGent\App\DTO\MessageDTO;
use HelpGent\App\Models\Guest;
use HelpGent\App\Models\Message;
use HelpGent\App\Repositories\GuestRepository;
use HelpGent\App\Repositories\MessageRepository;
use HelpGent\App\Models\User;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\WaxFramework\Contracts\Provider;
use HelpGent\App\Mail\GreetingMessage;
use HelpGent\App\Mail\Admin\GreetingMessage as AdminGreetingMessage;
use HelpGent\App\Mail\NewMessage;
use HelpGent\App\Mail\Admin\NewMessage as AdminNewMessage;

class EmailNotificationServiceProvider implements Provider {
    public function boot() {
        add_action( 'helpgent_before_store_message', [$this, 'new_message_email'] );
        add_action( 'helpgent_after_submit_form', [$this, 'greeting_email'] );
    }

    public function new_message_email( MessageDTO $message_dto ) {
        $enable_email_notification = helpgent_get_setting( 'enable_email_notification', 'yes' );

        if ( 'yes' !== $enable_email_notification ) {
            return;
        }

        /**
         * @var ResponseRepository $response_repository
         */
        $response_repository = helpgent_singleton( ResponseRepository::class );

        $response = $response_repository->get_by_id( $message_dto->get_response_id() );

        $current_user = helpgent_get_current_user();
        $placeholders = helpgent_get_email_placeholders(
            [
                "{{MESSAGE}}" => $message_dto->get_message()
            ]
        );
        
        $from_name  = helpgent_get_setting( 'email_name', 'HelpGent' );
        $from_email = helpgent_get_setting( 'email_from', 'example@mail.com' );

        /**
         * Check is current message send my admin, then send email to user
         */
        $is_admin = $message_dto->get_created_by() !== intval( $response->created_by ) || $message_dto->get_is_guest() !== intval( $response->is_guest );

        if ( $is_admin ) {
            // $user_email_event = helpgent_get_setting( 'user_email_event', 'first_message' );

            $new_message_mail = new NewMessage;

            $new_message_mail->headers[] = "From: {$from_name} <{$from_email}>";
            $new_message_mail->headers[] = "Reply-To: {$from_email}";

            if ( 1 === intval( $response->is_guest ) ) {
                /**
                 * @var GuestRepository $guest_repository
                 */
                $guest_repository     = helpgent_singleton( GuestRepository::class );
                $guest                = $guest_repository->get_by_id( $response->created_by );
                $new_message_mail->to = $guest->email;
                $name                 = $this->get_full_name( $guest );
                $conversation_link    = helpgent_get_dashboard_page_url_with_token( $guest->token );

                $placeholders['{{REPLIER_NAME}}'] = $this->get_full_name( $current_user );
            } else {
                $user                 = User::query()->where( 'ID', $response->created_by )->first();
                $name                 = $user->display_name;
                $new_message_mail->to = $user->user_email;
                $conversation_link    = helpgent_get_dashboard_page_url();
        
                $placeholders['{{USERNAME}}']     = $user->user_nicename;
                $placeholders['{{REPLIER_NAME}}'] = $this->get_full_name( $current_user, 'Admin' );
            }

            $placeholders['{{NAME}}']              = $name;
            $placeholders['{{CONVERSATION_LINK}}'] = $conversation_link;
            $new_message_mail->placeholders        = $placeholders;
            $new_message_mail->send();
            
        } else { // Send message to user

            // $admin_email_event = helpgent_get_setting( 'admin_email_event', 'first_message' );

            $admins = $this->get_response_admins( $response );

            $admin_new_message_mail = new AdminNewMessage;

            foreach ( $admins as $admin ) {
                $placeholders["{{NAME}}"]             = $admin->display_name;
                $placeholders["{{USERNAME}}"]         = $admin->data->user_nicename;
                $admin_new_message_mail->placeholders = $placeholders;
                $admin_new_message_mail->to           = $admin->user_email;
                $admin_new_message_mail->send();
            }
        }
    }

    public function get_response_admins( $response ) {
        $messages = Message::query()->where( 'response_id', $response->id )->where( 'created_by', '!=', $response->created_by )
                            ->where( 'is_guest', 0 )->group_by( 'created_by' )->get();

        if ( empty( $messages ) ) {
            return [];
        }

        $user_ids = [];

        foreach ( $messages as $message ) {
            $user_ids[] = $message->created_by;
        }

        return User::query()->where_in( 'ID', $user_ids )->get();
    }

    public function greeting_email( $response, $auth_token = null ) {
        $enable_email_notification = helpgent_get_setting( 'enable_email_notification', 'yes' );

        if ( 'yes' !== $enable_email_notification ) {
            return;
        }

        /**
         * User notification
         */
        $dashboard_url      = helpgent_get_dashboard_page_url();
        $placeholders       = helpgent_get_email_placeholders( [] );
        $clone_placeholders = $placeholders;

        $greeting_mail = new GreetingMessage( ! empty( $auth_token ) );

        $from_name  = helpgent_get_setting( 'email_name', 'HelpGent' );
        $from_email = helpgent_get_setting( 'email_from', 'example@mail.com' );

        $greeting_mail->headers[] = "From: {$from_name} <{$from_email}>";
        $greeting_mail->headers[] = "Reply-To: {$from_email}";

        /**
         * Guest User
         */
        if ( ! empty( $auth_token ) ) {
            $verification_link = helpgent_get_dashboard_page_url_with_token( $auth_token, true );

            /**
             * @var GuestRepository $guest_repository
             */
            $guest_repository = helpgent_singleton( GuestRepository::class );
            $guest            = $guest_repository->get_by_token( $auth_token );
            $name             = $this->get_full_name( $guest );

            $placeholders["{{VERIFICATION_LINK}}"] = $verification_link;
            
            $greeting_mail->to = $guest->email;

        } else { // Auth User

            $user = wp_get_current_user();
            $name = $user->display_name;
            
            $placeholders["{{CONVERSATION_LINK}}"] = $dashboard_url;
            $placeholders["{{USERNAME}}"]          = $user->user_nicename;
            
            $greeting_mail->to = $user->user_email;
        }

        $placeholders["{{NAME}}"] = $name;

        $greeting_mail->placeholders = $placeholders;
        $greeting_mail->send();

        /**
         * Admin notification
         */
        $greeting_mail = new AdminGreetingMessage;

        $greeting_mail->headers[] = "From: {$from_name} <{$from_email}>";
        $greeting_mail->headers[] = "Reply-To: {$from_email}";

        $users = get_users( ['role' => 'administrator'] );

        $clone_placeholders["{{CONVERSATION_LINK}}"] = $dashboard_url;

        foreach ( $users as $user ) {
            $clone_placeholders["{{NAME}}"]         = $user->display_name;
            $clone_placeholders["{{USERNAME}}"]     = $user->data->user_nicename;
            $clone_placeholders["{{REPLIER_NAME}}"] = $name;

            $greeting_mail->placeholders = $clone_placeholders;
            $greeting_mail->to           = $user->data->user_email;
            $greeting_mail->send();
        }
    }

    public function get_full_name( $user, string $default = 'User' ) {
        return ! empty( $user->first_name ) ? $user->first_name . ( ! empty( $user->last_name ) ? ' ' . $user->last_name : '' ) : $default;
    }
}

