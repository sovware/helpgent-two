<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Eloquent\Relations\BelongsToMany;
use HelpGent\WaxFramework\Database\Eloquent\Relations\BelongsToOne;
use HelpGent\WaxFramework\Database\Resolver;
use HelpGent\WaxFramework\Database\Eloquent\Model;
use HelpGent\WaxFramework\Database\Eloquent\Relations\HasOne;

class Submission extends Model {
    public static function get_table_name():string {
        return 'helpgent_submissions';
    }

    public function user():BelongsToOne {
        return $this->belongs_to_one( User::class, 'ID', 'created_by' )
            ->relation_where( 'is_guest', 0 );
    }

    public function user_guest():BelongsToOne {
        return $this->belongs_to_one( Guest::class, 'id', 'created_by' )
        ->relation_where( 'is_guest', 1 );
    }

    public function conversation():HasOne {
        return $this->has_one( Conversation::class, 'submission_id', 'id' );
    }

    public function tags():BelongsToMany {
        return $this->belongs_to_many( Tag::class, SubmissionTag::class, 'tag_id', 'submission_id', 'id', 'id' );
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}