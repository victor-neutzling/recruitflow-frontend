import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { RouterProvider } from "react-router";

import { router } from "./router";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }}
        cacheLocation="localstorage"
        useRefreshTokens={true}
      >
        <RouterProvider router={router} />
        <Toaster />
      </Auth0Provider>
    </QueryClientProvider>
  );
}
