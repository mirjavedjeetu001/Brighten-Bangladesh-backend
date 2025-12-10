-- CMS Tables for Dynamic Content Management
-- These tables enable full control over website content from admin panel

-- Hero Sliders (for homepage carousel)
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

-- Pages (for dynamic page content)
CREATE TABLE pages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  content LONGTEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords VARCHAR(255),
  featured_image VARCHAR(255),
  template VARCHAR(50) DEFAULT 'default', -- 'default', 'full-width', 'custom'
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP NULL,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_published (is_published)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Focus Areas / Services
CREATE TABLE focus_areas (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  full_description LONGTEXT,
  icon VARCHAR(255), -- icon class or image URL
  image_url VARCHAR(255),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Statistics / Counters (for impact numbers)
CREATE TABLE statistics (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  value VARCHAR(100) NOT NULL, -- can be number or text
  icon VARCHAR(255),
  suffix VARCHAR(50), -- e.g., '+', 'K', 'M'
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
  social_links JSON, -- {facebook, twitter, linkedin, etc}
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_active_order (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Events
CREATE TABLE events (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description LONGTEXT,
  location VARCHAR(255),
  event_date DATETIME NOT NULL,
  end_date DATETIME,
  featured_image VARCHAR(255),
  registration_link VARCHAR(255),
  max_participants INT,
  current_participants INT DEFAULT 0,
  status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
  is_published BOOLEAN DEFAULT FALSE,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_event_date (event_date),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Projects / Programs
CREATE TABLE projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  short_description TEXT,
  full_description LONGTEXT,
  featured_image VARCHAR(255),
  gallery JSON, -- array of image URLs
  start_date DATE,
  end_date DATE,
  budget DECIMAL(15, 2),
  funds_raised DECIMAL(15, 2) DEFAULT 0,
  status ENUM('planning', 'active', 'completed', 'on_hold') DEFAULT 'planning',
  is_published BOOLEAN DEFAULT FALSE,
  created_by BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Settings (for site-wide configuration)
CREATE TABLE settings (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(191) NOT NULL UNIQUE,
  setting_value LONGTEXT,
  setting_type VARCHAR(50) DEFAULT 'text', -- 'text', 'number', 'boolean', 'json', 'image'
  category VARCHAR(100) DEFAULT 'general', -- 'general', 'contact', 'social', 'seo', 'appearance'
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (setting_key),
  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Menus (for dynamic navigation)
CREATE TABLE menus (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  menu_location VARCHAR(100) NOT NULL, -- 'header', 'footer', 'sidebar'
  label VARCHAR(255) NOT NULL,
  url VARCHAR(255) NOT NULL,
  parent_id BIGINT NULL,
  target VARCHAR(20) DEFAULT '_self', -- '_self', '_blank'
  icon VARCHAR(255),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES menus(id) ON DELETE CASCADE,
  INDEX idx_location_order (menu_location, display_order),
  INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Gallery / Media Library
CREATE TABLE media (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(100), -- 'image', 'video', 'document', 'audio'
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

-- Contact Form Submissions
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

-- Permissions for RBAC
CREATE TABLE permissions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(191) NOT NULL UNIQUE,
  slug VARCHAR(191) NOT NULL UNIQUE,
  description TEXT,
  module VARCHAR(100), -- 'users', 'blogs', 'cms', 'settings', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_module (module)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Role Permissions (many-to-many)
CREATE TABLE role_permissions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  role VARCHAR(50) NOT NULL, -- matches users.role enum
  permission_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_role_permission (role, permission_id),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Activity Log (for audit trail)
CREATE TABLE activity_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT,
  action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'login', 'logout'
  entity_type VARCHAR(100), -- 'blog', 'user', 'page', etc.
  entity_id BIGINT,
  description TEXT,
  ip_address VARCHAR(50),
  user_agent TEXT,
  meta JSON, -- additional context data
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_action (user_id, action),
  INDEX idx_entity (entity_type, entity_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
