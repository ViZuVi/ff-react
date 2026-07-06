import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuthStore } from "@/entities/user/model/auth-store";
import { routes } from "@/app/router/routes";

type Props = {
  children: ReactNode;
};

export const GuestRoute = ({ children }: Props) => {
  const token = useAuthStore((s) => s.token);

  if (token) {
    return <Navigate to={routes.home} replace />;
  }

  return children;
};
