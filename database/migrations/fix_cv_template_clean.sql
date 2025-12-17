-- Fix Comprehensive Professional CV Template

UPDATE cv_templates SET
  name = 'Comprehensive Professional',
  description = 'Complete professional CV with all requested sections, photo, and custom headings',
  html_content = '<div class="cv-container">
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
          {{#if personalInfo.email}}
          <span class="contact-item">📧 {{personalInfo.email}}</span>
          {{/if}}
          {{#if personalInfo.phone}}
          <span class="contact-item">📱 {{personalInfo.phone}}</span>
          {{/if}}
          {{#if personalInfo.location}}
          <span class="contact-item">📍 {{personalInfo.location}}</span>
          {{/if}}
          {{#if personalInfo.linkedin}}
          <span class="contact-item">💼 {{personalInfo.linkedin}}</span>
          {{/if}}
          {{#if personalInfo.website}}
          <span class="contact-item">🌐 {{personalInfo.website}}</span>
          {{/if}}
          {{#if personalInfo.github}}
          <span class="contact-item">💻 {{personalInfo.github}}</span>
          {{/if}}
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
    <h3 class="section-title">{{#if sectionTitles.certifications}}{{sectionTitles.certifications}}{{else}}CERTIFICATIONS{{/if}}</h3>
    <div class="section-content">
      {{#each certifications}}
      <div class="cert-entry">
        <div class="cert-header">
          <strong>{{name}}</strong>
          {{#if issuer}}
          <span class="cert-issuer"> - {{issuer}}</span>
          {{/if}}
        </div>
        {{#if license}}
        <div class="cert-license">License: {{license}}</div>
        {{/if}}
        {{#if date}}
        <span class="cert-date">({{date}})</span>
        {{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if portfolio}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.portfolio}}{{sectionTitles.portfolio}}{{else}}PORTFOLIO{{/if}}</h3>
    <div class="section-content">
      <ul class="portfolio-list">
        {{#each portfolio}}
        <li>🔗 {{this}}</li>
        {{/each}}
      </ul>
    </div>
  </div>
  {{/if}}

  {{#if experience}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.experience}}{{sectionTitles.experience}}{{else}}EXPERIENCE{{/if}}</h3>
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
            {{#if location}}
            <div class="location">{{location}}</div>
            {{/if}}
          </div>
        </div>
        {{#if description}}
        <p class="entry-description">{{description}}</p>
        {{/if}}
        {{#if responsibilities}}
        <ul class="responsibilities-list">
          {{#each responsibilities}}
          <li>{{this}}</li>
          {{/each}}
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
        {{#if details}}
        <p class="entry-description">{{details}}</p>
        {{/if}}
        {{#if gpa}}
        <p class="gpa-info"><strong>GPA:</strong> {{gpa}}</p>
        {{/if}}
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
        {{#if description}}
        <p class="project-description">{{description}}</p>
        {{/if}}
        {{#if technologies}}
        <p class="project-tech"><strong>Technologies:</strong> {{technologies}}</p>
        {{/if}}
        {{#if url}}
        <p class="project-url"><strong>Link:</strong> {{url}}</p>
        {{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if personalSkills}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.personalSkills}}{{sectionTitles.personalSkills}}{{else}}PERSONAL SKILLS{{/if}}</h3>
    <div class="section-content">
      <div class="skills-grid">
        {{#each personalSkills}}
        <div class="skill-item">• {{this}}</div>
        {{/each}}
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
          <strong>{{role}}</strong>
          {{#if organization}}
          <span> - {{organization}}</span>
          {{/if}}
        </div>
        {{#if period}}
        <span class="activity-period">{{period}}</span>
        {{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}

  {{#if languages}}
  <div class="section">
    <h3 class="section-title">{{#if sectionTitles.languages}}{{sectionTitles.languages}}{{else}}LANGUAGES{{/if}}</h3>
    <div class="section-content">
      <div class="languages-grid">
        {{#each languages}}
        <div class="language-item">{{name}} - {{level}}</div>
        {{/each}}
      </div>
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
        {{#if title}}
        <p class="ref-title">{{title}}</p>
        {{/if}}
        {{#if organization}}
        <p class="ref-org">{{organization}}</p>
        {{/if}}
        {{#if contact}}
        <p class="ref-contact">Contact: {{contact}}</p>
        {{/if}}
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}
</div>',
  css_content = ':root {
  --accent-color: #0f766e;
  --text-color: #1f2937;
  --muted-color: #6b7280;
  --light-border: #e5e7eb;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

@page {
  size: A4;
  margin: 15mm;
}

body {
  font-family: "Segoe UI", "Calibri", Tahoma, sans-serif;
  font-size: 10pt;
  line-height: 1.5;
  color: var(--text-color);
  background: white;
}

.cv-container {
  max-width: 210mm;
  margin: 0 auto;
  padding: 0;
  background: white;
}

.header {
  padding: 15mm 15mm 10mm 15mm;
  margin-bottom: 10px;
  border-bottom: 3px solid var(--accent-color);
}

.header-main {
  display: flex;
  gap: 16px;
  align-items: center;
}

.photo-wrap {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-color);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-text { flex: 1; }

.name {
  font-size: 24pt;
  font-weight: 700;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
}

.title {
  font-size: 13pt;
  color: var(--text-color);
  font-weight: 600;
  margin-bottom: 8px;
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 16px;
  color: var(--muted-color);
}

.contact-item {
  font-size: 9pt;
  white-space: nowrap;
}

.section {
  margin: 0 15mm 12mm 15mm;
  break-inside: avoid;
  page-break-inside: avoid;
}

.section-title {
  font-size: 12pt;
  font-weight: 700;
  color: var(--accent-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  border-bottom: 2px solid var(--accent-color);
}

.section-content { padding-left: 5px; }

.summary-text {
  text-align: justify;
  line-height: 1.6;
  color: var(--text-color);
}

.experience-entry {
  margin-bottom: 15px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--light-border);
}

.experience-entry:last-child { border-bottom: none; }

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
}

.entry-left { flex: 1; }

.entry-right {
  text-align: right;
  margin-left: 10px;
  min-width: 120px;
}

.position-title, .degree-title {
  font-size: 11pt;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 2px;
}

.company-name, .institution-name {
  font-size: 10pt;
  color: var(--muted-color);
  font-style: italic;
}

.period {
  font-size: 9pt;
  color: var(--accent-color);
  font-weight: 600;
  white-space: nowrap;
}

.location { font-size: 9pt; color: var(--muted-color); }

.entry-description {
  margin: 5px 0;
  color: var(--text-color);
  text-align: justify;
}

.responsibilities-list {
  margin: 8px 0 0 20px;
  list-style-type: disc;
}

.responsibilities-list li {
  margin-bottom: 4px;
  color: var(--muted-color);
  line-height: 1.5;
}

.education-entry { margin-bottom: 12px; }

.gpa-info {
  margin-top: 3px;
  font-size: 9pt;
  color: var(--muted-color);
}

.cert-entry { margin-bottom: 8px; }
.cert-header { color: var(--text-color); }
.cert-issuer { color: var(--muted-color); }
.cert-license { font-size: 9pt; color: var(--muted-color); }
.cert-date { font-size: 9pt; color: #9ca3af; margin-left: 5px; }

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px 15px;
}

.skill-item { color: var(--text-color); font-size: 9.5pt; }

.portfolio-list { margin-left: 18px; color: var(--text-color); }
.portfolio-list li { margin-bottom: 4px; }

.project-entry {
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f4f6;
}
.project-entry:last-child { border-bottom: none; }
.project-title { font-size: 10.5pt; font-weight: 600; color: var(--accent-color); margin-bottom: 4px; }
.project-description { color: var(--muted-color); margin-bottom: 4px; text-align: justify; }
.project-tech, .project-url { font-size: 9pt; color: var(--muted-color); margin-top: 3px; }

.activity-entry { margin-bottom: 8px; }
.activity-header { color: var(--text-color); }
.activity-period { font-size: 9pt; color: var(--muted-color); margin-left: 5px; }

.languages-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.language-item { color: var(--text-color); font-size: 9.5pt; }

.reference-entry { margin-bottom: 12px; }
.ref-name { font-weight: 600; color: var(--text-color); margin-bottom: 2px; }
.ref-title, .ref-org, .ref-contact { font-size: 9pt; color: var(--muted-color); margin-bottom: 2px; }

@media print {
  .section { break-inside: avoid; page-break-inside: avoid; }
}',
  is_active = 1,
  display_order = 1
WHERE id = 1;
