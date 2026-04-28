# Mobile Application Setup Instructions

## Prerequisites
- Node.js 16+ installed
- Expo CLI installed: `npm install -g expo-cli`
- iOS: Xcode (for iOS simulator)
- Android: Android Studio (for Android emulator)
- Mobile device with Expo Go app (iOS or Android)

## Installation Steps

### 1. Navigate to Mobile Directory
```bash
cd mobile
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure API Endpoint
Edit `src/services/api.js` and set your backend URL:
```javascript
const API_URL = 'http://YOUR_BACKEND_IP:5000/api';
```

## Running the App

### Using Expo Go (Easiest)
```bash
# Start Expo development server
npm start

# Scan QR code with your phone using Expo Go app
# App will load automatically
```

### On Android Emulator
```bash
npm run android
```

### On iOS Simulator (Mac only)
```bash
npm run ios
```

### On Web
```bash
npm run web
```

## App Features

### Screen: Login
- Email and password authentication
- Error handling and validation
- JWT token storage

### Screen: Dashboard
- Agent performance metrics
- Pending surveys indicator
- Available promotions
- Quick action buttons
- Performance stats

### Screen: Surveys
- Survey questionnaire interface
- Progress tracking
- Multiple question types
- Response submission
- Offline response queueing

### Screen: Promotions
- Active brand promotions display
- Discount information
- Validity dates
- Share functionality
- Engagement tips

### Navigation
- Bottom tab navigation
- Stack navigation for auth flow
- Protected routes for authenticated screens

## Project Structure

```
mobile/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   ├── DashboardScreen.js
│   │   ├── SurveyScreen.js
│   │   └── PromotionScreen.js
│   ├── services/
│   │   └── api.js
│   ├── components/
│   └── App.js
├── package.json
├── app.json
└── .eslintrc.js
```

## Development Commands

```bash
npm start              # Start Expo development server
npm run android        # Run on Android emulator
npm run ios           # Run on iOS simulator
npm run web           # Run on web browser
npm run eject         # Eject from Expo (irreversible)
```

## API Integration

The mobile app connects to the HiDeal backend API:

```javascript
import apiClient from '../services/api';

// Example API call
const response = await apiClient.post('/auth/login', {
  email,
  password
});
```

## Authentication

1. User enters credentials on Login screen
2. Credentials sent to `/api/auth/login`
3. JWT tokens received and stored in AsyncStorage
4. User navigated to MainApp (tabbed interface)
5. Tokens automatically included in all API requests

## Offline Support

The app includes basic offline support:
- Survey responses can be queued offline
- Automatic sync when connection restored
- AsyncStorage for local data persistence

## Device Support

- **iOS**: iOS 13+
- **Android**: Android 5.0+ (API level 21)
- **Web**: All modern browsers

## Customization

### Change Primary Colors
Edit the styles in each screen file (StyleSheet section):
```javascript
const styles = StyleSheet.create({
  // Change colors here
  button: {
    backgroundColor: '#0088FE' // Primary color
  }
});
```

### Add New Screens
1. Create new file in `src/screens/`
2. Export React Native component
3. Add to navigation stack in `App.js`

## Testing

The mobile app uses mock data for development. To test with real backend:

1. Start HiDeal backend: `npm run dev` in backend folder
2. Update API_URL in `src/services/api.js` to your backend IP
3. Run mobile app with `npm start`

## Deployment

### iOS
```bash
# Requires Apple Developer Account
npm run build-ios
```

### Android
```bash
# Requires Google Play Developer Account
npm run build-android
```

For EAS Build:
```bash
# Install EAS CLI
npm install -g eas-cli

# Build with Expo
eas build --platform android
eas build --platform ios
```

## Troubleshooting

### Port 19000 Already in Use
```bash
# Find process using port 19000
lsof -ti:19000 | xargs kill -9
```

### API Connection Issues
- Verify backend is running
- Check API_URL matches your backend IP/port
- On Android emulator, use `10.0.2.2` instead of `localhost`
- On iOS simulator, use `localhost` with backend running

### Dependencies Not Installing
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Expo Go App Issues
- Update Expo Go to latest version
- Clear cache: Press `C` while Metro Bundler running
- Restart: Press `R` while Metro Bundler running

### Build Errors
```bash
# Reset Expo cache
expo start -c

# Clean build
rm -rf .expo .metro-cache
npm start
```

## Performance Tips

1. Minimize re-renders using `useMemo` and `useCallback`
2. Optimize images for mobile
3. Use FlatList for long lists instead of ScrollView
4. Implement pagination for large datasets
5. Use background tasks for syncing

## Security Notes

1. Never hardcode API URLs in production
2. Use environment variables for sensitive data
3. Implement certificate pinning for HTTPS
4. Secure storage for tokens: consider react-native-secure-storage
5. Always validate user input

## Additional Resources

- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [React Navigation](https://reactnavigation.org)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

---

For more information, see the main documentation at the project root.
