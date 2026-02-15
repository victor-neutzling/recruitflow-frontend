import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";
import { DraggableCard } from "./components/draggable-card";
import { DragDropProvider } from "@dnd-kit/react";
import { Column } from "./components/column";
import { useEffect, useState } from "react";
import { move } from "@dnd-kit/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApplicationRoutes } from "@/api/application/useApplication";
import type {
  GetApplicationsResponse,
  MoveApplicationsPayload,
} from "@/api/application/types";
import { INITIAL_APPLICATIONS } from "./constants";
import { mapApplicationsToPayload } from "./utils";
import { DraggableBoard } from "./components/draggable-board";

export default function Board() {
  const { getApplications, moveApplications } = useApplicationRoutes();

  const [applications, setApplications] =
    useState<GetApplicationsResponse>(INITIAL_APPLICATIONS);

  const applicationsQuery = useQuery({
    queryKey: ["get-applications"],
    queryFn: () => getApplications(),
  });

  const moveApplicationsMutation = useMutation({
    mutationKey: ["move-applications"],
    mutationFn: (data: MoveApplicationsPayload) => moveApplications(data),
  });

  useEffect(() => {
    if (applicationsQuery.isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApplications(applicationsQuery.data);
    }
  }, [applicationsQuery.isSuccess]);

  return (
    <PageBase>
      <Navbar>
        <div className="flex gap-4">
          <Input placeholder="search..." type="search" />
          <Button variant={"secondary"}>Statistics</Button>
          <Button variant={"secondary"}>List View</Button>
        </div>
      </Navbar>

      <DraggableBoard />
    </PageBase>
  );
}
