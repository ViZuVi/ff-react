import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div className="app-layout">
      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
