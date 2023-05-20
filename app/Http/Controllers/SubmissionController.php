<?php

namespace HelpGent\App\Http\Controllers;

use HelpGent\App\DTO\SubmissionDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\SubmissionRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class SubmissionController extends Controller {
    public SubmissionRepository $submission_repository;

    public FormRepository $form_repository;

    public function __construct( SubmissionRepository $submission_repository, FormRepository $form_repository ) {
        $this->submission_repository = $submission_repository;
        $this->form_repository       = $form_repository;
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'form_id' => 'required|numeric'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $submission_dto = new SubmissionDTO(
            $wp_rest_request->get_param( 'form_id' ),
            get_current_user_id()
        );

        $submission_id = $this->submission_repository->create( $submission_dto );

        return Response::send(
            [
                'submission_id' => $submission_id,
                'message'       => esc_html__( 'Submission Created Successfully!', 'helpgent' )
            ]
        );
    }
}