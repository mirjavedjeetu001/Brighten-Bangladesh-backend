-- Brighten Bangladesh Seed Data
-- Sample data for development and testing

-- Insert sample users
-- Note: Password is 'password123' for all users (hashed with bcrypt, 10 rounds)
INSERT INTO users (name, email, password_hash, organization, role, created_at) VALUES
('Admin User', 'admin@brightenbangladesh.org', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'Brighten Bangladesh', 'admin', NOW()),
('Content Manager', 'content@brightenbangladesh.org', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'Brighten Bangladesh', 'content_manager', NOW()),
('Editor John', 'editor@brightenbangladesh.org', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'Brighten Bangladesh', 'editor', NOW()),
('Sarah Member', 'sarah@example.com', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'Tech Corp', 'member', NOW()),
('Michael Writer', 'michael@example.com', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'Creative Agency', 'member', NOW()),
('Lisa Volunteer', 'lisa@example.com', '$2b$10$FCz9RKqiisO0fNU4YI9cyu3OrIJXvuMnf6a1UOXdSbVhVwJ2rJAwu', 'Local NGO', 'volunteer', NOW());

-- Insert sample blogs
INSERT INTO blogs (author_id, title, slug, summary, content, status, created_at) VALUES
(4, 'Welcome to Brighten Bangladesh', 'welcome-to-brighten-bangladesh-1733748000000', 'An introduction to our mission and vision', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'published', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 'Empowering Communities Through Education', 'empowering-communities-through-education-1733661600000', 'How education transforms lives', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'approved', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(4, 'Our Recent Community Projects', 'our-recent-community-projects-1733575200000', 'Highlights from recent initiatives', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 'approved', DATE_SUB(NOW(), INTERVAL 15 DAY)),
(5, 'Volunteer Stories: Making a Difference', 'volunteer-stories-making-difference-1733488800000', 'Inspiring stories from our volunteers', 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'approved', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(4, 'Building a Brighter Future Together', 'building-brighter-future-together-1733402400000', 'Our vision for the future', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', 'pending', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(5, 'Draft: Upcoming Events', 'draft-upcoming-events-1733316000000', 'Planning for next quarter', 'This is a draft blog post about upcoming events and initiatives.', 'draft', NOW());

-- Insert sample magazines
INSERT INTO magazines (title, issue_number, publish_date, cover_image, created_at) VALUES
('Brighten Bangladesh Quarterly', 'Issue 1 - Q1 2025', '2025-01-15', '/uploads/magazine-q1-2025.jpg', DATE_SUB(NOW(), INTERVAL 30 DAY)),
('Brighten Bangladesh Quarterly', 'Issue 2 - Q2 2025', '2025-04-15', '/uploads/magazine-q2-2025.jpg', DATE_SUB(NOW(), INTERVAL 10 DAY)),
('Special Edition: Community Impact', 'Special Edition 2024', '2024-12-01', '/uploads/magazine-special-2024.jpg', DATE_SUB(NOW(), INTERVAL 60 DAY));

-- Insert sample user activities
INSERT INTO user_activities (user_id, type, meta, created_at) VALUES
(4, 'blog_published', '{"blogId": 1, "blogTitle": "Welcome to Brighten Bangladesh"}', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(5, 'blog_published', '{"blogId": 2, "blogTitle": "Empowering Communities Through Education"}', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(4, 'blog_published', '{"blogId": 3, "blogTitle": "Our Recent Community Projects"}', DATE_SUB(NOW(), INTERVAL 15 DAY)),
(5, 'blog_published', '{"blogId": 4, "blogTitle": "Volunteer Stories: Making a Difference"}', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(4, 'event_participation', '{"eventName": "Community Cleanup Drive", "date": "2025-11-20"}', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(5, 'event_participation', '{"eventName": "Education Workshop", "date": "2025-11-25"}', DATE_SUB(NOW(), INTERVAL 25 DAY)),
(6, 'event_participation', '{"eventName": "Volunteer Training", "date": "2025-12-01"}', DATE_SUB(NOW(), INTERVAL 20 DAY)),
(4, 'project_participation', '{"projectName": "School Renovation Project", "duration": "3 months"}', DATE_SUB(NOW(), INTERVAL 90 DAY)),
(5, 'project_participation', '{"projectName": "Community Library Initiative", "duration": "2 months"}', DATE_SUB(NOW(), INTERVAL 100 DAY));

-- Insert sample memberships (for eligible users)
INSERT INTO memberships (user_id, membership_id, status, valid_from, valid_to, criteria, created_at) VALUES
(4, 'BRIGHT-2025-ABC123', 'active', DATE_SUB(NOW(), INTERVAL 30 DAY), DATE_ADD(NOW(), INTERVAL 335 DAY), 
'{"eligible": true, "rules": {"blogs": true, "events": true, "projects": true}, "counts": {"approvedBlogsLast30Days": 5, "eventParticipationsLast90Days": 2, "projectParticipationsLast180Days": 1}}', 
DATE_SUB(NOW(), INTERVAL 30 DAY));
