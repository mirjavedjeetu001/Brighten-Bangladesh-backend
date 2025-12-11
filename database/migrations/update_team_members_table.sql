-- Drop old team_members table and recreate with new structure
DROP TABLE IF EXISTS `team_members`;

CREATE TABLE `team_members` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `role` varchar(255) NOT NULL COMMENT 'e.g., Founder, Admin, Content Manager',
  `category` varchar(255) DEFAULT NULL COMMENT 'e.g., Leadership, Operations, Content',
  `contributions` text DEFAULT NULL COMMENT 'Description of their contributions',
  `social_links` json DEFAULT NULL,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `idx_team_members_user_id` (`user_id`),
  CONSTRAINT `fk_team_members_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
