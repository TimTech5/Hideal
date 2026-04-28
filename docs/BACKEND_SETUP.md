# Backend Setup Instructions

## Prerequisites
- Node.js 16+ installed
- PostgreSQL 12+ installed
- npm or yarn package manager

## Installation Steps

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create Database
```bash
createdb hideal_dev
# or through PostgreSQL GUI
```

### 4. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 5. Run Database Migrations
```bash
npm run db:migrate
```

### 6. Start Backend Server
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Available Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh-token` - Refresh access token
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Consumers
- `GET /api/consumers` - Get all consumers (paginated)
- `POST /api/consumers` - Create new consumer
- `GET /api/consumers/:id` - Get consumer by ID
- `PUT /api/consumers/:id` - Update consumer
- `DELETE /api/consumers/:id` - Delete consumer
- `POST /api/consumers/:id/preferences` - Add consumer preference
- `GET /api/consumers/:id/preferences` - Get consumer preferences

### Health Check
- `GET /api/health` - Check API health
- `GET /api` - API documentation

## Testing API

### Using cURL

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!",
    "fullName": "John Doe",
    "role": "CONSUMER"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123!"
  }'
```

#### Get Consumers
```bash
curl -X GET http://localhost:5000/api/consumers?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Create Consumer
```bash
curl -X POST http://localhost:5000/api/consumers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "ageGroup": "25-34",
    "gender": "M"
  }'
```

## Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Check DB credentials in .env
- Verify database exists with `\l` in psql

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Development Commands

```bash
npm run dev       # Start with auto-reload
npm run test      # Run tests
npm test:watch    # Run tests in watch mode
npm run lint      # Check code quality
npm run format    # Format code with Prettier
npm run db:migrate:undo  # Undo last migration
```

## Production Deployment

See [HIDEAL_PROJECT_PROMPT.md](../HIDEAL_PROJECT_PROMPT.md) Section 10 for complete deployment instructions.

---

For more information, see the main documentation at the project root.
