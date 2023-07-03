<?php

namespace HelpGent\Database\Migrations;

use HelpGent\WaxFramework\Contracts\Migration;

class CreateDB implements Migration {
    public function more_than_version() {
        return '1.0.0';
    }

    public function execute(): bool {
        global $wpdb;

        $charset_collate = $wpdb->get_charset_collate();

        if ( ! function_exists( 'dbDelta' ) ) {
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        }

        $db_prefix = "{$wpdb->prefix}helpgent_";

        // -- -----------------------------------------------------
        // -- Table forms
        // -- -----------------------------------------------------

        $sql = "CREATE TABLE {$db_prefix}forms (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `title` VARCHAR(255) NOT NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'draft' COMMENT 'value: publish/draft',
            `content` LONGTEXT NOT NULL,
            `is_chat_bubble` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `available_pages` JSON NULL,
            `is_guest_allowed` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `created_by` BIGINT UNSIGNED NOT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table form_meta
        -- ----------------------------------------------------
        
        CREATE TABLE {$db_prefix}form_meta (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `meta_key` VARCHAR(255) NULL,
            `meta_value` LONGTEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};
        
        -- -----------------------------------------------------
        -- Table responses
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}responses (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `is_important` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `is_read` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `ip` VARCHAR(50) NULL,
            `city` VARCHAR(50) NULL,
            `country` VARCHAR(50) NULL,
            `created_by` BIGINT UNSIGNED NOT NULL,
            `is_guest` TINYINT NOT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `status` VARCHAR(50) NOT NULL DEFAULT 'active' COMMENT 'value: active/archive/trash/uncompleted',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table response_meta
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}response_meta (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `response_id` BIGINT UNSIGNED NOT NULL,
            `meta_key` VARCHAR(255) NULL,
            `meta_value` LONGTEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table attachments
        -- -----------------------------------------------------
        CREATE TABLE {$db_prefix}attachments (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `title` VARCHAR(255) NULL,
            `mime_type` VARCHAR(255) NULL,
            `file_size` BIGINT UNSIGNED NOT NULL,
            `storage` VARCHAR(50) NOT NULL,
            `file_id` LONGTEXT NULL,
            `created_by` BIGINT UNSIGNED NOT NULL,
            `is_guest` TINYINT NULL DEFAULT 0 COMMENT 'possible values: 1, 0',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table question_answers
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}question_answers (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `response_id` BIGINT UNSIGNED NOT NULL,
            `form_id` BIGINT UNSIGNED NOT NULL,
            `screen_id` BIGINT UNSIGNED NULL,
            `input_id` VARCHAR(100) NOT NULL,
            `value` LONGTEXT NULL,
            `is_attachment` TINYINT NOT NULL DEFAULT 0 COMMENT 'possible values: 1, 0',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table conversations
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}conversations (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `response_id` BIGINT UNSIGNED NOT NULL,
            `message` LONGTEXT,
            `attachment_id` BIGINT UNSIGNED,
            `is_read` TINYINT NOT NULL DEFAULT 0 COMMENT 'possible values: 1, 0',
            `is_guest` TINYINT NOT NULL DEFAULT 0 COMMENT 'possible values: 1, 0',
            `created_by` BIGINT UNSIGNED NOT NULL,
            `parent_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
            `forward_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
            `agent_trigger` TINYINT NULL COMMENT 'null = not trigger, 0 = leave, 1 = join',
            `status` VARCHAR(50) NOT NULL DEFAULT 'publish' COMMENT 'value: publish/trash',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table conversation forwards
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}conversation_forwards (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `conversation_id` BIGINT UNSIGNED NOT NULL,
            `message` LONGTEXT,
            `attachment_id` BIGINT UNSIGNED,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table tags
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}tags (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `title` VARCHAR(255) NULL,
            `created_by` BIGINT UNSIGNED NOT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table response_tag
        -- -----------------------------------------------------
        CREATE TABLE {$db_prefix}response_tag (
            `tag_id` BIGINT UNSIGNED NOT NULL,
            `created_by` BIGINT UNSIGNED NOT NULL,
            `response_id` BIGINT UNSIGNED NOT NULL
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table guest_users
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}guest_users (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `first_name` VARCHAR(255) NULL,
            `last_name` VARCHAR(255) NULL,
            `email` VARCHAR(255) NULL,
            `number` VARCHAR(255) NULL,
            `company` VARCHAR(255) NULL,
            `token` VARCHAR(255) NOT NULL,
            `token_expires_at` TIMESTAMP NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};

        -- -----------------------------------------------------
        -- Table guest_user_meta
        -- -----------------------------------------------------

        CREATE TABLE {$db_prefix}guest_user_meta (
            `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
            `user_id` BIGINT UNSIGNED NOT NULL,
            `meta_key` VARCHAR(255) NULL,
            `meta_value` LONGTEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate};
        ";

        dbDelta( $sql );

        return true;
    }
}
