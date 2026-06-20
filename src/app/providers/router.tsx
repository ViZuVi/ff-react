import { createBrowserRouter } from 'react-router'

import { AppLayout } from '@/app/layouts/AppLayout.tsx'
import { TransactionsPage } from '@/pages/transactions/TransactionsPage'
import { ChartsPage } from '@/pages/charts/ChartsPage'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { RestorePage } from '@/pages/restore/RestorePage'
import { NotFoundPage } from '@/pages/not-found/NotFoundPage'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'
import { GuestRoute } from '@/features/auth/GuestRoute'

// import { WorkspacePage } from '@/pages/workspace/WorkspacePage'
// import { CategoriesPage } from '@/pages/workspace/CategoriesPage'
// import { InvitePage } from '@/pages/workspace/InvitePage'
// import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage'
// import { SettingsPage } from '@/pages/settings/SettingsPage'

export const router = createBrowserRouter([
  {
    element: <GuestRoute><AuthLayout /></GuestRoute>,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/restore', element: <RestorePage /> },
    ],
  },
  {
    element: <ProtectedRoute><AppLayout /></ProtectedRoute>,
    children: [
      { index: true, element: <TransactionsPage /> },
      { path: '/charts', element: <ChartsPage /> },

    //   {
    //     path: 'workspace/:id',
    //     element: <WorkspacePage />,
    //     children: [
    //       { path: 'transactions', element: <TransactionsPage /> },
    //       { path: 'categories', element: <CategoriesPage /> },
    //       { path: 'invite', element: <InvitePage /> },
    //     ],
    //   },

    //   { path: 'analytics', element: <AnalyticsPage /> },
    //   { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])