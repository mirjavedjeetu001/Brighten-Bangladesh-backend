-- Update CV templates with professional designs

-- Template 1: Modern Professional with Photo
UPDATE cv_templates SET 
html_content = '
<div class="cv-container">
  <div class="header">
    <div class="photo-section">
      {{#if personalInfo.photo}}
      <img src="{{personalInfo.photo}}" alt="Profile Photo" class="profile-photo">
      {{else}}
      <div class="photo-placeholder">PHOTO</div>
      {{/if}}
    </div>
    <div class="header-info">
      <h1>{{personalInfo.name}}</h1>
      <h2>{{personalInfo.title}}</h2>
      <div class="contact-info">
        <p><strong>Email:</strong> {{personalInfo.email}}</p>
        <p><strong>Phone:</strong> {{personalInfo.phone}}</p>
        {{#if personalInfo.location}}
        <p><strong>Location:</strong> {{personalInfo.location}}</p>
        {{/if}}
        {{#if personalInfo.linkedin}}
        <p><strong>LinkedIn:</strong> {{personalInfo.linkedin}}</p>
        {{/if}}
      </div>
    </div>
  </div>

  {{#if personalInfo.summary}}
  <div class="section">
    <h3 class="section-title">Professional Summary</h3>
    <p class="summary">{{personalInfo.summary}}</p>
  </div>
  {{/if}}

  {{#if experience}}
  <div class="section">
    <h3 class="section-title">Work Experience</h3>
    {{#each experience}}
    <div class="experience-item">
      <div class="item-header">
        <strong>{{position}}</strong> at <em>{{company}}</em>
      </div>
      <div class="item-period">{{period}}</div>
      {{#if description}}
      <p class="item-description">{{description}}</p>
      {{/if}}
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
  {{/if}}

  {{#if education}}
  <div class="section">
    <h3 class="section-title">Education</h3>
    {{#each education}}
    <div class="education-item">
      <div class="item-header">
        <strong>{{degree}}</strong>
      </div>
      <div>{{institution}}</div>
      <div class="item-period">{{year}}</div>
      {{#if details}}
      <p class="item-description">{{details}}</p>
      {{/if}}
    </div>
    {{/each}}
  </div>
  {{/if}}

  <div class="two-column">
    {{#if skills}}
    <div class="section">
      <h3 class="section-title">Skills</h3>
      <div class="skills-grid">
        {{#each skills}}
        <span class="skill-tag">{{this}}</span>
        {{/each}}
      </div>
    </div>
    {{/if}}

    {{#if languages}}
    <div class="section">
      <h3 class="section-title">Languages</h3>
      <ul class="languages-list">
        {{#each languages}}
        <li><strong>{{name}}:</strong> {{level}}</li>
        {{/each}}
      </ul>
    </div>
    {{/if}}
  </div>
</div>
',
css_content = '
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; font-size: 11pt; line-height: 1.6; color: #333; }
.cv-container { max-width: 210mm; margin: 0 auto; padding: 15mm; background: white; }
.header { display: flex; gap: 20px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 3px solid #0d9488; }
.photo-section { flex-shrink: 0; }
.profile-photo { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid #0d9488; }
.photo-placeholder { width: 120px; height: 120px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #6b7280; border: 3px solid #0d9488; }
.header-info { flex: 1; }
h1 { font-size: 28pt; color: #0d9488; margin-bottom: 5px; }
h2 { font-size: 14pt; color: #666; margin-bottom: 15px; }
.contact-info p { margin: 3px 0; font-size: 10pt; }
.section { margin-bottom: 20px; page-break-inside: avoid; }
.section-title { font-size: 14pt; color: #0d9488; border-bottom: 2px solid #0d9488; padding-bottom: 5px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
.summary { text-align: justify; margin-bottom: 10px; line-height: 1.7; }
.experience-item, .education-item { margin-bottom: 15px; padding-left: 10px; border-left: 3px solid #e5e7eb; }
.item-header { font-size: 12pt; margin-bottom: 3px; }
.item-period { color: #666; font-size: 10pt; margin-bottom: 5px; font-style: italic; }
.item-description { margin: 5px 0; text-align: justify; }
.responsibilities { margin: 8px 0 0 20px; }
.responsibilities li { margin-bottom: 3px; }
.two-column { display: flex; gap: 30px; }
.two-column .section { flex: 1; }
.skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag { background: #e0f2f1; color: #0d9488; padding: 5px 12px; border-radius: 15px; font-size: 9pt; font-weight: 500; }
.languages-list { list-style: none; }
.languages-list li { margin-bottom: 5px; }
@media print { .cv-container { padding: 0; } }
'
WHERE id = 1;

-- Template 2: Clean Minimal with Sidebar
UPDATE cv_templates SET 
html_content = '
<div class="cv-container">
  <div class="sidebar">
    <div class="photo-section">
      {{#if personalInfo.photo}}
      <img src="{{personalInfo.photo}}" alt="Profile Photo" class="profile-photo">
      {{else}}
      <div class="photo-placeholder">PHOTO</div>
      {{/if}}
    </div>

    <div class="sidebar-section">
      <h3>Contact</h3>
      <p>{{personalInfo.email}}</p>
      <p>{{personalInfo.phone}}</p>
      {{#if personalInfo.location}}
      <p>{{personalInfo.location}}</p>
      {{/if}}
      {{#if personalInfo.linkedin}}
      <p>{{personalInfo.linkedin}}</p>
      {{/if}}
    </div>

    {{#if skills}}
    <div class="sidebar-section">
      <h3>Skills</h3>
      {{#each skills}}
      <div class="skill-item">{{this}}</div>
      {{/each}}
    </div>
    {{/if}}

    {{#if languages}}
    <div class="sidebar-section">
      <h3>Languages</h3>
      {{#each languages}}
      <div class="language-item">
        <strong>{{name}}</strong>
        <div class="level">{{level}}</div>
      </div>
      {{/each}}
    </div>
    {{/if}}
  </div>

  <div class="main-content">
    <div class="header">
      <h1>{{personalInfo.name}}</h1>
      <h2>{{personalInfo.title}}</h2>
    </div>

    {{#if personalInfo.summary}}
    <div class="section">
      <h3 class="section-title">About Me</h3>
      <p class="summary">{{personalInfo.summary}}</p>
    </div>
    {{/if}}

    {{#if experience}}
    <div class="section">
      <h3 class="section-title">Experience</h3>
      {{#each experience}}
      <div class="experience-item">
        <h4>{{position}}</h4>
        <div class="company">{{company}} | {{period}}</div>
        {{#if description}}
        <p>{{description}}</p>
        {{/if}}
        {{#if responsibilities}}
        <ul>
          {{#each responsibilities}}
          <li>{{this}}</li>
          {{/each}}
        </ul>
        {{/if}}
      </div>
      {{/each}}
    </div>
    {{/if}}

    {{#if education}}
    <div class="section">
      <h3 class="section-title">Education</h3>
      {{#each education}}
      <div class="education-item">
        <h4>{{degree}}</h4>
        <div class="institution">{{institution}} | {{year}}</div>
        {{#if details}}
        <p>{{details}}</p>
        {{/if}}
      </div>
      {{/each}}
    </div>
    {{/if}}
  </div>
</div>
',
css_content = '
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Arial", sans-serif; font-size: 11pt; line-height: 1.6; color: #333; }
.cv-container { display: flex; max-width: 210mm; margin: 0 auto; background: white; min-height: 297mm; }
.sidebar { width: 70mm; background: #2d3748; color: white; padding: 25px 20px; }
.photo-section { text-align: center; margin-bottom: 25px; }
.profile-photo { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; border: 4px solid #0d9488; }
.photo-placeholder { width: 100px; height: 100px; border-radius: 50%; background: #4a5568; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 4px solid #0d9488; margin: 0 auto; }
.sidebar-section { margin-bottom: 25px; }
.sidebar-section h3 { color: #0d9488; font-size: 12pt; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0d9488; padding-bottom: 5px; }
.sidebar-section p { font-size: 9.5pt; margin-bottom: 5px; word-break: break-word; }
.skill-item { background: #4a5568; padding: 6px 10px; margin-bottom: 6px; border-radius: 4px; font-size: 9.5pt; }
.language-item { margin-bottom: 10px; }
.language-item strong { color: #0d9488; display: block; }
.level { font-size: 9pt; margin-top: 2px; }
.main-content { flex: 1; padding: 25px 30px; }
.header { margin-bottom: 25px; }
h1 { font-size: 32pt; color: #0d9488; margin-bottom: 5px; }
h2 { font-size: 16pt; color: #666; font-weight: normal; }
.section { margin-bottom: 25px; page-break-inside: avoid; }
.section-title { font-size: 14pt; color: #2d3748; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #0d9488; padding-bottom: 5px; }
.summary { text-align: justify; line-height: 1.7; }
.experience-item, .education-item { margin-bottom: 18px; }
h4 { font-size: 12pt; color: #0d9488; margin-bottom: 3px; }
.company, .institution { color: #666; font-size: 10pt; margin-bottom: 8px; font-style: italic; }
.experience-item p, .education-item p { margin: 8px 0; text-align: justify; }
.experience-item ul { margin: 8px 0 0 20px; }
.experience-item li { margin-bottom: 4px; }
@media print { .cv-container { min-height: auto; } }
'
WHERE id = 2;

-- Template 3: Executive Professional
UPDATE cv_templates SET 
html_content = '
<div class="cv-container">
  <div class="header-banner">
    <div class="header-content">
      <div class="photo-wrapper">
        {{#if personalInfo.photo}}
        <img src="{{personalInfo.photo}}" alt="Profile Photo" class="profile-photo">
        {{else}}
        <div class="photo-placeholder">PHOTO</div>
        {{/if}}
      </div>
      <div class="header-text">
        <h1>{{personalInfo.name}}</h1>
        <h2>{{personalInfo.title}}</h2>
        <div class="contact-bar">
          <span>{{personalInfo.email}}</span>
          <span>{{personalInfo.phone}}</span>
          {{#if personalInfo.location}}
          <span>{{personalInfo.location}}</span>
          {{/if}}
        </div>
      </div>
    </div>
  </div>

  <div class="content-wrapper">
    {{#if personalInfo.summary}}
    <div class="section highlight-section">
      <h3 class="section-title"><span class="title-icon">📋</span> Executive Summary</h3>
      <p class="summary">{{personalInfo.summary}}</p>
    </div>
    {{/if}}

    {{#if experience}}
    <div class="section">
      <h3 class="section-title"><span class="title-icon">💼</span> Professional Experience</h3>
      {{#each experience}}
      <div class="timeline-item">
        <div class="timeline-marker"></div>
        <div class="timeline-content">
          <div class="item-header">
            <div>
              <h4>{{position}}</h4>
              <div class="company-name">{{company}}</div>
            </div>
            <div class="period-badge">{{period}}</div>
          </div>
          {{#if description}}
          <p class="description">{{description}}</p>
          {{/if}}
          {{#if responsibilities}}
          <ul class="achievements">
            {{#each responsibilities}}
            <li>{{this}}</li>
            {{/each}}
          </ul>
          {{/if}}
        </div>
      </div>
      {{/each}}
    </div>
    {{/if}}

    {{#if education}}
    <div class="section">
      <h3 class="section-title"><span class="title-icon">🎓</span> Education</h3>
      {{#each education}}
      <div class="education-item">
        <div class="edu-header">
          <div>
            <h4>{{degree}}</h4>
            <div class="institution-name">{{institution}}</div>
          </div>
          <div class="year-badge">{{year}}</div>
        </div>
        {{#if details}}
        <p class="details">{{details}}</p>
        {{/if}}
      </div>
      {{/each}}
    </div>
    {{/if}}

    <div class="bottom-sections">
      {{#if skills}}
      <div class="section skills-section">
        <h3 class="section-title"><span class="title-icon">⚡</span> Core Competencies</h3>
        <div class="skills-columns">
          {{#each skills}}
          <div class="skill-chip">{{this}}</div>
          {{/each}}
        </div>
      </div>
      {{/if}}

      {{#if languages}}
      <div class="section languages-section">
        <h3 class="section-title"><span class="title-icon">🌐</span> Languages</h3>
        {{#each languages}}
        <div class="language-bar">
          <span class="lang-name">{{name}}</span>
          <span class="lang-level">{{level}}</span>
        </div>
        {{/each}}
      </div>
      {{/if}}
    </div>
  </div>
</div>
',
css_content = '
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Calibri", "Helvetica Neue", Arial, sans-serif; font-size: 11pt; line-height: 1.6; color: #2c3e50; }
.cv-container { max-width: 210mm; margin: 0 auto; background: white; }
.header-banner { background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); color: white; padding: 25px 30px; }
.header-content { display: flex; align-items: center; gap: 25px; }
.photo-wrapper { flex-shrink: 0; }
.profile-photo { width: 110px; height: 110px; border-radius: 10px; object-fit: cover; border: 4px solid rgba(255,255,255,0.9); box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
.photo-placeholder { width: 110px; height: 110px; border-radius: 10px; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-weight: bold; border: 4px solid rgba(255,255,255,0.9); }
.header-text { flex: 1; }
h1 { font-size: 30pt; margin-bottom: 5px; font-weight: 700; letter-spacing: -0.5px; }
h2 { font-size: 16pt; margin-bottom: 12px; font-weight: 400; opacity: 0.95; }
.contact-bar { display: flex; flex-wrap: wrap; gap: 15px; font-size: 10pt; }
.contact-bar span::before { content: "• "; margin-right: 5px; }
.contact-bar span:first-child::before { content: ""; margin: 0; }
.content-wrapper { padding: 25px 30px; }
.section { margin-bottom: 25px; page-break-inside: avoid; }
.section-title { font-size: 14pt; color: #0d9488; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 700; }
.title-icon { font-size: 16pt; }
.highlight-section { background: #f0fdfa; padding: 15px; border-left: 4px solid #0d9488; border-radius: 4px; }
.summary { text-align: justify; line-height: 1.7; font-size: 10.5pt; }
.timeline-item { position: relative; padding-left: 25px; margin-bottom: 20px; }
.timeline-marker { position: absolute; left: 0; top: 5px; width: 12px; height: 12px; background: #0d9488; border-radius: 50%; border: 3px solid #e0f2f1; }
.timeline-item::before { content: ""; position: absolute; left: 5px; top: 17px; width: 2px; height: calc(100% - 12px); background: #e0f2f1; }
.timeline-item:last-child::before { display: none; }
.timeline-content { background: #f8fafc; padding: 15px; border-radius: 6px; }
.item-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
h4 { font-size: 12pt; color: #0d9488; margin-bottom: 3px; }
.company-name { color: #64748b; font-size: 10pt; font-weight: 600; }
.period-badge { background: #0d9488; color: white; padding: 4px 12px; border-radius: 12px; font-size: 9pt; font-weight: 600; white-space: nowrap; }
.description { margin: 10px 0; text-align: justify; font-size: 10pt; color: #475569; }
.achievements { margin: 10px 0 0 20px; }
.achievements li { margin-bottom: 5px; color: #475569; }
.education-item { margin-bottom: 15px; background: #f8fafc; padding: 15px; border-radius: 6px; border-left: 4px solid #0d9488; }
.edu-header { display: flex; justify-content: space-between; align-items: flex-start; }
.institution-name { color: #64748b; font-size: 10pt; margin-top: 2px; }
.year-badge { background: #e0f2f1; color: #0d9488; padding: 4px 12px; border-radius: 12px; font-size: 9pt; font-weight: 600; }
.details { margin-top: 8px; font-size: 10pt; color: #475569; }
.bottom-sections { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.skills-columns { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 8px; }
.skill-chip { background: #e0f2f1; color: #0d9488; padding: 8px 14px; border-radius: 6px; font-size: 9.5pt; font-weight: 600; text-align: center; border: 1px solid #99f6e4; }
.language-bar { display: flex; justify-content: space-between; background: #f8fafc; padding: 10px 12px; margin-bottom: 8px; border-radius: 6px; border-left: 3px solid #0d9488; }
.lang-name { font-weight: 600; color: #0d9488; }
.lang-level { font-size: 9.5pt; color: #64748b; }
@media print { .cv-container { max-width: 100%; } }
'
WHERE id = 3;
