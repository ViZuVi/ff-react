import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { ReactNode } from "react";

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });
};

type TestQueryProviderProps = {
  children: ReactNode;
};

export const TestQueryProvider = ({ children }: TestQueryProviderProps) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
