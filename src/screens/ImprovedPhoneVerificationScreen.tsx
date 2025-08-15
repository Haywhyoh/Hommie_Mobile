import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants';

const NIGERIAN_CARRIERS = [
  { 
    name: 'MTN', 
    codes: ['0803', '0806', '0813', '0814', '0816', '0810', '0703', '0706', '0903', '0906'],
    color: '#FFCC00',
    ussd: '*123#'
  },
  { 
    name: 'Airtel', 
    codes: ['0802', '0808', '0812', '0701', '0902', '0901', '0904', '0907'],
    color: '#ED1C24',
    ussd: '*121#'
  },
  { 
    name: 'Glo', 
    codes: ['0805', '0807', '0811', '0815', '0705', '0905'],
    color: '#00A651',
    ussd: '*777#'
  },
  { 
    name: '9mobile', 
    codes: ['0809', '0817', '0818', '0908', '0909'],
    color: '#00AC4E',
    ussd: '*200#'
  },
];

export default function ImprovedPhoneVerificationScreen({ navigation, route }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+234');
  const [detectedCarrier, setDetectedCarrier] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const language = route.params?.language || 'en';

  // Detect carrier based on phone number prefix
  useEffect(() => {
    if (phoneNumber.length >= 4) {
      const prefix = phoneNumber.substring(0, 4);
      const carrier = NIGERIAN_CARRIERS.find(c => c.codes.includes(prefix));
      setDetectedCarrier(carrier || null);
    } else {
      setDetectedCarrier(null);
    }
  }, [phoneNumber]);

  const handleSubmit = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Invalid Number', 'Please enter a valid Nigerian phone number (10-11 digits)');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual phone verification logic
      console.log('Phone verification submitted:', { countryCode, phoneNumber, carrier: detectedCarrier?.name });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      navigation.navigate('OTPVerification', { 
        phoneNumber: `${countryCode}${phoneNumber}`,
        carrier: detectedCarrier?.name || 'Unknown',
        carrierUssd: detectedCarrier?.ussd || '*123#',
        language 
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Phone Verification?',
      'Phone verification helps keep our community safe and connects you with verified neighbors. You can still proceed, but some features may be limited.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip for Now', onPress: () => navigation.navigate('LocationSetup', { language, phoneVerified: false }) }
      ]
    );
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 11 digits
    const limited = cleaned.slice(0, 11);
    
    return limited;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Progress indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressDots}>
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <View style={[styles.progressDot, styles.progressDotActive]} />
              <View style={[styles.progressDot, styles.progressDotActive]} />
            </View>
            <Text style={styles.progressText}>Step 4 of 4</Text>
          </View>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={handleSkip}
            >
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.title}>
              Keep your community safe
            </Text>
            
            <Text style={styles.description}>
              Phone verification helps us connect you with verified neighbors and keeps fake accounts out of your community.
            </Text>

            {/* Phone Input Card */}
            <View style={styles.phoneCard}>
              <View style={styles.countryCodeContainer}>
                <Text style={styles.countryFlag}>🇳🇬</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
              </View>
              
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.inputLabel}>Mobile phone number</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="e.g., 8012345678"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
                  keyboardType="phone-pad"
                  maxLength={11}
                  placeholderTextColor={COLORS.textSecondary}
                  autoFocus={true}
                  clearButtonMode="while-editing"
                />
                
                {/* Carrier Detection */}
                {detectedCarrier && (
                  <View style={styles.carrierIndicator}>
                    <View style={[styles.carrierDot, { backgroundColor: detectedCarrier.color }]} />
                    <Text style={styles.carrierText}>{detectedCarrier.name} detected</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Benefits */}
            <View style={styles.benefitsContainer}>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🛡️</Text>
                <Text style={styles.benefitText}>Verified neighbors only</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>🚨</Text>
                <Text style={styles.benefitText}>Emergency contact system</Text>
              </View>
              <View style={styles.benefitItem}>
                <Text style={styles.benefitIcon}>📱</Text>
                <Text style={styles.benefitText}>Quick community alerts</Text>
              </View>
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>ℹ️</Text>
              <Text style={styles.infoText}>
                We'll send a 6-digit code via SMS. Standard message rates may apply. Your number stays private.
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              (phoneNumber.length < 10 || isLoading) && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            disabled={phoneNumber.length < 10 || isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Sending Code...' : 'Send Verification Code'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  progressDots: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backButton: {
    padding: SPACING.sm,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '600',
  },
  skipButton: {
    padding: SPACING.sm,
  },
  skipText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    paddingTop: SPACING.lg,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
    lineHeight: TYPOGRAPHY.lineHeights.tight,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
    marginBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.sm,
  },
  phoneCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.medium,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  countryFlag: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  countryCode: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.text,
    fontWeight: '600',
  },
  phoneInputWrapper: {
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  phoneInput: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    color: COLORS.text,
    textAlign: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    fontWeight: '600',
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  carrierIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.lightGreen,
    borderRadius: BORDER_RADIUS.md,
  },
  carrierDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  carrierText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  benefitsContainer: {
    marginBottom: SPACING.xl,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  benefitText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightGreen,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xl,
    ...SHADOWS.small,
  },
  infoIcon: {
    fontSize: 16,
    marginRight: SPACING.md,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  submitButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
  },
});