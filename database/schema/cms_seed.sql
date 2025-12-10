-- CMS Seed Data for Brighten Bangladesh
-- Premium content for professional nonprofit organization website

-- Hero Sliders (Landing Page Carousel)
INSERT INTO hero_sliders (title, subtitle, description, button_text, button_link, image_url, display_order, is_active) VALUES
('Transform Lives Through Education', 'Empowering Communities Across Bangladesh', 'Join us in our mission to provide quality education and opportunities to underprivileged children and youth. Together, we can build a brighter future for Bangladesh.', 'Get Involved', '/get-involved', '/uploads/hero/hero-education.jpg', 1, TRUE),
('Every Child Deserves Quality Education', 'Breaking Barriers, Building Futures', 'For over 10 years, we have been working to make education accessible to children from marginalized communities. Your support can change lives.', 'Donate Now', '/donate', '/uploads/hero/hero-children.jpg', 2, TRUE),
('Join Our Volunteer Network', 'Be the Change You Want to See', 'Connect with thousands of volunteers across Bangladesh who are making a real difference in their communities.', 'Become a Volunteer', '/volunteer', '/uploads/hero/hero-volunteers.jpg', 3, TRUE);

-- Focus Areas
INSERT INTO focus_areas (title, slug, short_description, full_description, icon, image_url, display_order, is_active) VALUES
('Education & Digital Learning', 'education-digital-learning', 'Providing quality education and digital literacy to children from underserved communities', '<p>Education is the core focus of Brighten Bangladesh. For the past 10 years, we have been working tirelessly to make education accessible to children from marginalized communities and hard-to-reach areas.</p><p>Our programs include formal education support, digital literacy training, and scholarship opportunities for deserving students.</p>', 'graduation-cap', '/uploads/focus/education.jpg', 1, TRUE),
('Youth & Skill Development', 'youth-skill-development', 'Empowering youth with essential skills and opportunities for a better future', '<p>With a firm belief that youths are the future of our nation, we have launched initiatives focusing on youth empowerment and skills development.</p><p>Our programs include vocational training, leadership development, and entrepreneurship support.</p>', 'users', '/uploads/focus/youth.jpg', 2, TRUE),
('Women Empowerment', 'women-empowerment', 'Promoting women''s rights through education and skills development', '<p>To promote and protect women''s rights, we have been working to break barriers to women''s education, foster skills development, and raise mass awareness on critical issues.</p><p>Our initiatives focus on gender equality, economic empowerment, and health awareness.</p>', 'female', '/uploads/focus/women.jpg', 3, TRUE),
('Environment & Climate', 'environment-climate', 'Creating opportunities for youth to protect our planet', '<p>From global warming to climate change, we are creating opportunities for youth to do their part to protect our planet.</p><p>Our programs include tree plantation drives, environmental education, and climate awareness campaigns.</p>', 'leaf', '/uploads/focus/environment.jpg', 4, TRUE),
('Community Development', 'community-development', 'Building stronger, more resilient communities', '<p>We work directly with communities to identify their needs and develop sustainable solutions.</p><p>Our approach includes infrastructure development, health awareness, and livelihood support programs.</p>', 'home', '/uploads/focus/community.jpg', 5, TRUE);

-- Statistics
INSERT INTO statistics (label, value, icon, suffix, display_order, is_active) VALUES
('Children Supported', '5000', 'users', '+', 1, TRUE),
('Nationwide Volunteers', '10000', 'user-check', '+', 2, TRUE),
('Districts Covered', '25', 'map-pin', '', 3, TRUE),
('Years of Service', '10', 'award', '+', 4, TRUE),
('Community Projects', '150', 'briefcase', '+', 5, TRUE),
('Scholarships Provided', '500', 'book-open', '+', 6, TRUE);

