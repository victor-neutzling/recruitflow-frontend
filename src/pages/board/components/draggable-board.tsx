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
    if (applicationsQuery.isSuccess) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApplications(applicationsQuery.data);
    }
  }, [applicationsQuery.isSuccess]);

  return (
    <div className="flex flex-row gap-4 w-full bg-red-400">
      <DragDropProvider
        onDragEnd={(event) => {
          setApplications((applications) => move(applications, event));
          moveApplicationsMutation.mutate(
            mapApplicationsToPayload(move(applications, event)),
          );
        }}
      >
        {Object.entries(applications).map(([column, applications]) => (
          <Column key={column} id={column}>
            {applications.map((application) => (
              <DraggableCard
                key={application.id}
                id={application.id}
                index={application.columnIndex}
                column={application.status}
                cardData={{
                  name: application.title,
                  stuff:
                    application.position + " at " + application.companyName,
                }}
              />
            ))}
          </Column>
        ))}
      </DragDropProvider>
    </div>
  );
}
