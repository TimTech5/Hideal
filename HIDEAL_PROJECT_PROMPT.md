# HiDeal - Customer Engagement Platform
## Comprehensive Development Prompt for Production-Ready Implementation

---

## 1. PROJECT OVERVIEW

**Project Name:** HiDeal  
**Platform Type:** Customer Engagement & Data Analytics Platform  
**Tech Stack:** PERN (PostgreSQL, Express.js, React, Node.js)  
**Target Users:** Bar/Lounge Establishments, Brand Managers, Data Analysts  
**Primary Goal:** Collect, analyze, and profile consumer drinking preferences while promoting brand partnerships

---

## 2. CORE BUSINESS OBJECTIVES

HiDeal is a comprehensive customer engagement platform designed to:

1. **Collect Consumer Data** on drink intake and preferences at bars and lounges
2. **Manage Brand Promotions** for affiliated drink brands
3. **Execute Questionnaires** to gather detailed consumer insights
4. **Build Consumer Profiles** with demographic and behavioral data (name, age group, preferred brands)
5. **Enable Data Analysis** with export capabilities to Excel
6. **Manage Consumer Consent** for data collection and privacy compliance
7. **Provide Real-time Insights** through interactive dashboards and analytics
8. **Facilitate Bar Agent Operations** through mobile-optimized interface

---

## 3. FUNCTIONAL REQUIREMENTS

### 3.1 Admin Dashboard & Management
- **User Management**: Create, update, delete admin, bar manager, and bar agent accounts
- **Brand Management**: Add/edit/delete drink brands with categorization
- **Bar/Lounge Management**: Register establishments, manage locations, assign agents
- **Questionnaire Builder**: Visual questionnaire designer with drag-and-drop interface
- **Analytics Dashboard**: Real-time charts, consumer insights, trend analysis
- **Consent Management**: Track and display consumer consent status
- **Data Export**: Export consumer data to Excel with filtered options
- **Audit Logs**: Track all system activities for compliance

### 3.2 Bar Agent Mobile Interface
- **Consumer Check-in**: Quick registration/lookup for new consumers
- **Questionnaire Deployment**: Present surveys with offline capability
- **Real-time Promotion Display**: Show brand promotions relevant to consumer
- **Consumer Interaction Tracking**: Log drinks ordered, preferences noted
- **Sync Mechanism**: Automatic data sync when offline connectivity returns
- **Performance Metrics**: Track agent's survey completion and consumer engagement rates

### 3.3 Consumer Engagement Features
- **Consumer Registration**: Simplified one-time registration at bar
- **Profile Management**: Self-service profile updates (with consent)
- **Preference Tracking**: Log drink consumption history
- **Promotional Offers**: Display personalized brand promotions
- **Survey Participation**: Interactive questionnaires with incentive tracking
- **Consent Dashboard**: View and manage data collection permissions

### 3.4 Analytics & Reporting
- **Consumer Demographics**: Age group distribution, location-based analysis
- **Brand Preference Analytics**: Trending drinks, seasonal patterns
- **Survey Response Analysis**: Statistical insights from questionnaires
- **Bar Performance Metrics**: Agent performance, survey completion rates
- **Retention Analytics**: Consumer engagement metrics, repeat visit tracking
- **Predictive Insights**: AI-assisted consumer behavior predictions
- **Custom Reports**: Build and schedule automated reports

---

## 4. DATABASE SCHEMA (PostgreSQL)

### Core Tables:

#### Users Table
```
users (id, email, password_hash, role, full_name, created_at, updated_at)
- Roles: ADMIN, BAR_MANAGER, BAR_AGENT, CONSUMER
```

#### Consumers Table
```
consumers (id, first_name, last_name, email, phone, age_group, gender, 
           location_id, registration_date, consent_status, preference_data, 
           created_at, updated_at)
```

#### Bars Table
```
bars (id, name, location, address, latitude, longitude, manager_id, 
      established_date, active_status, created_at, updated_at)
```

