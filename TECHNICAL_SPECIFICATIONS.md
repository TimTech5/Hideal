# HiDeal - Technical Specifications & Architecture Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ React Admin  │  │   Bar Agent  │  │  Consumer Portal     │  │
│  │  Dashboard   │  │  Mobile/Web  │  │  (Optional)          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└────────────────────────┬─────────────────────────────────────────┘
                         │ REST API / WebSocket
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway Layer                         │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Express.js Server (Node.js)                             │  │
│  │  - Authentication & Authorization                        │  │
│  │  - Rate Limiting & CORS                                 │  │
│  │  - Request Validation & Logging                         │  │
│  │  - Real-time Updates (WebSocket)                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬─────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Business    │  │   Service    │  │   Data       │
│  Logic Layer │  │   Layer      │  │   Access     │
│              │  │              │  │   Layer      │
│ Controllers/ │  │ Services &   │  │ Models/      │
│ Routes       │  │ Utilities    │  │ Repositories │
└──────────────┘  └──────────────┘  └──────────────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
        ┌────────────────┼────────────────┬──────────────┐
        ▼                ▼                ▼              ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐ ┌──────────────┐
│ PostgreSQL   │  │   Redis      │  │   File       │ │   Email      │
│   Database   │  │   Cache      │  │   Storage    │ │   Service    │
└──────────────┘  └──────────────┘  └──────────────┘ └──────────────┘
```

---

## Component Architecture

### Frontend Components Hierarchy

```
App
├── Auth
│   ├── LoginPage
│   ├── RegisterPage
│   └── ProtectedRoute
├── Layout
│   ├── Header
│   ├── Sidebar
│   └── Footer
├── Dashboard
│   ├── MetricsCard
│   ├── ChartWidget
│   ├── StatsList
│   └── RecentActivity
├── Consumers
│   ├── ConsumerList
│   ├── ConsumerSearch
│   ├── ConsumerDetail
│   └── ConsumerForm
├── Questionnaires
│   ├── QuestionnaireListing
│   ├── QuestionnaireBuilder
│   │   ├── DragDropEditor
│   │   ├── QuestionTypeSelector
│   │   └── PreviewMode
│   ├── SurveyResponder
│   └── ResponseAnalytics
├── Brands
│   ├── BrandList
│   ├── BrandForm
│   └── BrandDetail
├── Promotions
│   ├── PromotionList
│   ├── PromotionForm
│   └── PromotionTargeting
├── Analytics
│   ├── DemographicsChart
│   ├── PreferencesChart
│   ├── TrendAnalysis
│   └── CustomReports
├── BarManagement
│   ├── BarList
│   ├── BarForm
│   └── AgentAssignment
├── UserManagement
│   ├── UserList
│   ├── UserForm
│   └── RoleAssignment
└── DataExport
    ├── ExportForm
    ├── ExportHistory
    └── ExportPreview
```

---

## Database Schema with Relationships

### Entity Relationship Diagram (ERD)

```
Users (1) ──────┬─────────── (M) Consumers
               │
               ├─────────── (M) BarAgents
               │
               └─────────── (M) AuditLogs

Consumers (1) ──────────── (M) ConsumerPreferences
Consumers (1) ──────────── (M) Responses
Consumers (1) ──────────── (M) ConsentLogs

Bars (1) ──────────────── (M) BarAgents
Bars (1) ──────────────── (M) PromotionAssignments

Brands (1) ────┬────────── (M) ConsumerPreferences
              │
              ├────────── (M) Promotions
              │
              └────────── (M) BrandAnalytics

Questionnaires (1) ────┬─ (M) Questions
                      │
                      └─ (M) Responses

Questions (1) ────────── (M) QuestionOptions
Questions (1) ────────── (M) ResponseAnswers

Responses (1) ────────── (M) ResponseAnswers

Promotions (M) ────────── (M) Bars (through PromotionAssignments)
```

---

## API Endpoint Specifications

### Authentication Endpoints

#### POST /api/auth/register
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123!",
  "fullName": "John Doe",
  "role": "CONSUMER"
}
```

