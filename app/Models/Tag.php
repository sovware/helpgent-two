<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Eloquent\Relations\BelongsToOne;
use HelpGent\WaxFramework\Database\Resolver;
use HelpGent\WaxFramework\Database\Eloquent\Model;

class Tag extends Model {
    public static function get_table_name():string {
        return 'helpgent_tags';
    }

    public function user():BelongsToOne {
        return $this->belongs_to_one( User::class, 'ID', 'created_by' );
    }
    
    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}