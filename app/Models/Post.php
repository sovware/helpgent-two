<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Eloquent\Model;
use HelpGent\WaxFramework\Database\Eloquent\Relations\HasMany;
use HelpGent\WaxFramework\Database\Resolver;

class Post extends Model {
    public static function get_table_name():string {
        return 'posts';
    }

    public function meta(): HasMany {
        return $this->has_many( PostMeta::class, 'post_id', 'ID' );
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}