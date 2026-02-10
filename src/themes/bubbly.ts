import type { ThemeConfig } from './types'

export const bubblyTheme: ThemeConfig = {
  id: 'bubbly',
  displayName: 'Bubbly Clean',
  description: 'Friendly, approachable, fun. Makes cleaning stress-free.',
  colors: {
    background: '#FFF9F0',
    surface: '#FFFFFF',
    text: '#3D3D3D',
    textMuted: '#7A7A7A',
    primary: '#7C3AED',
    secondary: '#06B6D4',
    accent: '#F472B6',
    cta: '#7C3AED',
    ctaText: '#FFFFFF',
  },
  fonts: {
    heading: "'Fredoka One', cursive",
    body: "'Nunito', sans-serif",
    accent: "'Caveat', cursive",
  },
  spacing: {
    borderRadius: {
      sm: '12px',
      md: '24px',
      lg: '32px',
      full: '9999px',
    },
    sectionPadding: '80px',
    containerMax: '1200px',
  },
}
