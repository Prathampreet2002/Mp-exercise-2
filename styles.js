import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF2D75',        // Electric violet
    accent: '#00E676',         // Cyan neon accent
    background: '#0A0A12',     // Deep space black
    surface: '#1A1A2E',        // Dark cosmic purple
    error: '#FF2D75',          // Hot pink error
    text: '#00E676',           // Lavender mist text
    onSurface: '#FFFFFF',       // Pure white for contrast
    disabled: '#4A4A6A',       // Muted cosmic gray
    placeholder: '#6D6D8A',    // Galactic placeholder
    backdrop: '#000000CC',     // Dark overlay
    notification: '#FF9F43',   // Supernova orange
    cardGradientStart: '#00FFFF',  // Royal purple gradient
    cardGradientEnd: '#3A0CA3',    // Deep blue gradient
    success: '#00E676',        // Matrix green
    warning: '#FFCA28',        // Golden warning
    eliteGold: '#FFD700',      // Premium gold accent
    holographicBlue: '#00FFFF', // Cyberpunk blue
  },
  roundness: 40,               // Ultra-rounded corners
  spacing: {
    nano: 4,
    micro: 8,
    small: 12,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 48,
  },
  typography: {
    mega: {
      fontSize: 32,
      fontWeight: '900',
      fontFamily: 'sans-serif-condensed',
    },
    header: {
      fontSize: 28,
      fontWeight: '800',
      fontFamily: 'sans-serif-medium',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      fontFamily: 'sans-serif-medium',
    },
    body: {
      fontSize: 16,
      fontWeight: '500',
      fontFamily: 'sans-serif',
    },
    caption: {
      fontSize: 12,
      fontWeight: '300',
      fontFamily: 'sans-serif-light',
    },
  },
  effects: {
    glow: {
      textShadowColor: 'rgba(0, 245, 255, 0.7)',
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 10,
    },
    holographic: {
      shadowColor: '#00FFFF',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
    },
    eliteBorder: {
      borderWidth: 2,
      borderColor: '#FFD700',
    },
  },
};

export const appStyles = {
  // SCREEN LAYOUT
  cosmicContainer: {
    flex: 1,
    padding: theme.spacing.medium,
    backgroundColor: theme.colors.background,
  },

  // HEADER STYLES
  cyberHeader: {
    backgroundColor: 'transparent',
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
  headerTitle: {
    ...theme.typography.header,
    color: theme.colors.eliteGold,
    ...theme.effects.glow,
  },

  // BUTTONS
  neonButton: {
    marginVertical: theme.spacing.small,
    borderRadius: theme.roundness,
    paddingVertical: theme.spacing.small,
    backgroundColor: 'transparent',
    ...theme.effects.holographic,
    ...theme.effects.eliteBorder,
  },
  buttonTextNeon: {
    ...theme.typography.body,
    color: theme.colors.holographicBlue,
    textAlign: 'center',
    ...theme.effects.glow,
  },

  // CARDS
  galaxyCard: {
    margin: theme.spacing.small,
    padding: theme.spacing.medium,
    borderRadius: theme.roundness,
    backgroundColor: theme.colors.surface,
    ...theme.effects.holographic,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  cardTitle: {
    ...theme.typography.title,
    color: theme.colors.accent,
    marginBottom: theme.spacing.small,
  },

  // INPUTS
  futuristicInput: {
    marginVertical: theme.spacing.small,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
    borderRadius: theme.roundness,
    paddingHorizontal: theme.spacing.medium,
    height: 60,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    color: theme.colors.text,
    ...theme.effects.holographic,
  },

  // FAB
  cosmicFAB: {
    position: 'absolute',
    margin: theme.spacing.large,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    ...theme.effects.eliteBorder,
    ...theme.effects.holographic,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // SPECIAL EFFECTS
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: theme.roundness,
    opacity: 0.1,
    backgroundGradient: `linear-gradient(135deg, ${theme.colors.cardGradientStart}, ${theme.colors.cardGradientEnd})`,
  },
};