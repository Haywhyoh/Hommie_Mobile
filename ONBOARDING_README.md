# Hommie Onboarding Flow

This document describes the comprehensive onboarding flow for the Hommie mobile app, designed specifically for Nigerian communities.

## 🎯 Overview

The onboarding flow consists of 6 sequential steps that guide new users through the process of joining their local community:

1. **Welcome** - App introduction and features overview
2. **Invitation** - Enter invitation code and zip code
3. **Location** - Select city and state
4. **Address** - Confirm street address and neighborhood
5. **Verification** - Choose verification method
6. **Phone** - Enter phone number for verification

## 🎨 Design System

The onboarding screens follow the Nigerian Style Guide (`ux.md`) with:

- **Primary Color**: Nigeria Green (#00A651)
- **Typography**: Clear hierarchy with Nigerian context
- **Spacing**: Consistent 8px grid system
- **Components**: Modern, accessible UI elements

## 📱 Screens

### WelcomeScreen
- Entry point to the app
- App logo and tagline
- Feature preview
- Options to start onboarding or sign in

### OnboardingScreen
- Multi-step flow with horizontal pagination
- Progress indicators
- Form validation
- Navigation between steps

## 🗂️ File Structure

```
src/
├── screens/
│   ├── WelcomeScreen.tsx          # Entry point
│   ├── OnboardingScreen.tsx       # Multi-step onboarding
│   └── LoginScreen.tsx            # Updated with Nigerian styling
├── constants/
│   ├── index.ts                   # Updated with Nigerian colors
│   └── onboardingData.ts          # Demo data and content
└── types/
    └── index.ts                   # Updated navigation types
```

## 🚀 Usage

### Navigation Flow
```typescript
// Start the app
navigation.navigate('Welcome');

// Begin onboarding
navigation.navigate('Onboarding');

// Complete onboarding
navigation.navigate('Login');
```

### Demo Data
The onboarding uses imported demo data from `onboardingData.ts`:

```typescript
import { ONBOARDING_DATA, SAMPLE_INVITATION_CODES } from '../constants/onboardingData';

// Access demo data
const features = ONBOARDING_DATA.features;
const locations = ONBOARDING_DATA.locations;
```

## 🎭 Demo Content

### Nigerian Locations
- Ikeja, Lagos
- Garki, Abuja
- Victoria Island, Lagos
- Wuse, Abuja
- Lekki, Lagos

### Sample Invitation Codes
- HOMIE2024
- LAGOS001
- ABUJA2024
- COMMUNITY
- NEIGHBOR

### Sample Zip Codes
- 100001 (Lagos)
- 900001 (Abuja)
- 500001 (Port Harcourt)
- 400001 (Kano)
- 300001 (Ibadan)

## 🔧 Customization

### Adding New Steps
1. Add step to `onboardingSteps` array
2. Create step component function
3. Add validation logic to `validateStep`
4. Update navigation logic

### Modifying Content
1. Edit `onboardingData.ts` for content changes
2. Update constants in `index.ts` for styling
3. Modify individual step components as needed

## 📋 Features

- **Progress Tracking**: Visual progress indicators
- **Form Validation**: Step-by-step validation
- **Keyboard Handling**: Proper keyboard avoidance
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Screen reader support
- **Nigerian Context**: Local locations and culture

## 🎨 Styling

All styles follow the Nigerian Style Guide:

- **Colors**: Primary green (#00A651), proper contrast
- **Typography**: Clear hierarchy, readable fonts
- **Spacing**: Consistent 8px grid system
- **Components**: Modern, accessible design
- **Shadows**: Subtle depth and elevation

## 🚨 Validation Rules

- **Invitation**: Code and zip code required
- **Location**: Must select a city
- **Address**: Street address required
- **Verification**: Method selection required
- **Phone**: 10-digit number required

## 🔄 State Management

The onboarding uses React state to track:
- Current step
- Form inputs
- Selections
- Validation status

## 📱 Platform Support

- **iOS**: Native iOS patterns and gestures
- **Android**: Material Design principles
- **Cross-platform**: Consistent experience

## 🧪 Testing

### Demo Mode
- Use sample invitation codes for testing
- Sample zip codes for location testing
- Demo user data for verification

### Validation Testing
- Test each step's validation
- Verify navigation between steps
- Check form submission

## 🚀 Next Steps

1. **Integration**: Connect to backend APIs
2. **Analytics**: Track onboarding completion rates
3. **A/B Testing**: Test different flows
4. **Localization**: Add more Nigerian languages
5. **Accessibility**: Enhance screen reader support

## 📚 Resources

- [Nigerian Style Guide](ux.md)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Nigerian Community Guidelines](PRD.txt)

---

**Note**: This onboarding flow is designed specifically for Nigerian users and communities. All content, locations, and cultural references are tailored to the Nigerian context.
