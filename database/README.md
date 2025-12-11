# Database Setup Guide

This folder contains database files for the Brighten Bangladesh project.

---

## 🚀 Quick Start - Production Deployment

**For cPanel deployment (NO SSH):**

1. **Use this file for production:**
   - `COMPLETE_PRODUCTION_DATABASE.sql` ✅
   - This is the ONLY file you need to import!
   - Contains all tables, structure, and initial data

2. **Import via phpMyAdmin:**
   - Login to cPanel → phpMyAdmin
   - Select your database
   - Click "Import" → Choose file
   - Import `COMPLETE_PRODUCTION_DATABASE.sql`
   - Done! ✅

3. **Default Admin Login:**
   - Email: `admin@brightenbangladesh.org`
   - Password: `Admin@12345`
   - ⚠️ **CHANGE IMMEDIATELY AFTER LOGIN!**

---

## 📁 Files in This Folder

### Production Files

- **`COMPLETE_PRODUCTION_DATABASE.sql`** ⭐ **USE THIS**
  - Complete database with all tables and initial data
  - Ready for production import
  - Includes: schema + CMS tables + default admin user

- **`production_import.sql`** ❌ DEPRECATED
  - Old incomplete version
  - DO NOT USE - Use COMPLETE version instead

### Development Files

- **`schema/`** - Individual table schemas
  - `brighten_bd_schema.sql` - Core tables
  - `cms_tables.sql` - CMS/dynamic content tables
  - `brighten_bd_seed.sql` - Sample data for development
  - `cms_seed.sql` - CMS sample data

- **`migrations/`** - Schema updates and changes
  - Used during development for incremental updates
  - Not needed for fresh production install

---

## 📚 Detailed Guides

For step-by-step instructions, see:

1. **`CPANEL_DEPLOYMENT_GUIDE.md`** (in project root)
   - Complete manual deployment guide
   - Perfect for first-time cPanel users
   - Covers database, backend, and frontend

2. **`QUICK_REFERENCE.md`** (in project root)
   - Quick commands and checklist
   - Common issues and solutions
   - File structure reference

3. **`DATABASE_TROUBLESHOOTING.md`** (in project root)
   - Database connection errors
   - Common SQL problems
   - Recovery procedures

---

## 🗃️ Database Structure Overview

The complete database includes:

### Core Tables (6)
- `users` - User accounts with full profile fields
- `blogs` - Blog posts with comments
- `blog_comments` - Comments on blog posts
- `magazines` - Magazine/publication management
- `memberships` - User membership tracking
- `user_activities` - Activity log

### CMS Tables (17)
- `events` - Event management
- `event_registrations` - Event sign-ups
- `projects` - Project/program tracking
- `about_page` - Dynamic about page content
- `system_settings` - Site configuration
- `hero_sliders` - Homepage carousel
- `pages` - Dynamic pages
- `focus_areas` - Service areas
- `statistics` - Impact counters
- `testimonials` - User testimonials
- `team_members` - Team directory
- `settings` - Key-value settings
- `menus` - Dynamic navigation
- `media` - Media library
- `contact_submissions` - Contact form entries
- `permissions` - Permission system
- `role_permissions` - Role-based access
- `activity_logs` - Audit trail

**Total: 23+ tables**

---

## Migration Files

### 1. set-super-admin.sql
Sets the super admin user:
- Updates user ID 1 to super_admin role
- Grants full administrative access

### 2. create_settings_table.sql
Creates the `settings` table:
- Site-wide configuration storage
- Blog limits, membership requirements
- Single row configuration pattern

### 3. create_blog_comments_table.sql
Creates the `blog_comments` table with proper foreign key relationships.
- Fixed user_id type from int to bigint to match users.id

### 4. create_events_projects_about.sql
Creates three main tables:
- `events`: Event management with registration support
- `projects`: Project tracking with status and budget
- `about_page`: Dynamic about page content

### 5. update_events_table.sql
Updates the events table schema:
- Replaces `description` with `short_description` and `full_description`
- Changes `featured_image` to `image_url`
- Adds `organizer`, `is_featured`, `is_active`, `display_order`
- Removes `end_date`, `current_participants`, `status`, `is_published`, `created_by`

### 6. update_projects_table.sql
Updates the projects table schema:
- Changes `featured_image` to `image_url`
- Adds `category`, `location`, `beneficiaries`, `is_featured`, `is_active`, `display_order`
- Updates status enum to: 'planning', 'ongoing', 'completed'
- Removes `gallery`, `funds_raised`, `is_published`, `created_by`

### 7. create_event_registrations_table.sql
Creates the `event_registrations` table:
- Tracks user registrations for events
- Status: pending, approved, rejected, cancelled
- Enforces unique constraint per user per event
- Automatic approval by default

### 8. add_user_profile_fields.sql
Adds comprehensive profile fields to the `users` table:
- mobile_number, division, district, nid
- education_status, designation, highest_education, education_major
- area_of_interest, reason_to_join
- All fields nullable with appropriate VARCHAR/TEXT types

### 9. update_profile_photo_column.sql
Updates the `profile_photo` column:
- Changes from VARCHAR(255) to LONGTEXT
- Supports base64 encoded profile pictures
- Allows storing compressed images up to several MB

## Running Migrations

Execute migrations using MySQL command:

```bash
sudo mysql < database/migrations/[migration-file].sql
```

Or run all migrations in order:

```bash
cd database/migrations
for file in *.sql; do
  echo "Running $file..."
  sudo mysql < "$file"
done
```

## Database Schema

### Key Tables
- `users`: User accounts and authentication
- `blogs`: Blog posts and articles
- `blog_comments`: Comments on blog posts
- `events`: Community events
- `event_registrations`: Event participant tracking
- `projects`: Organization projects
- `focus_areas`: Focus areas/causes
- `hero_sliders`: Homepage carousel
- `statistics`: Homepage statistics
- `settings`: Site configuration
- `contact_submissions`: Contact form submissions
- `about_page`: About page content

## Notes

- All foreign key constraints use CASCADE on delete
- Timestamps use CURRENT_TIMESTAMP with auto-update
- Character set: utf8mb4 with utf8mb4_unicode_ci collation
- All migrations are idempotent (safe to run multiple times where possible)