#### Bar Agents Table
```
bar_agents (id, user_id, bar_id, assignment_date, surveys_completed, 
            consumers_registered, performance_score, created_at, updated_at)
```

#### Brands Table
```
brands (id, name, category, description, color_code, logo_url, 
        company_id, active_status, created_at, updated_at)
- Categories: Beer, Wine, Spirits, RTD, Soft Drinks, etc.
```

#### Consumer Preferences Table
```
consumer_preferences (id, consumer_id, brand_id, frequency, last_consumed_date, 
                      preference_score, created_at, updated_at)
```

#### Questionnaires Table
```
questionnaires (id, title, description, creator_id, target_audience, 
                version, status, created_at, updated_at)
```

#### Questions Table
```
questions (id, questionnaire_id, question_text, question_type, 
           required_flag, order, created_at, updated_at)
- Question Types: TEXT, MULTIPLE_CHOICE, RATING, DATE, CHECKBOX
```

#### Responses Table
```
responses (id, questionnaire_id, consumer_id, bar_agent_id, response_data, 
           completion_date, created_at, updated_at)
```

#### Promotions Table
```
promotions (id, brand_id, title, description, discount_percentage, 
            valid_from, valid_to, target_age_group, bar_ids, 
            created_at, updated_at)
```

#### Consent Logs Table
```
consent_logs (id, consumer_id, consent_type, status, ip_address, 
              timestamp, updated_at)
- Consent Types: DATA_COLLECTION, MARKETING, PROFILING, THIRD_PARTY
```

#### Audit Logs Table
```
audit_logs (id, user_id, action, entity_type, entity_id, 
            changes_json, timestamp)
```

---

## 5. TECHNICAL ARCHITECTURE

### 5.1 Backend (Node.js + Express)

#### Core Modules:
- **Authentication Module**: JWT-based auth, role-based access control (RBAC)
- **User Management Module**: CRUD operations for all user roles
- **Consumer Management Module**: Profile management, consent handling
- **Questionnaire Engine**: Survey creation, distribution, response collection
- **Analytics Engine**: Data aggregation, reporting, insights generation
- **Brand Management Module**: Promotion management, targeting
- **Export Service**: Excel generation, data formatting
- **Mobile API**: Optimized endpoints for bar agent mobile app
- **Real-time Updates**: WebSocket support for live analytics
- **Error Handling**: Comprehensive error logging and recovery
- **Validation**: Input validation, data sanitization

#### API Endpoints (REST + JSON):
```
Authentication:
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/refresh-token
- POST /api/auth/logout

Users:
- GET/POST /api/users
- GET/PUT/DELETE /api/users/:id
- GET /api/users/role/:role

Consumers:
- GET/POST /api/consumers
- GET/PUT/DELETE /api/consumers/:id
- GET /api/consumers/search
- POST /api/consumers/:id/preferences
- GET /api/consumers/:id/history

Questionnaires:
- GET/POST /api/questionnaires
- GET/PUT/DELETE /api/questionnaires/:id
- POST /api/questionnaires/:id/publish
- GET /api/questionnaires/:id/questions
- POST /api/questionnaires/:id/questions
- POST /api/questionnaires/:id/responses
- GET /api/questionnaires/:id/analytics

Bars:
- GET/POST /api/bars
- GET/PUT/DELETE /api/bars/:id
- GET /api/bars/:id/agents
- GET /api/bars/:id/consumers

Brands & Promotions:
- GET/POST /api/brands
- GET/PUT/DELETE /api/brands/:id
- GET/POST /api/promotions
- GET/PUT/DELETE /api/promotions/:id
- GET /api/promotions/active/:consumer_id

Analytics & Reporting:
- GET /api/analytics/dashboard
- GET /api/analytics/consumer-demographics
- GET /api/analytics/brand-preferences
- GET /api/analytics/survey-insights
- GET /api/analytics/bar-performance
- GET /api/reports/export
- POST /api/reports/schedule

Consent:
- GET /api/consent/:consumer_id
- POST /api/consent/:consumer_id/update
- GET /api/audit-logs
```

