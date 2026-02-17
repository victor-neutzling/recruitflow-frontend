import { useAuth0 } from "@auth0/auth0-react";
import { Logo } from "../logo/logo";
import { Button } from "./button";
import { useNavigate } from "react-router";

type NavbarProps = {
  children?: React.ReactNode;
};

export function Navbar({ children }: NavbarProps) {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 flex justify-between px-4 py-4 bg-[#FFFFFF] z-999 shadow-md fixed!">
      <Button
        variant={"ghost"}
        onClick={() => navigate(isAuthenticated ? "/" : "/board")}
      >
        <Logo color="full" size="sm" />
      </Button>
      {children}
    </div>
  );
}
