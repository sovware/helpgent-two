<?php

defined( 'ABSPATH' ) || exit;

return [
    'sample_one' => [
        'title'    => esc_html__( 'Sample One', 'helpgent' ),
        'is_pro'   => false,
        'category' => 'survey'
    ],
    'sample_two' => [
        'title'    => esc_html__( 'Sample Two', 'helpgent' ),
        'is_pro'   => true,
        'category' => 'quiz'
    ],
];