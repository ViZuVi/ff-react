import { Navigate } from "react-router";
import { useAuthStore } from "@/entities/user/model/auth-store";
import type { ReactNode } from "react";
import { routes } from "@/app/router/routes";

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to={routes.login} replace />;
  }

  return children;
};
