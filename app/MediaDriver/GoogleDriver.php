<?php

namespace HelpGent\App\MediaDriver;

use Exception;
use HelpGent\App\Contracts\MediaDriver;
use HelpGent\App\DTO\AttachmentFileDTO;

class GoogleDriver implements MediaDriver {

    /**
     * Upload
     * 
     * @param array $file
     * @return AttachmentFileDTO|Exception
     */
    public function upload( array $file ) {
        $file_name = $file['name'];
        $file_size = $file['size'];
        $mime_type = 'image/png';
        $file_url  = null;
        $file_id   = 'abc123';

        return new AttachmentFileDTO( $file_name, $file_size, $mime_type, $file_url, $file_id );
    }

    /**
     * Get
     * 
     * @param array $attachment
     * @return AttachmentFileDTO|Exception
     */
    public function get( array $attachment ) : AttachmentFileDTO {
        $file_title = $attachment['title'];
        $file_size  = $attachment['size'];
        $mime_type  = $attachment['mime_type'];
        $file_id    = $attachment['file_id'];

        return new AttachmentFileDTO( $file_title, $file_size, $mime_type, null, $file_id );
    }

    /**
     * Delete
     * 
     * @param int $id
     * @return bool
     */
    public function delete( $id ) : bool {
        return false;
    }
}
