<?php

namespace HelpGent\App\Http\Controllers\Admin;

use Exception;
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

    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'per_page' => 'numeric',
                'page'     => 'numeric'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        return Response::send(
            $this->form_repository->get(
                intval( $wp_rest_request->get_param( 'per_page' ) ),
                intval( $wp_rest_request->get_param( 'page' ) )
            )
        );
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'title'   => 'required|string|max:255|min:5',
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

    public function update( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'         => 'required|numeric',
                'title'      => 'required|string|max:255|min:5',
                'status'     => 'required|string|accepted:publish,draft',
                'content'    => 'required|json',
                'created_by' => 'required|integer'
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
            $wp_rest_request->get_param( 'created_by' )
        );

        $form_dto->set_id( $wp_rest_request->get_param( 'id' ) );

        try {
            $update = $this->form_repository->update( $form_dto );

            if ( 1 !== $update ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Form Updated Successfully!', 'helpgent' )
                ]
            );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function update_status( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'     => 'required|numeric',
                'status' => 'required|string|accepted:publish,draft'
            ]
        );
        
        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        try {
            $this->form_repository->update_status( 
                $wp_rest_request->get_param( 'id' ), 
                $wp_rest_request->get_param( 'status' )
            );

            return Response::send(
                [
                    'message' => esc_html__( "Form status updated successfully!", 'helpgent' )
                ]
            );

        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }

    public function delete( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id' => 'required|numeric',
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        try {
            $delete = $this->form_repository->delete( $wp_rest_request->get_param( 'id' ) );

            if ( 0 === $delete ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Form Deleted Successfully!', 'helpgent' )
                ]
            );
        } catch ( Exception $exception ) {
            return Response::send(
                [
                    'message' => $exception->getMessage()
                ],
                $exception->getCode()
            );
        }
    }
}