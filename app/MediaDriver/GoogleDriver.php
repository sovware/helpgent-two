<?php

namespace HelpGent\App\MediaDriver;

use HelpGent\App\Contracts\MediaDriver;
use HelpGent\App\DTO\AttachmentDTO;

class GoogleDriver implements MediaDriver {
    public function upload( array $file ):AttachmentDTO {
        echo "upload with google drive";
    }

    public function get( $id ) {
    }

    public function delete( $id ) {
    }
}
