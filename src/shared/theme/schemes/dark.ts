import { primitiveColors as c } from '../tokens/colors'

export const darkScheme = {
  background: {
    body: '#070B14',
    surface: '#0D111C',
    elevated: '#121826',
    glass: 'rgba(255,255,255,0.04)',
  },

  text: {
    primary: c.slate50,
    secondary: '#AAB4C5',
    tertiary: '#6B7280',
  },

  border: {
    subtle: 'rgba(255,255,255,0.06)',
    default: 'rgba(255,255,255,0.12)',
    strong: 'rgba(255,255,255,0.22)',
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