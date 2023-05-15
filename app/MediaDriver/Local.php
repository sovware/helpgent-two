<?php

namespace HelpGent\App\MediaDriver;

use HelpGent\App\Contracts\MediaDriver;
use HelpGent\App\DTO\AttachmentDTO;

class Local implements MediaDriver {
    public function upload( array $file ): AttachmentDTO {
        echo "upload with local";
    }

    public function get( $id ) {
    }

    public function delete( $id ) {
    }
}
