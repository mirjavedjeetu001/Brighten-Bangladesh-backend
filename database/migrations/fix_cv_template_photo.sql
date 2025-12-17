-- Fix CV Template to include photo support

UPDATE cv_templates
SET
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
      <div class="name-title">
        <h1>{{personalInfo.fullName}}</h1>
        <p class="headline">{{personalInfo.headline}}</p>
      </div>
    </div>
    <div class="contact">
      {{#if personalInfo.email}}<p><strong>Email:</strong> {{personalInfo.email}}</p>{{/if}}
      {{#if personalInfo.phone}}<p><strong>Phone:</strong> {{personalInfo.phone}}</p>{{/if}}
      {{#if personalInfo.address}}<p><strong>Location:</strong> {{personalInfo.address}}</p>{{/if}}
      {{#if personalInfo.linkedin}}<p><strong>LinkedIn:</strong> {{personalInfo.linkedin}}</p>{{/if}}
      {{#if personalInfo.website}}<p><strong>Website:</strong> {{personalInfo.website}}</p>{{/if}}
    </div>
  </div>

  {{#if personalInfo.summary}}
  <section>
    <h2>Professional Summary</h2>
    <p>{{personalInfo.summary}}</p>
  </section>
  {{/if}}

  {{#if experience.length}}
  <section>
    <h2>Experience</h2>
    {{#each experience}}
    <div class="item">
      <div class="item-header">
        <h3>{{title}}</h3>
        <span>{{company}} | {{formatDate startDate}} - {{formatDate endDate}}</span>
      </div>
      {{#if location}}<p class="meta">{{location}}</p>{{/if}}
      {{#if description}}<p>{{description}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if education.length}}
  <section>
    <h2>Education</h2>
    {{#each education}}
    <div class="item">
      <div class="item-header">
        <h3>{{degree}}</h3>
        <span>{{institution}} | {{formatDate startDate}} - {{formatDate endDate}}</span>
      </div>
      {{#if description}}<p>{{description}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if skills.length}}
  <section>
    <h2>Skills</h2>
    <div class="skills-grid">
      {{#each skills}}
      <span class="tag">{{this}}</span>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{#if languages.length}}
  <section>
    <h2>Languages</h2>
    <div class="tag-list">
      {{#each languages}}
      <span class="tag">{{this}}</span>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{#if certifications.length}}
  <section>
    <h2>Certifications</h2>
    {{#each certifications}}
    <div class="item">
      <div class="item-header">
        <h3>{{name}}</h3>
        <span>{{issuer}}</span>
      </div>
      {{#if date}}<p class="meta">{{formatDate date}}</p>{{/if}}
      {{#if description}}<p>{{description}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if projects.length}}
  <section>
    <h2>Projects</h2>
    {{#each projects}}
    <div class="item">
      <div class="item-header">
        <h3>{{name}}</h3>
        {{#if link}}<span>{{link}}</span>{{/if}}
      </div>
      {{#if description}}<p>{{description}}</p>{{/if}}
      {{#if technologies.length}}
      <p class="meta">Technologies: {{join technologies ", "}}</p>
      {{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if publications.length}}
  <section>
    <h2>Publications</h2>
    {{#each publications}}
    <div class="item">
      <div class="item-header">
        <h3>{{title}}</h3>
        <span>{{publisher}}</span>
      </div>
      {{#if date}}<p class="meta">{{formatDate date}}</p>{{/if}}
      {{#if description}}<p>{{description}}</p>{{/if}}
      {{#if link}}<p class="meta">{{link}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if awards.length}}
  <section>
    <h2>Awards</h2>
    {{#each awards}}
    <div class="item">
      <div class="item-header">
        <h3>{{title}}</h3>
        <span>{{issuer}}</span>
      </div>
      {{#if date}}<p class="meta">{{formatDate date}}</p>{{/if}}
      {{#if description}}<p>{{description}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}

  {{#if interests.length}}
  <section>
    <h2>Interests</h2>
    <div class="tag-list">
      {{#each interests}}
      <span class="tag">{{this}}</span>
      {{/each}}
    </div>
  </section>
  {{/if}}

  {{#if references.length}}
  <section>
    <h2>References</h2>
    {{#each references}}
    <div class="item">
      <div class="item-header">
        <h3>{{name}}</h3>
        <span>{{title}}</span>
      </div>
      {{#if company}}<p class="meta">{{company}}</p>{{/if}}
      {{#if email}}<p class="meta">{{email}}</p>{{/if}}
      {{#if phone}}<p class="meta">{{phone}}</p>{{/if}}
    </div>
    {{/each}}
  </section>
  {{/if}}
</div>',
  css_content = 'body {
  font-family: "Helvetica Neue", Arial, sans-serif;
  color: #0f172a;
  margin: 0;
  padding: 0;
  background: #f8fafc;
}
.cv-container {
  max-width: 960px;
  margin: 24px auto;
  background: #ffffff;
  padding: 28px;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}
.header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 2px solid #0d9488;
  margin-bottom: 20px;
}
.header-main {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}
.photo-wrap {
  width: 110px;
  height: 110px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(14, 116, 144, 0.25);
  flex-shrink: 0;
  border: 2px solid #0d9488;
  background: #e0f2fe;
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.name-title h1 {
  margin: 0 0 6px 0;
  font-size: 28px;
  color: #0f172a;
}
.name-title .headline {
  margin: 0;
  color: #0d9488;
  font-size: 16px;
  font-weight: 600;
}
.contact {
  text-align: right;
  font-size: 13px;
  color: #1f2937;
  min-width: 200px;
}
.contact p {
  margin: 2px 0;
}
section {
  margin-bottom: 18px;
}
section h2 {
  margin: 0 0 10px 0;
  color: #0f172a;
  font-size: 18px;
  border-bottom: 2px solid #0d9488;
  padding-bottom: 6px;
  letter-spacing: 0.2px;
}
.item {
  margin-bottom: 12px;
}
.item-header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: baseline;
  flex-wrap: wrap;
}
.item-header h3 {
  margin: 0;
  font-size: 16px;
  color: #0f172a;
}
.item-header span {
  font-size: 13px;
  color: #475569;
}
.meta {
  margin: 2px 0;
  font-size: 13px;
  color: #475569;
}
.skills-grid, .tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  display: inline-block;
  padding: 6px 10px;
  background: #ecfeff;
  color: #0d9488;
  border: 1px solid #99f6e4;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
}
p {
  margin: 4px 0;
  line-height: 1.5;
  color: #0f172a;
}
@media (max-width: 720px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  .contact {
    text-align: left;
  }
}'
WHERE id = 1;
