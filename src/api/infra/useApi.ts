import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";

export const useApi = () => {
  const { getAccessTokenSilently, logout } = useAuth0();

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    });

    instance.interceptors.request.use(async (config) => {
      try {
        const token = await getAccessTokenSilently();

        config.headers.Authorization = `Bearer ${token}`;
      } catch {
        logout({
          logoutParams: { returnTo: window.location.origin },
        });
      }

      return config;
    });

    return instance;
  }, [getAccessTokenSilently, logout]);

  return api;
};
