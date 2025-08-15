import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

// Import improved screens
import WelcomeScreen from './src/screens/WelcomeScreen';
import WelcomeHeroScreen from './src/screens/onBoarding/WelcomeHeroScreen';
import ImprovedWelcomeScreen from './src/screens/ImprovedWelcomeScreen';
import ImprovedPhoneVerificationScreen from './src/screens/ImprovedPhoneVerificationScreen';
import OTPVerificationScreen from './src/screens/onBoarding/OTPVerificationScreen';
import LocationSetupScreen from './src/screens/onBoarding/LocationSetupScreen';
import HomeScreen from './src/screens/HomeScreen';
import FeedScreen from './src/screens/FeedScreen';
import EventsScreen from './src/screens/EventsScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/onBoarding/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

// Legacy screens (keeping for backward compatibility)
import OnboardingScreen from './src/screens/OnboardingScreen';
import LocationSelectionScreen from './src/screens/LocationSelectionScreen';
import InvitationCodeScreen from './src/screens/InvitationCodeScreen';
import LocationAccessScreen from './src/screens/LocationAccessScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00A651', // Using Nigerian green from style guide
        tabBarInactiveTintColor: '#8E8E8E',
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="newspaper" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen}
        options={{
          tabBarLabel: 'Market',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <TabBarIcon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Placeholder TabBarIcon component
const TabBarIcon = ({ name, color, size }: { name: string; color: string; size: number }) => {
  // We'll implement proper icons later
  return null;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Function to handle social login success
  const handleSocialLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        {isAuthenticated ? (
          <TabNavigator />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="WelcomeHero">
            {/* IMPROVED ONBOARDING FLOW */}
            
            {/* Hero Welcome Screen - Shows community benefits first */}
            <Stack.Screen 
              name="WelcomeHero" 
              component={WelcomeHeroScreen}
            />
            
            {/* Improved Multi-Step Welcome with Language Selection */}
            <Stack.Screen 
              name="WelcomeLanguage" 
              component={ImprovedWelcomeScreen}
            />
            
            {/* Improved Phone Verification - Better UX, no debug elements */}
            <Stack.Screen 
              name="PhoneVerification" 
              component={ImprovedPhoneVerificationScreen}
            />
            
            {/* OTP Verification with fallback options */}
            <Stack.Screen 
              name="OTPVerification" 
              component={OTPVerificationScreen}
            />
            
            {/* Location Setup with multiple options */}
            <Stack.Screen 
              name="LocationSetup" 
              component={LocationSetupScreen}
            />
            
            {/* Existing User Flow */}
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen}
              initialParams={{ onSocialLoginSuccess: handleSocialLoginSuccess }}
            />
            
            {/* Legacy Onboarding Screens (keeping for backward compatibility) */}
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen}
            />
            <Stack.Screen 
              name="LocationSelection" 
              component={LocationSelectionScreen}
            />
            <Stack.Screen 
              name="InvitationCode" 
              component={InvitationCodeScreen}
            />
            <Stack.Screen 
              name="LocationAccess" 
              component={LocationAccessScreen}
            />
            
            {/* Authentication Screens */}
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              initialParams={{ onLoginSuccess: handleLoginSuccess }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            
            {/* Main App */}
            <Stack.Screen 
              name="Home" 
              component={TabNavigator}
              initialParams={{ onLoginSuccess: handleSocialLoginSuccess }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}