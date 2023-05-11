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
     * @return AttachmentFileDTO|Exception
     */
    public function upload( array $file, string $driver ) {
        $driver_class = helpgent_config( "media-driver.{$driver}" );
    
        if ( ! class_exists( $driver_class ) ) {
            throw new Exception( "Please use a valid media driver", 500 );
        }

        $driver_instance = helpgent_singleton( (string) $driver_class );
        
        if ( ! $driver_instance instanceof MediaDriver ) {
            throw new Exception( "Please use a valid media driver", 500 );
        }

        return $driver_instance->upload( $file );
    }

    public function delete_file( AttachmentFileDTO $attachment, string $driver ) {
        $driver_class = helpgent_config( "media-driver.{$driver}" );
    
        if ( ! class_exists( $driver_class ) ) {
            throw new Exception( "Please use a valid media driver", 500 );
        }

        $driver_instance = helpgent_singleton( (string) $driver_class );
        
        if ( ! $driver_instance instanceof MediaDriver ) {
            throw new Exception( "Please use a valid media driver", 500 );
        }

        return $driver_instance->delete( $attachment );
    }

    public function get_by_id( int $id ) {
        return Attachment::query()->where( 'id', $id )->first();
    }
}