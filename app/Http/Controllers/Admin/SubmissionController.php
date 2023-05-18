<?php

namespace HelpGent\App\Http\Controllers\Admin;

use Exception;
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
    
    public function index( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'form_id'  => 'required|numeric',
                'per_page' => 'numeric',
                'page'     => 'numeric',
                'order_by' => 'required|string|accepted:read,unread,latest,oldest'
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
            [
                'submissions' => $this->submission_repository->get( 
                    $wp_rest_request->get_param( 'form_id' ), 
                    intval( $wp_rest_request->get_param( 'per_page' ) ),
                    intval( $wp_rest_request->get_param( 'page' ) ),
                    $wp_rest_request->get_param( 'order_by' )
                )
            ]
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

    public function favorite( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'id'       => 'required|integer',
                'favorite' => 'required|integer|accepted:0,1'
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
            $update = $this->submission_repository->update_favorite_status( $wp_rest_request->get_param( 'id' ), $wp_rest_request->get_param( 'favorite' ) );

            if ( 0 === $update ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Favorite status updated successfully!', 'helpgent' )
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