### 5.2 Frontend (React)

#### Admin Dashboard
- **Home Dashboard**: Key metrics, recent activities
- **Consumer Management**: List, search, view profiles, bulk actions
- **Brand Management**: CRUD operations with logo upload
- **Bar Management**: Establishment registry, agent assignments
- **Questionnaire Builder**: Visual question designer, survey management
- **Analytics Dashboard**: Interactive charts (Chart.js/Recharts)
  - Consumer demographics (pie, bar charts)
  - Brand preferences (trend lines, heat maps)
  - Survey response analysis (histograms, distributions)
  - Bar performance metrics (leaderboards)
- **Promotions Management**: Create, target, schedule offers
- **Consent Management**: View consent status, audit trail
- **User Management**: Role-based access control
- **Export Module**: Download reports as Excel files
- **Settings & Configuration**: System preferences, API keys

#### Bar Agent Mobile Interface
- **Responsive Design**: Optimized for iPhone/Android, tablets
- **Consumer Quick-Check**: Fast consumer lookup/registration
- **Survey Deployment**: Full-screen questionnaire interface
- **Offline Mode**: Queue responses when offline, sync when online
- **Brand Promotions Widget**: Display relevant offers
- **Agent Dashboard**: Personal stats, completion rates, leaderboard
- **Barcode/QR Scanner**: Quick consumer identification (optional)
- **Push Notifications**: Real-time promotion alerts
- **Performance Tracking**: Daily/weekly metrics

#### Consumer Portal (Optional)
- **Profile Management**: View/edit personal information
- **Preference Center**: Update drink preferences
- **Reward History**: Track survey incentives
- **My Promotions**: View personalized offers

### 5.3 Database Layer
- **Connection Pooling**: Optimized PostgreSQL connections
- **ORM**: Sequelize or TypeORM for data modeling
- **Migrations**: Database versioning and rollback capability
- **Indexes**: Performance optimization on frequently queried columns
- **Backups**: Automated daily backups with retention policy

### 5.4 Security & Compliance
- **Authentication**: JWT with refresh tokens
- **Authorization**: Role-based access control (RBAC)
- **Encryption**: HTTPS/TLS for all communications, encrypted sensitive fields
- **Data Privacy**: GDPR/CCPA compliance, consent management
- **Input Validation**: Sanitization against SQL injection, XSS
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS**: Proper cross-origin configuration
- **Audit Logging**: All user actions logged
- **Password Policy**: Strong password enforcement, hashing with bcrypt

---

## 6. IMPLEMENTATION REQUIREMENTS

### 6.1 Project Structure

