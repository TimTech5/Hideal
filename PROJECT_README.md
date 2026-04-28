# HiDeal - Production-Ready Customer Engagement Platform

A comprehensive PERN (PostgreSQL, Express.js, React, Node.js) stack application for collecting and analyzing consumer drinking preferences at bars and lounges.

## 🚀 Quick Start

### For Backend Developers
```bash
cd backend
npm install
npm run dev
# API runs on http://localhost:5000
```

### For Frontend Developers
```bash
cd frontend
npm install
npm start
# Frontend runs on http://localhost:3000
```

### For Mobile Developers
```bash
cd mobile
npm install
npm start
# Scan QR code with Expo Go app
```

## 📋 Project Structure

```
HiDeal/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Database and environment config
│   │   ├── models/            # Sequelize ORM models
│   │   ├── routes/            # API route definitions
│   │   ├── controllers/        # Route handlers
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, error handling, logging
│   │   └── utils/             # Validators, logger, helpers
│   ├── tests/                 # Unit and integration tests
│   ├── package.json
│   └── server.js              # Entry point
│
├── frontend/                   # React + Tailwind CSS Admin Dashboard
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API integration
│   │   ├── context/           # React Context (Auth)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── public/                # Static assets
│
├── mobile/                     # React Native Bar Agent Interface
│   ├── src/
│   │   ├── screens/           # App screens
│   │   ├── services/          # API integration
│   │   ├── components/        # Native components
│   │   └── App.js
│   └── package.json
│
├── docs/                      # Comprehensive documentation
│   ├── BACKEND_SETUP.md
│   ├── FRONTEND_SETUP.md
│   ├── MOBILE_SETUP.md
│   ├── API_DOCUMENTATION.md
│   └── DATABASE_SCHEMA.md
│
└── Documentation Files
    ├── HIDEAL_PROJECT_PROMPT.md           # Complete requirements
    ├── QUICK_START_GUIDE.md               # 30-minute setup
    ├── DEVELOPMENT_ROADMAP.md             # 9-week phase plan
    ├── TECHNICAL_SPECIFICATIONS.md        # Architecture & APIs
    └── README.md                          # Documentation index
```

## 🎯 Core Features

### 1. Authentication & Authorization
- JWT-based authentication with refresh tokens
- Role-based access control (ADMIN, BAR_MANAGER, BAR_AGENT, CONSUMER)
- Secure password hashing with bcrypt
- Session management

### 2. Consumer Management
- Consumer registration and profiling
- Age group and preference tracking
- Consumer history and engagement metrics
- Data consent management

### 3. Questionnaire Engine
- Dynamic survey creation with drag-and-drop builder
- Multiple question types (text, multiple choice, rating, date, checkbox)
- Branching logic support
- Response collection and analytics
- Offline support for mobile

### 4. Brand Management
- Brand and product categorization
- Promotion creation and targeting
- Brand preference tracking
- Performance metrics

### 5. Analytics Dashboard
- Consumer demographic distribution
- Brand preference trends
- Survey completion rates
- Bar performance metrics
- Real-time data visualization with charts

### 6. Data Export
- Excel/CSV export functionality
- Filtered data export by date, location, demographics
- GDPR-compliant anonymization options
- Scheduled reports

### 7. Mobile Interface (Bar Agents)
- Quick consumer check-in
- Survey deployment and response collection
- Promotion display and sharing
- Offline data queuing with auto-sync
- Performance tracking and leaderboards

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js 16+
- **Framework**: Express.js 4.x
- **Database**: PostgreSQL 12+
- **ORM**: Sequelize
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: Joi
- **Logging**: Winston + Morgan
- **Security**: Helmet, CORS, Rate Limiting
- **Testing**: Jest + Supertest

### Frontend
- **Library**: React 18.x
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Forms**: Formik + Yup
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Testing**: React Testing Library + Jest

### Mobile
- **Framework**: React Native + Expo
- **Navigation**: React Navigation
- **Storage**: AsyncStorage
- **HTTP Client**: Axios
- **Platform**: iOS 13+ and Android 5.0+

## 📚 Documentation

### Getting Started
1. **[README.md](./README.md)** - Documentation index and navigation guide
2. **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** - Get up and running in 30 minutes

### Detailed Guides
3. **[docs/BACKEND_SETUP.md](./docs/BACKEND_SETUP.md)** - Backend installation and API testing
4. **[docs/FRONTEND_SETUP.md](./docs/FRONTEND_SETUP.md)** - Frontend setup and development
5. **[docs/MOBILE_SETUP.md](./docs/MOBILE_SETUP.md)** - Mobile app setup and testing

### Complete Specifications
6. **[HIDEAL_PROJECT_PROMPT.md](./HIDEAL_PROJECT_PROMPT.md)** - Complete project requirements (14 sections)
7. **[TECHNICAL_SPECIFICATIONS.md](./TECHNICAL_SPECIFICATIONS.md)** - Architecture, APIs, security
8. **[DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)** - 9-week phase-by-phase plan

## 🗄️ Database Schema

