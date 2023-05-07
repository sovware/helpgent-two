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

        $forms = "CREATE TABLE IF NOT EXISTS {$db_prefix}forms (
            `id` INT NOT NULL AUTO_INCREMENT,
            `title` VARCHAR(255) NOT NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'draft' COMMENT 'value: publish/draft',
            `content` LONGTEXT NOT NULL,
            `created_by` INT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table form_meta
        // -- -----------------------------------------------------
        
        $forms_meta = "CREATE TABLE IF NOT EXISTS {$db_prefix}form_meta (
            `id` INT NOT NULL AUTO_INCREMENT,
            `form_id` INT NOT NULL,
            `meta_key` VARCHAR(255) NULL,
            `meta_value` LONGTEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`, `form_id`),
            INDEX `fk_{$db_prefix}form_meta_form1_idx` (`form_id` ASC) VISIBLE,
            CONSTRAINT `fk_{$db_prefix}form_meta_form1` FOREIGN KEY (`form_id`) REFERENCES {$db_prefix}forms (`id`)
            ON DELETE NO ACTION ON UPDATE NO ACTION
        ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table submissions
        // -- -----------------------------------------------------
        
        $submission = "CREATE TABLE IF NOT EXISTS {$db_prefix}submissions (
            `id` INT NOT NULL AUTO_INCREMENT,
            `form_id` INT NOT NULL,
            `status` VARCHAR(50) NOT NULL DEFAULT 'unread' COMMENT 'value: read/unread/trashed',
            `is_favourite` TINYINT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `ip` VARCHAR(50) NULL,
            `city` VARCHAR(50) NULL,
            `country` VARCHAR(50) NULL,
            `created_by` INT NULL,
            `is_guest` TINYINT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`),
            INDEX `fk_{$db_prefix}submission_form1_idx` (`form_id` ASC) VISIBLE,
            CONSTRAINT `fk_{$db_prefix}submission_form1`
            FOREIGN KEY (`form_id`)
            REFERENCES {$db_prefix}forms (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
        ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table responses
        // -- -----------------------------------------------------
        
        $response = "CREATE TABLE IF NOT EXISTS {$db_prefix}responses (
            `id` INT NOT NULL AUTO_INCREMENT,
            `submission_id` INT NOT NULL,
            `form_id` INT NOT NULL,
            `screen_id` INT NULL,
            `input_name` VARCHAR(100) NULL,
            `value` LONGTEXT NULL,
            `attachment_id` INT NULL,
            `attachment_storage` VARCHAR(50) NULL DEFAULT 'local' COMMENT 'value: local/other host key',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`, `submission_id`, `form_id`),
            INDEX `fk_{$db_prefix}response_submission1_idx` (`submission_id` ASC) VISIBLE,
            INDEX `fk_{$db_prefix}response_form1_idx` (`form_id` ASC) VISIBLE,
            CONSTRAINT `fk_{$db_prefix}response_submission1`
              FOREIGN KEY (`submission_id`)
              REFERENCES {$db_prefix}submissions (`id`)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION,
            CONSTRAINT `fk_{$db_prefix}response_form1`
              FOREIGN KEY (`form_id`)
              REFERENCES {$db_prefix}forms (`id`)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION
            ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table conversations
        // -- -----------------------------------------------------

        $conversations = "CREATE TABLE IF NOT EXISTS {$db_prefix}conversations (
          `id` INT NOT NULL AUTO_INCREMENT,
          `submission_id` INT NOT NULL,
          `message` LONGTEXT NULL,
          `is_read` TINYINT NULL DEFAULT 0 COMMENT 'value: 0/1',
          `attachment_id` INT NULL,
          `attachment_storage` VARCHAR(50) NULL DEFAULT 'local' COMMENT 'value: local/other host key',
          `created_by` INT NULL,
          `is_guest` TINYINT NULL DEFAULT 0 COMMENT 'value: 0/1',
          `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `updated_at` TIMESTAMP NULL,
          PRIMARY KEY (`id`),
          INDEX `fk_{$db_prefix}conversation_submission1_idx` (`submission_id` ASC) VISIBLE,
          CONSTRAINT `fk_{$db_prefix}conversation_submission1`
            FOREIGN KEY (`submission_id`)
            REFERENCES {$db_prefix}submissions (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
        ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table reactions
        // -- -----------------------------------------------------

        $reactions = "CREATE TABLE IF NOT EXISTS {$db_prefix}reactions (
            `id` INT NOT NULL,
            `conversation_id` INT NOT NULL,
            `reaction` VARCHAR(255) NULL,
            `created_by` INT NULL,
            `is_guest` TINYINT NULL DEFAULT 0 COMMENT 'value: 0/1',
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`, `conversation_id`),
            INDEX `fk_{$db_prefix}reaction_conversation1_idx` (`conversation_id` ASC) VISIBLE,
            CONSTRAINT `fk_{$db_prefix}reaction_conversation1`
            FOREIGN KEY (`conversation_id`)
            REFERENCES {$db_prefix}conversations (`id`)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION
            ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table tags
        // -- -----------------------------------------------------

        $tags = "CREATE TABLE IF NOT EXISTS {$db_prefix}tags (
            `id` INT NOT NULL,
            `title` VARCHAR(255) NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table submission_tag
        // -- -----------------------------------------------------

        $submission_tag = " CREATE TABLE IF NOT EXISTS {$db_prefix}submission_tag (
            `tag_id` INT NOT NULL,
            `submission_id` INT NOT NULL,
            PRIMARY KEY (`tag_id`, `submission_id`),
            INDEX `fk_{$db_prefix}submission_tag_submission1_idx` (`submission_id` ASC) VISIBLE,
            CONSTRAINT `fk_submission_tag_tag1`
                FOREIGN KEY (`tag_id`)
                REFERENCES {$db_prefix}tags (`id`)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION,
            CONSTRAINT `fk_submission_tag_submission1`
                FOREIGN KEY (`submission_id`)
                REFERENCES {$db_prefix}submissions (`id`)
                ON DELETE NO ACTION
                ON UPDATE NO ACTION
            ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table guest_users
        // -- -----------------------------------------------------

        $guest_users = "CREATE TABLE IF NOT EXISTS {$db_prefix}guest_users (
            `id` INT NOT NULL,
            `name` VARCHAR(255) NULL,
            `email` VARCHAR(255) NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`)
        ) {$charset_collate}";

        // -- -----------------------------------------------------
        // -- Table guest_user_meta
        // -- -----------------------------------------------------

        $guest_user_meta = "CREATE TABLE IF NOT EXISTS {$db_prefix}guest_user_meta (
            `id` INT NOT NULL,
            `user_id` INT NOT NULL,
            `meta_key` VARCHAR(255) NULL,
            `meta_value` LONGTEXT NULL,
            `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            `updated_at` TIMESTAMP NULL,
            PRIMARY KEY (`id`, `user_id`),
            INDEX `fk_{$db_prefix}guest_user_meta_guest_user1_idx` (`user_id` ASC) VISIBLE,
            CONSTRAINT `fk_{$db_prefix}guest_user_meta_guest_user1`
              FOREIGN KEY (`user_id`)
              REFERENCES {$db_prefix}guest_users (`id`)
              ON DELETE NO ACTION
              ON UPDATE NO ACTION
            ) {$charset_collate}";

        dbDelta( $forms );
        dbDelta( $forms_meta );
        dbDelta( $submission );
        dbDelta( $response );
        dbDelta( $conversations );
        dbDelta( $reactions );
        dbDelta( $tags );
        dbDelta( $submission_tag );
        dbDelta( $guest_users );
        dbDelta( $guest_user_meta );

        return false;
    }
}
