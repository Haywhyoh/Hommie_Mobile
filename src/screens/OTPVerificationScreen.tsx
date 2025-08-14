import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants';

export default function OTPVerificationScreen({ navigation, route }: any) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const phoneNumber = route.params?.phoneNumber || '08012345678';
  const carrier = route.params?.carrier || 'Unknown';
  const language = route.params?.language || 'en';

  // Create refs for OTP input fields
  const otpRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Check if OTP is complete
  useEffect(() => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      // Auto-verify when all 6 digits are entered
      setTimeout(() => {
        handleVerify();
      }, 500);
    }
  }, [otp]);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow single digits
    if (value.length > 1) {
      value = value.slice(-1); // Take only the last character
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input if a digit was entered
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    
    // Auto-focus previous input if digit was deleted and we're not at the first input
    if (!value && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      setIsVerifying(true);
      
      try {
        // TODO: Implement OTP verification logic
        console.log('OTP verified:', otpString);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        Alert.alert('Success', 'Phone number verified successfully!', [
          { text: 'Continue', onPress: () => navigation.navigate('LocationSetup', { language }) }
        ]);
      } catch (error) {
        Alert.alert('Error', 'Failed to verify OTP. Please try again.');
      } finally {
        setIsVerifying(false);
      }
    } else {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
    }
  };

  const handleResend = () => {
    if (canResend) {
      // TODO: Implement resend OTP logic
      console.log('Resending OTP to:', phoneNumber);
      setTimeLeft(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      Alert.alert('OTP Sent', 'A new verification code has been sent to your phone');
    }
  };

  const handleCallMe = () => {
    Alert.alert(
      'Call Me Instead',
      `We'll call you at ${phoneNumber} with a verification code.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Me', onPress: () => {
          // TODO: Implement call-me verification
          Alert.alert('Call Initiated', 'You will receive a call shortly with your verification code.');
        }}
      ]
    );
  };

  const handleUSSD = () => {
    Alert.alert(
      'USSD Verification',
      `Dial *123*1# on your ${carrier} line to verify your number.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'I\'ve Done This', onPress: () => {
          // TODO: Check USSD verification status
          navigation.navigate('LocationSetup', { language });
        }}
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Verify your phone number</Text>
          </View>

          {/* Main Content */}
          <View style={styles.mainContent}>
            <Text style={styles.description}>
              We've sent a 6-digit verification code to
            </Text>
            
            <Text style={styles.phoneNumber}>
              {phoneNumber}
            </Text>

            <Text style={styles.instruction}>
              Enter the code below to verify your account
            </Text>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) otpRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    digit && styles.otpInputFilled
                  ]}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  keyboardType="numeric"
                  maxLength={1}
                  textAlign="center"
                  placeholder="0"
                  placeholderTextColor={COLORS.textSecondary}
                  onKeyPress={({ nativeEvent }) => {
                    // Handle backspace
                    if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                      otpRefs.current[index - 1]?.focus();
                    }
                  }}
                />
              ))}
            </View>

            {/* Timer and Resend */}
            <View style={styles.timerContainer}>
              {!canResend ? (
                <Text style={styles.timerText}>
                  Resend code in {formatTime(timeLeft)}
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResend}>
                  <Text style={styles.resendText}>Resend code</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Fallback Options */}
            <View style={styles.fallbackSection}>
              <Text style={styles.fallbackTitle}>Didn't get the code?</Text>
              
              <TouchableOpacity style={styles.fallbackOption} onPress={handleCallMe}>
                <Text style={styles.fallbackIcon}>📞</Text>
                <View style={styles.fallbackInfo}>
                  <Text style={styles.fallbackText}>Call me instead</Text>
                  <Text style={styles.fallbackSubtext}>We'll call you with the code</Text>
                </View>
                <Text style={styles.fallbackArrow}>→</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.fallbackOption} onPress={handleUSSD}>
                <Text style={styles.fallbackIcon}>🔢</Text>
                <View style={styles.fallbackInfo}>
                  <Text style={styles.fallbackText}>Use USSD code</Text>
                  <Text style={styles.fallbackSubtext}>Dial *123*1# on your {carrier} line</Text>
                </View>
                <Text style={styles.fallbackArrow}>→</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            style={[
              styles.verifyButton, 
              (otp.join('').length < 6 || isVerifying) && styles.verifyButtonDisabled
            ]} 
            onPress={handleVerify}
            disabled={otp.join('').length < 6 || isVerifying}
          >
            <Text style={styles.verifyButtonText}>
              {isVerifying ? 'Verifying...' : 'Verify'}
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
  header: {
    marginBottom: SPACING.xl,
  },
  backButton: {
    marginBottom: SPACING.md,
  },
  backButtonText: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '600',
  },
  title: {
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 32,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xxxl,
  },
  description: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  phoneNumber: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },
  instruction: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 300,
    marginBottom: SPACING.xl,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    fontSize: TYPOGRAPHY.fontSizes.xxl,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.xs,
  },
  otpInputFilled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  timerText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
  },
  resendText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  fallbackSection: {
    width: '100%',
    marginTop: SPACING.lg,
  },
  fallbackTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  fallbackOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  fallbackIcon: {
    fontSize: 20,
    marginRight: SPACING.md,
  },
  fallbackInfo: {
    flex: 1,
  },
  fallbackText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  fallbackSubtext: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.textSecondary,
  },
  fallbackArrow: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    color: COLORS.primary,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    ...SHADOWS.medium,
  },
  verifyButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  verifyButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: '600',
  },
});
