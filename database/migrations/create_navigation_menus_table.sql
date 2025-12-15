-- Create navigation_menus table
CREATE TABLE IF NOT EXISTS navigation_menus (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  label VARCHAR(100) NOT NULL,
  path VARCHAR(255) NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  is_system TINYINT(1) DEFAULT 0 COMMENT 'System menus cannot be deleted',
  icon VARCHAR(50) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_active (is_active),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default menu items
INSERT INTO navigation_menus (name, label, path, is_active, display_order, is_system) VALUES
('home', 'Home', '/', 1, 1, 1),
('about', 'About', '/about', 1, 2, 1),
('blogs', 'Blogs', '/blogs', 1, 3, 1),
('events', 'Events', '/events', 1, 4, 1),
('projects', 'Projects', '/projects', 1, 5, 1),
('magazines', 'Magazines', '/magazines', 1, 6, 1),
('jobs', 'Job Portal', '/jobs', 1, 7, 1);
