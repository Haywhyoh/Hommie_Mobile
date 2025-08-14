import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../constants';
import { ONBOARDING_DATA, SAMPLE_INVITATION_CODES, SAMPLE_ZIP_CODES } from '../constants/onboardingData';

const { width, height } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  component: React.ReactNode;
}

export default function OnboardingScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(0);
  const [invitationCode, setInvitationCode] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('Nigeria');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      scrollViewRef.current?.scrollTo({ x: (currentStep + 1) * width, animated: true });
    } else {
      // Complete onboarding
      navigation.navigate('Login');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      scrollViewRef.current?.scrollTo({ x: (currentStep - 1) * width, animated: true });
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Welcome - always valid
        return true;
      case 1: // Invitation
        return invitationCode.trim().length > 0 && zipCode.trim().length > 0;
      case 2: // Location
        return selectedLocation.trim().length > 0;
      case 3: // Address
        return streetAddress.trim().length > 0;
      case 4: // Verification
        return verificationMethod.trim().length > 0;
      case 5: // Phone
        return phoneNumber.trim().length >= 10;
      default:
        return true;
    }
  };

  const WelcomeStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.welcomeHeader}>
        <Image source={ONBOARDING_DATA.welcome.image} style={styles.welcomeImage} />
        <Text style={styles.welcomeTitle}>{ONBOARDING_DATA.welcome.title}</Text>
        <Text style={styles.welcomeSubtitle}>{ONBOARDING_DATA.welcome.subtitle}</Text>
        <Text style={styles.welcomeDescription}>{ONBOARDING_DATA.welcome.description}</Text>
      </View>
      
      <View style={styles.featuresContainer}>
        {ONBOARDING_DATA.features.map((feature) => (
          <View key={feature.id} style={styles.featureItem}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  const InvitationStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Join Your Community</Text>
        <Text style={styles.stepSubtitle}>
          If you have received an invitation code from a neighbor, enter it here
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country</Text>
          <TouchableOpacity style={styles.countrySelector}>
            <Text style={styles.countryText}>🇳🇬 {selectedCountry}</Text>
            <Text style={styles.chevron}>▼</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter zip code"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
            maxLength={6}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Invitation Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter invitation code"
            value={invitationCode}
            onChangeText={setInvitationCode}
            autoCapitalize="characters"
            maxLength={10}
          />
        </View>
      </View>

      <View style={styles.demoDataContainer}>
        <Text style={styles.demoDataTitle}>Demo Data (for testing):</Text>
        <Text style={styles.demoDataText}>Zip: {SAMPLE_ZIP_CODES[0]}</Text>
        <Text style={styles.demoDataText}>Code: {SAMPLE_INVITATION_CODES[0]}</Text>
      </View>
    </View>
  );

  const LocationStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Choose Your Location</Text>
        <Text style={styles.stepSubtitle}>
          Select your city and state to connect with your local community
        </Text>
      </View>

      <View style={styles.locationContainer}>
        {ONBOARDING_DATA.locations.map((location) => (
          <TouchableOpacity
            key={location.id}
            style={[
              styles.locationItem,
              selectedLocation === location.name && styles.locationItemSelected
            ]}
            onPress={() => setSelectedLocation(location.name)}
          >
            <View style={styles.locationHeader}>
              <Text style={styles.locationName}>{location.name}</Text>
              <Text style={styles.locationPopulation}>{location.population}</Text>
            </View>
            <Text style={styles.locationState}>{location.state}</Text>
            <Text style={styles.locationDescription}>{location.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const AddressStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Confirm Your Address</Text>
        <Text style={styles.stepSubtitle}>
          Help us verify your neighborhood to ensure you connect with the right community
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Street Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your street address"
            value={streetAddress}
            onChangeText={setStreetAddress}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Apartment/Unit (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Apartment, suite, etc."
            value={apartment}
            onChangeText={setApartment}
          />
        </View>

        <View style={styles.privacyNotice}>
          <Text style={styles.privacyIcon}>🔒</Text>
          <Text style={styles.privacyText}>
            Your address won't be seen by others. You can change this setting anytime.
          </Text>
        </View>
      </View>

      <View style={styles.neighborhoodContainer}>
        <Text style={styles.neighborhoodTitle}>Suggested Neighborhoods:</Text>
        {ONBOARDING_DATA.neighborhoods
          .filter(n => n.city === selectedLocation.split(',')[0])
          .map((neighborhood) => (
            <TouchableOpacity
              key={neighborhood.id}
              style={[
                styles.neighborhoodItem,
                selectedNeighborhood === neighborhood.name && styles.neighborhoodItemSelected
              ]}
              onPress={() => setSelectedNeighborhood(neighborhood.name)}
            >
              <Text style={styles.neighborhoodName}>{neighborhood.name}</Text>
              <Text style={styles.neighborhoodType}>{neighborhood.type}</Text>
              <Text style={styles.neighborhoodDescription}>{neighborhood.description}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );

  const VerificationStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Verify Your Account</Text>
        <Text style={styles.stepSubtitle}>
          To ensure a trusted environment for Hommie, each neighbor must verify their account
        </Text>
      </View>

      <View style={styles.verificationContainer}>
        {ONBOARDING_DATA.verificationMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.verificationItem,
              verificationMethod === method.method && styles.verificationItemSelected
            ]}
            onPress={() => setVerificationMethod(method.method)}
          >
            <Text style={styles.verificationIcon}>{method.icon}</Text>
            <View style={styles.verificationContent}>
              <Text style={styles.verificationTitle}>{method.title}</Text>
              <Text style={styles.verificationDescription}>{method.description}</Text>
              <Text style={styles.verificationTime}>{method.estimatedTime}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.verificationBenefits}>
        <Text style={styles.benefitsTitle}>Verifying allows you to:</Text>
        {ONBOARDING_DATA.communityBenefits.slice(0, 4).map((benefit, index) => (
          <View key={index} style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>{benefit}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const PhoneStep = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Phone Verification</Text>
        <Text style={styles.stepSubtitle}>
          Please enter your mobile phone number to verify your account
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile Phone Number</Text>
          <View style={styles.phoneInputContainer}>
            <TouchableOpacity style={styles.countryCodeSelector}>
              <Text style={styles.countryCodeText}>🇳🇬 +234</Text>
              <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>
      </View>

      <View style={styles.phoneNote}>
        <Text style={styles.phoneNoteText}>
          We'll send a verification code to this number to confirm your account.
        </Text>
      </View>
    </View>
  );

  const onboardingSteps: OnboardingStep[] = [
    { id: 1, title: 'Welcome', component: <WelcomeStep /> },
    { id: 2, title: 'Invitation', component: <InvitationStep /> },
    { id: 3, title: 'Location', component: <LocationStep /> },
    { id: 4, title: 'Address', component: <AddressStep /> },
    { id: 5, title: 'Verification', component: <VerificationStep /> },
    { id: 6, title: 'Phone', component: <PhoneStep /> },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                index === currentStep && styles.progressDotActive
              ]}
            />
          ))}
        </View>
        
        <View style={styles.stepIndicator}>
          <Text style={styles.stepText}>{currentStep + 1} of {onboardingSteps.length}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.scrollView}
        >
          {onboardingSteps.map((step, index) => (
            <View key={step.id} style={styles.stepWrapper}>
              {step.component}
            </View>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            onPress={handleNext}
            style={[
              styles.nextButton,
              !validateStep(currentStep) && styles.nextButtonDisabled
            ]}
            disabled={!validateStep(currentStep)}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
            </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  skipButton: {
    padding: SPACING.sm,
  },
  skipText: {
    color: COLORS.primary,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 2,
  },
  progressDotActive: {
    backgroundColor: COLORS.primary,
    width: 24,
  },
  stepIndicator: {
    padding: SPACING.sm,
  },
  stepText: {
    color: COLORS.mediumGray,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  stepWrapper: {
    width,
    flex: 1,
  },
  stepContainer: {
    flex: 1,
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
  },
  stepHeader: {
    marginBottom: SPACING.xl,
  },
  stepTitle: {
    fontSize: TYPOGRAPHY.fontSizes.xxxl,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.mediumGray,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  welcomeImage: {
    width: 120,
    height: 120,
    marginBottom: SPACING.lg,
  },
  welcomeTitle: {
    fontSize: TYPOGRAPHY.fontSizes.display,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
    color: COLORS.primary,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: TYPOGRAPHY.fontSizes.xl,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  welcomeDescription: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.mediumGray,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.relaxed,
  },
  featuresContainer: {
    marginTop: SPACING.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.offWhite,
    borderRadius: BORDER_RADIUS.md,
  },
  featureIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  featureDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.mediumGray,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  formContainer: {
    marginBottom: SPACING.xl,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.darkGray,
  },
  countrySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  countryText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.darkGray,
  },
  chevron: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.mediumGray,
  },
  demoDataContainer: {
    backgroundColor: COLORS.lightGreen,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
  },
  demoDataTitle: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  demoDataText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  locationContainer: {
    marginTop: SPACING.md,
  },
  locationItem: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  locationItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  locationName: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
  },
  locationPopulation: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  locationState: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.mediumGray,
    marginBottom: SPACING.xs,
  },
  locationDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.mediumGray,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  privacyNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.lightGreen,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
  },
  privacyIcon: {
    fontSize: TYPOGRAPHY.fontSizes.lg,
    marginRight: SPACING.sm,
    marginTop: 2,
  },
  privacyText: {
    flex: 1,
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.darkGray,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  neighborhoodContainer: {
    marginTop: SPACING.lg,
  },
  neighborhoodTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
  },
  neighborhoodItem: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  neighborhoodItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
  },
  neighborhoodName: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  neighborhoodType: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  neighborhoodDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.mediumGray,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  verificationContainer: {
    marginBottom: SPACING.xl,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    ...SHADOWS.small,
  },
  verificationItemSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightGreen,
  },
  verificationIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  verificationContent: {
    flex: 1,
  },
  verificationTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
    marginBottom: SPACING.xs,
  },
  verificationDescription: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.mediumGray,
    marginBottom: SPACING.xs,
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  verificationTime: {
    fontSize: TYPOGRAPHY.fontSizes.xs,
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  verificationBenefits: {
    backgroundColor: COLORS.offWhite,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
  },
  benefitsTitle: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
    color: COLORS.darkGray,
    marginBottom: SPACING.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  benefitIcon: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.primary,
    marginRight: SPACING.sm,
    fontWeight: TYPOGRAPHY.fontWeights.bold,
  },
  benefitText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.darkGray,
    flex: 1,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.sm,
    minWidth: 100,
  },
  countryCodeText: {
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.darkGray,
    marginRight: SPACING.xs,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    fontSize: TYPOGRAPHY.fontSizes.md,
    color: COLORS.darkGray,
  },
  phoneNote: {
    backgroundColor: COLORS.lightGreen,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginTop: SPACING.lg,
  },
  phoneNoteText: {
    fontSize: TYPOGRAPHY.fontSizes.sm,
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: TYPOGRAPHY.lineHeights.normal,
  },
  footer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  backButtonText: {
    color: COLORS.darkGray,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.medium,
  },
  nextButton: {
    flex: 1,
    marginLeft: SPACING.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: COLORS.lightGray,
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSizes.md,
    fontWeight: TYPOGRAPHY.fontWeights.semibold,
  },
});
