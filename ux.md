# Nigerian Community App Style Guide
*React Native/Expo Cross-Platform Design System*

## 🎨 Brand Colors

### Primary Colors
- **Primary Green**: `#00A651` - Nigeria's green, main brand color
- **Deep Green**: `#007A3D` - For pressed states, emphasis
- **Light Green**: `#E8F5E8` - Backgrounds, subtle highlights
- **Mint Green**: `#B8E6B8` - Success states, positive feedback

### Neutral Colors
- **Pure White**: `#FFFFFF` - Main background, cards
- **Off White**: `#FAFAFA` - Secondary backgrounds
- **Light Gray**: `#F5F5F5` - Dividers, disabled states
- **Medium Gray**: `#8E8E8E` - Secondary text, placeholders
- **Dark Gray**: `#2C2C2C` - Primary text, headings
- **Black**: `#000000` - High contrast text

### Accent Colors
- **Orange**: `#FF6B35` - Notifications, warnings, calls-to-action
- **Blue**: `#0066CC` - Links, information, trust indicators
- **Red**: `#E74C3C` - Errors, urgent notifications
- **Yellow**: `#FFC107` - Alerts, pending states

## 📱 Typography

### Font Families (React Native)
- **Primary**: System fonts (`-apple-system`, `Roboto`)
- **Headings**: `System` with `fontWeight: '600'` or `'700'`
- **Body**: `System` with `fontWeight: '400'`
- **Captions**: `System` with `fontWeight: '300'`

### Font Scales
```javascript
const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36
}
```

### Text Hierarchy
- **H1**: 36px, Bold, Dark Gray - Page titles
- **H2**: 30px, SemiBold, Dark Gray - Section headers
- **H3**: 24px, SemiBold, Dark Gray - Sub-sections
- **H4**: 20px, Medium, Dark Gray - Card titles
- **Body Large**: 18px, Regular, Dark Gray - Important content
- **Body**: 16px, Regular, Dark Gray - Main text
- **Body Small**: 14px, Regular, Medium Gray - Secondary text
- **Caption**: 12px, Light, Medium Gray - Helper text, timestamps

## 📐 Spacing & Layout

### Spacing Scale (React Native units)
```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64
}
```

### Layout Guidelines
- **Screen Padding**: 16px horizontal, 24px top
- **Card Padding**: 16px all sides
- **Button Padding**: 12px vertical, 24px horizontal
- **Input Padding**: 16px all sides
- **Section Spacing**: 32px between major sections
- **Item Spacing**: 16px between related items

## 🔘 Components

### Buttons

#### Primary Button
```javascript
backgroundColor: '#00A651'
color: '#FFFFFF'
borderRadius: 8
paddingVertical: 12
paddingHorizontal: 24s
fontSize: 16
fontWeight: '600'
```

#### Secondary Button
```javascript
backgroundColor: 'transparent'
borderColor: '#00A651'
borderWidth: 2
color: '#00A651'
borderRadius: 8
paddingVertical: 12
paddingHorizontal: 24
```

#### Ghost Button
```javascript
backgroundColor: 'transparent'
color: '#00A651'
paddingVertical: 8
paddingHorizontal: 16
```

### Cards
```javascript
backgroundColor: '#FFFFFF'
borderRadius: 12
shadowColor: '#000000'
shadowOpacity: 0.1
shadowRadius: 8
shadowOffset: { width: 0, height: 2 }
elevation: 3 // Android
padding: 16
marginBottom: 16
```

### Input Fields
```javascript
backgroundColor: '#FAFAFA'
borderColor: '#F5F5F5'
borderWidth: 1
borderRadius: 8
paddingVertical: 16
paddingHorizontal: 16
fontSize: 16
color: '#2C2C2C'
```

### Navigation
- **Tab Bar Height**: 60px
- **Header Height**: 44px (iOS) / 56px (Android)
- **Tab Icon Size**: 24x24px
- **Active Tab Color**: `#00A651`
- **Inactive Tab Color**: `#8E8E8E`

## 📍 Nigerian Context Elements

### Cultural Considerations
- **Language Support**: English (primary), Pidgin English phrases
- **Local References**: Use "Estate", "Area", "Community" instead of "Neighborhood"
- **Currency**: Naira (₦) symbol and formatting
- **Time Format**: 12-hour format preferred
- **Phone Format**: +234 country code support

