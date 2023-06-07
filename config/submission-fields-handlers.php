<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Support\Submission\Fields\Text;
use HelpGent\App\Support\Submission\Fields\File;

return [
    'text' => Text::class,
    'file' => File::class,
];