-- Pages
INSERT INTO pages (title, slug, content, meta_title, meta_description, is_published, published_at, created_by) VALUES
('About Us', 'about', '<h2>Who We Are</h2><p>Brighten Bangladesh is a non-profit organization dedicated to empowering underprivileged individuals and communities across Bangladesh through education, youth development, women''s empowerment, environmental awareness, and poverty alleviation.</p><h2>Our Mission</h2><p>To create lasting change in the lives of marginalized communities by providing access to quality education, skills development, and opportunities for growth.</p><h2>Our Vision</h2><p>A Bangladesh where every individual has the opportunity to reach their full potential, regardless of their socioeconomic background.</p>', 'About Brighten Bangladesh | Our Mission & Vision', 'Learn about Brighten Bangladesh, a nonprofit organization working to empower communities through education and development programs across Bangladesh.', TRUE, NOW(), 1),
('Get Involved', 'get-involved', '<h2>Make a Difference</h2><p>There are many ways you can support our mission and help transform lives.</p><h3>Volunteer</h3><p>Join our network of volunteers and contribute your time and skills to make a real impact.</p><h3>Donate</h3><p>Your financial support helps us expand our programs and reach more communities.</p><h3>Partner</h3><p>We welcome partnerships with organizations that share our vision for a brighter Bangladesh.</p>', 'Get Involved | Support Our Mission', 'Learn how you can support Brighten Bangladesh through volunteering, donations, or partnerships.', TRUE, NOW(), 1),
('Contact Us', 'contact', '<h2>Get in Touch</h2><p>We''d love to hear from you. Reach out to us with any questions or to learn more about our work.</p><p><strong>Address:</strong> Dhaka, Bangladesh</p><p><strong>Email:</strong> info@brightenbangladesh.org</p><p><strong>Phone:</strong> +880 XXX XXXXXX</p>', 'Contact Brighten Bangladesh', 'Get in touch with Brighten Bangladesh. Find our contact information and send us a message.', TRUE, NOW(), 1);

-- Team Members
INSERT INTO team_members (name, position, department, bio, photo, email, social_links, display_order, is_active) VALUES
('Admin User', 'Executive Director', 'Leadership', 'Leading our organization with passion and dedication to create positive change.', '/uploads/team/admin.jpg', 'admin@brightenbangladesh.org', '{"linkedin": "#", "twitter": "#"}', 1, TRUE);

-- Settings
INSERT INTO settings (setting_key, setting_value, setting_type, category, description) VALUES
('site_title', 'Brighten Bangladesh', 'text', 'general', 'Website title'),
('site_tagline', 'Empowering Communities Through Education', 'text', 'general', 'Website tagline/subtitle'),
('site_description', 'A non-profit organization dedicated to empowering underprivileged communities in Bangladesh through education, youth development, and community programs.', 'text', 'general', 'Website description'),
('contact_email', 'info@brightenbangladesh.org', 'text', 'contact', 'Main contact email'),
('contact_phone', '+880 XXX XXXXXX', 'text', 'contact', 'Main contact phone'),
('contact_address', 'Dhaka, Bangladesh', 'text', 'contact', 'Physical address'),
('facebook_url', 'https://facebook.com/brightenbangladesh', 'text', 'social', 'Facebook page URL'),
('twitter_url', 'https://twitter.com/brightenbd', 'text', 'social', 'Twitter profile URL'),
('linkedin_url', 'https://linkedin.com/company/brighten-bangladesh', 'text', 'social', 'LinkedIn page URL'),
('instagram_url', 'https://instagram.com/brightenbangladesh', 'text', 'social', 'Instagram profile URL'),
('youtube_url', 'https://youtube.com/@brightenbangladesh', 'text', 'social', 'YouTube channel URL'),
('meta_keywords', 'nonprofit, bangladesh, education, youth development, community empowerment', 'text', 'seo', 'Default meta keywords'),
('logo_url', '/uploads/logo.png', 'image', 'appearance', 'Site logo URL'),
('favicon_url', '/uploads/favicon.ico', 'image', 'appearance', 'Site favicon URL'),
('primary_color', '#10b981', 'text', 'appearance', 'Primary brand color'),
('footer_text', '© 2025 Brighten Bangladesh | All Rights Reserved', 'text', 'general', 'Footer copyright text');

