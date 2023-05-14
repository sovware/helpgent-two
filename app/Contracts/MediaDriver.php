<?php

namespace HelpGent\App\Contracts;

use Exception;
use HelpGent\App\DTO\AttachmentFileDTO;

interface MediaDriver {

    /**
     * @return AttachmentFileDTO|Exception
     */
    public function upload( array $file );

    public function get( array $attachment ) : AttachmentFileDTO;

    public function delete( AttachmentFileDTO $attachment ) : bool;

}