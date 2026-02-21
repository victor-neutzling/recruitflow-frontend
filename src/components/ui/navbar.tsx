import { useAuth0 } from "@auth0/auth0-react";
import { Logo } from "../logo/logo";
import { Button } from "./button";
import { useNavigate } from "react-router";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "./popover";
import { User } from "lucide-react";

type NavbarProps = {
  children?: React.ReactNode;
};

export function Navbar({ children }: NavbarProps) {
  const { user, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="w-full h-16 flex justify-between px-4 py-4 bg-[#FFFFFF] z-999 shadow-md fixed!">
      <Button
        variant={"ghost"}
        onClick={() => navigate(isAuthenticated ? "/Board" : "/")}
      >
        <Logo color="full" size="sm" />
      </Button>
      <div className="flex gap-4">
        {children}
        {isAuthenticated && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"secondary"}>
                <User />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col mt-4 mr-1 capitalize gap-4">
              <PopoverTitle>
                <div className="flex gap-4 items-center">
                  <User size={20} />
                  Hello, {user?.name?.split(" ")[0]}!
                </div>
              </PopoverTitle>

              <Button className="w-full" onClick={() => logout()}>
                Logout
              </Button>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}