```
HiDeal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── environment.js
│   │   │   └── constants.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── validation.js
│   │   │   └── logging.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Consumer.js
│   │   │   ├── Bar.js
│   │   │   ├── Brand.js
│   │   │   ├── Questionnaire.js
│   │   │   ├── Response.js
│   │   │   ├── Promotion.js
│   │   │   └── AuditLog.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── users.js
│   │   │   ├── consumers.js
│   │   │   ├── bars.js
│   │   │   ├── brands.js
│   │   │   ├── questionnaires.js
│   │   │   ├── promotions.js
│   │   │   ├── analytics.js
│   │   │   └── consent.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── consumerController.js
│   │   │   ├── barController.js
│   │   │   ├── brandController.js
│   │   │   ├── questionnaireController.js
│   │   │   ├── promotionController.js
│   │   │   ├── analyticsController.js
│   │   │   └── consentController.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── questionnaireEngine.js
│   │   │   ├── analyticsEngine.js
│   │   │   ├── excelExportService.js
│   │   │   ├── notificationService.js
│   │   │   └── cacheService.js
│   │   ├── utils/
│   │   │   ├── validators.js
│   │   │   ├── helpers.js
│   │   │   ├── logger.js
│   │   │   └── errorCodes.js
│   │   ├── database/
│   │   │   └── migrations/
│   │   │       ├── 001_create_users.js
│   │   │       ├── 002_create_consumers.js
│   │   │       └── ...
│   │   └── app.js
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── README.md
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── Consumers/
│   │   │   ├── Brands/
│   │   │   ├── Bars/
│   │   │   ├── Questionnaires/
│   │   │   ├── Analytics/
│   │   │   ├── Promotions/
│   │   │   ├── Auth/
│   │   │   └── Common/
│   │   ├── pages/
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   └── analyticsService.js
│   │   ├── hooks/
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── mobile/
│   ├── src/
│   │   ├── screens/
│   │   │   ├── LoginScreen.js
│   │   │   ├── DashboardScreen.js
│   │   │   ├── ConsumerCheckInScreen.js
│   │   │   ├── SurveyScreen.js
│   │   │   ├── PromotionScreen.js
│   │   │   └── SyncScreen.js
│   │   ├── navigation/
│   │   ├── components/
│   │   ├── services/
│   │   ├── utils/
│   │   └── App.js
│   ├── app.json
│   ├── package.json
│   └── README.md
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── DATABASE_SCHEMA.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT_GUIDE.md
│   ├── SETUP_INSTRUCTIONS.md
│   ├── USER_GUIDES/
│   │   ├── ADMIN_GUIDE.md
│   │   ├── BAR_AGENT_GUIDE.md
│   │   └── CONSUMER_GUIDE.md
│   └── TROUBLESHOOTING.md
│
└── README.md
```

### 6.2 Key Features Implementation Details

#### A. Authentication System
- **JWT Implementation**: Access token (15 min) + Refresh token (7 days)
- **Role-Based Access Control**: ADMIN, BAR_MANAGER, BAR_AGENT, CONSUMER
- **Two-Factor Authentication**: Optional 2FA for admin users
- **Session Management**: Track active sessions, force logout capability
- **Password Reset**: Email-based password recovery flow

#### B. Questionnaire Engine
- **Question Types**: Text, Multiple Choice, Rating Scale, Checkbox, Date
- **Logic Branching**: Conditional questions based on previous answers
- **Survey Templates**: Pre-built templates for quick deployment
- **Response Validation**: Required fields, regex patterns, custom validators
- **Offline Capability**: Survey queuing when offline
- **Analytics Integration**: Automatic response aggregation and insights

#### C. Dashboard UI Components
- **Chart Library**: Recharts or Chart.js for interactive visualizations
- **Real-time Data**: WebSocket updates for live metrics
- **Responsive Design**: Mobile, tablet, desktop optimization
- **Data Tables**: Sortable, filterable, paginated consumer lists
- **Heatmaps**: Location-based consumer distribution
- **Trend Analysis**: Time-series charts for brand preferences
- **Drill-down Capability**: Click charts to view detailed data

#### D. Bar Agent Mobile Interface
- **Offline-First Architecture**: Progressive Web App (PWA) or React Native
- **QR Code Scanner**: Quick consumer identification
- **Voice Input**: Optional voice-to-text for questionnaires
- **Geolocation Tagging**: Auto-tag responses with bar location
- **Sync Manager**: Intelligent sync when connectivity returns
- **Performance Optimized**: <50MB bundle size, fast loading

#### E. Data Export Service
- **Excel Format**: XLSX with formatted headers, colors, filtering
- **CSV Export**: Comma-separated values for data import
- **PDF Reports**: Formatted PDF reports with charts
- **Scheduling**: Automated export on set intervals
- **Filtering Options**: Export by date range, bar, brand, age group
- **Data Transformation**: Clean, anonymized, GDPR-compliant export

---

## 7. QUALITY & PRODUCTION REQUIREMENTS

### 7.1 Code Quality
- **Linting**: ESLint with standard/airbnb config
- **Code Formatting**: Prettier for consistent formatting
- **Testing Coverage**: Minimum 80% unit test coverage
  - Jest for backend testing
  - React Testing Library for frontend testing
- **Type Safety**: PropTypes or TypeScript (optional)
- **Code Documentation**: JSDoc comments for all functions
- **Git Workflow**: Feature branches, pull requests, code review process

