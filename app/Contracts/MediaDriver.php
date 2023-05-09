<?php

namespace HelpGent\App\Contracts;
use HelpGent\App\DTO\AttachmentDTO;

interface MediaDriver {
    public function upload( array $file ):AttachmentDTO;

    public function get( $id );

    public function delete( $id );
}