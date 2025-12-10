USE brighten_bd_dev;

-- Drop foreign key constraint first
ALTER TABLE projects DROP FOREIGN KEY projects_ibfk_1;

-- Update projects table to match new schema
ALTER TABLE projects
  -- Replace featured_image with image_url
  CHANGE COLUMN featured_image image_url VARCHAR(255),
  
  -- Remove old columns
  DROP COLUMN gallery,
  DROP COLUMN funds_raised,
  DROP COLUMN is_published,
  DROP COLUMN created_by,
  
  -- Add new columns
  ADD COLUMN category VARCHAR(255) AFTER full_description,
  ADD COLUMN location VARCHAR(255) AFTER end_date,
  ADD COLUMN beneficiaries INT AFTER budget,
  ADD COLUMN is_featured BOOLEAN DEFAULT FALSE AFTER beneficiaries,
  ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER is_featured,
  ADD COLUMN display_order INT DEFAULT 0 AFTER is_active,
  
  -- Update status enum to match new values
  MODIFY COLUMN status ENUM('planning', 'ongoing', 'completed') DEFAULT 'ongoing';