**Response (201):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "CONSUMER",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### POST /api/auth/login
**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123!"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "CONSUMER"
  }
}
```

#### POST /api/auth/refresh-token
**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Consumer Endpoints

#### GET /api/consumers
**Query Parameters:**
```
?page=1&limit=20&search=John&ageGroup=25-34&sort=created_at&order=DESC
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "ageGroup": "25-34",
      "gender": "M",
      "consentStatus": true,
      "createdAt": "2026-04-20T10:00:00Z",
      "preferences": [
        {
          "brandId": 1,
          "frequency": "weekly",
          "preferenceScore": 8.5
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

#### POST /api/consumers
**Request:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "ageGroup": "25-34",
  "gender": "M"
}
```

**Response (201):**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "createdAt": "2026-04-27T10:00:00Z"
}
```

### Questionnaire Endpoints

#### POST /api/questionnaires
**Request:**
```json
{
  "title": "Drinking Preference Survey",
  "description": "We'd like to know your favorite drinks",
  "targetAudience": "all",
  "questions": [
    {
      "text": "What is your preferred drink brand?",
      "type": "MULTIPLE_CHOICE",
      "required": true,
      "options": ["Brand A", "Brand B", "Brand C"],
      "order": 1
    }
  ]
}
```

**Response (201):**
```json
{
  "id": 1,
  "title": "Drinking Preference Survey",
  "status": "DRAFT",
  "createdAt": "2026-04-27T10:00:00Z"
}
```

#### POST /api/questionnaires/:id/responses
**Request:**
```json
{
  "consumerId": 1,
  "responses": {
    "1": "Brand A",
    "2": 4,
    "3": ["Option1", "Option2"]
  }
}
```

**Response (201):**
```json
{
  "id": 1,
  "questionnaireId": 1,
  "consumerId": 1,
  "completedAt": "2026-04-27T10:15:00Z"
}
```

### Analytics Endpoints

#### GET /api/analytics/dashboard
**Response (200):**
```json
{
  "metrics": {
    "totalConsumers": 1250,
    "surveyCompletionRate": 75.2,
    "activePromotions": 8,
    "recentResponses": 45,
    "consumerGrowth": 12.5
  },
  "charts": {
    "demographics": {
      "ageGroups": [
        { "label": "18-24", "value": 250, "percentage": 20 },
        { "label": "25-34", "value": 420, "percentage": 33.6 }
      ]
    },
    "preferences": {
      "topBrands": [
        { "brand": "Brand A", "consumers": 450, "frequency": "weekly" },
        { "brand": "Brand B", "consumers": 380, "frequency": "bi-weekly" }
      ]
    },
    "trends": [
      { "date": "2026-04-20", "consumers": 1200 },
      { "date": "2026-04-21", "consumers": 1210 }
    ]
  }
}
```

#### POST /api/analytics/export
**Request:**
```json
{
  "format": "excel",
  "filters": {
    "startDate": "2026-01-01",
    "endDate": "2026-04-27",
    "ageGroup": "25-34",
    "barId": 1
  },
  "fields": ["name", "email", "ageGroup", "preferences", "surveyResponses"]
}
```

**Response (200):**
```json
{
  "downloadUrl": "https://hideal.com/exports/export_123.xlsx",
  "format": "excel",
  "rowCount": 450,
  "createdAt": "2026-04-27T10:30:00Z"
}
```

---

## State Management (Frontend)

### Redux Store Structure (Example)

```javascript
store: {
  auth: {
    user: { id, email, role, token },
    isAuthenticated: boolean,
    isLoading: boolean,
    error: string
  },
  consumers: {
    list: [],
    selectedConsumer: {},
    pagination: { page, limit, total },
    filters: { search, ageGroup, sortBy },
    isLoading: boolean
  },
  questionnaires: {
    list: [],
    current: {},
    questions: [],
    isBuilding: boolean,
    isLoading: boolean
  },
  analytics: {
    dashboardMetrics: {},
    charts: {},
    isLoading: boolean,
    cachedAt: timestamp
  },
  ui: {
    sidebarOpen: boolean,
    theme: 'light' | 'dark',
    notifications: [],
    modals: {}
  }
}
```

---

## Security Implementation Details

### JWT Token Structure
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "sub": 1,
  "email": "user@example.com",
  "role": "ADMIN",
  "iat": 1619505000,
  "exp": 1619508600,
  "iss": "hideal"
}

