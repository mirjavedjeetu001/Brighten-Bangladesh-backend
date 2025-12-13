ALTER TABLE events
  ADD COLUMN registration_deadline DATETIME NULL AFTER event_date,
  ADD COLUMN status ENUM('upcoming','ongoing','completed','cancelled') NOT NULL DEFAULT 'upcoming' AFTER is_active;
