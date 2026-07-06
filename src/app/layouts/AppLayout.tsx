import { Outlet } from "react-router";
import { AppHeader } from "@/widgets/header/AppHeader";
import { useInitCurrentSpace } from "@/app/providers/use-init-current-space";
import { GlobalSnackbar } from "@/shared/ui/GlobalSnackbar";

export const AppLayout = () => {
  useInitCurrentSpace();

  return (
    <div style={{ height: "100%" }}>
      <div style={{ height: "100%" }}>
        <AppHeader />
        <main style={{ height: "100%" }}>
          <GlobalSnackbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
