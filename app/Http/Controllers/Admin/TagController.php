<?php

namespace HelpGent\App\Http\Controllers\Admin;

use Exception;
use HelpGent\App\DTO\TagDTO;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\TagRepository;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\WaxFramework\Routing\Response;
use WP_REST_Request;

class TagController extends Controller {
    public TagRepository $repository;

    public function __construct( TagRepository $repository ) {
        $this->repository = $repository;
    }

    public function index() {
        return Response::send(
            [
                'tags' => $this->repository->get()
            ]
        );
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'title'      => 'required|string|max:255',
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

        $tag_dto = new TagDTO(
            $wp_rest_request->get_param( 'title' ),
            get_current_user_id()
        );

        try {
            $tag_id = $this->repository->create( $tag_dto );

            return Response::send(
                [
                    'tag_id'  => $tag_id,
                    'message' => esc_html__( 'Tag Created Successfully!', 'helpgent' )
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
                'id'    => 'required|numeric',
                'title' => 'required|string|max:255'
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $tag_dto = new TagDTO(
            $wp_rest_request->get_param( 'title' ),
            get_current_user_id()
        );
        $tag_dto->set_id( $wp_rest_request->get_param( 'id' ) );

        try {
            $this->repository->update( $tag_dto );

            return Response::send(
                [
                    'message' => esc_html__( 'Tag Updated Successfully!', 'helpgent' )
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
            $delete = $this->repository->delete( $wp_rest_request->get_param( 'id' ) );

            if ( 0 === $delete ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            return Response::send(
                [
                    'message' => esc_html__( 'Tag Deleted Successfully!', 'helpgent' )
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