-- Create CV Templates table
-- This table stores CV template designs that users can choose from

CREATE TABLE IF NOT EXISTS cv_templates (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_url VARCHAR(500),
  html_content LONGTEXT NOT NULL,
  css_content LONGTEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_is_active (is_active),
  INDEX idx_display_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert 3 default professional CV templates
INSERT INTO cv_templates (name, description, html_content, css_content, is_active, display_order) VALUES
(
  'Professional Modern',
  'Clean and modern design suitable for corporate positions',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>{{name}} - CV</title>
</head>
<body>
  <div class="container">
    <header class="header">
      {{#if photo}}
      <div class="photo">
        <img src="{{photo}}" alt="{{name}}">
      </div>
      {{/if}}
      <div class="header-content">
        <h1>{{name}}</h1>
        <h2>{{title}}</h2>
        <div class="contact">
          <span>{{email}}</span> | <span>{{phone}}</span> | <span>{{location}}</span>
        </div>
      </div>
    </header>

    {{#if summary}}
    <section>
      <h3>Professional Summary</h3>
      <p>{{summary}}</p>
    </section>
    {{/if}}

    {{#if experience}}
    <section>
      <h3>Work Experience</h3>
      {{#each experience}}
      <div class="item">
        <div class="item-header">
          <strong>{{position}}</strong> - {{company}}
        </div>
        <div class="item-meta">{{startDate}} - {{endDate}} | {{location}}</div>
        <p>{{description}}</p>
      </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if education}}
    <section>
      <h3>Education</h3>
      {{#each education}}
      <div class="item">
        <div class="item-header">
          <strong>{{degree}}</strong> - {{institution}}
        </div>
        <div class="item-meta">{{graduationDate}} | {{location}}</div>
        {{#if description}}
        <p>{{description}}</p>
        {{/if}}
      </div>
      {{/each}}
    </section>
    {{/if}}

    {{#if skills}}
    <section>
      <h3>Skills</h3>
      <div class="skills">
        {{#each skills}}
        <span class="skill-tag">{{this}}</span>
        {{/each}}
      </div>
    </section>
    {{/if}}
  </div>
</body>
</html>',
  'body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
.container { max-width: 800px; margin: 0 auto; background: white; }
.header { display: flex; gap: 20px; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #0d9488; }
.photo img { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; }
.header-content { flex: 1; }
h1 { margin: 0; font-size: 32px; color: #0d9488; }
h2 { margin: 5px 0; font-size: 20px; color: #666; font-weight: normal; }
.contact { margin-top: 10px; color: #666; }
section { margin-bottom: 25px; }
h3 { color: #0d9488; font-size: 20px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 5px; }
.item { margin-bottom: 20px; }
.item-header { font-size: 16px; margin-bottom: 5px; }
.item-meta { color: #666; font-size: 14px; margin-bottom: 8px; }
.skills { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag { background: #0d9488; color: white; padding: 5px 12px; border-radius: 15px; font-size: 14px; }',
  true,
  1
),
(
  'Creative Designer',
  'Bold and creative layout perfect for designers and creatives',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>{{name}} - CV</title>
</head>
<body>
  <div class="container">
    <aside class="sidebar">
      {{#if photo}}
      <div class="photo">
        <img src="{{photo}}" alt="{{name}}">
      </div>
      {{/if}}
      
      <div class="sidebar-section">
        <h3>Contact</h3>
        <p>{{email}}</p>
        <p>{{phone}}</p>
        <p>{{location}}</p>
      </div>

      {{#if skills}}
      <div class="sidebar-section">
        <h3>Skills</h3>
        {{#each skills}}
        <div class="skill-item">{{this}}</div>
        {{/each}}
      </div>
      {{/if}}
    </aside>

    <main class="main-content">
      <header>
        <h1>{{name}}</h1>
        <h2>{{title}}</h2>
      </header>

      {{#if summary}}
      <section>
        <h3>About Me</h3>
        <p>{{summary}}</p>
      </section>
      {{/if}}

      {{#if experience}}
      <section>
        <h3>Experience</h3>
        {{#each experience}}
        <div class="item">
          <h4>{{position}}</h4>
          <div class="meta">{{company}} | {{startDate}} - {{endDate}}</div>
          <p>{{description}}</p>
        </div>
        {{/each}}
      </section>
      {{/if}}

      {{#if education}}
      <section>
        <h3>Education</h3>
        {{#each education}}
        <div class="item">
          <h4>{{degree}}</h4>
          <div class="meta">{{institution}} | {{graduationDate}}</div>
        </div>
        {{/each}}
      </section>
      {{/if}}
    </main>
  </div>
</body>
</html>',
  'body { font-family: "Helvetica Neue", sans-serif; margin: 0; padding: 0; color: #333; }
.container { display: flex; min-height: 100vh; }
.sidebar { width: 280px; background: #0d9488; color: white; padding: 40px 30px; }
.photo img { width: 150px; height: 150px; border-radius: 50%; border: 5px solid white; margin-bottom: 30px; object-fit: cover; }
.sidebar-section { margin-bottom: 30px; }
.sidebar h3 { font-size: 16px; text-transform: uppercase; margin-bottom: 15px; letter-spacing: 1px; }
.sidebar p { margin: 5px 0; font-size: 14px; }
.skill-item { background: rgba(255,255,255,0.2); padding: 8px 12px; margin-bottom: 8px; border-radius: 5px; }
.main-content { flex: 1; padding: 40px 50px; }
header h1 { font-size: 48px; margin: 0; color: #0d9488; }
header h2 { font-size: 24px; margin: 10px 0 30px; color: #666; font-weight: normal; }
section { margin-bottom: 30px; }
section h3 { font-size: 24px; color: #0d9488; margin-bottom: 20px; }
.item { margin-bottom: 25px; }
.item h4 { font-size: 18px; margin: 0 0 5px; }
.meta { color: #666; font-size: 14px; margin-bottom: 10px; }',
  true,
  2
),
(
  'Executive Minimal',
  'Elegant minimal design for executives and senior professionals',
  '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>{{name}} - CV</title>
</head>
<body>
  <div class="container">
    <header class="header">
      <h1>{{name}}</h1>
      <div class="header-line"></div>
      <h2>{{title}}</h2>
      <div class="contact">
        {{email}} • {{phone}} • {{location}}
      </div>
    </header>

    {{#if photo}}
    <div class="photo-section">
      <img src="{{photo}}" alt="{{name}}">
    </div>
    {{/if}}

    {{#if summary}}
    <section>
      <h3>Profile</h3>
      <p class="summary">{{summary}}</p>
    </section>
    {{/if}}

    {{#if experience}}
    <section>
      <h3>Professional Experience</h3>
      {{#each experience}}
      <div class="experience-item">
        <div class="exp-header">
          <div>
            <strong>{{position}}</strong>
            <span class="company">{{company}}</span>
          </div>
          <span class="dates">{{startDate}} - {{endDate}}</span>
        </div>
        <p>{{description}}</p>
      </div>
      {{/each}}
    </section>
    {{/if}}

    <div class="two-column">
      {{#if education}}
      <section>
        <h3>Education</h3>
        {{#each education}}
        <div class="edu-item">
          <strong>{{degree}}</strong>
          <div>{{institution}}</div>
          <div class="year">{{graduationDate}}</div>
        </div>
        {{/each}}
      </section>
      {{/if}}

      {{#if skills}}
      <section>
        <h3>Key Skills</h3>
        <ul class="skills-list">
          {{#each skills}}
          <li>{{this}}</li>
          {{/each}}
        </ul>
      </section>
      {{/if}}
    </div>
  </div>
</body>
</html>',
  'body { font-family: "Georgia", serif; line-height: 1.8; color: #2c3e50; margin: 0; padding: 40px; background: #f9f9f9; }
.container { max-width: 850px; margin: 0 auto; background: white; padding: 60px; box-shadow: 0 0 30px rgba(0,0,0,0.1); }
.header { text-align: center; margin-bottom: 40px; }
h1 { font-size: 42px; margin: 0; color: #0d9488; font-weight: 300; letter-spacing: 2px; }
.header-line { width: 100px; height: 2px; background: #0d9488; margin: 20px auto; }
h2 { font-size: 18px; color: #7f8c8d; font-weight: normal; margin: 10px 0; text-transform: uppercase; letter-spacing: 3px; }
.contact { font-size: 14px; color: #95a5a6; margin-top: 15px; }
.photo-section { text-align: center; margin-bottom: 30px; }
.photo-section img { width: 120px; height: 120px; border-radius: 50%; border: 3px solid #0d9488; object-fit: cover; }
section { margin-bottom: 35px; }
h3 { font-size: 20px; color: #0d9488; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; font-weight: 400; }
.summary { font-size: 16px; font-style: italic; color: #555; }
.experience-item { margin-bottom: 25px; }
.exp-header { display: flex; justify-content: space-between; margin-bottom: 10px; }
.company { color: #7f8c8d; margin-left: 10px; }
.dates { color: #95a5a6; font-size: 14px; }
.two-column { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.edu-item { margin-bottom: 20px; }
.edu-item strong { display: block; margin-bottom: 5px; }
.year { color: #7f8c8d; font-size: 14px; margin-top: 3px; }
.skills-list { list-style: none; padding: 0; }
.skills-list li { padding: 8px 0; border-bottom: 1px solid #ecf0f1; }',
  true,
  3
);
