<?php

namespace HelpGent\App\Contracts;

use Exception;
use HelpGent\App\DTO\AttachmentFileDTO;

interface MediaDriver {
    /**
     * @throws Exception
     * @return AttachmentFileDTO
     */
    public function upload( array $file ) : AttachmentFileDTO;

    public function get( array $attachment ) : AttachmentFileDTO;

    public function delete( AttachmentFileDTO $attachment ) : bool;
}