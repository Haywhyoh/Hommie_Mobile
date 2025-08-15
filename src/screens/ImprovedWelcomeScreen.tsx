import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  ScrollView 
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants';

const LANGUAGES = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English',
    greeting: 'Welcome to your community!',
    flag: '🇬🇧'
  },
  { 
    code: 'ha', 
    name: 'Hausa', 
    nativeName: 'Hausa',
    greeting: 'Barka da zuwa ga al\'ummarku!',
    flag: '🇳🇬'
  },
  { 
    code: 'yo', 
    name: 'Yoruba', 
    nativeName: 'Yorùbá',
    greeting: 'Kaabo si awujọ yin!',
    flag: '🇳🇬'
  },
  { 
    code: 'ig', 
    name: 'Igbo', 
    nativeName: 'Igbo',
    greeting: 'Nnọọ n\'ime obodo gị!',
    flag: '🇳🇬'
  },
];

const TRUST_POINTS = [
  { icon: '🔐', text: 'Your privacy is protected' },
  { icon: '🇳🇬', text: 'Made for Nigerian communities' },
  { icon: '📱', text: 'Works on any phone' },
];

export default function ImprovedWelcomeScreen({ navigation }: any) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState<'community' | 'language' | 'getting_started'>('community');
  
  const selectedLangData = LANGUAGES.find(lang => lang.code === selectedLanguage) || LANGUAGES[0];

  const handleGetStarted = () => {
    setCurrentStep('language');
  };

  const handleLanguageContinue = () => {
    setCurrentStep('getting_started');
  };

  const handleStartJourney = () => {
    navigation.navigate('PhoneVerification', { language: selectedLanguage });
  };

  const handleExistingUser = () => {
    navigation.navigate('Welcome');
  };

  const handleBackToCommunity = () => {
    setCurrentStep('community');
  };

  const handleBackToLanguage = () => {
    setCurrentStep('language');
  };

  // Step 3: Getting Started
  if (currentStep === 'getting_started') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressDots}>
                <View style={[styles.progressDot, styles.progressDotActive]} />
                <View style={[styles.progressDot, styles.progressDotActive]} />
                <View style={[styles.progressDot, styles.progressDotActive]} />
              </View>
              <Text style={styles.progressText}>Step 3 of 4</Text>
            </View>

            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={handleBackToLanguage}
              >
                <Text style={styles.backButtonText}>←</Text>
              </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.gettingStartedContent}>
              <Text style={styles.gettingStartedTitle}>
                {selectedLangData.greeting}
              </Text>
              
              <Text style={styles.gettingStartedSubtitle}>
                You're about to join thousands of neighbors who are making their communities safer and stronger.
              </Text>

              {/* Benefits Card */}
              <View style={styles.benefitsCard}>
                <Text style={styles.benefitsTitle}>What happens next:</Text>
                
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>📱</Text>
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Verify your phone</Text>
                    <Text style={styles.benefitDescription}>Quick SMS verification to keep your community safe</Text>
                  </View>
                </View>

                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>📍</Text>
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Find your neighborhood</Text>
                    <Text style={styles.benefitDescription}>We'll help you connect with your immediate neighbors</Text>
                  </View>
                </View>

                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>🎉</Text>
                  <View style={styles.benefitContent}>
                    <Text style={styles.benefitTitle}>Start connecting</Text>
                    <Text style={styles.benefitDescription}>Meet neighbors, share updates, and build community</Text>
                  </View>
                </View>
              </View>

              {/* Trust indicators */}
              <View style={styles.trustIndicators}>
                {TRUST_POINTS.map((point, index) => (
                  <View key={index} style={styles.trustItem}>
                    <Text style={styles.trustIcon}>{point.icon}</Text>
                    <Text style={styles.trustText}>{point.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Action Button */}
        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleStartJourney}>
            <Text style={styles.primaryButtonText}>Start My Journey</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.ghostButton} 
            onPress={handleExistingUser}
          >
            <Text style={styles.ghostButtonText}>I already have an account</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Step 2: Language Selection
  if (currentStep === 'language') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            {/* Progress indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressDots}>
                <View style={[styles.progressDot, styles.progressDotActive]} />
                <View style={[styles.progressDot, styles.progressDotActive]} />
                <View style={styles.progressDot} />
              </View>
              <Text style={styles.progressText}>Step 2 of 4</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBackToCommunity}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Choose your language</Text>
          </View>

          {/* Language Selection */}
          <View style={styles.languageSection}>
            <Text style={styles.languageSubtitle}>
              Select your preferred language for the best experience. You can change this anytime in settings.
            </Text>
            
            <View style={styles.selectedLanguagePreview}>
              <Text style={styles.previewFlag}>{selectedLangData.flag}</Text>
              <Text style={styles.previewGreeting}>{selectedLangData.greeting}</Text>
            </View>
            
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
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <View style={styles.languageInfo}>
                    <Text style={styles.languageName}>{language.name}</Text>
                    <Text style={styles.languageNative}>{language.nativeName}</Text>
                    <Text style={styles.languageGreeting}>{language.greeting}</Text>
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

  // Step 1: Community Introduction (shown first)
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDots}>
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <View style={styles.progressDot} />
              <View style={styles.progressDot} />
            </View>
            <Text style={styles.progressText}>Step 1 of 4</Text>
          </View>

          {/* Header */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>Your Community Awaits</Text>
            <Text style={styles.subtitle}>
              Join neighbors who are making their communities safer, stronger, and more connected across Nigeria.
            </Text>
          </View>

          {/* Community Benefits */}
          <View style={styles.featuresSection}>
            <View style={styles.communityCard}>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>🛡️</Text>
                <Text style={styles.featureTitle}>"Our estate security improved 90% after joining Hommie."</Text>
                <Text style={styles.featureDescription}>— Mr. Emeka, Lekki Phase 1</Text>
              </View>
            </View>
            
            <View style={styles.communityCard}>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>🏠</Text>
                <Text style={styles.featureTitle}>"Found my lost cat in 30 minutes thanks to neighbors!"</Text>
                <Text style={styles.featureDescription}>— Adunni, Victoria Island</Text>
              </View>
            </View>
            
            <View style={styles.communityCard}>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>🤝</Text>
                <Text style={styles.featureTitle}>"Made lifelong friends right in my compound."</Text>
                <Text style={styles.featureDescription}>— Fatima, Garki, Abuja</Text>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsCard}>
              <Text style={styles.statsTitle}>Join 50,000+ neighbors across Nigeria</Text>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>500+</Text>
                  <Text style={styles.statLabel}>Communities</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>99%</Text>
                  <Text style={styles.statLabel}>Feel Safer</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>24/7</Text>
                  <Text style={styles.statLabel}>Support</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.xl,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  progressDots: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: SPACING.xs,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
  },
  progressText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.display,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.md,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.tight,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
    paddingHorizontal: SPACING.md,
  },
  featuresSection: {
    marginBottom: SPACING.xl,
  },
  communityCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: SPACING.md,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    textAlign: 'center',
    fontWeight: '500',
  },
  statsCard: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  statsTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
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
    marginBottom: SPACING.xl,
  },
  languageSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  selectedLanguagePreview: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  previewFlag: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  previewGreeting: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
  },
  languageOptions: {
    gap: SPACING.md,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
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
  languageFlag: {
    fontSize: 24,
    marginRight: SPACING.md,
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
    marginBottom: SPACING.xs,
  },
  languageGreeting: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontStyle: 'italic',
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
  gettingStartedContent: {
    flex: 1,
    alignItems: 'center',
    paddingTop: SPACING.xl,
  },
  gettingStartedTitle: {
    fontSize: TYPOGRAPHY.fontSizes.display,
    fontWeight: '700',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.lineHeights.tight,
  },
  gettingStartedSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
    marginBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.md,
  },
  benefitsCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  benefitsTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.lg,
    textAlign: 'center',
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  benefitIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
    marginTop: 2,
  },
  benefitContent: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  benefitDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  trustIndicators: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    width: '100%',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  trustIcon: {
    fontSize: 16,
    marginRight: SPACING.md,
  },
  trustText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    flex: 1,
  },
  actionSection: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  actions: {
    marginBottom: SPACING.xl,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
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
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '600',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    alignItems: 'center',
  },
  ghostButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});