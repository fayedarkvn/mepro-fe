import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../providers/auth.provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { env } from "src/config/env.client";

export const AppProvider = ({ children }: { children: React.ReactNode; }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
};
