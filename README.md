# NaijaNeighbour - NextDoor for Nigeria

A community-focused mobile application designed to foster neighborhood connections, information exchange, and collaboration among individuals living in various neighborhoods across Nigeria.

## Features

- **Community Connection**: Connect with neighbors in your area
- **Local Events**: Discover and organize neighborhood events
- **Marketplace**: Buy, sell, and discover local services
- **Safety Alerts**: Report and stay informed about local safety concerns
- **Local News**: Stay updated with neighborhood happenings
- **Messaging**: Direct and group communication with neighbors

## Tech Stack

- **Frontend**: React Native with Expo
- **State Management**: Redux Toolkit
- **Navigation**: React Navigation
- **UI Components**: React Native Paper
- **TypeScript**: Full TypeScript support
- **Maps**: React Native Maps with Google Maps API
- **Location**: Expo Location services

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hommie_Mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install Expo CLI globally** (if not already installed)
   ```bash
   npm install -g @expo/cli
   ```

4. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   # or
   expo start
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
│   ├── auth/          # Authentication screens
│   └── ...            # Other screen categories
├── navigation/         # Navigation configuration
├── store/             # Redux store and slices
├── contexts/          # React Context providers
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── constants/         # App constants
└── assets/            # Images, fonts, etc.
```

## Development

### Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues

### Environment Setup

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables**
   ```env
   EXPO_PUBLIC_API_URL=your_api_url_here
   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   EXPO_PUBLIC_SMS_SERVICE_KEY=your_sms_service_key
   ```

### API Configuration

The app is configured to work with a backend API. Update the API endpoints in the Redux slices and API service files according to your backend implementation.

## Building for Production

### Android

1. **Build APK**
   ```bash
   expo build:android -t apk
   ```

2. **Build AAB (Google Play Store)**
   ```bash
   expo build:android -t app-bundle
   ```

### iOS

1. **Build for App Store**
   ```bash
   expo build:ios
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

- Follow the existing code style and structure
- Write TypeScript interfaces for all data structures
- Use Redux Toolkit for state management
- Implement proper error handling
- Write tests for new features
- Follow React Native best practices

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npm start -- --clear
   ```

2. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

### Getting Help

- Check the [Expo documentation](https://docs.expo.dev/)
- Review [React Native documentation](https://reactnative.dev/)
- Search existing issues in the repository

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

See [DEVELOPMENT_LOG.md](./DEVELOPMENT_LOG.md) for detailed development phases and milestones.