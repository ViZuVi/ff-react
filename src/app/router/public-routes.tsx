import { AuthLayout } from "@/app/layouts/AuthLayout";
import { GuestRoute } from "@/features/auth-guard/ui/GuestRoute";

import { LoginPage } from "@/pages/auth/LoginPage";
import { RestorePage } from "@/pages/restore/RestorePage";
import { routes } from "./routes";

export const authRoutes = [
  {
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      { path: routes.login, element: <LoginPage /> },
      { path: routes.restore, element: <RestorePage /> },
    ],
  },
];