### 7.2 Performance Optimization
- **Backend**: 
  - API response time < 200ms
  - Database query optimization with proper indexing
  - Caching layer (Redis) for frequently accessed data
  - Pagination for large datasets (20-100 items per page)
- **Frontend**:
  - Code splitting and lazy loading
  - Image optimization and compression
  - Minimal bundle size (< 500KB for admin, < 300KB for mobile)
  - Debouncing/throttling for search and filters
  - Virtual scrolling for large lists

### 7.3 Security Measures
- **Input Validation**: All user inputs sanitized
- **SQL Injection Prevention**: Parameterized queries, ORM usage
- **XSS Prevention**: Output encoding, Content Security Policy
- **CSRF Protection**: Token-based CSRF prevention
- **HTTPS Enforcement**: All communications encrypted
- **API Rate Limiting**: 100-1000 requests per hour per user
- **Database Encryption**: Sensitive fields encrypted at rest
- **Audit Trail**: All modifications logged with user/timestamp

### 7.4 Scalability
- **Horizontal Scaling**: Stateless backend services
- **Load Balancing**: Distribute traffic across multiple instances
- **Database Replication**: Master-slave setup for read scaling
- **Caching Strategy**: Redis for sessions and frequently accessed data
- **CDN Integration**: Serve static assets from CDN
- **Async Processing**: Queue-based processing for heavy operations (reports, exports)

### 7.5 Reliability & Monitoring
- **Error Handling**: Comprehensive try-catch blocks, proper error responses
- **Logging**: Structured logging (Winston/Morgan) with levels
- **Monitoring**: Application Performance Monitoring (APM) tool integration
- **Health Checks**: Regular health endpoint checks
- **Backup Strategy**: Automated daily backups with 30-day retention
- **Disaster Recovery**: RTO < 4 hours, RPO < 1 hour
- **Uptime Target**: 99.5% availability SLA

### 7.6 Documentation Standards
- **README**: Setup instructions, tech stack overview
- **API Documentation**: OpenAPI/Swagger specification
- **Database Schema**: ER diagrams, table descriptions
- **Architecture Guide**: System design, data flow diagrams
- **Deployment Guide**: Production deployment steps, environment setup
- **User Guides**: Step-by-step guides for admin, agents, consumers
- **Code Comments**: JSDoc comments, inline explanations for complex logic
- **Troubleshooting Guide**: Common issues and solutions
- **CHANGELOG**: Version history and updates

---

## 8. DEVELOPMENT PHASES

### Phase 1: Foundation (Weeks 1-2)
- Project setup and scaffolding
- Database schema design and migrations
- Authentication system implementation
- Basic API endpoints (CRUD for users, consumers, bars)
- Frontend project setup with React

### Phase 2: Core Features (Weeks 3-5)
- Questionnaire engine implementation
- Brand and promotion management
- Consumer profile management
- Consent management system
- Basic analytics foundation

### Phase 3: Advanced Features (Weeks 6-7)
- Dashboard UI with charts
- Bar agent mobile interface
- Advanced analytics and reporting
- Data export functionality
- Real-time updates with WebSocket

### Phase 4: Polish & Production (Weeks 8-9)
- Testing (unit, integration, e2e)
- Performance optimization
- Security hardening
- Documentation completion
- Deployment and production setup

---

## 9. TESTING STRATEGY

### Backend Tests
```
Unit Tests:
- Authentication logic
- Data validation
- Business logic (questionnaire engine, analytics)
- Error handling

Integration Tests:
- API endpoint flows
- Database operations
- Service interactions
- Authentication flows

E2E Tests:
- Complete user workflows
- Multi-step processes (survey creation → response → analysis)
```

### Frontend Tests
```
Component Tests:
- Render correctly with props
- Handle user interactions
- Display dynamic data

Integration Tests:
- Form submissions
- API calls
- Navigation flows

E2E Tests:
- Login flow
- Consumer search and management
- Survey creation and deployment
```

