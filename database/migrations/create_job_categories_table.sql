-- Create job_categories table
CREATE TABLE IF NOT EXISTS job_categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_active (is_active),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add category_id to jobs table
ALTER TABLE jobs 
ADD COLUMN category_id BIGINT UNSIGNED NULL AFTER job_type,
ADD INDEX idx_category_id (category_id),
ADD FOREIGN KEY (category_id) REFERENCES job_categories(id) ON DELETE SET NULL;

-- Insert default job categories (industry/field categories)
INSERT INTO job_categories (name, slug, is_active, display_order) VALUES
('Technology', 'technology', 1, 1),
('Management', 'management', 1, 2),
('Business', 'business', 1, 3),
('Marketing', 'marketing', 1, 4),
('Education', 'education', 1, 5),
('Healthcare', 'healthcare', 1, 6),
('Finance', 'finance', 1, 7),
('Engineering', 'engineering', 1, 8),
('Design', 'design', 1, 9),
('Sales', 'sales', 1, 10);
