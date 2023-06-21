<?php

namespace HelpGent\App\Utils;

class User {
    public int $id;

    public string $email;

    public string $first_name;

    public string $last_name;

    public string $user_name;

    public array $roles = [];

    public string $created_at;

    public bool $is_user;

    public bool $is_guest;

    public function __construct( int $id, string $email, string $first_name, string $last_name = '', string $user_name = '', array $roles = [], string $created_at = '', bool $is_user = false, bool $is_guest = false ) {
        $this->id         = $id;
        $this->email      = $email;
        $this->first_name = $first_name;
        $this->last_name  = $last_name;
        $this->user_name  = $user_name;
        $this->roles      = $roles;
        $this->created_at = $created_at;
        $this->is_user    = $is_user;
        $this->is_guest   = $is_guest;
    }

    public function get_id(): int {
        return $this->id;
    }

    public function set_id( int $id ): void {
        $this->id = $id;
    }

    public function get_email(): string {
        return $this->email;
    }

    public function set_email( string $email ): void {
        $this->email = $email;
    }

    public function get_first_name(): string {
        return $this->first_name;
    }

    public function set_first_name( string $first_name ): void {
        $this->first_name = $first_name;
    }

    public function get_last_name(): string {
        return $this->last_name;
    }

    public function set_last_name( string $last_name ): void {
        $this->last_name = $last_name;
    }

    public function get_user_name(): string {
        return $this->user_name;
    }

    public function set_user_name( string $user_name ): void {
        $this->user_name = $user_name;
    }

    public function get_roles(): array {
        return $this->roles;
    }

    public function set_roles( array $roles ): void {
        $this->roles = $roles;
    }

    public function get_created_at(): string {
        return $this->created_at;
    }

    public function set_created_at( string $created_at ): void {
        $this->created_at = $created_at;
    }

    public function get_is_user() {
        return $this->is_user;
    }

    public function set_is_user( bool $is_user ): void {
        $this->is_user = $is_user;
    }

    public function get_is_guest() {
        return $this->is_guest;
    }

    public function set_is_guest( bool $is_guest ): void {
        $this->is_guest = $is_guest;
    }
}
