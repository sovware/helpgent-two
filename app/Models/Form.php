<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Resolver;
use HelpGent\WaxFramework\Database\Eloquent\Model;

class Form extends Model {
    public static function get_table_name():string {
        return 'helpgent_forms';
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}