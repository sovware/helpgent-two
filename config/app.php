<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Http\Middleware\EnsureIsUserAdmin;
use HelpGent\App\Providers\Admin\MenuServiceProvider;
use HelpGent\App\Providers\MediaProtectionProvider;
use HelpGent\App\Providers\Admin\MediaProtectionProvider as AdminMediaProtectionProvider;
use HelpGent\Database\Migrations\CreateDB;

return [
    'version'                 => '2.0.0',

    'rest_api'                => [
        'namespace' => 'helpgent',
        'versions'  => []
    ],

    'ajax_api'                => [
        'namespace' => 'helpgent',
        'versions'  => []
    ],

    'providers'               => [
        MediaProtectionProvider::class,
    ],

    'admin_providers'         => [
        MenuServiceProvider::class,
        AdminMediaProtectionProvider::class,
    ],

    'middleware'              => [
        'admin' => EnsureIsUserAdmin::class
    ],

    'migration_db_option_key' => 'helpgent_migrations',

    'migrations'              => [
        'create-db' => CreateDB::class,
    ]
];