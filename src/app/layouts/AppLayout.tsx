import { Outlet } from "react-router";
import { AppHeader } from "@/widgets/header/AppHeader";
import { useInitCurrentSpace } from "@/entities/space/model/use-init-current-space";
import { GlobalSnackbar } from "@/shared/components/GlobalSnackbar";

export const AppLayout = () => {
  useInitCurrentSpace();

  return (
    <div className="app-layout" style={{ height: "100%" }}>
      <div className="content" style={{ height: "100%" }}>
        <AppHeader />
        <main style={{ height: "100%" }}>
          <GlobalSnackbar />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
