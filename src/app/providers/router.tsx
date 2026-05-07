import { createBrowserRouter } from 'react-router'

import { AppLayout } from '@/app/layouts/AppLayout.tsx'
import { TransactionsPage } from '@/pages/transactions/TransactionsPage'
// import { AuthLayout } from '@/app/layouts/AuthLayout'

// import { LoginPage } from '@/pages/auth/LoginPage'
// import { RegisterPage } from '@/pages/auth/RegisterPage'
// import { DashboardPage } from '@/pages/dashboard/DashboardPage'
// import { WorkspacePage } from '@/pages/workspace/WorkspacePage'
// import { TransactionsPage } from '@/pages/workspace/TransactionsPage'
// import { CategoriesPage } from '@/pages/workspace/CategoriesPage'
// import { InvitePage } from '@/pages/workspace/InvitePage'
// import { AnalyticsPage } from '@/pages/analytics/AnalyticsPage'
// import { SettingsPage } from '@/pages/settings/SettingsPage'
// import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
//   {
//     element: <AuthLayout />,
//     children: [
//       { path: '/login', element: <LoginPage /> },
//       { path: '/register', element: <RegisterPage /> },
//     ],
//   },
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <TransactionsPage /> },

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
    // path: '*',
    // element: <NotFoundPage />,
  },
])