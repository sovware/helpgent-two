<?php

namespace HelpGent\App\Http\Controllers\Admin;

use Exception;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\FormRepository;
use HelpGent\App\Repositories\SubmissionRepository;
use HelpGent\App\Repositories\SubmissionTagRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class SubmissionController extends Controller {
    public SubmissionRepository $submission_repository;

    public FormRepository $form_repository;

    public SubmissionTagRepository $submission_tag_repository;

    public function __construct( SubmissionRepository $submission_repository, FormRepository $form_repository, SubmissionTagRepository $submission_tag_repository ) {
        $this->submission_repository     = $submission_repository;
        $this->form_repository           = $form_repository;
        $this->submission_tag_repository = $submission_tag_repository;
    }
    
    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'form_id'  => 'required|numeric',
                'per_page' => 'numeric',
                'page'     => 'numeric',
                'order_by' => 'required|string|accepted:read,unread,latest,oldest',
                'status'   => 'required|string|accepted:active,archive,trash',
                'tag_ids'  => 'array'
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
            $this->submission_repository->get( 
                $wp_rest_request->get_param( 'form_id' ), 
                intval( $wp_rest_request->get_param( 'per_page' ) ),
                intval( $wp_rest_request->get_param( 'page' ) ),
                $wp_rest_request->get_param( 'order_by' ),
                $wp_rest_request->get_param( 'status' ),
                $wp_rest_request->get_param( 'tag_ids' )
            )
        );
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
            $delete = $this->submission_repository->delete( $wp_rest_request->get_param( 'id' ) );

            if ( 0 === $delete ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Submission Deleted Successfully!', 'helpgent' )
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
            $update = $this->submission_repository->update_important_status( $wp_rest_request->get_param( 'id' ), $wp_rest_request->get_param( 'important' ) );

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
                'tag_id'        => 'required|integer',
                'submission_id' => 'required|integer'
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
            $this->submission_tag_repository->add_or_remove( 
                $wp_rest_request->get_param( 'submission_id' ), 
                $wp_rest_request->get_param( 'tag_id' ),
                get_current_user_id()
            );

            return Response::send(
                [
                    'message' => esc_html__( "Submission tag updated successfully!", 'helpgent' )
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
            $this->submission_repository->update_status( 
                $wp_rest_request->get_param( 'id' ), 
                $wp_rest_request->get_param( 'status' )
            );

            return Response::send(
                [
                    'message' => esc_html__( "Submission status updated successfully!", 'helpgent' )
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
            $this->submission_repository->update_read( 
                $wp_rest_request->get_param( 'id' ), 
                $wp_rest_request->get_param( 'is_read' )
            );

            return Response::send(
                [
                    'message' => esc_html__( "Submission read status updated successfully!", 'helpgent' )
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