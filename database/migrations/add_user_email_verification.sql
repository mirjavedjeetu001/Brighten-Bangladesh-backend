ALTER TABLE users
  ADD COLUMN is_email_verified TINYINT(1) NOT NULL DEFAULT 0 AFTER is_approved,
  ADD COLUMN otp_code VARCHAR(10) NULL AFTER is_email_verified,
  ADD COLUMN otp_expires_at DATETIME NULL AFTER otp_code;
