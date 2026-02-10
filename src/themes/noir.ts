import type { ThemeConfig } from './types'

export const noirTheme: ThemeConfig = {
  id: 'noir',
  displayName: 'Noir Luxe',
  description: 'Premium, exclusive, high-end. White-glove service.',
  colors: {
    background: '#0F0F0F',
    surface: '#1A1A1A',
    text: '#E8E6E3',
    textMuted: '#8A8A8A',
    primary: '#C9A96E',
    secondary: '#D4AF37',
    accent: '#8B7355',
    cta: '#C9A96E',
    ctaText: '#0F0F0F',
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Lato', sans-serif",
  },
  spacing: {
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
      full: '9999px',
    },
    sectionPadding: '100px',
    containerMax: '900px',
  },
}
