<?php

namespace HelpGent\App\MediaDriver;

use Exception;
use HelpGent\App\Contracts\MediaDriver;
use HelpGent\App\DTO\AttachmentFileDTO;

class Local implements MediaDriver {

    /**
     * @return AttachmentFileDTO|Exception
     */
    public function upload( array $file ) {
        helpgent_include_media_uploader_files();
        helpgent_prepare_upload_directory();

        add_filter( 'upload_dir', [ $this, 'change_upload_dir' ] );

        $file_name = helpgent_get_unique_key( 'file' ) . '.' . helpgent_get_extension_from_path( $file['name'] );
        $file_size = $file['size'];

        $file['name'] = $file_name;

        $file = wp_handle_upload( $file, [ 'test_form' => false ], time() );

        remove_filter( 'upload_dir', [ $this, 'change_upload_dir' ] );

        if ( ! $file ) {
            throw new Exception( __( "Could not upload the file, please try again", 'helpgent' ), 500 );
        }

        return new AttachmentFileDTO( $file_name, $file_size, $file['type'], $file['url'] );
    }

    public function change_upload_dir( array $uploads ) : array {
        $uploads['path']   = helpgent_config( 'storage.upload_dir_path' );
        $uploads['url']    = helpgent_config( 'storage.upload_dir_url' );
        $uploads['subdir'] = '';

        return $uploads;
    }

    public function get( array $attachment ) : AttachmentFileDTO {
        $file_title = $attachment['title'];
        $file_size  = $attachment['size'];
        $mime_type  = $attachment['mime_type'];

        return new AttachmentFileDTO( $file_title, $file_size, $mime_type, null, null );
    }
    
    public function delete( AttachmentFileDTO $attachment ) : bool {
        $file_src = trailingslashit( helpgent_config( 'storage.upload_dir_path' ) ) . $attachment->get_file_name();

        if ( ! file_exists( $file_src ) ) {
            return false;
        }

        wp_delete_file( $file_src );

        return true;
    }
}