Signature: HMACSHA256(header.payload, secret)
```

### Password Security
- **Hashing**: bcrypt with salt rounds = 10
- **Requirements**: Min 8 chars, 1 uppercase, 1 number, 1 special char
- **Storage**: Never store plain text, only hash

### API Security Headers
```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

### CORS Configuration
```javascript
const corsOptions = {
  origin: ['https://hideal.com', 'https://app.hideal.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 hours
};
```

---

## Performance Optimization Strategies

### Database Optimization
- **Connection Pooling**: 20-30 connections per pool
- **Query Optimization**: Use indexes on frequently queried columns
- **Caching**: Redis cache for:
  - User sessions
  - Brand listings
  - Promotion data
  - Analytics calculations
- **Pagination**: Always paginate large datasets
- **Lazy Loading**: Load related data only when needed

### Frontend Optimization
- **Code Splitting**: Separate bundles for different routes
- **Lazy Loading Components**: React.lazy() for route components
- **Image Optimization**: WebP format, responsive images
- **Bundle Analysis**: Monitor bundle size regularly
- **Caching Strategy**: Cache API responses with SWR/React Query
- **Virtual Scrolling**: For large lists (>1000 items)

### API Optimization
- **Response Compression**: gzip compression
- **Caching Headers**: Set appropriate cache-control headers
- **Pagination**: Limit response size
- **Select Only Needed Fields**: Implement field selection in API
- **Batch Operations**: Support bulk imports/exports
- **Async Processing**: Queue heavy operations (exports, reports)

---

## Error Handling Strategy

### Error Code Registry
```
1000-1099: Authentication errors
1100-1199: Authorization errors
2000-2099: Validation errors
3000-3099: Database errors
4000-4099: Business logic errors
5000-5099: External service errors
6000-6099: File operation errors
```

### Error Response Format
```json
{
  "error": {
    "code": 2001,
    "message": "Email is required",
    "field": "email",
    "timestamp": "2026-04-27T10:00:00Z",
    "requestId": "req-123-456"
  }
}
```

---

## Monitoring & Logging

### Structured Logging Format
```javascript
{
  "timestamp": "2026-04-27T10:00:00Z",
  "level": "INFO",
  "service": "auth-service",
  "userId": 1,
  "action": "login",
  "status": "success",
  "duration": 125,
  "metadata": {
    "ip": "192.168.1.1",
    "userAgent": "Mozilla/5.0..."
  }
}
```

### Key Metrics to Monitor
- API response time (p50, p95, p99)
- Error rate by endpoint
- Database query performance
- Cache hit rate
- User authentication success rate
- Survey completion rate
- Data export generation time
- System CPU and memory usage

---

## Deployment Configuration

### Environment Variables Required
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/hideal
DB_POOL_MIN=5
DB_POOL_MAX=20

# Redis
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRY=900
REFRESH_TOKEN_EXPIRY=604800

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# File Storage
AWS_S3_BUCKET=hideal-uploads
AWS_REGION=us-east-1
AWS_ACCESS_KEY=xxx
AWS_SECRET_KEY=xxx

# API
NODE_ENV=production
PORT=3000
API_URL=https://api.hideal.com
FRONTEND_URL=https://hideal.com

# Monitoring
SENTRY_DSN=https://xxx@sentry.io/xxx
LOG_LEVEL=info
```

---

## Testing Coverage Goals

| Layer | Component | Target | Tool |
|-------|-----------|--------|------|
| Backend | Services | 90% | Jest |
| Backend | Controllers | 80% | Jest |
| Backend | Routes | 85% | Supertest |
| Backend | Models | 95% | Jest |
| Frontend | Components | 85% | React Testing Library |
| Frontend | Hooks | 90% | React Testing Library |
| Frontend | Services | 90% | Jest |
| Integration | API Flows | 75% | Supertest + RTL |
| E2E | Critical Paths | 100% | Cypress |

---

This technical specification document should guide the entire development process. Update it as new decisions are made and features are added.

**Last Updated**: April 2026
**Status**: Production Ready
