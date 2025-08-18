import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

// Import improved screens
import WelcomeScreen from './src/screens/onBoarding/WelcomeScreen';

import WelcomeHeroScreen from './src/screens/onBoarding/WelcomeHeroScreen';
import PhoneVerificationScreen from './src/screens/onBoarding/PhoneVerificationScreen';
import OTPVerificationScreen from './src/screens/onBoarding/OTPVerificationScreen';
import ConsentBasicsScreen from './src/screens/onBoarding/ConsentBasicsScreen';
import LocationSetupScreen from './src/screens/onBoarding/LocationSetupScreen';
import EmailRegistrationScreen from './src/screens/onBoarding/EmailRegistrationScreen';
import EmailVerificationScreen from './src/screens/onBoarding/EmailVerificationScreen';
import EmailLoginScreen from './src/screens/onBoarding/EmailLoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import FeedScreen from './src/screens/FeedScreen';
import EventsScreen from './src/screens/EventsScreen';
import MarketplaceScreen from './src/screens/MarketplaceScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/onBoarding/LoginScreen';
import RegisterScreen from './src/screens/onBoarding/RegisterScreen';

import OnboardingScreen from './src/screens/onBoarding/OnboardingScreen';
import LocationSelectionScreen from './src/screens/onBoarding/LocationSelectionScreen';
import InvitationCodeScreen from './src/screens/onBoarding/InvitationCodeScreen';
import LocationAccessScreen from './src/screens/onBoarding/LocationAccessScreen';

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
            {/* NEW ONBOARDING FLOW */}
            
            {/* Welcome Screen - First screen with Join/Login options */}
            <Stack.Screen 
              name="WelcomeHero" 
              component={WelcomeHeroScreen}
             
            />
            
            {/* Email Registration Flow - For new users choosing email */}
            <Stack.Screen 
              name="EmailRegistration" 
              component={EmailRegistrationScreen}
            />
            
            {/* Email Verification - For both signup and login */}
            <Stack.Screen 
              name="EmailVerification" 
              component={EmailVerificationScreen}
            />
            
            {/* Email Login - For existing users */}
            <Stack.Screen 
              name="EmailLogin" 
              component={EmailLoginScreen}
              initialParams={{ onLoginSuccess: handleLoginSuccess, onSocialLoginSuccess: handleSocialLoginSuccess }}
            />
            

            
            {/* Phone Verification - After email verification or SSO signup */}
            <Stack.Screen 
              name="PhoneVerification" 
              component={PhoneVerificationScreen}
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
              initialParams={{ onSetupComplete: handleLoginSuccess }}
            />
            
            <Stack.Screen 
              name="Welcome" 
              component={WelcomeScreen}
              initialParams={{ onLoginSuccess: handleLoginSuccess, onSocialLoginSuccess: handleSocialLoginSuccess }}
            />
            <Stack.Screen 
              name="Onboarding" 
              component={OnboardingScreen}
              initialParams={{ onLoginSuccess: handleLoginSuccess, onSocialLoginSuccess: handleSocialLoginSuccess }}
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
            <Stack.Screen 
              name="ConsentBasics" 
              component={ConsentBasicsScreen}
            />
            
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              initialParams={{ onLoginSuccess: handleLoginSuccess, onSocialLoginSuccess: handleSocialLoginSuccess }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}