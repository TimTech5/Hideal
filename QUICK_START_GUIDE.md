# HiDeal - Quick Start Development Guide

## Project Setup in 30 Minutes

### Prerequisites
- Node.js 16+ and npm/yarn
- PostgreSQL 12+
- Git
- VS Code (recommended)

---

## Backend Setup

### 1. Initialize Backend Project
```bash
cd HiDeal
mkdir backend && cd backend
npm init -y
npm install express cors dotenv pg sequelize sequelize-cli bcryptjs jsonwebtoken joi winston axios socket.io
npm install -D nodemon jest supertest
```

### 2. Create .env File
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hideal
DB_USER=postgres
DB_PASSWORD=yourpassword
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
PORT=5000
```

### 3. Initialize Sequelize
```bash
npx sequelize-cli init
npx sequelize-cli db:create
```

### 4. Create Basic Folder Structure
```bash
mkdir -p src/{config,models,routes,controllers,services,middleware,utils}
mkdir -p database/migrations
mkdir tests
```

### 5. Start Backend Server
```bash
npm run dev  # Uses nodemon
```

---

## Frontend Setup

### 1. Create React App
```bash
cd ../
npx create-react-app frontend
cd frontend
```

### 2. Install Dependencies
```bash
npm install axios react-router-dom recharts tailwindcss
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Create Basic Folder Structure
```bash
mkdir -p src/{components,pages,services,hooks,context,styles}
```

### 4. Start Frontend Dev Server
```bash
npm start
```

---

## Mobile Setup (React Native - Optional)

### 1. Create React Native Project
```bash
cd ../
npx react-native init mobile
cd mobile
```

### 2. Install Navigation & Dependencies
```bash
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install axios react-native-geolocation
```

### 3. Start Metro Bundler
```bash
npm start
```

---

## Database Quick Reference

### Essential SQL Commands for Initial Setup

```sql
-- Create database
CREATE DATABASE hideal;

-- Connect to database
\c hideal;

-- Create users table (base for all roles)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'CONSUMER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create consumers table
CREATE TABLE consumers (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20),
  age_group VARCHAR(50),
  gender VARCHAR(50),
  consent_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_consumers_email ON consumers(email);
CREATE INDEX idx_consumers_age_group ON consumers(age_group);
```

---

## Key Files to Create First

### 1. Backend: src/app.js
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/consumers', require('./routes/consumers'));
app.use('/api/questionnaires', require('./routes/questionnaires'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
```

### 2. Backend: server.js
```javascript
const app = require('./src/app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`HiDeal API running on port ${PORT}`);
});
```

### 3. Frontend: src/App.js (Basic Template)
```javascript
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
```

---

## Running the Full Stack

### Terminal 1: Backend
```bash
cd backend
npm run dev
```

### Terminal 2: Frontend
```bash
cd frontend
npm start
```

### Terminal 3: Database (if needed)
```bash
psql -U postgres
# Then create database and tables as shown above
```

---

## API Testing with cURL

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Consumer Creation (once implemented)
```bash
curl -X POST http://localhost:5000/api/consumers \
  -H "Content-Type: application/json" \
  -d '{"first_name":"John","last_name":"Doe","age_group":"25-34"}'
```

---

## Development Workflow Checklist

- [ ] Clone/Initialize repository
- [ ] Install Node.js and PostgreSQL
- [ ] Set up backend with Express
- [ ] Create database and tables
- [ ] Implement authentication (JWT)
- [ ] Set up React frontend
- [ ] Create core API endpoints
- [ ] Build authentication UI (Login/Register)
- [ ] Implement consumer management
- [ ] Build questionnaire engine
- [ ] Add analytics dashboard
- [ ] Create mobile interface
- [ ] Write tests
- [ ] Documentation
- [ ] Deployment setup

---

## Useful VS Code Extensions

- Thunder Client (API testing)
- PostgreSQL (database management)
- REST Client (API requests)
- ES7+ React/Redux/React-Native
- Tailwind CSS IntelliSense
- Prettier (code formatter)
- ESLint (code linter)

---

## Common Commands Reference

### Backend
```bash
npm run dev          # Start development server
npm test             # Run tests
npm run lint         # Lint code
npm run format       # Format code
npm run db:migrate   # Run migrations
```

### Frontend
```bash
npm start            # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run eject        # Eject from CRA (careful!)
```

---

## Next Steps

1. **Follow HIDEAL_PROJECT_PROMPT.md** for detailed requirements
2. **Read docs/SETUP_INSTRUCTIONS.md** for detailed setup
3. **Review docs/API_DOCUMENTATION.md** for API specifications
4. **Check docs/DATABASE_SCHEMA.md** for database details

Good luck! 🚀
