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

        $response = $this->form_repository->get(
            intval( $wp_rest_request->get_param( 'per_page' ) ),
            intval( $wp_rest_request->get_param( 'page' ) )
        );

        $response['current_user_name'] = wp_get_current_user()->display_name;

        return Response::send( $response );
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'title'             => 'required|string|max:255|min:5',
                'status'            => 'required|string|accepted:publish,draft',
                'content'           => 'required|json',
                'is_chat_bubble'    => 'required|accepted:0,1',
                'is_guest_allowed'  => 'required|accepted:0,1',
                'available_pages'   => 'required|array',
                'selected_template' => 'string' 
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
            $selected_template = $wp_rest_request->get_param( 'selected_template' );

            if ( ! empty( $selected_template ) ) {
                $content = $this->form_repository->get_template_content( $selected_template );
            } else {
                $content = $wp_rest_request->get_param( 'content' );
            }

            $form_dto = new FormDTO(
                $wp_rest_request->get_param( 'title' ),
                $wp_rest_request->get_param( 'status' ),
                $content,
                intval( $wp_rest_request->get_param( 'is_chat_bubble' ) ),
                $wp_rest_request->get_param( 'available_pages' ),
                intval( $wp_rest_request->get_param( 'is_guest_allowed' ) ),
                get_current_user_id(),
            );
    
            $form_id = $this->form_repository->create( $form_dto );
    
            return Response::send(
                [
                    'form'    => $this->form_repository->get_single( $form_id ),
                    'message' => esc_html__( 'Form Created Successfully!', 'helpgent' )
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

    public function show( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id' => 'required|numeric'
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
            return Response::send(
                [
                    'form' => $this->form_repository->get_single( intval( $wp_rest_request->get_param( 'id' ) ) )
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

    public function update( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'               => 'required|numeric',
                'title'            => 'required|string|max:255|min:5',
                'status'           => 'required|string|accepted:publish,draft',
                'content'          => 'required|json',
                'is_chat_bubble'   => 'required|accepted:0,1',
                'is_guest_allowed' => 'required|accepted:0,1',
                'available_pages'  => 'required|array',
                'created_by'       => 'required|integer'
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
            intval( $wp_rest_request->get_param( 'is_chat_bubble' ) ),
            $wp_rest_request->get_param( 'available_pages' ),
            intval( $wp_rest_request->get_param( 'is_guest_allowed' ) ),
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

    public function templates() {
        $templates       = helpgent_config( 'templates' );
        $templates_url   = helpgent_url( 'app/Templates' );
        $final_templates = [];

        foreach ( $templates as $key => $template ) {
            $template['screenshot_src'] = $templates_url . "/{$key}/screenshot.webp";
            $final_templates[$key]      = $template;
        }

        return Response::send(
            [
                'templates' => $final_templates
            ]
        );
    }
}