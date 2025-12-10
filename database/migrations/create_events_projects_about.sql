-- About Page Table
CREATE TABLE IF NOT EXISTS `about_page` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hero_title` text NOT NULL,
  `hero_subtitle` text,
  `hero_image` varchar(255),
  `mission_title` text,
  `mission_content` text,
  `vision_title` text,
  `vision_content` text,
  `values_title` text,
  `values_content` text,
  `story_title` text,
  `story_content` text,
  `team_title` text,
  `team_subtitle` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default about page content
INSERT INTO `about_page` (`hero_title`, `hero_subtitle`, `mission_title`, `mission_content`, `vision_title`, `vision_content`)
VALUES (
  'About Brighten Bangladesh',
  'Empowering communities through education, collaboration, and positive change',
  'Our Mission',
  'To empower communities across Bangladesh through quality education, skill development, and sustainable initiatives that create lasting positive impact.',
  'Our Vision',
  'A Bangladesh where every individual has access to quality education and opportunities to reach their full potential, contributing to a brighter and more prosperous nation.'
);

-- Events Table
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL UNIQUE,
  `short_description` text,
  `full_description` text,
  `image_url` varchar(255),
  `event_date` datetime NOT NULL,
  `location` varchar(255),
  `organizer` varchar(255),
  `max_participants` int,
  `registration_link` varchar(255),
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_event_date` (`event_date`),
  KEY `idx_is_featured` (`is_featured`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects Table
CREATE TABLE IF NOT EXISTS `projects` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL UNIQUE,
  `short_description` text,
  `full_description` text,
  `image_url` varchar(255),
  `category` varchar(100),
  `status` enum('planning','ongoing','completed') DEFAULT 'ongoing',
  `start_date` date,
  `end_date` date,
  `location` varchar(255),
  `budget` decimal(12,2),
  `beneficiaries` int,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `display_order` int DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_status` (`status`),
  KEY `idx_is_featured` (`is_featured`),
  KEY `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
