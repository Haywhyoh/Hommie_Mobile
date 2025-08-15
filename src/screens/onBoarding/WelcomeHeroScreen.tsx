import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  Image, 
  ScrollView 
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants';

const COMMUNITY_STATS = [
  { number: '50K+', label: 'Neighbors Connected' },
  { number: '500+', label: 'Communities Served' },
  { number: '99%', label: 'Feel Safer' },
];

const SUCCESS_STORIES = [
  {
    text: "Found my lost cat in 30 minutes thanks to my neighbors!",
    author: "Adunni, Victoria Island"
  },
  {
    text: "Our estate security improved 90% after joining Hommie.",
    author: "Mr. Emeka, Lekki Phase 1"
  },
  {
    text: "Made lifelong friends right in my compound.",
    author: "Fatima, Garki, Abuja"
  }
];

export default function WelcomeHeroScreen({ navigation }: any) {
  const handleGetStarted = () => {
    navigation.navigate('WelcomeLanguage');
  };

  const handleSignIn = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <View 
        style={styles.scrollView}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={require('../../../assets/icon.png')} style={styles.logo} />
          
          <Text style={styles.heroTitle}>
            Welcome to your{'\n'}digital neighborhood
          </Text>
          
          <Text style={styles.heroSubtitle}>
            Connect with neighbors, stay safe, and build stronger communities across Nigeria
          </Text>

          {/* Community Stats */}
          <View style={styles.statsContainer}>
            {COMMUNITY_STATS.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statNumber}>{stat.number}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

      
      </View>

      {/* Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
          <Text style={styles.primaryButtonText}>Join Your Community</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.secondaryButton} onPress={handleSignIn}>
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Free to join • Nigerian-owned • Community-first
        </Text>
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
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  heroSection: {
    alignItems: 'center',
    paddingBottom: SPACING.xxxl,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: SPACING.xl,
    borderRadius: BORDER_RADIUS.xl,
    ...SHADOWS.medium,
  },
  heroTitle: {
    fontSize: TYPOGRAPHY.fontSizes.display,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.lg,
    lineHeight: TYPOGRAPHY.lineHeights.tight,
  },
  heroSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
    marginBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.xl,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    ...SHADOWS.small,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  statLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.tight,
  },
  featuresSection: {
    marginBottom: SPACING.xxxl,
  },
  featureCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
    color: COLORS.text,
    flex: 1,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  storiesSection: {
    marginBottom: SPACING.xxxl,
  },
  storiesTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  storyCard: {
    backgroundColor: COLORS.offWhite,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  storyText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    fontStyle: 'italic',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
    marginBottom: SPACING.sm,
  },
  storyAuthor: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  trustSection: {
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  trustIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  trustText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
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
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
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
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '600',
  },
  footerText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});