<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Http\Middleware\Auth;
use HelpGent\App\Http\Middleware\AuthOrGuest;
use HelpGent\App\Http\Middleware\EnsureIsUserAdmin;
use HelpGent\App\Providers\Admin\MenuServiceProvider;
use HelpGent\App\Providers\MediaProtectionProvider;
use HelpGent\App\Providers\Admin\MediaProtectionProvider as AdminMediaProtectionProvider;
use HelpGent\Database\Migrations\CreateDB;
use HelpGent\App\Providers\LocalizationServiceProvider;
use HelpGent\App\Providers\PreviewServiceProvider;
use HelpGent\App\Providers\ShortCodeServiceProvider;
use HelpGent\App\Providers\ChatBubbleServiceProvider;
use HelpGent\WaxFramework\App;

return [
    'version'                 => get_plugin_data( App::$plugin_root_file )['Version'],

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
        MediaProtectionProvider::class,
        ShortCodeServiceProvider::class,
        PreviewServiceProvider::class,
        ChatBubbleServiceProvider::class,
    ],

    'admin_providers'         => [
        MenuServiceProvider::class,
        AdminMediaProtectionProvider::class,
    ],

    'middleware'              => [
        'admin'         => EnsureIsUserAdmin::class,
        'auth'          => Auth::class,
        'auth_or_guest' => AuthOrGuest::class
    ],

    'migration_db_option_key' => 'helpgent_migrations',

    'migrations'              => [
        // 'create-db' => CreateDB::class,
    ]
];