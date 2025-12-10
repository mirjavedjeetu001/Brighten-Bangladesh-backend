# Brighten Bangladesh - Backend API

Backend REST API for the Brighten Bangladesh platform built with NestJS, TypeORM, and MySQL.

## Features

- 🔐 JWT Authentication with role-based access control (RBAC)
- 👥 User management with multiple roles (Admin, Content Manager, Editor, Member, Volunteer)
- 📝 Blog management with approval workflow
- 📚 Magazine management
- 🎫 Membership eligibility system with automated rule checking
- 📤 File upload support
- 📊 Activity tracking for membership criteria
- 📖 Swagger API documentation
- 🐳 Docker support for development
- ✅ Unit tests for core business logic

## Tech Stack

- **Framework**: NestJS 10
- **Database**: MySQL 8.0
- **ORM**: TypeORM
- **Authentication**: JWT with Passport
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Containerization**: Docker & Docker Compose

## Prerequisites

- Node.js 18+ 
- MySQL 8.0
- npm or yarn
- Docker & Docker Compose (optional, for containerized setup)

## Project Structure

```
bb-backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── app.config.ts
│   │   └── typeorm.config.ts
│   ├── common/              # Shared resources
│   │   ├── decorators/      # Custom decorators
│   │   ├── dto/             # Common DTOs
│   │   ├── filters/         # Exception filters
│   │   ├── guards/          # Auth guards
│   │   └── interceptors/    # Interceptors
│   ├── modules/             # Feature modules
│   │   ├── auth/            # Authentication
│   │   ├── users/           # User management
│   │   ├── blogs/           # Blog management
│   │   ├── magazines/       # Magazine management
│   │   ├── memberships/     # Membership & eligibility
│   │   └── uploads/         # File uploads
│   ├── app.module.ts
│   └── main.ts
├── database/
│   ├── schema/              # SQL schema files
│   └── production_import.sql
├── uploads/                 # Uploaded files directory
├── docker-compose.dev.yml
├── Dockerfile
└── package.json
```

## Installation & Setup

### Option 1: Local Development (Without Docker)

1. **Clone and install dependencies:**
   ```bash
   cd bb-backend
   npm install
   ```

2. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=dev
   DB_PASSWORD=devpass
   DB_DATABASE=brighten_bd_dev
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRATION=7d
   PORT=3000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

3. **Setup MySQL database:**
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE brighten_bd_dev;
   exit;

   # Import schema
   mysql -u root -p brighten_bd_dev < database/schema/brighten_bd_schema.sql

   # Import seed data (optional, for development)
   mysql -u root -p brighten_bd_dev < database/schema/brighten_bd_seed.sql
   ```

4. **Start the application:**
   ```bash
   npm run start:dev
   ```

   The API will be available at: `http://localhost:3000`
   Swagger docs at: `http://localhost:3000/api/docs`

### Option 2: Docker Development Setup

1. **Start all services:**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **Import database schema:**
   ```bash
   # Wait for MySQL to be ready, then:
   docker-compose -f docker-compose.dev.yml exec db mysql -u dev -pdevpass brighten_bd_dev < database/schema/brighten_bd_schema.sql
   docker-compose -f docker-compose.dev.yml exec db mysql -u dev -pdevpass brighten_bd_dev < database/schema/brighten_bd_seed.sql
   ```

3. **View logs:**
   ```bash
   docker-compose -f docker-compose.dev.yml logs -f app
   ```

