-- Brighten Bangladesh Production Import SQL
-- Single file for production database import
-- This file combines schema and initial seed data

-- Set charset and collation
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS user_activities;
DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS magazines;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS users;

-- Users table
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  profile_photo VARCHAR(255),
  role ENUM('admin','content_manager','editor','member','volunteer') DEFAULT 'member',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Memberships table
CREATE TABLE memberships (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  membership_id VARCHAR(100) UNIQUE,
  status ENUM('inactive','active','expired') DEFAULT 'inactive',
  valid_from DATE,
  valid_to DATE,
  criteria JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status),
  INDEX idx_membership_id (membership_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blogs table
CREATE TABLE blogs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  author_id BIGINT,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  cover_image VARCHAR(255),
  summary TEXT,
  content LONGTEXT,
  status ENUM('draft','pending','approved','published') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_author_id (author_id),
  INDEX idx_slug (slug),
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Magazines table
CREATE TABLE magazines (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  issue_number VARCHAR(50),
  publish_date DATE,
  cover_image VARCHAR(255),
  file_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_publish_date (publish_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User activities table
CREATE TABLE user_activities (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  type VARCHAR(100),
  meta JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_type (type),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert initial admin user
-- IMPORTANT: Change the password after first login
-- Default password is 'password123' (hashed with bcrypt)
INSERT INTO users (name, email, password_hash, organization, role, created_at) VALUES
('System Administrator', 'admin@brightenbangladesh.org', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'Brighten Bangladesh', 'admin', NOW());

-- Note: Additional users, blogs, magazines should be created through the application
-- This provides a clean production database with only the essential admin account
