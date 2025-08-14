import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants';

const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
];

export default function WelcomeLanguageScreen({ navigation }: any) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageSelection, setShowLanguageSelection] = useState(false);

  const handleGetStarted = () => {
    // Show language selection after user clicks Get Started
    setShowLanguageSelection(true);
  };

  const handleLanguageContinue = () => {
    // Save language preference and navigate to phone verification for new users
    navigation.navigate('PhoneVerification', { language: selectedLanguage });
  };

  const handleExistingUser = () => {
    // Navigate to original WelcomeScreen for existing users
    navigation.navigate('Welcome');
  };

  const handleBackToWelcome = () => {
    // Go back to welcome content
    setShowLanguageSelection(false);
  };

  if (showLanguageSelection) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackToWelcome}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Choose your language</Text>
          </View>

          {/* Language Selection */}
          <View style={styles.languageSection}>
            <Text style={styles.languageSubtitle}>
              You can change this later in settings
            </Text>
            
            <View style={styles.languageOptions}>
              {LANGUAGES.map((language) => (
                <TouchableOpacity
                  key={language.code}
                  style={[
                    styles.languageOption,
                    selectedLanguage === language.code && styles.languageOptionSelected
                  ]}
                  onPress={() => setSelectedLanguage(language.code)}
                >
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageNative}>{language.nativeName}</Text>
                  </View>
                  {selectedLanguage === language.code && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.checkmark}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Button */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleLanguageContinue}>
              <Text style={styles.primaryButtonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Welcome Content (shown first)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../../assets/icon.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome to Hommie</Text>
          <Text style={styles.subtitle}>
            Local updates, security alerts, and neighbors—right where you live.
          </Text>
        </View>

        {/* Features Preview */}
        <View style={styles.featuresSection}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏠</Text>
            <Text style={styles.featureTitle}>Connect with Neighbors</Text>
            <Text style={styles.featureDescription}>
              Build meaningful relationships with people in your neighborhood
            </Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📢</Text>
            <Text style={styles.featureTitle}>Stay Informed</Text>
            <Text style={styles.featureDescription}>
              Get updates about local events, safety alerts, and community news
            </Text>
          </View>
          
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🤝</Text>
            <Text style={styles.featureTitle}>Help Each Other</Text>
            <Text style={styles.featureDescription}>
              Share recommendations, offer help, and support your community
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={handleExistingUser}
          >
            <Text style={styles.secondaryButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'space-between',
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xxxl,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.display,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
    paddingHorizontal: SPACING.md,
  },
  featuresSection: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  feature: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
    paddingHorizontal: SPACING.lg,
  },
  featureIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  backButton: {
    padding: SPACING.sm,
    marginBottom: SPACING.md,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '600',
  },
  languageSection: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  languageSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  languageOptions: {
    gap: SPACING.md,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    backgroundColor: COLORS.offWhite,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  languageOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  languageNative: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
  },
  selectedIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: '600',
  },
  actions: {
    marginBottom: SPACING.xl,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.medium,
  },
  primaryButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '600',
  },
});
