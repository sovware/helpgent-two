<?php

namespace HelpGent\App\Repositories;
use Exception;
use HelpGent\App\Contracts\MediaDriver;
use HelpGent\App\DTO\AttachmentDTO;

class AttachmentRepository {
    public function upload( array $file, string $driver ): AttachmentDTO {
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
}