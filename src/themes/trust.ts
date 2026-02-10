import type { ThemeConfig } from './types'

export const trustTheme: ThemeConfig = {
  id: 'trust',
  displayName: 'Trust Shield',
  description: 'Corporate reliability. Professional, trustworthy, established.',
  colors: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#212529',
    textMuted: '#6C757D',
    primary: '#1B4965',
    secondary: '#5FA8D3',
    accent: '#62B6CB',
    cta: '#1B4965',
    ctaText: '#FFFFFF',
  },
  fonts: {
    heading: "'Merriweather', serif",
    body: "'Source Sans 3', sans-serif",
  },
  spacing: {
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
      full: '9999px',
    },
    sectionPadding: '60px',
    containerMax: '1200px',
  },
}
