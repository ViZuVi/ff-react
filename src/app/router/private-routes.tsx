import { AppLayout } from "@/app/layouts/AppLayout";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";

import { TransactionsPage } from "@/pages/transactions/TransactionsPage";
import { ChartsPage } from "@/pages/charts/ChartsPage";
import { routes } from "./routes";

export const appRoutes = [
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <TransactionsPage /> },
      { path: routes.charts, element: <ChartsPage /> },
      //   {
      //     path: 'workspace/:id',
      //     element: <WorkspacePage />,
      //     children: [
      //       { path: 'transactions', element: <TransactionsPage /> },
      //       { path: 'categories', element: <CategoriesPage /> },
      //       { path: 'invite', element: <InvitePage /> },
      //     ],
      //   },
    ],
  },
];
