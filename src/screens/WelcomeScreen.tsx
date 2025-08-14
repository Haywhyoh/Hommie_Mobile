import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation, route }: any) {
  const onSocialLoginSuccess = route.params?.onSocialLoginSuccess;

  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign-in pressed');
    // Navigate directly to home for demo purposes
    if (onSocialLoginSuccess) {
      onSocialLoginSuccess();
    }
    navigation.navigate('Home');
  };

  const handleAppleSignIn = () => {
    console.log('Apple sign-in pressed');
    // Navigate directly to home for demo purposes
    if (onSocialLoginSuccess) {
      onSocialLoginSuccess();
    }
    navigation.navigate('Home');
  };

  const handleFacebookSignIn = () => {
    console.log('Facebook sign-in pressed');
    // Navigate directly to home for demo purposes
    if (onSocialLoginSuccess) {
      onSocialLoginSuccess();
    }
    navigation.navigate('Home');
  };

  const handleEmailSignIn = () => {
    navigation.navigate('Login');
  };

  const handleInviteCode = () => {
    navigation.navigate('InvitationCode');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Image 
        source={require('../../assets/bg.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.appName}>hommie</Text>
          <Text style={styles.tagline}>Explore your neighborhood</Text>
        </View>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
            <Text style={styles.socialIcon}>🔍</Text>
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton} onPress={handleAppleSignIn}>
            <Text style={styles.socialIcon}>🍎</Text>
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn}>
            <Text style={styles.socialIcon}>📘</Text>
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton} onPress={handleEmailSignIn}>
            <Text style={styles.socialIcon}>✉️</Text>
            <Text style={styles.socialButtonText}>Continue with Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.languageSelector}>
            <Text style={styles.languageText}>EN (NG)</Text>
            <Text style={styles.chevron}>▼</Text>
          </View>
          
          <TouchableOpacity onPress={handleInviteCode}>
            <Text style={styles.inviteText}>Have an invite code?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'flex-start',
    marginTop: SPACING.xxxl,
  },
  appName: {
    fontSize: 32,
    fontWeight: '400',
    color: '#E8F5E8',
    marginBottom: SPACING.sm,
    fontStyle: 'italic',
  },
  tagline: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
    lineHeight: 34,
  },
  socialButtons: {
    marginBottom: SPACING.xxxl,
  },
  socialButton: {
    backgroundColor: 'rgba(44, 44, 44, 0.9)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    minHeight: 56,
    ...SHADOWS.medium,
  },
  socialIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
    width: 24,
    textAlign: 'center',
  },
  socialButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    marginRight: SPACING.xs,
  },
  chevron: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.xs,
  },
  inviteText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    textDecorationLine: 'underline',
  },
});
