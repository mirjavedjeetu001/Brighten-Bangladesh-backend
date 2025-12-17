-- Complete Professional CV Template with All Sections

UPDATE cv_templates
SET
  name = 'Premium Professional',
  description = 'Professional CV with all sections and photo support',
  html_content = '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CV</title>
</head>
<body>
  <div class="container">
    <!-- HEADER WITH PHOTO -->
    <header class="header">
      {{#if photo}}
      <div class="photo-container">
        <img src="{{photo}}" alt="Profile Photo" class="profile-photo">
      </div>
      {{/if}}
      <div class="header-info">
        <h1 class="name">{{name}}</h1>
        {{#if title}}
        <h2 class="title">{{title}}</h2>
        {{/if}}
        <div class="contact-info">
          {{#if email}}<div class="contact-item">✉ {{email}}</div>{{/if}}
          {{#if phone}}<div class="contact-item">📞 {{phone}}</div>{{/if}}
          {{#if location}}<div class="contact-item">📍 {{location}}</div>{{/if}}
          {{#if linkedin}}<div class="contact-item">💼 {{linkedin}}</div>{{/if}}
          {{#if github}}<div class="contact-item">�� {{github}}</div>{{/if}}
          {{#if website}}<div class="contact-item">🌐 {{website}}</div>{{/if}}
        </div>
      </div>
    </header>

    <!-- PROFESSIONAL SUMMARY -->
    {{#if summary}}
    <section class="section">
      <h3 class="section-title">Professional Summary</h3>
      <div class="section-content">
        <p class="summary">{{summary}}</p>
      </div>
    </section>
    {{/if}}

    <!-- EXPERIENCE -->
    {{#if experience}}
    <section class="section">
      <h3 class="section-title">Experience</h3>
      <div class="section-content">
        {{#each experience}}
        <div class="entry">
          <div class="entry-header">
            <div class="entry-title">
              <strong>{{position}}</strong> at {{company}}
            </div>
            <div class="entry-date">{{startDate}} - {{endDate}}</div>
          </div>
          {{#if location}}<div class="entry-location">{{location}}</div>{{/if}}
          {{#if description}}<p class="entry-description">{{description}}</p>{{/if}}
          {{#if responsibilities}}
          <ul class="responsibilities">
            {{#each responsibilities}}
            <li>{{this}}</li>
            {{/each}}
          </ul>
          {{/if}}
        </div>
        {{/each}}
      </div>
    </section>
    {{/if}}

    <!-- EDUCATION -->
    {{#if education}}
    <section class="section">
      <h3 class="section-title">Education</h3>
      <div class="section-content">
        {{#each education}}
        <div class="entry">
          <div class="entry-header">
            <div class="entry-title"><strong>{{degree}}</strong></div>
            <div class="entry-date">{{graduationDate}}</div>
          </div>
          <div class="entry-subtitle">{{institution}}</div>
          {{#if details}}<p class="entry-description">{{details}}</p>{{/if}}
          {{#if gpa}}<div class="gpa">GPA: {{gpa}}</div>{{/if}}
        </div>
        {{/each}}
      </div>
    </section>
    {{/if}}

    <!-- SKILLS -->
    {{#if skills}}
    <section class="section">
      <h3 class="section-title">Skills</h3>
      <div class="section-content">
        <div class="skills-container">
          {{#each skills}}
          <span class="skill-tag">{{this}}</span>
          {{/each}}
        </div>
      </div>
    </section>
    {{/if}}

    <!-- LANGUAGES -->
    {{#if languages}}
    <section class="section">
      <h3 class="section-title">Languages</h3>
      <div class="section-content">
        <div class="skills-container">
          {{#each languages}}
          <span class="skill-tag">{{#if this.name}}{{this.name}}{{else}}{{this}}{{/if}}</span>
          {{/each}}
        </div>
      </div>
    </section>
    {{/if}}

    <!-- CERTIFICATIONS -->
    {{#if certifications}}
    <section class="section">
      <h3 class="section-title">Certifications & Licenses</h3>
      <div class="section-content">
        {{#each certifications}}
        <div class="entry">
          <div class="entry-header">
            <div class="entry-title"><strong>{{name}}</strong></div>
            <div class="entry-date">{{date}}</div>
          </div>
          {{#if issuer}}<div class="entry-subtitle">{{issuer}}</div>{{/if}}
          {{#if license}}<div class="license">License: {{license}}</div>{{/if}}
        </div>
        {{/each}}
      </div>
    </section>
    {{/if}}

    <!-- PROJECTS -->
    {{#if projects}}
    <section class="section">
      <h3 class="section-title">Projects</h3>
      <div class="section-content">
        {{#each projects}}
        <div class="entry">
          <div class="entry-header">
            <div class="entry-title"><strong>{{name}}</strong></div>
            {{#if url}}<div class="entry-date">{{url}}</div>{{/if}}
          </div>
          {{#if description}}<p class="entry-description">{{description}}</p>{{/if}}
          {{#if technologies}}<div class="tech">Technologies: {{technologies}}</div>{{/if}}
        </div>
        {{/each}}
      </div>
    </section>
    {{/if}}

    <!-- PORTFOLIO -->
    {{#if portfolio}}
    <section class="section">
      <h3 class="section-title">Portfolio & Website</h3>
      <div class="section-content">
        <ul class="portfolio-list">
          {{#each portfolio}}
          <li>🔗 {{this}}</li>
          {{/each}}
        </ul>
      </div>
    </section>
    {{/if}}

    <!-- PERSONAL SKILLS -->
    {{#if personalSkills}}
    <section class="section">
      <h3 class="section-title">Personal Skills & Competences</h3>
      <div class="section-content">
        <div class="skills-container">
          {{#each personalSkills}}
          <span class="skill-tag">{{this}}</span>
          {{/each}}
        </div>
      </div>
    </section>
    {{/if}}

    <!-- ACTIVITIES -->
    {{#if activities}}
    <section class="section">
      <h3 class="section-title">Activities & Volunteering</h3>
      <div class="section-content">
        {{#each activities}}
        <div class="entry">
          <div class="entry-header">
            <div class="entry-title"><strong>{{role}}</strong></div>
            <div class="entry-date">{{period}}</div>
          </div>
          {{#if organization}}<div class="entry-subtitle">{{organization}}</div>{{/if}}
        </div>
        {{/each}}
      </div>
    </section>
    {{/if}}

    <!-- REFERENCES -->
    {{#if references}}
    <section class="section">
      <h3 class="section-title">References</h3>
      <div class="section-content">
        {{#each references}}
        <div class="entry">
          <div class="entry-header">
            <div class="entry-title"><strong>{{name}}</strong></div>
          </div>
          {{#if title}}<div class="entry-subtitle">{{title}}</div>{{/if}}
          {{#if organization}}<div class="org">{{organization}}</div>{{/if}}
          {{#if email}}<div class="contact">📧 {{email}}</div>{{/if}}
          {{#if phone}}<div class="contact">📞 {{phone}}</div>{{/if}}
          {{#if contact}}<div class="contact">📧 {{contact}}</div>{{/if}}
        </div>
        {{/each}}
      </div>
    </section>
    {{/if}}
  </div>
</body>
</html>',
  css_content = '* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  font-size: 11pt;
  line-height: 1.5;
  color: #2c3e50;
  background: white;
}

.container {
  max-width: 8.5in;
  margin: 0 auto;
  padding: 0.5in;
  background: white;
}

/* HEADER SECTION */
.header {
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 3px solid #0d9488;
}

.photo-container {
  flex-shrink: 0;
}

.profile-photo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #0d9488;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.header-info {
  flex: 1;
  min-width: 0;
}

.name {
  font-size: 26pt;
  font-weight: 700;
  color: #0d9488;
  margin-bottom: 4px;
  line-height: 1.2;
}

.title {
  font-size: 14pt;
  font-weight: 600;
  color: #34495e;
  margin-bottom: 10px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 10pt;
}

.contact-item {
  color: #555;
}

/* SECTIONS */
.section {
  margin-bottom: 16px;
  page-break-inside: avoid;
}

.section-title {
  font-size: 13pt;
  font-weight: 700;
  color: #0d9488;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #0d9488;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-content {
  padding-left: 0;
}

.summary {
  font-size: 10pt;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

/* ENTRIES */
.entry {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ecf0f1;
  page-break-inside: avoid;
}

.entry:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3px;
  gap: 10px;
}

.entry-title {
  font-size: 11pt;
  color: #2c3e50;
  flex: 1;
}

.entry-title strong {
  font-weight: 600;
}

.entry-date {
  font-size: 9pt;
  color: #0d9488;
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}

.entry-subtitle {
  font-size: 10pt;
  color: #666;
  margin-bottom: 4px;
  font-style: italic;
}

.entry-location {
  font-size: 9pt;
  color: #999;
  margin-bottom: 4px;
}

.entry-description {
  font-size: 10pt;
  color: #555;
  line-height: 1.5;
  margin: 5px 0;
  text-align: justify;
}

.gpa, .license, .tech, .org, .contact {
  font-size: 9pt;
  color: #666;
  margin: 2px 0;
}

.responsibilities {
  margin: 6px 0 0 18px;
  list-style-type: disc;
  padding-left: 0;
}

.responsibilities li {
  margin-bottom: 3px;
  color: #555;
  font-size: 10pt;
  line-height: 1.4;
}

.portfolio-list {
  margin-left: 15px;
  list-style-type: disc;
}

.portfolio-list li {
  font-size: 10pt;
  color: #555;
  margin-bottom: 4px;
}

/* SKILLS */
.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  display: inline-block;
  padding: 5px 11px;
  background: #0d9488;
  color: white;
  border-radius: 16px;
  font-size: 9pt;
  font-weight: 500;
  white-space: nowrap;
}

/* PRINT */
@media print {
  .container {
    box-shadow: none;
    padding: 0.3in;
  }
  
  .section {
    page-break-inside: avoid;
  }
  
  .entry {
    page-break-inside: avoid;
  }
}

@page {
  size: A4;
  margin: 0.3in;
}'
WHERE id = 1;
