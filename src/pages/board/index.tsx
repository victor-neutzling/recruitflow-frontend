import { Button } from "@/components/ui/button";

import { Navbar } from "@/widgets/navbar";
import PageBase from "@/components/ui/page-base";

import { DraggableBoard } from "./components/draggable-board";
import { useNavigate } from "react-router";

import { Searchbar } from "@/widgets/searchbar";

export default function Board() {
  const navigate = useNavigate();

  return (
    <PageBase>
      <Navbar>
        <Searchbar />
        <Button variant={"link"}>Statistics</Button>
        <Button variant={"link"} onClick={() => navigate("/list")}>
          List View
        </Button>
      </Navbar>

      <DraggableBoard />
    </PageBase>
  );
}
