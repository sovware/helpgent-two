<?php

use HelpGent\App\MediaDriver\Local;

return apply_filters(
    'helpgent_media_driver', [
        'local' => Local::class,
    ]
);