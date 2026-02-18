import { useAuthRoutes } from "@/api/auth/useAuth";
import { Logo } from "@/components/logo/logo";
import { Typography } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";
import { useUserStore } from "@/stores/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Home() {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const { setUser } = useUserStore();
  const { authCallback } = useAuthRoutes();

  const authCallbackMutation = useMutation({
    mutationKey: ["auth-callback-mutation"],
    mutationFn: () => authCallback(),
    onSuccess: (data) => {
      if (data) {
        setUser({ name: data?.name, email: data?.email, id: data.id });
        console.log(data);
        navigate("/board");
      }
    },
    onError: () => {
      toast("User does not exist.");
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
    <PageBase>
      <Navbar>
        <Button
          size={"sm"}
          variant={"link"}
          onClick={() => loginWithRedirect()}
        >
          login
        </Button>
      </Navbar>
      <div className="relative w-full h-full flex flex-col items-center justify-center gap-4 overflow-hidden">
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4">
          <Logo color="full" size={"lg"} />
          <div
            className="flex flex-col rounded-2xl bg-surface shadow-lg 
  opacity-0 translate-y-6 scale-[0.98] 
  animate-[heroEnter_700ms_ease-out_forwards]"
          >
            <div className="flex flex-row gap-16 p-16 pb-12 rounded-2xl ">
              <div className="flex flex-col gap-0.5 ">
                <Typography variant="h1" className="text-7xl! text-primary ">
                  ORGANIZE
                </Typography>
                <Typography variant="h1" className="text-7xl! text-primary">
                  YOUR
                </Typography>
                <Typography
                  variant="h1"
                  className="text-7xl! text-primary ml-2.5"
                >
                  JOB
                </Typography>
                <Typography variant="h1" className="text-7xl! text-primary">
                  SEARCH.
                </Typography>
              </div>
              <div className="flex flex-col gap-6 justify-center ">
                <div className="w-70">
                  <Typography className="text-3xl ">
                    Track applications, deadlines, and interviews all in one
                    dashboard.
                  </Typography>
                </div>
                <Typography
                  variant="h2"
                  className="text-3xl font-extrabold text-primary"
                >
                  Stay on top
                </Typography>
                <div className="flex justify-center gap-4">
                  <Button size={"lg"} onClick={() => loginWithRedirect()}>
                    Get started!
                  </Button>
                  <Button
                    size={"lg"}
                    variant={"ghost"}
                    onClick={() =>
                      window.open(
                        "https://github.com/victor-neutzling/recruitflow-frontend",
                        "_blank",
                      )
                    }
                  >
                    source code
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-accent h-4 rounded-b-2xl"></div>
          </div>
          <Typography variant="muted" className="mt-16">
            © 2026 Recruitflow. All rights reserved.
          </Typography>
          <Typography variant="muted">
            Built by job seekers, for job seekers.
          </Typography>
        </div>
        <div
          className="absolute right-0 top-0 h-full w-full z-0 bg-cta 
  [clip-path:polygon(75%_0%,100%_0%,100%_100%,60%_100%)]"
        />
      </div>
    </PageBase>
  );
}

// primary:  #2F6F5E
// Primary-dark:   #254F44
// Accent:         #2cc26f

// Background:     #F6F7F6
// Surface/Card:   #FFFFFF
// Border:         #E5E7EB

// Text-primary:   #1F2933
// Text-secondary: #4B5563
// Muted:          #9CA3AF

// CTA Button:     #2F6F5E
// CTA Hover:      #285E52
