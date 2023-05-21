<?php

namespace HelpGent\App\Repositories;

use Exception;
use HelpGent\App\Utils\DateTime;
use HelpGent\App\Models\Attachment;
use HelpGent\App\Contracts\MediaDriver;
use HelpGent\App\DTO\AttachmentDTO;
use HelpGent\App\DTO\AttachmentFileDTO;

class AttachmentRepository {
    public function get() {
        return Attachment::query()->get();
    }

    public function create( AttachmentDTO $attachment_dto ) {
        return Attachment::query()->insert_get_id(
            [
                'title'      => $attachment_dto->get_title(),
                'mime_type'  => $attachment_dto->get_mime_type(),
                'file_size'  => $attachment_dto->get_file_size(),
                'storage'    => $attachment_dto->get_storage(),
                'file_id'    => $attachment_dto->get_file_id(),
                'created_by' => $attachment_dto->get_created_by(),
                'is_guest'   => $attachment_dto->get_is_guest(),
            ]
        );
    }

    public function update( AttachmentDTO $attachment_dto ) {
        $attachment = $this->get_by_id( $attachment_dto->get_id() );

        if ( ! $attachment ) {
            throw new Exception( esc_html__( 'Attachment not found', 'helpgent' ), 404 );
        }

        return Attachment::query()->where( 'id', $attachment_dto->get_id() )->update(
            [
                'title'      => $attachment_dto->get_title(),
                'mime_type'  => $attachment_dto->get_mime_type(),
                'file_size'  => $attachment_dto->get_file_size(),
                'storage'    => $attachment_dto->get_storage(),
                'file_id'    => $attachment_dto->get_file_id(),
                'created_by' => $attachment_dto->get_created_by(),
                'is_guest'   => $attachment_dto->get_is_guest(),
                'updated_at' => DateTime::now()
            ]
        );
    }

    public function delete( int $id ) {
        $attachment = $this->get_by_id( $id );

        if ( ! $attachment ) {
            throw new Exception( esc_html__( 'Attachment not found', 'helpgent' ), 404 );
        }

        return Attachment::query()->where( 'id', $id )->delete();
    }

    /**
     * @throws Exception
     * @return AttachmentFileDTO
     */
    public function upload( array $file, string $driver ) : AttachmentFileDTO {
        $driver_instance = $this->get_media_driver_instance( $driver );
        return $driver_instance->upload( $file );
    }

    public function delete_file( AttachmentFileDTO $attachment, string $driver ) : bool {
        $driver_instance = $this->get_media_driver_instance( $driver );
        return $driver_instance->delete( $attachment );
    }

    /**
     * @throws Exception Please use a valid media driver
     * @return MediaDriver
     */
    protected function get_media_driver_instance( string $driver ) : MediaDriver {
        $driver_class = helpgent_config( "media-driver.{$driver}" );

        if ( ! class_exists( $driver_class ) ) {
            throw new Exception( __( 'Please use a valid media driver', 'helpgent' ), 500 );
        }

        return helpgent_singleton( ( string ) $driver_class );
    }

    public function get_by_id( int $id ) {
        return Attachment::query()->where( 'id', $id )->first();
    }

    public function get_by_title( string $title ) {
        return Attachment::query()->where( 'title', $title )->first();
    }
}