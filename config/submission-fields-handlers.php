<?php

defined( 'ABSPATH' ) || exit;

use HelpGent\App\Support\Submission\Fields\Address;
use HelpGent\App\Support\Submission\Fields\Button;
use HelpGent\App\Support\Submission\Fields\ContactInfo;
use HelpGent\App\Support\Submission\Fields\Date;
use HelpGent\App\Support\Submission\Fields\DropDown;
use HelpGent\App\Support\Submission\Fields\Email;
use HelpGent\App\Support\Submission\Fields\FileUpload;
use HelpGent\App\Support\Submission\Fields\LikertScale;
use HelpGent\App\Support\Submission\Fields\LongText;
use HelpGent\App\Support\Submission\Fields\MultiSelect;
use HelpGent\App\Support\Submission\Fields\Number;
use HelpGent\App\Support\Submission\Fields\PhoneNumber;
use HelpGent\App\Support\Submission\Fields\PictureSelect;
use HelpGent\App\Support\Submission\Fields\RangeSlider;
use HelpGent\App\Support\Submission\Fields\RatingStar;
use HelpGent\App\Support\Submission\Fields\Results;
use HelpGent\App\Support\Submission\Fields\ShortText;
use HelpGent\App\Support\Submission\Fields\SingleSelect;
use HelpGent\App\Support\Submission\Fields\Website;
use HelpGent\App\Support\Submission\Fields\YesNo;

return apply_filters(
    'helpgent_submission_field_handlers', [
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
