<?php

namespace HelpGent\App\Models;

use HelpGent\WaxFramework\App;
use HelpGent\WaxFramework\Database\Resolver;
use HelpGent\WaxFramework\Database\Eloquent\Model;

class SubmissionTag extends Model {
    public static function get_table_name():string {
        return 'helpgent_submission_tag';
    }

    public function resolver():Resolver {
        return App::$container->get( Resolver::class );
    }
}