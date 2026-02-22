import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";

import { DraggableBoard } from "./components/draggable-board";
import { useNavigate } from "react-router";

export default function Board() {
  const navigate = useNavigate();

  return (
    <PageBase>
      <Navbar>
        <Input placeholder="search..." type="search" />
        <Button variant={"link"}>Statistics</Button>
        <Button variant={"link"} onClick={() => navigate("/list")}>
          List View
        </Button>
      </Navbar>

      <DraggableBoard />
    </PageBase>
  );
}
