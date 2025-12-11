-- Migration to fix profile_photo column size
-- Date: 2025-12-11
-- Description: Change profile_photo from VARCHAR(255) to LONGTEXT to support base64 encoded images

ALTER TABLE users MODIFY COLUMN profile_photo LONGTEXT NULL;
