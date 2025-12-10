-- Update existing admin to super_admin
-- Run this command to set your main admin as super_admin

UPDATE users 
SET role = 'super_admin' 
WHERE email = 'admin@brightenbangladesh.org';

-- Verify the change
SELECT id, name, email, role, is_approved FROM users WHERE role IN ('super_admin', 'admin');
