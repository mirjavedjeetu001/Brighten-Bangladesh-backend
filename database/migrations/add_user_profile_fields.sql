USE brighten_bd_dev;

ALTER TABLE users
  ADD COLUMN mobile_number VARCHAR(20) AFTER email,
  ADD COLUMN division VARCHAR(100) AFTER mobile_number,
  ADD COLUMN district VARCHAR(100) AFTER division,
  ADD COLUMN nid VARCHAR(50) AFTER district,
  ADD COLUMN education_status VARCHAR(100) AFTER nid,
  ADD COLUMN designation VARCHAR(255) AFTER organization,
  ADD COLUMN highest_education VARCHAR(255) AFTER designation,
  ADD COLUMN education_major VARCHAR(255) AFTER highest_education,
  ADD COLUMN area_of_interest TEXT AFTER education_major,
  ADD COLUMN reason_to_join TEXT AFTER area_of_interest;
