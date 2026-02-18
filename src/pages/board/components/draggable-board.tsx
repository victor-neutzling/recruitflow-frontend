import { DraggableCard } from "../components/draggable-card";
import { DragDropProvider } from "@dnd-kit/react";
import { Column } from "../components/column";
import { useEffect, useState } from "react";
import { move } from "@dnd-kit/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApplicationRoutes } from "@/api/application/useApplication";
import type {
  GetApplicationsResponse,
  MoveApplicationsPayload,
} from "@/api/application/types";
import { INITIAL_APPLICATIONS } from "../constants";
import { mapApplicationsToPayload } from "../utils";

export function DraggableBoard() {
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (applicationsQuery.data) setApplications(applicationsQuery.data);
  }, [applicationsQuery.data]);

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setApplications((applications) => move(applications, event));
      }}
      onDragEnd={(event) => {
        setApplications((applications) => move(applications, event));
        moveApplicationsMutation.mutate(
          mapApplicationsToPayload(move(applications, event)),
        );
      }}
    >
      <div className="flex flex-row gap-4 w-full min-h-full pt-20 pb-4 bg-background justify-center">
        {Object.entries(applications).map(([column, applications]) => (
          <Column key={column} id={column} columnLength={applications.length}>
            {applications.map((application, index) => (
              <DraggableCard
                key={application.id}
                id={application.id}
                index={index}
                column={column}
                cardData={application}
                refetch={applicationsQuery.refetch}
              />
            ))}
          </Column>
        ))}
      </div>
    </DragDropProvider>
  );
}
