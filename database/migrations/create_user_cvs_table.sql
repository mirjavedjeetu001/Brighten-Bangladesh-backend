-- Create User CVs table
-- This table stores CVs created by users

CREATE TABLE IF NOT EXISTS user_cvs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  template_id INT NOT NULL,
  title VARCHAR(255) NOT NULL DEFAULT 'My CV',
  
  -- Personal Information (JSON stored as TEXT for MySQL compatibility)
  personal_info JSON,
  -- Structure: { name, title, email, phone, location, photo, summary }
  
  -- Work Experience (JSON array)
  experience JSON,
  -- Structure: [{ position, company, startDate, endDate, location, description }]
  
  -- Education (JSON array)
  education JSON,
  -- Structure: [{ degree, institution, graduationDate, location, description }]
  
  -- Skills (JSON array)
  skills JSON,
  -- Structure: ["skill1", "skill2", ...]
  
  -- Languages (JSON array)
  languages JSON,
  -- Structure: [{ language, proficiency }]
  
  -- Additional sections (JSON for flexibility)
  additional_sections JSON,
  -- Structure: { certifications: [], projects: [], awards: [] }
  
  -- Generated HTML (cached version)
  html_content LONGTEXT,
  
  -- Metadata
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (template_id) REFERENCES cv_templates(id) ON DELETE RESTRICT,
  INDEX idx_user_id (user_id),
  INDEX idx_template_id (template_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create CV Settings table for CMS control
CREATE TABLE IF NOT EXISTS cv_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  allowed_roles JSON,
  max_cvs_per_user INT DEFAULT 5,
  enable_pdf_download BOOLEAN DEFAULT true,
  enable_doc_download BOOLEAN DEFAULT true,
  enable_cv_parsing BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default settings
INSERT INTO cv_settings (allowed_roles, max_cvs_per_user, enable_pdf_download, enable_doc_download, enable_cv_parsing)
VALUES (JSON_ARRAY('member', 'volunteer', 'editor', 'admin'), 5, true, true, true);
