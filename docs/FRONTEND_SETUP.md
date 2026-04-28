# Frontend Setup Instructions

## Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Backend API running on http://localhost:5000

## Installation Steps

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env if needed (default works for local dev)
```

### 4. Start Development Server
```bash
npm start
```

The frontend will open at `http://localhost:3000`

## Features

### Authentication Pages
- **Login Page**: `/login` - User authentication
- **Register Page**: `/register` - Create new account

### Admin Dashboard
- **Dashboard**: `/dashboard` - Main analytics and metrics
- **Consumer Management**: `/consumers` - View and manage consumers
- **Charts**: Consumer demographics, brand preferences, trends
- **Navigation**: Sidebar with quick access to features

## Available Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/login` | LoginPage | User login |
| `/register` | RegisterPage | User registration |
| `/dashboard` | DashboardPage | Main dashboard with analytics |
| `/consumers` | ConsumerListPage | Consumer management |
| `/brands` | BrandPage | Brand management |
| `/questionnaires` | QuestionnairePage | Survey management |

## Development Commands

```bash
npm start         # Start development server
npm run build     # Build for production
npm test          # Run tests
npm run lint      # Check code quality
npm run format    # Format code with Prettier
npm run eject     # Eject from Create React App (irreversible)
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Consumers/
│   │   └── Common/
│   ├── pages/
│   │   ├── LoginPage.js
│   │   ├── RegisterPage.js
│   │   └── DashboardPage.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── consumerService.js
│   ├── context/
│   │   └── AuthContext.js
│   ├── hooks/
│   │   └── useAuth.js
│   ├── App.js
│   └── index.js
├── package.json
└── tailwind.config.js
```

## Styling

The project uses **Tailwind CSS** for styling. 

### Tailwind Setup
```bash
# Already configured, but if needed:
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## API Integration

All API calls go through the `apiClient` in `services/api.js`:

```javascript
import apiClient from './services/api';

// Example usage
const response = await apiClient.post('/consumers', {
  firstName: 'John',
  lastName: 'Doe'
});
```

## Authentication Flow

1. User enters credentials on `/login`
2. `authService.login()` sends request to backend
3. Backend returns JWT token and refresh token
4. Tokens stored in localStorage
5. Subsequent requests include token in Authorization header
6. On token expiration, refresh token is used to get new token
7. User redirected to login if refresh fails

## Protected Routes

Routes are protected using `ProtectedRoute` component:

```javascript
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## State Management

Uses React Context API + Hooks for authentication state:

```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test --watch

# Run tests with coverage
npm test --coverage
```

## Building for Production

```bash
# Create production build
npm run build

# Build is in the build/ directory
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### API Connection Errors
- Verify backend is running on http://localhost:5000
- Check .env REACT_APP_API_URL is correct
- Check browser console for detailed errors

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Tailwind Styles Not Appearing
- Rebuild with `npm start`
- Check `tailwind.config.js` has correct content paths
- Ensure CSS files are imported in components

## Performance Optimization

### Code Splitting
- React Router enables automatic code splitting
- Route components use `React.lazy()` for lazy loading

### Image Optimization
- Use optimized image formats (WebP)
- Implement responsive images

### Caching
- API responses cached with React Query (installable)
- Browser caching via Service Workers (PWA ready)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Recharts](https://recharts.org)

---

For more information, see the main documentation at the project root.