-- Menus (Header Navigation)
INSERT INTO menus (menu_location, label, url, parent_id, display_order, is_active) VALUES
('header', 'Home', '/', NULL, 1, TRUE),
('header', 'About', '/about', NULL, 2, TRUE),
('header', 'Focus Areas', '#', NULL, 3, TRUE),
('header', 'Education', '/focus/education-digital-learning', 3, 1, TRUE),
('header', 'Youth Development', '/focus/youth-skill-development', 3, 2, TRUE),
('header', 'Women Empowerment', '/focus/women-empowerment', 3, 3, TRUE),
('header', 'Environment', '/focus/environment-climate', 3, 4, TRUE),
('header', 'Blogs', '/blogs', NULL, 4, TRUE),
('header', 'Magazines', '/magazines', NULL, 5, TRUE),
('header', 'Get Involved', '/get-involved', NULL, 6, TRUE),
('header', 'Contact', '/contact', NULL, 7, TRUE);

-- Menus (Footer Navigation)
INSERT INTO menus (menu_location, label, url, parent_id, display_order, is_active) VALUES
('footer', 'About Us', '/about', NULL, 1, TRUE),
('footer', 'Our Team', '/team', NULL, 2, TRUE),
('footer', 'Programs', '/focus', NULL, 3, TRUE),
('footer', 'News & Updates', '/blogs', NULL, 4, TRUE),
('footer', 'Contact', '/contact', NULL, 5, TRUE),
('footer', 'Privacy Policy', '/privacy', NULL, 6, TRUE),
('footer', 'Terms of Service', '/terms', NULL, 7, TRUE);

-- Testimonials
INSERT INTO testimonials (person_name, person_role, person_photo, content, rating, display_order, is_active) VALUES
('Sarah Ahmed', 'Former Student', '/uploads/testimonials/sarah.jpg', 'Brighten Bangladesh changed my life. Through their education program, I was able to complete my studies and now I am giving back to my community.', 5, 1, TRUE),
('Karim Rahman', 'Youth Volunteer', '/uploads/testimonials/karim.jpg', 'Being part of this organization has been an incredible journey. I have learned so much and made a real impact in my community.', 5, 2, TRUE),
('Nadia Sultana', 'Program Beneficiary', '/uploads/testimonials/nadia.jpg', 'The skills I learned through their women empowerment program helped me start my own business and become financially independent.', 5, 3, TRUE);

