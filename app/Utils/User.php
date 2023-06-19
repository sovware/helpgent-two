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

    public function __construct( int $id, string $email, string $first_name, string $last_name = '', string $user_name = '', array $roles = [], string $created_at = '' ) {
        $this->id         = $id;
        $this->email      = $email;
        $this->first_name = $first_name;
        $this->last_name  = $last_name;
        $this->user_name  = $user_name;
        $this->roles      = $roles;
        $this->created_at = $created_at;
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
}
