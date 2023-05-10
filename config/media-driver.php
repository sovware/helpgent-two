<?php

use HelpGent\App\MediaDriver\Local;
use HelpGent\App\MediaDriver\GoogleDrive;

return apply_filters(
    'helpgent_media_driver', [
        'local'        => Local::class,
        'google-drive' => GoogleDrive::class,
    ]
);