4. **Stop services:**
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID (Admin only)
- `PUT /api/users/:id/role` - Update user role (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Blogs
- `GET /api/blogs` - List all blogs (with pagination & filters)
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/:slug` - Get blog by slug
- `PUT /api/blogs/:id` - Update blog
- `POST /api/blogs/:id/submit` - Submit blog for approval
- `POST /api/blogs/:id/approve` - Approve blog (Editor/Admin)
- `POST /api/blogs/:id/publish` - Publish blog (Editor/Admin)
- `DELETE /api/blogs/:id` - Delete blog

### Magazines
- `GET /api/magazines` - List all magazines
- `POST /api/magazines` - Create magazine (Admin only)
- `GET /api/magazines/:id` - Get magazine by ID
- `PUT /api/magazines/:id` - Update magazine (Admin only)
- `DELETE /api/magazines/:id` - Delete magazine (Admin only)

### Memberships
- `GET /api/memberships/me` - Get current user membership status
- `POST /api/memberships/check` - Check eligibility for current user
- `POST /api/memberships/apply` - Apply for membership
- `GET /api/memberships/activities/me` - Get current user activities
- `GET /api/memberships` - Get all memberships (Admin only)
- `POST /api/memberships/user/:userId/check` - Check user eligibility (Admin only)
- `POST /api/memberships/activities` - Create activity (Admin only)

### Uploads
- `POST /api/uploads` - Upload file (images/PDFs)

## Membership Eligibility Rules

A user is eligible for membership if they meet ALL of the following criteria:

1. **Blogs**: At least 4-5 approved blogs in the last 30 days
2. **Events**: At least 1 event participation in the last 90 days
3. **Projects**: At least 1 project participation in the last 180 days

The `/api/memberships/check` endpoint returns detailed information about which rules are met.

## User Roles

- **Admin**: Full system access
- **Content Manager**: Manage users, blogs, magazines
- **Editor**: Approve/publish blogs
- **Member**: Create blogs, view content
- **Volunteer**: Basic access, create blogs

## Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Production Deployment

### Database Setup

1. **Create production database:**
   ```bash
   mysql -u produser -p
   CREATE DATABASE brighten_bd_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   exit;
   ```

2. **Import production schema:**
   ```bash
   mysql -u produser -p brighten_bd_prod < database/production_import.sql
   ```

3. **IMPORTANT**: Change the default admin password after first login!

### Application Deployment

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Set production environment variables:**
   ```env
   NODE_ENV=production
   DB_HOST=your-prod-db-host
   DB_PORT=3306
   DB_USERNAME=produser
   DB_PASSWORD=strong-production-password
   DB_DATABASE=brighten_bd_prod
   JWT_SECRET=very-strong-secret-key-min-32-chars
   JWT_EXPIRATION=7d
   PORT=3000
   FRONTEND_URL=https://your-domain.com
   ```

3. **Start the application:**
   ```bash
   npm run start:prod
   ```

### Docker Production

```bash
docker build -t brighten-bangladesh-api .
docker run -d -p 3000:3000 --env-file .env.production brighten-bangladesh-api
```

## Development Seed Data

The seed file includes test accounts (password: `password123` for all):

- `admin@brightenbangladesh.org` - Admin
- `content@brightenbangladesh.org` - Content Manager
- `editor@brightenbangladesh.org` - Editor  
- `sarah@example.com` - Member
- `michael@example.com` - Member
- `lisa@example.com` - Volunteer

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `DB_USERNAME` | Database user | dev |
| `DB_PASSWORD` | Database password | devpass |
| `DB_DATABASE` | Database name | brighten_bd_dev |
| `JWT_SECRET` | JWT secret key | (required) |
| `JWT_EXPIRATION` | Token expiration | 7d |
| `PORT` | Application port | 3000 |
| `NODE_ENV` | Environment | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `BCRYPT_SALT_ROUNDS` | Bcrypt salt rounds | 10 |
| `UPLOAD_DIR` | Upload directory | ./uploads |
| `MAX_FILE_SIZE` | Max file size in bytes | 5242880 (5MB) |

## API Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:3000/api/docs`

The Swagger documentation provides:
- Complete API endpoint listings
- Request/response schemas
- Authentication flows
- Try-it-out functionality

## Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
mysql -u dev -p

# Verify database exists
SHOW DATABASES;

# Check user permissions
SHOW GRANTS FOR 'dev'@'localhost';
```

### Port Already in Use
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Docker Issues
```bash
# Remove all containers and volumes
docker-compose -f docker-compose.dev.yml down -v

# Rebuild containers
docker-compose -f docker-compose.dev.yml up --build
```

## Scripts

- `npm run build` - Build the application
- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with watch
- `npm run start:prod` - Start in production mode
- `npm run lint` - Lint the code
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:cov` - Run tests with coverage

## Contributing

1. Follow the existing code structure and naming conventions
2. Write unit tests for new features
3. Update API documentation for new endpoints
4. Use proper TypeScript types
5. Follow the NestJS best practices

## License

MIT

## Support

For issues and questions, please contact: support@brightenbangladesh.org
