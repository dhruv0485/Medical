export const COLORS = {
  primary: '#6BB9F0',       // Light blue - primary color
  secondary: '#A2DED0',     // Light green - secondary color
  accent: '#F9D9CA',        // Soft peach - accent color
  background: '#F5F7FA',    // Off-white - background color
  white: '#FFFFFF',         // Pure white
  text: '#333333',          // Dark gray - primary text
  textLight: '#666666',     // Medium gray - secondary text
  border: '#E0E0E0',        // Light gray - borders
  error: '#F08080',         // Light red - error messages
  success: '#90EE90',       // Light green - success messages
  shadow: '#000000',        // Shadow color
  transparent: 'transparent',
  emergency: '#FF5252',     // Bright red for emergency/SOS buttons
  doctorConnect: '#7986CB', // Soft purple for doctor connect feature
  medicationReminder: '#81C784', // Soft green for medication reminders
  seizureDiary: '#FFB74D',  // Soft orange for seizure diary
  howToUse: '#9575CD',      // Soft purple for how to use section
  overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay for modals
};

export const FONT_SIZES = {
  xsmall: 12,
  small: 14,
  medium: 16,
  large: 18,
  xlarge: 22,
  xxlarge: 28,
};

export const SPACING = {
  xsmall: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
};

export const BORDER_RADIUS = {
  small: 4,
  medium: 8,
  large: 16,
  xlarge: 24,
  round: 1000,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
};