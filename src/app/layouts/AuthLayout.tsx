import { GlobalSnackbar } from "@/shared/ui/snackbar/GlobalSnackbar";
import { AuthHeader } from "@/widgets/header/AuthHeader";
import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "100%" }}>
        <AuthHeader />
        <main style={{ height: "100%" }}>
          <GlobalSnackbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
