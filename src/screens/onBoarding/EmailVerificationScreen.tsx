import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants';

export default function EmailVerificationScreen({ navigation, route }: any) {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const { email, firstName, lastName, isSignup, onLoginSuccess } = route.params || {};

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter the 6-digit verification code');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Implement actual verification logic
      console.log('Email verification submitted:', { email, code: verificationCode });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (isSignup) {
        // For signup flow, continue to phone verification
        navigation.navigate('PhoneVerification', { 
          language: 'en', 
          signupMethod: 'email',
          isSignup: true,
          userDetails: { firstName, lastName, email }
        });
      } else {
        // For login flow, go directly to home
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          Alert.alert('Success', 'Email verified successfully!');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    try {
      // TODO: Implement resend verification code logic
      console.log('Resending verification code to:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTimer(60);
      setCanResend(false);
      Alert.alert('Code Sent', 'A new verification code has been sent to your email');
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Verify Your Email</Text>
              <Text style={styles.subtitle}>
                We've sent a 6-digit code to{'\n'}
                <Text style={styles.emailText}>{email}</Text>
              </Text>
            </View>

            {/* Code Input Section */}
            <View style={styles.codeSection}>
              <Text style={styles.inputLabel}>Verification Code</Text>
              <TextInput
                style={styles.codeInput}
                placeholder="000000"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                maxLength={6}
                textAlign="center"
                placeholderTextColor={COLORS.textSecondary}
                autoFocus
              />
              
              {/* Resend Code */}
              <View style={styles.resendContainer}>
                {canResend ? (
                  <TouchableOpacity onPress={handleResendCode}>
                    <Text style={styles.resendText}>Resend Code</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.timerText}>
                    Resend code in {timer}s
                  </Text>
                )}
              </View>
            </View>
          </View>

          {/* Verify Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.verifyButton, 
                (verificationCode.length !== 6 || isLoading) && styles.verifyButtonDisabled
              ]} 
              onPress={handleVerifyCode}
              disabled={verificationCode.length !== 6 || isLoading}
            >
              <Text style={[
                styles.verifyButtonText,
                (verificationCode.length !== 6 || isLoading) && styles.verifyButtonTextDisabled
              ]}>
                {isLoading ? 'Verifying...' : 'Verify Email'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.changeEmailButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.changeEmailText}>Change Email Address</Text>
            </TouchableOpacity>
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    height: 44,
  },
  backButton: {
    padding: SPACING.sm,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    paddingTop: SPACING.xl,
  },
  titleContainer: {
    marginBottom: SPACING.xxxl,
    alignItems: 'center',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.xxxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },
  emailText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  codeSection: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  inputLabel: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: SPACING.lg,
  },
  codeInput: {
    backgroundColor: COLORS.lightGray,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    color: COLORS.text,
    fontWeight: '600',
    letterSpacing: 4,
    minWidth: 200,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  resendContainer: {
    marginTop: SPACING.lg,
    alignItems: 'center',
  },
  resendText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: '600',
  },
  timerText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
  },
  buttonContainer: {
    paddingBottom: SPACING.xl,
    paddingTop: SPACING.md,
  },
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.lg,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  verifyButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  verifyButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
  },
  verifyButtonTextDisabled: {
    color: COLORS.textSecondary,
  },
  changeEmailButton: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  changeEmailText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.primary,
    fontWeight: '500',
  },
});