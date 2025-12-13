-- Add view and like counts to blogs
ALTER TABLE blogs ADD COLUMN view_count INT DEFAULT 0;
ALTER TABLE blogs ADD COLUMN likes_count INT DEFAULT 0;

CREATE TABLE IF NOT EXISTS blog_likes (
  id BIGINT NOT NULL AUTO_INCREMENT,
  blog_id BIGINT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_blog_like (blog_id, user_id),
  CONSTRAINT fk_blog_likes_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  CONSTRAINT fk_blog_likes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;