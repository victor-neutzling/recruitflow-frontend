import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from "../infra/useApi";
import type { AuthCallbackPayload, AuthCallbackResponse } from "./types";
import type { AxiosResponse } from "axios";

export const useAuthRoutes = () => {
  const { user } = useAuth0();
  const { put } = useApi();

  const authCallback = async () => {
    if (!user) return;

    const response = await put<
      AuthCallbackPayload,
      AxiosResponse<AuthCallbackResponse>
    >("/auth/callback", {
      name: user.name,
      email: user.email,
    });

    return response.data;
  };

  return { authCallback };
};
