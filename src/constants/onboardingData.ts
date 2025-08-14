// Onboarding Demo Data
export const ONBOARDING_DATA = {
  welcome: {
    title: "Welcome to Hommie",
    subtitle: "Your Nigerian Neighborhood Community",
    description: "Connect with neighbors, discover local events, and stay informed about your community.",
    image: require('../../assets/icon.png'), // Using existing icon as placeholder
    backgroundColor: "#00A651"
  },
  
  features: [
    {
      id: 1,
      title: "Connect with Neighbors",
      description: "Build meaningful relationships with people in your estate and surrounding areas.",
      icon: "👥",
      color: "#00A651"
    },
    {
      id: 2,
      title: "Local Events & Activities",
      description: "Discover and organize community events, meetings, and social gatherings.",
      icon: "🎉",
      color: "#FF6B35"
    },
    {
      id: 3,
      title: "Safety & Security",
      description: "Stay informed about local safety alerts and emergency situations.",
      icon: "🛡️",
      color: "#E74C3C"
    },
    {
      id: 4,
      title: "Local Marketplace",
      description: "Buy, sell, and trade with trusted neighbors in your community.",
      icon: "🛒",
      color: "#0066CC"
    }
  ],
  
  locations: [
    {
      id: 1,
      name: "Ikeja, Lagos",
      state: "Lagos",
      population: "2.5M+",
      description: "The capital of Lagos State, known for its vibrant business district and residential areas."
    },
    {
      id: 2,
      name: "Garki, Abuja",
      state: "Federal Capital Territory",
      population: "1.2M+",
      description: "A planned residential area in the heart of Nigeria's capital city."
    },
    {
      id: 3,
      name: "Victoria Island, Lagos",
      state: "Lagos",
      population: "1.8M+",
      description: "An affluent residential and business district on Lagos Island."
    },
    {
      id: 4,
      name: "Wuse, Abuja",
      state: "Federal Capital Territory",
      population: "900K+",
      description: "A bustling commercial and residential zone in central Abuja."
    },
    {
      id: 5,
      name: "Lekki, Lagos",
      state: "Lagos",
      population: "2.1M+",
      description: "A rapidly growing residential area known for its modern developments."
    }
  ],
  
  neighborhoods: [
    {
      id: 1,
      name: "Allen Avenue Estate",
      city: "Ikeja",
      state: "Lagos",
      type: "Residential Estate",
      description: "A well-planned residential estate with modern amenities and community facilities."
    },
    {
      id: 2,
      name: "Garki II",
      city: "Garki",
      state: "Federal Capital Territory",
      type: "Residential Area",
      description: "A peaceful residential neighborhood with parks and shopping centers."
    },
    {
      id: 3,
      name: "Banana Island",
      city: "Victoria Island",
      state: "Lagos",
      type: "Luxury Estate",
      description: "An exclusive residential island known for luxury homes and waterfront views."
    },
    {
      id: 4,
      name: "Wuse Zone 2",
      city: "Wuse",
      state: "Federal Capital Territory",
      type: "Mixed Use",
      description: "A vibrant area combining residential, commercial, and entertainment spaces."
    }
  ],
  
  verificationMethods: [
    {
      id: 1,
      title: "Phone Verification",
      description: "Verify your account using your mobile phone number",
      icon: "📱",
      method: "phone",
      estimatedTime: "2-3 minutes"
    },
    {
      id: 2,
      title: "Postcard Verification",
      description: "Receive a verification code via physical mail",
      icon: "📮",
      method: "postcard",
      estimatedTime: "3-5 business days"
    },
    {
      id: 3,
      title: "Location Verification",
      description: "Verify by confirming your current location",
      icon: "📍",
      method: "location",
      estimatedTime: "1-2 minutes"
    }
  ],
  
  communityBenefits: [
    "Find lost pets quickly with neighborhood alerts",
    "Get recommendations for local services",
    "Stay informed about community events",
    "Connect with neighbors for safety",
    "Discover local businesses and deals",
    "Organize community activities",
    "Share important local news",
    "Build lasting friendships"
  ]
};

// Sample user data for onboarding
export const SAMPLE_USER = {
  fullName: "Adebayo Okeowo",
  phoneNumber: "+234 801 234 5678",
  email: "adebayo.okeowo@email.com",
  neighborhood: "Allen Avenue Estate, Ikeja, Lagos",
  profilePicture: null,
  isVerified: false
};

// Sample invitation codes for testing
export const SAMPLE_INVITATION_CODES = [
  "HOMIE2024",
  "LAGOS001",
  "ABUJA2024",
  "COMMUNITY",
  "NEIGHBOR"
];

// Sample zip codes for Nigerian locations
export const SAMPLE_ZIP_CODES = [
  "100001", // Lagos
  "900001", // Abuja
  "500001", // Port Harcourt
  "400001", // Kano
  "300001"  // Ibadan
];
