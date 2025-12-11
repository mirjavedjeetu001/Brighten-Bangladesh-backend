-- Create Statistics Table for Our Impact Section
-- This table stores impact statistics shown on the About page

CREATE TABLE IF NOT EXISTS `statistics` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `suffix` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int DEFAULT '0',
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_active_order` (`is_active`,`display_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default statistics data
INSERT INTO `statistics` (`label`, `value`, `icon`, `suffix`, `display_order`, `is_active`) VALUES
('Children Supported', '5000', 'users', '+', 1, 1),
('Nationwide Volunteers', '10000', 'user-check', '+', 2, 1),
('Districts Covered', '25', 'map-pin', '', 3, 1),
('Years of Service', '10', 'award', '+', 4, 1),
('Community Projects', '150', 'briefcase', '+', 5, 1),
('Scholarships Provided', '500', 'book-open', '+', 6, 1);
