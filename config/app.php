<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Http\Middleware\EnsureIsUserAdmin;
use HelpGent\App\Providers\Admin\MenuServiceProvider;
use HelpGent\App\Providers\MediaProtectionProvider;
use HelpGent\App\Providers\Admin\MediaProtectionProvider as AdminMediaProtectionProvider;
use HelpGent\Database\Migrations\CreateDB;
use HelpGent\App\Providers\LocalizationServiceProvider;
use HelpGent\WaxFramework\App;

return [
    'version'                 => get_plugin_data(App::$plugin_root_file)['Version'],

    'rest_api'                => [
        'namespace' => 'helpgent',
        'versions'  => []
    ],

    'ajax_api'                => [
        'namespace' => 'helpgent',
        'versions'  => []
    ],

    'providers'               => [
        LocalizationServiceProvider::class,
        MediaProtectionProvider::class
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