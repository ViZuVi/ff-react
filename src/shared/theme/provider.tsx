import {
  createContext,
  type PropsWithChildren,
  useMemo,
  useState,
} from 'react'

import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
} from '@mui/material'

import { createAppTheme } from './createAppTheme'
import { cssVariables } from './cssVariables'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeModeContext =
  createContext({
    toggleTheme: () => {},
  })

export function AppThemeProvider({
  children,
}: PropsWithChildren) {
  const [mode, setMode] =
    useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    setMode(prev =>
      prev === 'dark'
        ? 'light'
        : 'dark',
    )
  }

  const theme = useMemo(
    () => createAppTheme(mode),
    [mode],
  )

  return (
    <ThemeModeContext.Provider
      value={{ toggleTheme }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <GlobalStyles
          styles={{
            ':root': cssVariables,
          }}
        />

        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  )
}