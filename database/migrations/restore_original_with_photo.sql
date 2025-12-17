-- Restore original template design with photo support

UPDATE cv_templates
SET
  name = 'Professional Modern',
  description = 'Clean and modern design suitable for corporate positions',
  html_content = '<!DOCTYPE html>
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
          {{#if email}}<span>{{email}}</span>{{/if}}
          {{#if phone}}{{#if email}} | {{/if}}<span>{{phone}}</span>{{/if}}
          {{#if location}}{{#if phone}} | {{else}}{{#if email}} | {{/if}}{{/if}}<span>{{location}}</span>{{/if}}
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
        <div class="item-meta">{{startDate}} - {{endDate}}{{#if location}} | {{location}}{{/if}}</div>
        {{#if description}}
        <p>{{description}}</p>
        {{/if}}
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
        <div class="item-meta">{{graduationDate}}{{#if location}} | {{location}}{{/if}}</div>
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
  css_content = 'body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
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
.skill-tag { background: #0d9488; color: white; padding: 5px 12px; border-radius: 15px; font-size: 14px; }'
WHERE id = 1;
