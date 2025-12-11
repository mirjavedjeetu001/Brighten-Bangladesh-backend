-- =====================================================
-- BRIGHTEN BANGLADESH - COMPLETE PRODUCTION DATABASE
-- =====================================================
-- This file contains the COMPLETE database structure
-- Import this file ONCE to set up your production database
-- Last Updated: December 10, 2025
-- =====================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- STEP 1: DROP EXISTING TABLES (Clean Install)
-- =====================================================
DROP TABLE IF EXISTS activity_logs;
DROP TABLE IF EXISTS role_permissions;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS contact_submissions;
DROP TABLE IF EXISTS media;
DROP TABLE IF EXISTS menus;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS testimonials;
DROP TABLE IF EXISTS statistics;
DROP TABLE IF EXISTS focus_areas;
DROP TABLE IF EXISTS pages;
DROP TABLE IF EXISTS hero_sliders;
DROP TABLE IF EXISTS team_members;
DROP TABLE IF EXISTS event_registrations;
DROP TABLE IF EXISTS blog_comments;
DROP TABLE IF EXISTS system_settings;
DROP TABLE IF EXISTS about_page;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS user_activities;
DROP TABLE IF EXISTS memberships;
DROP TABLE IF EXISTS magazines;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS users;

-- =====================================================
-- STEP 2: CREATE CORE TABLES
-- =====================================================

-- Users table with all profile fields
CREATE TABLE users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  mobile_number VARCHAR(20),
  division VARCHAR(100),
  district VARCHAR(100),
  nid VARCHAR(50),
  education_status VARCHAR(100),
  password_hash VARCHAR(255) NOT NULL,
  organization VARCHAR(255),
  designation VARCHAR(255),
  highest_education VARCHAR(255),
  education_major VARCHAR(255),
  area_of_interest TEXT,
  reason_to_join TEXT,
  profile_photo VARCHAR(255),
  role ENUM('super_admin','admin','content_manager','editor','member','volunteer') DEFAULT 'member',
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

