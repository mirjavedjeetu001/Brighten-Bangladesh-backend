-- Update template 1 to include profile photo in the header
-- Run this against your Brighten Bangladesh database

UPDATE cv_templates
SET
  name = 'Comprehensive Professional',
  description = 'Complete professional CV with all requested sections, photo, and custom headings',
  html_content = '
<div class="cv-container">
  <div class="header">
    <div class="header-main">
      {{#if personalInfo.photo}}
      <div class="photo-wrap">
        <img class="photo" src="{{personalInfo.photo}}" alt="Profile" />
      </div>
      {{/if}}
      <div class="header-text">
        <h1 class="name">{{personalInfo.name}}</h1>
        {{#if personalInfo.title}}
        <h2 class="title">{{personalInfo.title}}</h2>
        {{/if}}
        <div class="contact-info">
          {{#if personalInfo.email}}<span class="contact-item">📧 {{personalInfo.email}}</span>{{/if}}
          {{#if personalInfo.phone}}<span class="contact-item">📱 {{personalInfo.phone}}</span>{{/if}}
          {{#if personalInfo.location}}<span class="contact-item">📍 {{personalInfo.location}}</span>{{/if}}
          {{#if personalInfo.linkedin}}<span class="contact-item">💼 {{personalInfo.linkedin}}</span>{{/if}}
          {{#if personalInfo.website}}<span class="contact-item">🌐 {{personalInfo.website}}</span>{{/if}}
          {{#if personalInfo.github}}<span class="contact-item">💻 {{personalInfo.github}}</span>{{/if}}
        </div>
      </div>
    </div>
  </div>

  {{#if personalInfo.summary}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.summary}}{{sectionTitles.summary}}{{else}}SUMMARY{{/if}}</h3>
    <div class="section-content">
      <p class="summary-text">{{personalInfo.summary}}</p>
    </div>
  </div>
  {{/if}}

  {{#if skills}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.skills}}{{sectionTitles.skills}}{{else}}SKILLS{{/if}}</h3>
    <div class="section-content">
      <div class="skills-grid">
        {{#each skills}}
        <div class="skill-item">• {{this}}</div>
        {{/each}}
      </div>
    </div>
  </div>
  {{/if}}

  {{#if certifications}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.certifications}}{{sectionTitles.certifications}}{{else}}CERTIFICATIONS & LICENSES{{/if}}</h3>
    <div class="section-content">
      {{#each certifications}}
      <div class="cert-entry">
        <div class="cert-header">
          <strong>{{name}}</strong>
          {{#if issuer}}<span class="cert-issuer"> - {{issuer}}</span>{{/if}}
        </div>
        {{#if license}}<div class="cert-license">License: {{license}}</div>{{/if}}
        {{#if date}}<span class="cert-date">({{date}})</span>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if portfolio}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.portfolio}}{{sectionTitles.portfolio}}{{else}}PORTFOLIO & WEBSITE{{/if}}</h3>
    <div class="section-content">
      <ul class="portfolio-list">
        {{#each portfolio}}<li>🔗 {{this}}</li>{{/each}}
      </ul>
    </div>
  </div>
  {{/if}}

  {{#if experience}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.experience}}{{sectionTitles.experience}}{{else}}EXPERIENCES{{/if}}</h3>
    <div class="section-content">
      {{#each experience}}
      <div class="experience-entry">
        <div class="entry-header">
          <div class="entry-left">
            <h4 class="position-title">{{position}}</h4>
            <p class="company-name">{{company}}</p>
          </div>
          <div class="entry-right">
            <span class="period">{{startDate}} - {{endDate}}</span>
            {{#if location}}<div class="location">{{location}}</div>{{/if}}
          </div>
        </div>
        {{#if description}}<p class="entry-description">{{description}}</p>{{/if}}
        {{#if responsibilities}}
        <ul class="responsibilities-list">
          {{#each responsibilities}}<li>{{this}}</li>{{/each}}
        </ul>
        {{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if education}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.education}}{{sectionTitles.education}}{{else}}EDUCATION{{/if}}</h3>
    <div class="section-content">
      {{#each education}}
      <div class="education-entry">
        <div class="entry-header">
          <div class="entry-left">
            <h4 class="degree-title">{{degree}}</h4>
            <p class="institution-name">{{institution}}</p>
          </div>
          <div class="entry-right">
            <span class="period">{{graduationDate}}</span>
          </div>
        </div>
        {{#if details}}<p class="entry-description">{{details}}</p>{{/if}}
        {{#if gpa}}<p class="gpa-info"><strong>GPA:</strong> {{gpa}}</p>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if projects}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.projects}}{{sectionTitles.projects}}{{else}}PROJECTS{{/if}}</h3>
    <div class="section-content">
      {{#each projects}}
      <div class="project-entry">
        <h4 class="project-title">{{name}}</h4>
        {{#if description}}<p class="project-description">{{description}}</p>{{/if}}
        {{#if technologies}}<p class="project-tech"><strong>Technologies:</strong> {{technologies}}</p>{{/if}}
        {{#if url}}<p class="project-url">🔗 {{url}}</p>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if personalSkills}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.personalSkills}}{{sectionTitles.personalSkills}}{{else}}PERSONAL SKILLS & COMPETENCES{{/if}}</h3>
    <div class="section-content">
      <div class="skills-grid">
        {{#each personalSkills}}<div class="skill-item">• {{this}}</div>{{/each}}
      </div>
    </div>
  </div>
  {{/if}}

  {{#if activities}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.activities}}{{sectionTitles.activities}}{{else}}ACTIVITIES{{/if}}</h3>
    <div class="section-content">
      {{#each activities}}
      <div class="activity-entry">
        <div class="activity-header">
          <strong>{{role}}</strong>{{#if organization}}<span> - {{organization}}</span>{{/if}}
        </div>
        {{#if period}}<span class="activity-period">{{period}}</span>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if references}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.references}}{{sectionTitles.references}}{{else}}REFERENCES{{/if}}</h3>
    <div class="section-content">
      {{#each references}}
      <div class="reference-entry">
        <p class="ref-name"><strong>{{name}}</strong></p>
        {{#if title}}<p class="ref-title">{{title}}</p>{{/if}}
        {{#if organization}}<p class="ref-org">{{organization}}</p>{{/if}}
        {{#if contact}}<p class="ref-contact">Contact: {{contact}}</p>{{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}
</div>
',
  css_content = '
* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: "Segoe UI", "Calibri", Tahoma, sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  color: #1a1a1a;
  background: white;
}

.cv-container {
  max-width: 210mm;
  margin: 0 auto;
  padding: 15mm;
  background: white;
}

/* Header Styles */
.header {
  padding-bottom: 15px;
  margin-bottom: 20px;
  border-bottom: 3px solid #0d9488;
}

.header-main {
  display: flex;
  align-items: center;
  gap: 16px;
}

.photo-wrap {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #0d9488;
  flex-shrink: 0;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-size: 24pt;
  font-weight: 700;
  color: #0d9488;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.title {
  font-size: 13pt;
  color: #374151;
  font-weight: 500;
  margin-bottom: 10px;
}

.header-text { flex: 1; }

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}

.contact-item {
  font-size: 9pt;
  color: #4b5563;
  white-space: nowrap;
}

/* Section Styles */
.section {
  margin-bottom: 18px;
  page-break-inside: avoid;
}

.section-title {
  font-size: 12pt;
  font-weight: 700;
  color: #0d9488;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 2px solid #0d9488;
}

.section-content { padding-left: 5px; }

/* Summary */
.summary-text {
  text-align: justify;
  line-height: 1.6;
  color: #374151;
}

/* Experience Entries */
.experience-entry {
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.experience-entry:last-child { border-bottom: none; }

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
}

.entry-left { flex: 1; }
.entry-right { text-align: right; margin-left: 10px; }

.position-title, .degree-title {
  font-size: 11pt;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 2px;
}

.company-name, .institution-name {
  font-size: 10pt;
  color: #6b7280;
  font-style: italic;
}

.period {
  font-size: 9pt;
  color: #0d9488;
  font-weight: 600;
  white-space: nowrap;
}

.entry-description {
  margin: 5px 0;
  color: #374151;
  text-align: justify;
}

.responsibilities-list {
  margin: 8px 0 0 20px;
  list-style-type: disc;
}

.responsibilities-list li {
  margin-bottom: 4px;
  color: #4b5563;
  line-height: 1.5;
}

/* Education */
education-entry { margin-bottom: 12px; }

gpa-info {
  margin-top: 3px;
  font-size: 9pt;
  color: #6b7280;
}

/* Certifications */
.cert-entry { margin-bottom: 8px; }
.cert-header { color: #1f2937; }
.cert-issuer { color: #6b7280; }
.cert-date { font-size: 9pt; color: #9ca3af; margin-left: 5px; }

/* Skills */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px 15px;
}
.skill-item { color: #374151; font-size: 9.5pt; }

/* Projects */
.project-entry {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f4f6;
}
.project-entry:last-child { border-bottom: none; }
.project-title { font-size: 10.5pt; font-weight: 600; color: #0d9488; margin-bottom: 4px; }
.project-description { color: #4b5563; margin-bottom: 4px; text-align: justify; }
.project-tech, .project-url { font-size: 9pt; color: #6b7280; margin-top: 3px; }

/* Activities */
.activity-entry { margin-bottom: 8px; }
.activity-header { color: #1f2937; }
.activity-period { font-size: 9pt; color: #6b7280; margin-left: 5px; }

/* Languages */
.languages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.language-item { color: #374151; font-size: 9.5pt; }

/* References */
.reference-entry { margin-bottom: 12px; }
.ref-name { font-weight: 600; color: #1f2937; margin-bottom: 2px; }
.ref-title, .ref-org, .ref-contact { font-size: 9pt; color: #6b7280; margin-bottom: 2px; }

/* Print Styles */
@media print {
  .cv-container { padding: 0; max-width: 100%; }
  .section { page-break-inside: avoid; }
}
'
WHERE id = 1;
