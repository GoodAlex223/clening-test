import type { ThemeConfig } from './types'

export const boldTheme: ThemeConfig = {
  id: 'bold',
  displayName: 'Bold Spark',
  description: 'Energetic, dopamine design. Big, bold, confident.',
  colors: {
    background: '#FEFFFE',
    surface: '#F0FFF4',
    text: '#1A1A1A',
    textMuted: '#4A5568',
    primary: '#38D9A9',
    secondary: '#FF6B35',
    accent: '#FFD93D',
    cta: '#FF6B35',
    ctaText: '#FFFFFF',
  },
  fonts: {
    heading: "'Space Grotesk', sans-serif",
    body: "'DM Sans', sans-serif",
  },
  spacing: {
    borderRadius: {
      sm: '8px',
      md: '16px',
      lg: '24px',
      full: '9999px',
    },
    sectionPadding: '80px',
    containerMax: '1400px',
  },
}
