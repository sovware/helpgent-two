<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Resolver;
use HelpGent\WaxFramework\Database\Eloquent\Model;
use HelpGent\WaxFramework\Database\Eloquent\Relations\BelongsToOne;

class Message extends Model {
    public static function get_table_name():string {
        return 'helpgent_messages';
    }

    public function parent():BelongsToOne {
        return $this->belongs_to_one( Message::class, 'id', 'parent_id' );
    }

    public function user():BelongsToOne {
        return $this->belongs_to_one( User::class, 'ID', 'created_by' )
            ->relation_where( 'is_guest', 0 );
    }

    public function forward():BelongsToOne {
        return $this->belongs_to_one( MessageForward::class, 'id', 'forward_id' );
    }

    public function attachment():BelongsToOne {
        return $this->belongs_to_one( Attachment::class, 'id', 'attachment_id' );
    }

    public function user_guest():BelongsToOne {
        return $this->belongs_to_one( Guest::class, 'id', 'created_by' )
        ->relation_where( 'is_guest', 1 );
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}