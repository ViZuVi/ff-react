import { primitiveColors as c } from '../tokens/colors'

export const lightScheme = {
  background: {
    body: '#F5F7FB',
    surface: '#FFFFFF',
    elevated: '#FFFFFF',
    glass: 'rgba(255,255,255,0.72)',
  },

  text: {
    primary: '#0F172A',
    secondary: '#475569',
    tertiary: '#64748B',
  },

  border: {
    subtle: 'rgba(15,23,42,0.06)',
    default: 'rgba(15,23,42,0.12)',
    strong: 'rgba(15,23,42,0.22)',
  },

  brand: {
    primary: c.blue500,
    secondary: c.purple500,
    accent: c.cyan500,
  },

  status: {
    success: c.green500,
    warning: c.yellow500,
    error: c.red500,
  },
}