ALTER TABLE users
  ADD COLUMN reset_otp_code VARCHAR(255) NULL AFTER otp_expires_at,
  ADD COLUMN reset_otp_expires_at DATETIME NULL AFTER reset_otp_code;
