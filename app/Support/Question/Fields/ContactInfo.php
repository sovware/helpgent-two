<?php

namespace HelpGent\App\Support\Question\Fields;

use Exception;
use HelpGent\App\DTO\GuestDTO;
use HelpGent\App\Models\User;
use HelpGent\App\Repositories\GuestRepository;
use HelpGent\App\Repositories\QuestionAnswerRepository;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\App\Support\Question\Question;
use WP_REST_Request;

class ContactInfo extends Question {
    public GuestRepository $guest_repository;

    public ResponseRepository $response_repository;

    public function __construct( QuestionAnswerRepository $question_answer_repository, ResponseRepository $response_repository, GuestRepository $guest_repository ) {
        $this->guest_repository    = $guest_repository;
        $this->response_repository = $response_repository;
        parent::__construct( $question_answer_repository );
    }

    public function validate( WP_REST_Request $wp_rest_request, array $field ) {
        if ( ! $wp_rest_request->has_param( 'contact_info_email' ) ) {
            throw new Exception( $field['label'] . ' field is required.' );
        }
    }

    public function save_answer( WP_REST_Request $wp_rest_request, array $field, int $response_id ) {
        if ( is_user_logged_in() ) {
            $this->save_logged_response( $wp_rest_request, $field, $response_id );
        } else {
            $this->save_guest_response( $wp_rest_request, $field, $response_id );
        }
    }

    private function save_guest_response( WP_REST_Request $wp_rest_request, array $field, int $response_id ) {
        $email = $wp_rest_request->get_param( 'contact_info_email' );
        $guest = $this->guest_repository->get_by_email( $email );

        if ( $guest ) {
            $guest_id = $guest->id;
        } else {
            $user = User::query()->where( 'user_email', $email )->first();

            if ( $user ) {
                throw new Exception( esc_html__( "You already have an account, please enter you password to continue", 'helpgent' ), 511 );
            }

            $guest_dto = new GuestDTO(
                $email,
                (string) $wp_rest_request->get_param( 'contact_info_first_name' ),
                (string) $wp_rest_request->get_param( 'contact_info_last_name' ),
                (string) $wp_rest_request->get_param( 'contact_info_number' ),
                (string) $wp_rest_request->get_param( 'contact_info_company' ),
                helpgent_generate_token(),
                helpgent_now()->add_days( 30 )
            );
            $guest_id  = $this->guest_repository->create( $guest_dto );
        }

        $this->response_repository->add_meta( $response_id, 'contact_info_submit', 1 );
        $this->response_repository->update_create_by( $response_id, $guest_id, 1 );
        $this->response_repository->update_status( $response_id, 'unverified' );
    }

    private function save_logged_response( WP_REST_Request $wp_rest_request, array $field, int $response_id ) {
    }
}