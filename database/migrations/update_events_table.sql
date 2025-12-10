USE brighten_bd_dev;

-- Drop foreign key constraint first
ALTER TABLE events DROP FOREIGN KEY events_ibfk_1;

-- Update events table to match new schema
ALTER TABLE events
  -- Replace description with short_description and full_description
  DROP COLUMN description,
  ADD COLUMN short_description TEXT AFTER slug,
  ADD COLUMN full_description TEXT AFTER short_description,
  
  -- Replace featured_image with image_url
  CHANGE COLUMN featured_image image_url VARCHAR(255),
  
  -- Add organizer field
  ADD COLUMN organizer VARCHAR(255) AFTER location,
  
  -- Remove old columns
  DROP COLUMN end_date,
  DROP COLUMN current_participants,
  DROP COLUMN status,
  DROP COLUMN is_published,
  DROP COLUMN created_by,
  
  -- Add new columns
  ADD COLUMN is_featured BOOLEAN DEFAULT FALSE AFTER registration_link,
  ADD COLUMN is_active BOOLEAN DEFAULT TRUE AFTER is_featured,
  ADD COLUMN display_order INT DEFAULT 0 AFTER is_active;