---

## 10. DEPLOYMENT & DEVOPS

### Infrastructure
- **Web Server**: Nginx reverse proxy
- **Application Server**: Node.js with PM2 process manager
- **Database**: PostgreSQL 12+ with automated backups
- **Cache**: Redis for session and data caching
- **File Storage**: S3 or local storage for uploads
- **Container**: Docker for containerization and consistency

### Environment Configurations
```
Development: Local PostgreSQL, localhost URLs
Staging: Cloud-based, staging URLs, test data
Production: Cloud-based, production domain, encrypted secrets
```

### CI/CD Pipeline
- **Code Push**: Automatic tests on PR
- **Build**: Docker image creation and registry push
- **Deploy**: Automated deployment to staging, manual promotion to production
- **Monitoring**: APM, logs, alerts integration

---

## 11. DEPENDENCIES & TOOLS

### Backend
- Express.js, Node.js
- Sequelize or TypeORM (ORM)
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt (password hashing)
- Joi or Express-validator (validation)
- Winston or Morgan (logging)
- Jest (testing)
- ExcelJS (Excel generation)
- Socket.io (real-time updates)

### Frontend
- React, React Router
- Axios (HTTP client)
- Recharts or Chart.js (charting)
- Tailwind CSS or Material-UI (styling)
- Redux or Context API (state management)
- Jest + React Testing Library (testing)
- Formik + Yup (forms)
- React Query or SWR (data fetching)

### Mobile
- React Native or Flutter
- Offline storage (AsyncStorage/SQLite)
- Geolocation (react-native-geolocation)
- Camera (react-native-camera for QR scanning)

---

## 12. SUCCESS METRICS

- **Code Quality**: 80%+ test coverage, 0 critical vulnerabilities
- **Performance**: <200ms API response, >90 Lighthouse score
- **Uptime**: 99.5% availability
- **User Experience**: <2s page load time, mobile score >85
- **Security**: Zero security breaches, OWASP compliance
- **Documentation**: Complete API docs, user guides, architecture docs
- **Scalability**: Support 10,000+ consumers, 100+ bars without degradation

---

## 13. PRODUCTION DEPLOYMENT CHECKLIST

- [ ] Environment variables configured (.env files)
- [ ] Database backups automated and tested
- [ ] SSL certificates installed and valid
- [ ] Rate limiting configured
- [ ] Monitoring and alerts set up
- [ ] Error handling and logging verified
- [ ] Security headers configured
- [ ] CORS settings verified
- [ ] Database migrations tested
- [ ] API documentation deployed
- [ ] User documentation complete
- [ ] Load testing passed (10,000+ concurrent users)
- [ ] Disaster recovery plan tested
- [ ] Compliance checks passed (GDPR, CCPA)
- [ ] Stakeholder sign-off obtained

---

## 14. MAINTENANCE & SUPPORT

- **Bug Fixes**: Critical bugs fixed within 24 hours
- **Updates**: Monthly security updates
- **Monitoring**: 24/7 uptime monitoring
- **Support**: Email/Slack support channel
- **Analytics**: Monthly performance reports
- **Scaling**: Monitor usage and scale as needed

---

## NOTES FOR DEVELOPMENT TEAM

1. **Documentation**: Document decisions, changes, and learnings continuously
2. **Code Reviews**: Every merge requires code review from senior developer
3. **Version Control**: Use semantic versioning (v1.0.0)
4. **Database Migrations**: Always test migrations on staging before production
5. **API Versioning**: Implement versioning (v1, v2) for backward compatibility
6. **Error Codes**: Maintain centralized error code registry
7. **User Feedback**: Collect and prioritize user feedback regularly
8. **Security Updates**: Subscribe to security mailing lists for dependencies
9. **Performance Monitoring**: Use APM tools to catch bottlenecks early
10. **Accessibility**: Ensure WCAG 2.1 Level AA compliance for web

---

**Document Version:** 1.0  
**Last Updated:** April 2026  
**Status:** Ready for Development
