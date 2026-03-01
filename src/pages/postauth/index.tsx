import { useAuthRoutes } from "@/api/auth/useAuth";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/stores/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function PostAuth() {
  const { isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const { setUser } = useUserStore();
  const { authCallback } = useAuthRoutes();

  const authCallbackMutation = useMutation({
    mutationKey: ["auth-callback-mutation"],
    mutationFn: () => authCallback(),
    onSuccess: (data) => {
      if (data) {
        setUser({ name: data?.name, email: data?.email, id: data.id });
        navigate("/board");
      }
    },
    onError: () => {
      toast("User does not exist.", { position: "top-right" });
      logout();
      navigate("/error");
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      authCallbackMutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);
  return (
    <div className="box-border w-full h-screen flex justify-center items-center bg-background">
      <Spinner className="size-15 text-primary" />
    </div>
  );
}
