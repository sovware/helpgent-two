<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Support\Question\Fields\Address;
use HelpGent\App\Support\Question\Fields\Button;
use HelpGent\App\Support\Question\Fields\ContactInfo;
use HelpGent\App\Support\Question\Fields\Date;
use HelpGent\App\Support\Question\Fields\DropDown;
use HelpGent\App\Support\Question\Fields\Email;
use HelpGent\App\Support\Question\Fields\FileUpload;
use HelpGent\App\Support\Question\Fields\LikertScale;
use HelpGent\App\Support\Question\Fields\LongText;
use HelpGent\App\Support\Question\Fields\MultiSelect;
use HelpGent\App\Support\Question\Fields\Number;
use HelpGent\App\Support\Question\Fields\PhoneNumber;
use HelpGent\App\Support\Question\Fields\PictureSelect;
use HelpGent\App\Support\Question\Fields\RangeSlider;
use HelpGent\App\Support\Question\Fields\RatingStar;
use HelpGent\App\Support\Question\Fields\Results;
use HelpGent\App\Support\Question\Fields\ShortText;
use HelpGent\App\Support\Question\Fields\SingleSelect;
use HelpGent\App\Support\Question\Fields\Website;
use HelpGent\App\Support\Question\Fields\YesNo;

return apply_filters(
    'helpgent_response_field_handlers', [
        'address'        => Address::class,
        'button'         => Button::class,
        'contact-info'   => ContactInfo::class,
        'date'           => Date::class,
        'dropdown'       => DropDown::class,
        'email'          => Email::class,
        'file-upload'    => FileUpload::class,
        'long-text'      => LongText::class,
        'likert-scale'   => LikertScale::class,
        'multi-select'   => MultiSelect::class,
        'number'         => Number::class,
        'open-ended'     => OpenEnded::class,
        'phone-number'   => PhoneNumber::class,
        'picture-select' => PictureSelect::class,
        'range-slider'   => RangeSlider::class,
        'rating-star'    => RatingStar::class,
        'results'        => Results::class,
        'short-text'     => ShortText::class,
        'single-select'  => SingleSelect::class,
        'website'        => Website::class,
        'yesno'          => YesNo::class,
    ]
);
