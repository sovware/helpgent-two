<?php

namespace HelpGent\App\Http\Controllers;

use Exception;
use WP_REST_Request;
use HelpGent\App\Http\Controllers\Controller;
use HelpGent\App\Repositories\AttachmentRepository;
use HelpGent\WaxFramework\Routing\Response;
use HelpGent\WaxFramework\RequestValidator\Validator;
use HelpGent\App\DTO\AttachmentDTO;

class AttachmentController extends Controller {

    public AttachmentRepository $attachment_repository;
    public string $attachment_driver;

    public function __construct( AttachmentRepository $attachment_repository ) {
        $this->attachment_repository = $attachment_repository;
        $this->attachment_driver     = 'client';
    }

    public function index() {
        return Response::send(
            [
                'attachments' => $this->attachment_repository->get()
            ]
        );
    }

    public function show( $id ) {
        $attachment = $this->attachment_repository->get_by_id( $id );

        if ( ! $attachment ) {
            return Response::send(
                [
                    'message' => esc_html__( 'Attachment not found', 'helpgent' )
                ], 404
            );
        }

        return Response::send(
            [
                'attachment' => $attachment
            ]
        );
    }

    public function store( Validator $validator, WP_REST_Request $wp_rest_request ) {
        $validator->validate(
            [
                'file' => 'required|file',
            ]
        );

        if ( $validator->is_fail() ) {
            return Response::send(
                [
                    'messages' => $validator->errors
                ], 422
            );
        }

        $file    = $wp_rest_request->get_param( 'file' );
        $storage = $this->attachment_driver;

        try {
            $uploaded_file = $this->attachment_repository->upload( $file, $storage );
        } catch ( Exception $e ) {
            return Response::send(
                [ 'messages' => $e->getMessage() ], $e->getCode()
            );
        }

        $attachment_dto = new AttachmentDTO(
            $uploaded_file->get_file_name(),
            $uploaded_file->get_mime_type(),
            $uploaded_file->get_file_size(),
            get_current_user_id(),
            $storage,
        );

        $attachment_id = $this->attachment_repository->create( $attachment_dto );

        return Response::send(
            [
                'attachment_id' => $attachment_id,
                'message'       => esc_html__( 'The Attachment Created Successfully!', 'helpgent' )
            ]
        );
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
            $attachment_id = $wp_rest_request->get_param( 'id' );
            $attachment    = $this->attachment_repository->get_by_id( $attachment_id );

            if ( ! $attachment ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Attachment not found', 'helpgent' )
                    ], 404
                );
            }

            $delete = $this->attachment_repository->delete( $attachment_id );

            if ( 0 === $delete ) {
                return Response::send(
                    [
                        'message' => esc_html__( 'Something Was Wrong!', 'helpgent' )
                    ], 500
                );
            }

            $this->attachment_repository->delete_file( $attachment, $this->attachment_driver );

            return Response::send(
                [
                    'message' => esc_html__( 'The Attachment Deleted Successfully!', 'helpgent' )
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