import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "../infra/useApi";

export const useAuthRoutes = () => {
  const { user } = useAuth0();
  const { put } = useApi();

  const authCallback = async () => {
    if (!user) return;

    return put("/auth/callback", {
      name: user.name,
      email: user.email,
    });
  };

  return { authCallback };
};
