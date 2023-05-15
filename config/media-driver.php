<?php

use HelpGent\App\MediaDriver\Local;
use HelpGent\App\MediaDriver\GoogleDriver;

return apply_filters(
    'helpgent_media_driver', [
        'local'         => Local::class,
        'google-driver' => GoogleDriver::class,
    ]
);