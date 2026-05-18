import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import { router } from '@/app/providers/router'
import { AppThemeProvider } from './shared/theme';
import '@/shared/theme/animations/globals.css'
import '@/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </StrictMode>,
)
