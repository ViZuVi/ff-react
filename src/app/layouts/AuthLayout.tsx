import { Outlet } from "react-router";

export const AuthLayout = () => {
  return (
    <div>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
