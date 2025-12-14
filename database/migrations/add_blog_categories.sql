-- Create categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL UNIQUE,
  slug VARCHAR(180) NOT NULL UNIQUE,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DELIMITER //
DROP PROCEDURE IF EXISTS add_blog_category_column//
CREATE PROCEDURE add_blog_category_column()
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'blogs'
      AND COLUMN_NAME = 'category_id'
  ) THEN
    ALTER TABLE blogs ADD COLUMN category_id BIGINT NULL AFTER likes_count;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.TABLE_CONSTRAINTS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'blogs'
      AND CONSTRAINT_NAME = 'fk_blog_category'
  ) THEN
    ALTER TABLE blogs
      ADD CONSTRAINT fk_blog_category FOREIGN KEY (category_id)
      REFERENCES blog_categories(id) ON DELETE SET NULL;
  END IF;
END//
CALL add_blog_category_column();//
DROP PROCEDURE add_blog_category_column//
DELIMITER ;
