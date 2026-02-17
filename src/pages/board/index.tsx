import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";

import { DraggableBoard } from "./components/draggable-board";
import { User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUserStore } from "@/stores/useUserStore";
import { useAuth0 } from "@auth0/auth0-react";

export default function Board() {
  const { user } = useUserStore();
  const { logout } = useAuth0();

  return (
    <PageBase>
      <Popover>
        <Navbar>
          <div className="flex gap-4">
            <Input placeholder="search..." type="search" />
            <Button variant={"secondary"}>Statistics</Button>
            <Button variant={"secondary"}>List View</Button>
            <PopoverTrigger>
              <Button variant={"secondary"}>
                <User />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="flex flex-col mt-4 mr-1 capitalize gap-4">
            <PopoverTitle>
              <div className="flex gap-4 items-center">
                <User size={20} />
                Hello, {user?.name.split(" ")[0]}!
              </div>
            </PopoverTitle>
            <PopoverDescription>
              <Button className="w-full" onClick={() => logout()}>
                Logout
              </Button>
            </PopoverDescription>
          </PopoverContent>
        </Navbar>
      </Popover>

      <DraggableBoard />
    </PageBase>
  );
}
