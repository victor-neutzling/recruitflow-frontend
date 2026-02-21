import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";
import { useNavigate, useParams } from "react-router";

import { ViewMode } from "./components/view-mode";
import { EditMode } from "./components/edit-mode";

export default function Application() {
  const navigate = useNavigate();
  const { mode } = useParams<{
    mode: string;
    id: string | undefined;
  }>();

  return (
    <PageBase>
      <Navbar>
        <Input placeholder="search..." type="search" />
        <Button variant={"link"}>Statistics</Button>
        <Button variant={"link"}>List View</Button>
        <Button variant={"link"} onClick={() => navigate("/board")}>
          board
        </Button>
      </Navbar>
      <div className="w-full h-full flex flex-col items-center">
        {mode === "view" ? <ViewMode /> : <EditMode />}
      </div>
    </PageBase>
  );
}
