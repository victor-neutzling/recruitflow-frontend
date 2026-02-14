import { Logo } from "../logo/logo";
import { Button } from "./button";

export function Navbar() {
  return (
    <div className="w-full h-16 border-b-1 flex flex-row justify-between px-4 py-4">
      <Button variant={"ghost"} className="cursor-pointer">
        <Logo color="black" size="sm" />
      </Button>
      <Button size={"sm"} variant={"ghost"} className="cursor-pointer">
        Login
      </Button>
    </div>
  );
}