-- Blog comments table
CREATE TABLE blog_comments (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  blog_id BIGINT NOT NULL,
  user_id BIGINT DEFAULT NULL,
  author_name VARCHAR(255) DEFAULT NULL,
  author_email VARCHAR(255) DEFAULT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_blog_id (blog_id),
  INDEX idx_user_id (user_id)
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

-- =====================================================
-- STEP 3: CREATE CMS TABLES
-- =====================================================

-- Events Table
CREATE TABLE events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  image_url VARCHAR(255),
  event_date DATETIME NOT NULL,
  location VARCHAR(255),
  organizer VARCHAR(255),
  max_participants INT,
  registration_link VARCHAR(255),
  is_featured TINYINT(1) DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_event_date (event_date),
  INDEX idx_is_featured (is_featured),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Event registrations table
CREATE TABLE event_registrations (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  event_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  status ENUM('pending', 'approved', 'rejected', 'cancelled') DEFAULT 'pending',
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_event_user (event_id, user_id),
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_event_id (event_id),
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects Table
CREATE TABLE projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  full_description TEXT,
  image_url VARCHAR(255),
  category VARCHAR(100),
  status ENUM('planning','ongoing','completed') DEFAULT 'ongoing',
  start_date DATE,
  end_date DATE,
  location VARCHAR(255),
  budget DECIMAL(12,2),
  beneficiaries INT,
  is_featured TINYINT(1) DEFAULT 0,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_is_featured (is_featured),
  INDEX idx_is_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- About Page Table
CREATE TABLE about_page (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hero_title TEXT NOT NULL,
  hero_subtitle TEXT,
  hero_image VARCHAR(255),
  mission_title TEXT,
  mission_content TEXT,
  vision_title TEXT,
  vision_content TEXT,
  values_title TEXT,
  values_content TEXT,
  story_title TEXT,
  story_content TEXT,
  team_title TEXT,
  team_subtitle TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- System Settings table
CREATE TABLE system_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  site_name VARCHAR(255) DEFAULT 'Brighten Bangladesh',
  site_tagline VARCHAR(500) NULL,
  site_logo TEXT NULL,
  site_favicon TEXT NULL,
  primary_color VARCHAR(7) DEFAULT '#0d9488',
  secondary_color VARCHAR(7) DEFAULT '#f97316',
  contact_email VARCHAR(255) NULL,
  contact_phone VARCHAR(50) NULL,
  contact_address TEXT NULL,
  facebook_url VARCHAR(500) NULL,
  twitter_url VARCHAR(500) NULL,
  linkedin_url VARCHAR(500) NULL,
  instagram_url VARCHAR(500) NULL,
  youtube_url VARCHAR(500) NULL,
  meta_description TEXT NULL,
  meta_keywords TEXT NULL,
  member_blog_limit INT DEFAULT 1,
  blog_limit_period_days INT DEFAULT 7,
  volunteer_blog_limit INT DEFAULT 2,
  editor_blog_limit INT DEFAULT 5,
  min_blogs_for_membership INT DEFAULT 4,
  min_events_for_membership INT DEFAULT 1,
  min_projects_for_membership INT DEFAULT 1,
  footer_text TEXT NULL,
  copyright_text VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hero Sliders
CREATE TABLE hero_sliders (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle TEXT,
  description TEXT,
  button_text VARCHAR(100),
  button_link VARCHAR(255),
  image_url VARCHAR(255),
  video_url VARCHAR(255),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pages
CREATE TABLE pages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords VARCHAR(255),
  featured_image VARCHAR(255),
  template VARCHAR(50) DEFAULT 'default',
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Focus Areas
CREATE TABLE focus_areas (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  full_description LONGTEXT,
  icon VARCHAR(255),
  image_url VARCHAR(255),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Statistics
CREATE TABLE statistics (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(100) NOT NULL,
  icon VARCHAR(255),
  suffix VARCHAR(50),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Testimonials
CREATE TABLE testimonials (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  person_name VARCHAR(255) NOT NULL,
  person_role VARCHAR(255),
  person_photo VARCHAR(255),
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Team Members
CREATE TABLE team_members (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  department VARCHAR(255),
  bio TEXT,
  photo VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(50),
  social_links JSON,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Settings
CREATE TABLE settings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(191) NOT NULL UNIQUE,
  setting_value LONGTEXT,
  setting_type VARCHAR(50) DEFAULT 'text',
  category VARCHAR(100) DEFAULT 'general',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (setting_key),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Menus
CREATE TABLE menus (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  menu_location VARCHAR(100) NOT NULL,
  label VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  parent_id BIGINT NULL,
  target VARCHAR(20) DEFAULT '_self',
  icon VARCHAR(255),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE CASCADE,
  INDEX idx_location_order (menu_location, display_order),
  INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Media
CREATE TABLE media (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(100),
  mime_type VARCHAR(100),
  file_size BIGINT,
  title VARCHAR(255),
  alt_text VARCHAR(255),
  caption TEXT,
  uploaded_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_file_type (file_type),
  INDEX idx_uploaded_by (uploaded_by)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Submissions
CREATE TABLE contact_submissions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied', 'archived') DEFAULT 'new',
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Permissions
CREATE TABLE permissions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL UNIQUE,
  slug VARCHAR(191) NOT NULL UNIQUE,
  description TEXT,
  module VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_module (module)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Role Permissions
CREATE TABLE role_permissions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(50) NOT NULL,
  permission_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_role_permission (role, permission_id),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity Logs
CREATE TABLE activity_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id BIGINT,
  description TEXT,
  ip_address VARCHAR(50),
  user_agent TEXT,
  meta JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_action (user_id, action),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- STEP 4: INSERT DEFAULT DATA
-- =====================================================

-- Insert Super Admin User
-- IMPORTANT: Default password is 'Admin@12345' - CHANGE THIS IMMEDIATELY AFTER LOGIN
-- Password hash for 'Admin@12345' using bcrypt
INSERT INTO users (name, email, password_hash, role, organization, created_at) VALUES
('Super Administrator', 'admin@brightenbangladesh.org', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'super_admin', 'Brighten Bangladesh', NOW());

-- Insert default About Page content
INSERT INTO about_page (hero_title, hero_subtitle, mission_title, mission_content, vision_title, vision_content) VALUES (
  'About Brighten Bangladesh',
  'Empowering communities through education, collaboration, and positive change',
  'Our Mission',
  'To empower communities across Bangladesh through quality education, skill development, and sustainable initiatives that create lasting positive impact.',
  'Our Vision',
  'A Bangladesh where every individual has access to quality education and opportunities to reach their full potential, contributing to a brighter and more prosperous nation.'
);

-- Insert default System Settings
INSERT INTO system_settings (
  site_name,
  site_tagline,
  primary_color,
  secondary_color,
  contact_email,
  member_blog_limit,
  blog_limit_period_days,
  volunteer_blog_limit,
  editor_blog_limit,
  min_blogs_for_membership,
  min_events_for_membership,
  min_projects_for_membership,
  copyright_text
) VALUES (
  'Brighten Bangladesh',
  'Empowering Communities Through Education',
  '#0d9488',
  '#f97316',
  'info@brightenbangladesh.org',
  1,
  7,
  2,
  5,
  4,
  1,
  1,
  '© 2025 Brighten Bangladesh. All rights reserved.'
);

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- DATABASE SETUP COMPLETE
-- =====================================================
-- Next Steps:
-- 1. Update admin password through the application
-- 2. Configure system settings in admin panel
-- 3. Upload site logo and favicon
-- 4. Start adding content (blogs, events, projects)
-- =====================================================
