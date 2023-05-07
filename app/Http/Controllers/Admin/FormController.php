<?php

namespace HelpGent\App\Http\Controllers\Admin;

use HelpGent\App\DTO\FormDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class FormController extends Controller {
    public FormRepository $form_repository;

    public function __construct( FormRepository $form_repository ) {
        $this->form_repository = $form_repository;
    }

    public function index() {
        return Response::send(
            [
                'forms' => $this->form_repository->get()
            ]
        );
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'title'   => 'required|string|max:255',
                'status'  => 'required|string|accepted:publish,draft',
                'content' => 'required|json',
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $form_dto = new FormDTO(
            $wp_rest_request->get_param( 'title' ),
            $wp_rest_request->get_param( 'status' ),
            $wp_rest_request->get_param( 'content' ),
            get_current_user_id()
        );

        $form_id = $this->form_repository->create( $form_dto );

        return Response::send(
            [
                'form_id' => $form_id,
                'message' => esc_html__( 'Form Created Successfully!', 'helpgent' )
            ]
        );
    }
}