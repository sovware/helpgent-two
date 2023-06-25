<?php

namespace HelpGent\App\Http\Controllers\Admin;

use Exception;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\ResponseRepository;
use HelpGent\App\Repositories\ResponseTagRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class ResponseController extends Controller {
    public ResponseRepository $response_repository;

    public FormRepository $form_repository;

    public ResponseTagRepository $response_tag_repository;

    public function __construct( ResponseRepository $response_repository, FormRepository $form_repository, ResponseTagRepository $response_tag_repository ) {
        $this->response_repository     = $response_repository;
        $this->form_repository         = $form_repository;
        $this->response_tag_repository = $response_tag_repository;
    }

    public function delete( Validator $validator, WP_REST_Request $wp_rest_request ) {
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
            $delete = $this->response_repository->delete( $wp_rest_request->get_param( 'id' ) );

            if ( 0 === $delete ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Response Deleted Successfully!', 'helpgent' )
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

    public function important( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'        => 'required|numeric',
                'important' => 'required|integer|accepted:0,1'
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
            $update = $this->response_repository->update_important_status( $wp_rest_request->get_param( 'id' ), $wp_rest_request->get_param( 'important' ) );

            if ( 0 === $update ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Important status updated successfully!', 'helpgent' )
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

    public function setup_tag( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'tag_id'      => 'required|integer',
                'response_id' => 'required|integer'
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
            $this->response_tag_repository->add_or_remove( 
                $wp_rest_request->get_param( 'response_id' ), 
                $wp_rest_request->get_param( 'tag_id' ),
                get_current_user_id()
            );

            return Response::send(
                [
                    'message' => esc_html__( "Response tag updated successfully!", 'helpgent' )
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
                'status' => 'required|string|accepted:active,archive,trash'
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
            $this->response_repository->update_status( 
                $wp_rest_request->get_param( 'id' ), 
                $wp_rest_request->get_param( 'status' )
            );

            return Response::send(
                [
                    'message' => esc_html__( "Response status updated successfully!", 'helpgent' )
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

    public function update_read( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'      => 'required|numeric',
                'is_read' => 'required|integer|accepted:0,1'
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
            $this->response_repository->update_read( 
                $wp_rest_request->get_param( 'id' ), 
                $wp_rest_request->get_param( 'is_read' )
            );

            return Response::send(
                [
                    'message' => esc_html__( "Response read status updated successfully!", 'helpgent' )
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