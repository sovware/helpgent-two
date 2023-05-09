<?php

namespace HelpGent\App\MediaDriver;

use Exception;
use HelpGent\App\Contracts\MediaDriver;
use HelpGent\App\DTO\AttachmentFileDTO;

class Local implements MediaDriver {

    /**
     * Upload
     * 
     * @param array $file
     * @return AttachmentFileDTO|Exception
     */
    public function upload( array $file ) {
        helpgent_include_media_uploader_files();

		add_filter( 'upload_dir', [ __CLASS__, 'change_upload_dir' ] );

		$time = current_time('mysql');

		$file_name = helpgent_get_unique_key( 'file' ) . '.' . helpgent_get_extension_from_path( $file['name'] );
		$file_size = $file['size'];

		$file['name'] = $file_name;

		$file = wp_handle_upload( $file, [ 'test_form' => false ], $time );

		remove_filter( 'upload_dir', [ __CLASS__, 'change_upload_dir' ] );

		if ( ! $file ) {
			throw new Exception( __( "Could not upload the file, please try again", 'helpgent' ), 500 );
		}

        $mime_type = $file['type'];
        $file_url  = $file['url'];

        return new AttachmentFileDTO( $file_name, $file_size, $mime_type, $file_url );
    }

    public static function change_upload_dir( $uploads ) {
		$uploads['path']   = helpgent_config( 'storage.upload_dir_path' );
		$uploads['url']    = helpgent_config( 'storage.upload_dir_url' );
		$uploads['subdir'] = '';

		return $uploads;
	}

    /**
     * Get
     * 
     * @param array $attachment
     * @return AttachmentFileDTO|Exception
     */
    public function get( $attachment ) : AttachmentFileDTO {
        $file_title = $attachment['title'];
        $file_size  = $attachment['size'];
        $mime_type  = $attachment['mime_type'];

        return new AttachmentFileDTO( $file_title, $file_size, $mime_type, null, null );
    }

    /**
     * Delete
     * 
     * @param array $attachment
     * @return bool
     */
    public function delete( $attachment ) : bool {
        $file_src = trailingslashit( helpgent_config( 'storage.upload_dir_path' ) ) . $attachment['title'];

		if ( ! file_exists( $file_src ) ) {
			return false;
		}

		wp_delete_file( $file_src );

		return true;
    }
}
