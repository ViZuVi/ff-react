import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "@/app/router";
import { AppThemeProvider } from "../shared/theme";
import "@/shared/theme/animations/globals.css";
import "@/app/styles/index.css";
import { I18nProvider } from "./providers/I18nProvider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nProvider>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppThemeProvider>
    </I18nProvider>
  </StrictMode>,
);
