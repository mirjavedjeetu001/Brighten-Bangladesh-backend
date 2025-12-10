-- Update profile_photo column to support base64 encoded images
-- This migration changes the column type from VARCHAR(255) to LONGTEXT
-- to support storing base64 encoded profile pictures

USE brighten_bd_dev;

-- Modify profile_photo column to LONGTEXT
ALTER TABLE users 
MODIFY COLUMN profile_photo LONGTEXT NULL
COMMENT 'Base64 encoded profile picture';

-- Verify the change
SHOW COLUMNS FROM users WHERE Field = 'profile_photo';
