<?php

namespace HelpGent\App\Utils;

use DateTime as PHPDateTime;
use Exception;

class DateTime extends PHPDateTime {
    const SECONDS_PER_MINUTE = 60;
    const MINUTES_PER_HOUR   = 60;
    const HOURS_PER_DAY      = 24;
    const DAYS_PER_WEEK      = 7;
    const MONTHS_PER_QUARTER = 3;
    const QUARTERS_PER_YEAR  = 4;

    public static function now() {
        return new static();
    }

    public function unit( string $unit, int $value = 1, string $type = 'add' ) {
        switch ( $unit ) {
            case 'minute':
                $value *= static::SECONDS_PER_MINUTE;
                break;
            case 'hour':
                $value *= static::MINUTES_PER_HOUR * static::SECONDS_PER_MINUTE;
                break;
            case 'day':
                $value *= static::HOURS_PER_DAY * static::MINUTES_PER_HOUR * static::SECONDS_PER_MINUTE;
                break;
            case 'week':
                $value *= static::DAYS_PER_WEEK * static::HOURS_PER_DAY * static::MINUTES_PER_HOUR * static::SECONDS_PER_MINUTE;
                break;
            case 'month':
                $value *= 30 * static::HOURS_PER_DAY * static::MINUTES_PER_HOUR * static::SECONDS_PER_MINUTE;
                break;
            case 'quarter':
                $value *= static::MONTHS_PER_QUARTER * 30 * static::HOURS_PER_DAY * static::MINUTES_PER_HOUR * static::SECONDS_PER_MINUTE;
                break;
            case 'year':
                $value *= 365 * static::HOURS_PER_DAY * static::MINUTES_PER_HOUR * static::SECONDS_PER_MINUTE;
                break;
            default:
                throw new Exception( "Invalid unit for real timestamp add/sub: '$unit'" );
        }
        if ( 'sub' === $type ) {
            return $this->setTimestamp( $this->getTimestamp() - $value );
        }
        return $this->setTimestamp( $this->getTimestamp() + $value );
    }

    public function add_days( int $days ) {
        return $this->unit( 'day', $days );
    }

    public function sub_days( int $days ) {
        return $this->unit( 'day', $days, 'sub' );
    }

    public function to_string() {
        return $this->format( 'D M d Y H:i:s \G\M\TO' );
    }

    public function to_date_time_string() {
        return $this->format( 'Y-m-d H:i:s' );
    }
}