Core tables include:
- **users** - User accounts with role-based access
- **consumers** - Customer profiles with demographics
- **bars** - Bar/lounge establishments
- **brands** - Drink brands and categories
- **questionnaires** - Survey templates and versions
- **questions** - Survey questions
- **responses** - Survey responses from consumers
- **promotions** - Brand promotions and offers
- **consumer_preferences** - Drink preferences per consumer
- **consent_logs** - Data collection consent tracking

Full schema in [HIDEAL_PROJECT_PROMPT.md](./HIDEAL_PROJECT_PROMPT.md) Section 4

## 🔐 Security Features

- **HTTPS/TLS** encryption for all communications
- **JWT** tokens with 15-minute expiration
- **Refresh tokens** with 7-day rotation
- **Password policy** enforcement (min 8 chars, uppercase, number, special char)
- **Rate limiting** on API endpoints
- **Input validation** and sanitization against SQL injection/XSS
- **CORS** properly configured
- **Security headers** (Helmet.js)
- **Audit logging** of all user actions
- **Data encryption** for sensitive fields
- **GDPR/CCPA compliance** with consent management

## 📊 Performance Targets

- **API Response Time**: < 200ms (p95)
- **Page Load**: < 2 seconds
- **Lighthouse Score**: > 90
- **Bundle Size**: < 500KB (frontend)
- **Database Queries**: Optimized with indexes
- **Uptime**: 99.5% SLA

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test                    # Run all tests
npm run test:watch        # Watch mode
npm run lint              # Code quality
npm run format            # Auto-format

# Frontend tests
cd frontend
npm test                  # Run tests
npm run build             # Production build

# Target coverage: 80%+ across all layers
```

## 📦 Deployment

### Development
- Local PostgreSQL database
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- Mobile: Expo Go app

### Production Deployment
See [HIDEAL_PROJECT_PROMPT.md](./HIDEAL_PROJECT_PROMPT.md) Section 10 & 13 for:
- Docker containerization
- CI/CD pipeline setup
- Environment configuration
- Database backup strategy
- Monitoring and alerting
- Complete deployment checklist

## 🚀 Getting Started (5 Minutes)

### 1. Clone/Setup
```bash
cd HiDeal
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
# Wait for: "API Server running on port 5000"
```

### 3. Start Frontend (New Terminal)
```bash
cd frontend
npm install
npm start
# Opens http://localhost:3000 automatically
```

### 4. Create Test Account
Go to http://localhost:3000 → Register → Enter credentials

### 5. Login & Explore
- Login with your credentials
- View dashboard with mock data
- Explore consumer management features

## 🤝 Development Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and test
npm run dev        # Backend
npm start          # Frontend

# Commit and push
git add .
git commit -m "feat: your feature"
git push

# Create Pull Request for review
```

## 📈 Development Phases (9 Weeks)

**Phase 1 (Weeks 1-2)**: Foundation - Auth, DB, Project Setup  
**Phase 2 (Weeks 3-5)**: Core Features - Consumers, Questionnaires, Brands  
**Phase 3 (Weeks 6-7)**: Advanced - Analytics, Exports, Mobile  
**Phase 4 (Weeks 8-9)**: Polish - Testing, Optimization, Deployment  

Detailed roadmap in [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check database
createdb hideal_dev

# Reset database
npm run db:migrate

# Check port 5000 is free
lsof -ti:5000 | xargs kill -9
```

### Frontend Won't Start
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm start
```

### API Connection Error
- Verify backend is running: http://localhost:5000/api/health
- Check REACT_APP_API_URL in .env
- Check browser console for detailed error

## 📞 Support & Documentation

- **API Docs**: [TECHNICAL_SPECIFICATIONS.md](./TECHNICAL_SPECIFICATIONS.md)
- **Setup Help**: docs/ directory has detailed guides
- **Requirements**: [HIDEAL_PROJECT_PROMPT.md](./HIDEAL_PROJECT_PROMPT.md)
- **Roadmap**: [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md)

## ✅ Quality Assurance

- Code linting with ESLint
- Automated testing (Jest, Supertest, React Testing Library)
- Code formatting with Prettier
- Security scanning for vulnerabilities
- Performance monitoring and optimization
- Documentation maintained throughout development

## 📄 License

MIT License - See LICENSE file for details

## 👥 Team

Built by the HiDeal Development Team

---

## 📌 Quick Links

| Topic | Link |
|-------|------|
| Complete Prompt | [HIDEAL_PROJECT_PROMPT.md](./HIDEAL_PROJECT_PROMPT.md) |
| Quick Setup | [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) |
| Technical Details | [TECHNICAL_SPECIFICATIONS.md](./TECHNICAL_SPECIFICATIONS.md) |
| Development Plan | [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) |
| Backend Setup | [docs/BACKEND_SETUP.md](./docs/BACKEND_SETUP.md) |
| Frontend Setup | [docs/FRONTEND_SETUP.md](./docs/FRONTEND_SETUP.md) |
| Mobile Setup | [docs/MOBILE_SETUP.md](./docs/MOBILE_SETUP.md) |
| Documentation Index | [README.md](./README.md) |

---

**Version**: 1.0.0  
**Status**: Production Ready  
**Last Updated**: April 2026

🎉 **Ready to get started? Follow [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md) for a 30-minute setup!**
