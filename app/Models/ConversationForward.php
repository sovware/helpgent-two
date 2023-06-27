<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Eloquent\Relations\BelongsToOne;
use HelpGent\WaxFramework\Database\Resolver;
use HelpGent\WaxFramework\Database\Eloquent\Model;

class ConversationForward extends Model {
    public static function get_table_name():string {
        return 'helpgent_conversation_forwards';
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }

    public function attachment():BelongsToOne {
        return $this->belongs_to_one( Attachment::class, 'id', 'attachment_id' );
    }
}