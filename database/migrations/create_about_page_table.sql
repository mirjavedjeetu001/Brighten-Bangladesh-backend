-- Create about_page table if it doesn't exist
CREATE TABLE IF NOT EXISTS `about_page` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `hero_title` text NOT NULL,
  `hero_subtitle` text DEFAULT NULL,
  `hero_image` text DEFAULT NULL,
  `mission_title` text DEFAULT NULL,
  `mission_content` text DEFAULT NULL,
  `vision_title` text DEFAULT NULL,
  `vision_content` text DEFAULT NULL,
  `values_title` text DEFAULT NULL,
  `values_content` text DEFAULT NULL,
  `story_title` text DEFAULT NULL,
  `story_content` text DEFAULT NULL,
  `team_title` text DEFAULT NULL,
  `team_subtitle` text DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default content if table is empty
INSERT INTO `about_page` (`hero_title`, `hero_subtitle`, `mission_title`, `mission_content`, `vision_title`, `vision_content`, `values_title`, `values_content`, `story_title`, `story_content`, `team_title`, `team_subtitle`)
SELECT * FROM (SELECT 
  'About Brighten Bangladesh' as hero_title,
  'Empowering Communities, Brightening Futures' as hero_subtitle,
  'Our Mission' as mission_title,
  '<p>To empower communities through sustainable development, education, and social initiatives. We work to create lasting positive change by connecting passionate individuals and organizations dedicated to making a difference in Bangladesh.</p>' as mission_content,
  'Our Vision' as vision_title,
  '<p>A brighter Bangladesh where every individual has the opportunity to thrive, contribute, and participate in building a prosperous and equitable society.</p>' as vision_content,
  'Our Values' as values_title,
  '<ul><li><strong>Integrity:</strong> We uphold the highest standards of honesty and ethical behavior in all our actions.</li><li><strong>Collaboration:</strong> We believe in the power of working together to achieve common goals and create greater impact.</li><li><strong>Excellence:</strong> We strive for excellence in everything we do, continuously improving and innovating.</li><li><strong>Impact:</strong> We focus on creating measurable, positive change in communities across Bangladesh.</li><li><strong>Inclusivity:</strong> We embrace diversity and ensure everyone has a voice and opportunity to participate.</li><li><strong>Sustainability:</strong> We are committed to creating long-term, sustainable solutions for community development.</li></ul>' as values_content,
  'Our Story' as story_title,
  '<p>Brighten Bangladesh was founded with a vision to create positive change in communities across the nation. Through our platform, we connect passionate individuals who want to make a difference by sharing knowledge, organizing events, and collaborating on meaningful projects.</p><p>Since our inception, we have brought together hundreds of changemakers, published countless inspiring stories, and facilitated numerous community initiatives that have touched lives across Bangladesh.</p>' as story_content,
  'Our Team' as team_title,
  'Meet the dedicated individuals working to brighten Bangladesh' as team_subtitle
) AS tmp
WHERE NOT EXISTS (SELECT 1 FROM `about_page` LIMIT 1);