### Common UI Patterns
- **Location Format**: "Ikeja, Lagos" or "Garki, Abuja"
- **Business Hours**: "8:00 AM - 6:00 PM" format
- **Distance**: Use kilometers (km) and meters (m)
- **Emergency Numbers**: Include local emergency services

## 🎯 UX Guidelines

### Navigation Patterns
- **Bottom Tab Navigation** for main sections
- **Stack Navigation** for drill-down flows
- **Modal Presentation** for create/edit actions
- **Swipe Gestures** for dismissible actions

### Information Architecture
1. **Home/Feed** - Community updates, local news
2. **Explore/Directory** - Local businesses, services
3. **Safety/Security** - Alerts, emergency contacts
4. **Messages** - Direct communication
5. **Profile/Account** - User settings, preferences

### Interaction States
- **Default State**: Clean, unambiguous
- **Hover State**: Subtle background color change
- **Active/Pressed**: Darker shade of primary color
- **Loading State**: Skeleton screens or spinners
- **Empty State**: Friendly illustrations with helpful text
- **Error State**: Clear error message with retry options

## 📱 Platform-Specific Guidelines

### iOS Considerations
- Use iOS-style navigation patterns
- Implement swipe-back gestures
- Follow iOS Human Interface Guidelines
- Use iOS-native modal presentations

### Android Considerations
- Material Design principles
- Use Android navigation patterns (back button)
- Implement Material shadows and elevations
- Follow Android design guidelines

## 🔧 Technical Specifications

### Image Guidelines
- **Profile Pictures**: 80x80px minimum, circular crop
- **Business Photos**: 16:9 aspect ratio preferred
- **Icons**: 24x24px for UI elements
- **Thumbnails**: 120x120px for grid layouts
- **Hero Images**: Device width, 200px height

### Performance
- **Image Optimization**: Use WebP format when possible
- **Lazy Loading**: Implement for lists and feeds
- **Caching**: Cache frequently accessed data
- **Offline Support**: Handle poor connectivity gracefully

## 🌟 Accessibility

### Requirements
- **Minimum Touch Target**: 44x44px
- **Color Contrast**: WCAG AA compliance (4.5:1 ratio)
- **Screen Reader**: Meaningful labels and hints
- **Focus Management**: Clear focus indicators
- **Font Scaling**: Support dynamic type sizing

### Implementation
- Use `accessibilityLabel` for all interactive elements
- Implement `accessibilityHint` for complex actions
- Support VoiceOver/TalkBack navigation
- Test with high contrast mode enabled

## 📋 Content Guidelines

### Tone of Voice
- **Friendly**: Warm and approachable
- **Local**: Use familiar Nigerian expressions
- **Helpful**: Focus on community benefit
- **Trustworthy**: Clear and honest communication

### Writing Style
- Use active voice
- Keep sentences short and clear
- Include local context when relevant
- Be inclusive and respectful
- Avoid jargon and technical terms

## 🚨 Safety & Trust Indicators

### Visual Trust Elements
- **Verification Badges**: Green checkmark for verified accounts
- **Security Icons**: Lock icon for secure information
- **Community Guidelines**: Clear, accessible policies
- **Reporting Features**: Easy-to-find report buttons

### Safety Features
- **User Verification**: Phone number or ID verification
- **Content Moderation**: Clear community standards
- **Privacy Controls**: Granular privacy settings
- **Block/Report**: Easy blocking and reporting tools

---

## 💡 Usage Notes for AI Agents

When using this style guide to recreate app pages:

1. **Always start with the color palette** - Use primary green (#00A651) as the main brand color
2. **Follow spacing consistently** - Use the 8px grid system (8, 16, 24, 32px)
3. **Maintain hierarchy** - Use the typography scale for clear information hierarchy
4. **Consider context** - Remember this is for Nigerian users (locations, currency, culture)
5. **Focus on community** - Emphasize local connections and neighborhood feel
6. **Prioritize safety** - Include trust indicators and safety features
7. **Mobile-first** - Design for touch interaction and small screens
8. **Test accessibility** - Ensure sufficient contrast and touch targets

This style guide should be referenced for every UI element to maintain consistency across the entire application.