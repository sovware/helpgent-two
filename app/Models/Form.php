<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Eloquent\Relations\HasMany;
use HelpGent\WaxFramework\Database\Resolver;
use HelpGent\WaxFramework\Database\Eloquent\Model;
use HelpGent\WaxFramework\Database\Eloquent\Relations\BelongsToOne;

class Form extends Model {
    public static function get_table_name():string {
        return 'helpgent_forms';
    }

    public function user():BelongsToOne {
        return $this->belongs_to_one( User::class, 'ID', 'created_by' );
    }

    public function submissions(): HasMany {
        return $this->has_many( Submission::class, 'form_id', 'id' );
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}