-- Permissions
INSERT INTO permissions (name, slug, description, module) VALUES
-- CMS Permissions
('View Hero Sliders', 'view_hero_sliders', 'Can view hero sliders', 'cms'),
('Create Hero Sliders', 'create_hero_sliders', 'Can create hero sliders', 'cms'),
('Edit Hero Sliders', 'edit_hero_sliders', 'Can edit hero sliders', 'cms'),
('Delete Hero Sliders', 'delete_hero_sliders', 'Can delete hero sliders', 'cms'),
('View Pages', 'view_pages', 'Can view pages', 'cms'),
('Create Pages', 'create_pages', 'Can create pages', 'cms'),
('Edit Pages', 'edit_pages', 'Can edit pages', 'cms'),
('Delete Pages', 'delete_pages', 'Can delete pages', 'cms'),
('Publish Pages', 'publish_pages', 'Can publish pages', 'cms'),
('View Focus Areas', 'view_focus_areas', 'Can view focus areas', 'cms'),
('Create Focus Areas', 'create_focus_areas', 'Can create focus areas', 'cms'),
('Edit Focus Areas', 'edit_focus_areas', 'Can edit focus areas', 'cms'),
('Delete Focus Areas', 'delete_focus_areas', 'Can delete focus areas', 'cms'),
('View Statistics', 'view_statistics', 'Can view statistics', 'cms'),
('Edit Statistics', 'edit_statistics', 'Can edit statistics', 'cms'),
('View Testimonials', 'view_testimonials', 'Can view testimonials', 'cms'),
('Create Testimonials', 'create_testimonials', 'Can create testimonials', 'cms'),
('Edit Testimonials', 'edit_testimonials', 'Can edit testimonials', 'cms'),
('Delete Testimonials', 'delete_testimonials', 'Can delete testimonials', 'cms'),
('View Team', 'view_team', 'Can view team members', 'cms'),
('Create Team', 'create_team', 'Can create team members', 'cms'),
('Edit Team', 'edit_team', 'Can edit team members', 'cms'),
('Delete Team', 'delete_team', 'Can delete team members', 'cms'),
('View Events', 'view_events', 'Can view events', 'cms'),
('Create Events', 'create_events', 'Can create events', 'cms'),
('Edit Events', 'edit_events', 'Can edit events', 'cms'),
('Delete Events', 'delete_events', 'Can delete events', 'cms'),
('Publish Events', 'publish_events', 'Can publish events', 'cms'),
('View Projects', 'view_projects', 'Can view projects', 'cms'),
('Create Projects', 'create_projects', 'Can create projects', 'cms'),
('Edit Projects', 'edit_projects', 'Can edit projects', 'cms'),
('Delete Projects', 'delete_projects', 'Can delete projects', 'cms'),
('Publish Projects', 'publish_projects', 'Can publish projects', 'cms'),
('View Settings', 'view_settings', 'Can view site settings', 'settings'),
('Edit Settings', 'edit_settings', 'Can edit site settings', 'settings'),
('View Menus', 'view_menus', 'Can view menus', 'cms'),
('Edit Menus', 'edit_menus', 'Can edit menus', 'cms'),
('View Media', 'view_media', 'Can view media library', 'media'),
('Upload Media', 'upload_media', 'Can upload media', 'media'),
('Delete Media', 'delete_media', 'Can delete media', 'media'),
('View Contact Submissions', 'view_contact_submissions', 'Can view contact form submissions', 'cms'),
('Delete Contact Submissions', 'delete_contact_submissions', 'Can delete contact submissions', 'cms'),
('View Activity Logs', 'view_activity_logs', 'Can view activity logs', 'system'),
-- User Permissions
('View Users', 'view_users', 'Can view users', 'users'),
('Create Users', 'create_users', 'Can create users', 'users'),
('Edit Users', 'edit_users', 'Can edit users', 'users'),
('Delete Users', 'delete_users', 'Can delete users', 'users'),
('Assign Roles', 'assign_roles', 'Can assign roles to users', 'users'),
-- Blog Permissions
('View All Blogs', 'view_all_blogs', 'Can view all blogs', 'blogs'),
('Create Blogs', 'create_blogs', 'Can create blogs', 'blogs'),
('Edit Own Blogs', 'edit_own_blogs', 'Can edit own blogs', 'blogs'),
('Edit All Blogs', 'edit_all_blogs', 'Can edit any blog', 'blogs'),
('Delete Own Blogs', 'delete_own_blogs', 'Can delete own blogs', 'blogs'),
('Delete All Blogs', 'delete_all_blogs', 'Can delete any blog', 'blogs'),
('Approve Blogs', 'approve_blogs', 'Can approve blogs', 'blogs'),
('Publish Blogs', 'publish_blogs', 'Can publish blogs', 'blogs'),
-- Magazine Permissions
('View Magazines', 'view_magazines', 'Can view magazines', 'magazines'),
('Create Magazines', 'create_magazines', 'Can create magazines', 'magazines'),
('Edit Magazines', 'edit_magazines', 'Can edit magazines', 'magazines'),
('Delete Magazines', 'delete_magazines', 'Can delete magazines', 'magazines'),
-- Membership Permissions
('View Memberships', 'view_memberships', 'Can view memberships', 'memberships'),
('Create Memberships', 'create_memberships', 'Can create memberships', 'memberships'),
('Edit Memberships', 'edit_memberships', 'Can edit memberships', 'memberships'),
('Delete Memberships', 'delete_memberships', 'Can delete memberships', 'memberships'),
('Check Eligibility', 'check_eligibility', 'Can check membership eligibility', 'memberships');

-- Role Permissions Assignment
-- Admin gets all permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'admin', id FROM permissions;

-- Content Manager gets CMS and content permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'content_manager', id FROM permissions 
WHERE module IN ('cms', 'blogs', 'magazines', 'media', 'users')
AND slug NOT IN ('delete_users', 'assign_roles');

-- Editor gets blog and content permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'editor', id FROM permissions 
WHERE module IN ('blogs', 'media')
OR slug IN ('view_pages', 'view_focus_areas', 'view_events', 'view_projects');

-- Member gets basic permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'member', id FROM permissions 
WHERE slug IN ('create_blogs', 'edit_own_blogs', 'delete_own_blogs', 'view_media', 'upload_media');

-- Volunteer gets basic view and create permissions
INSERT INTO role_permissions (role, permission_id)
SELECT 'volunteer', id FROM permissions 
WHERE slug IN ('create_blogs', 'edit_own_blogs', 'view_media', 'upload_media', 'view_events');
