-- Add download count tracking to user_cvs table
ALTER TABLE user_cvs 
ADD COLUMN download_count INT DEFAULT 0 AFTER is_public;

-- Add index for better query performance
CREATE INDEX idx_user_cvs_download_count ON user_cvs(download_count);
