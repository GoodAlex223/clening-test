import type { ThemeConfig } from './types'

export const minimalTheme: ThemeConfig = {
  id: 'minimal',
  displayName: 'Minimal Zen',
  description: 'Apple-like simplicity. Calm, spacious, premium.',
  colors: {
    background: '#FAF9F7',
    surface: '#FFFFFF',
    text: '#2D2D2D',
    textMuted: '#6B6B6B',
    primary: '#1A1A2E',
    secondary: '#6B6B6B',
    accent: '#E8D5B5',
    cta: '#1A1A2E',
    ctaText: '#FAF9F7',
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  spacing: {
    borderRadius: {
      sm: '2px',
      md: '4px',
      lg: '8px',
      full: '9999px',
    },
    sectionPadding: '120px',
    containerMax: '1200px',
  },
}
