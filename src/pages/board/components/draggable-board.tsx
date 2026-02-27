import { DraggableCard } from "../components/draggable-card";
import { DragDropProvider } from "@dnd-kit/react";
import { Column } from "../components/column";
import { useEffect, useMemo, useState } from "react";
import { move } from "@dnd-kit/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useApplicationRoutes } from "@/api/application/useApplication";
import type {
  GetApplicationsParams,
  GetApplicationsResponse,
  MoveApplicationsPayload,
} from "@/api/application/types";
import { INITIAL_APPLICATIONS } from "../constants";
import { mapApplicationsToPayload } from "../utils";
import { Typography } from "@/components/typography";
import BoardSkeleton from "../skeleton";
import { Sidebar } from "@/widgets/sidebar";
import { cleanFilters } from "@/utils/clean-filters";

import { toast } from "sonner";

export function DraggableBoard() {
  const { getApplications, moveApplications } = useApplicationRoutes();

  const [filters, setFilters] = useState<GetApplicationsParams>({});
  const [applications, setApplications] =
    useState<GetApplicationsResponse["applications"]>(INITIAL_APPLICATIONS);

  const applicationsQuery = useQuery({
    queryKey: ["get-applications", filters],
    queryFn: () => getApplications(cleanFilters(filters)),
  });

  const moveApplicationsMutation = useMutation({
    mutationKey: ["move-applications"],
    mutationFn: (data: MoveApplicationsPayload) => moveApplications(data),
  });

  const hasActiveFilters = useMemo(() => {
    return Object.keys(cleanFilters(filters)).length > 0;
  }, [filters]);

  useEffect(() => {
    if (applicationsQuery.data)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setApplications(applicationsQuery.data.applications);
  }, [applicationsQuery.data]);

  if (applicationsQuery.isFetching) return <BoardSkeleton />;

  return (
    <div className="flex w-full h-full">
      <Sidebar filters={filters} setFilters={setFilters} />
      <div className="flex flex-col gap-16 w-full items-center">
        <DragDropProvider
          onDragStart={
            hasActiveFilters
              ? () => {
                  toast(
                    "Dragging is disabled while filters are applied. Changes won’t be saved.",
                    { position: "top-right" },
                  );
                }
              : undefined
          }
          onDragOver={
            hasActiveFilters
              ? undefined
              : (event) => {
                  setApplications((applications) => move(applications, event));
                }
          }
          onDragEnd={
            hasActiveFilters
              ? undefined
              : (event) => {
                  setApplications((applications) => move(applications, event));
                  moveApplicationsMutation.mutate(
                    mapApplicationsToPayload(move(applications, event)),
                  );
                }
          }
        >
          <div className="flex flex-row gap-4 w-full min-h-full pt-20 pb-4 bg-background justify-center">
            {Object.entries(applications).map(([column, applications]) => (
              <Column
                key={column}
                id={column}
                columnLength={applications.length}
              >
                {applications.map((application, index) => (
                  <DraggableCard
                    key={application.id}
                    id={application.id}
                    index={index}
                    column={column}
                    cardData={application}
                  />
                ))}
              </Column>
            ))}
          </div>
        </DragDropProvider>
        {applicationsQuery?.data?.total === 0 && (
          <Typography variant="muted" className="text-md w-120 text-center">
            You don’t have any applications yet. Click the plus icon or "Add New
            Application" under any column to get started.
          </Typography>
        )}
      </div>
    </div>
  );
}
