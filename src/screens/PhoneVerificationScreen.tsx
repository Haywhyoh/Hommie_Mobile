import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants';

export default function PhoneVerificationScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+234');

  const handleSubmit = () => {
    if (phoneNumber.length >= 10) {
      // TODO: Implement phone verification logic
      console.log('Phone verification submitted:', { countryCode, phoneNumber });
      // Navigate to OTP verification or next step
      navigation.navigate('OTPVerification', { phoneNumber: `${countryCode}${phoneNumber}` });
    }
  };

  const handleSkip = () => {
    // TODO: Handle skip logic
    console.log('Phone verification skipped');
    navigation.navigate('AddressConfirmation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
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
              Please enter your mobile phone number to verify your account
            </Text>
            
            <Text style={styles.description}>
              To keep Hommie Lagos safe and secure, all neighbors need to verify their account.
            </Text>

            {/* Phone Input */}
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity style={styles.countryCodeSelector}>
                <Text style={styles.countryFlag}>🇳🇬</Text>
                <Text style={styles.countryCode}>{countryCode}</Text>
                <Text style={styles.chevron}>▼</Text>
              </TouchableOpacity>
              
              <View style={styles.phoneInputWrapper}>
                <Text style={styles.inputLabel}>Mobile phone number</Text>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={11}
                  placeholderTextColor={COLORS.textSecondary}
                />
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              phoneNumber.length < 10 && styles.submitButtonDisabled
            ]} 
            onPress={handleSubmit}
            disabled={phoneNumber.length < 10}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
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
  header: {
    alignItems: 'flex-end',
    marginBottom: SPACING.xl,
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
    justifyContent: 'center',
    marginBottom: SPACING.xxxl,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 36,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.md,
  },
  phoneInputContainer: {
    marginBottom: SPACING.xl,
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  countryFlag: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  countryCode: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.text,
    fontWeight: '500',
    marginRight: SPACING.sm,
  },
  chevron: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
  },
  phoneInputWrapper: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.blue,
    paddingBottom: SPACING.sm,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  phoneInput: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    color: COLORS.text,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
  submitButton: {
    backgroundColor: '#E8F5E8',
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  submitButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  submitButtonText: {
    color: COLORS.text,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '600',
  },
});
