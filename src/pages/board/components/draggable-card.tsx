import type { Application } from "@/api/application/types";
import { useApplicationRoutes } from "@/api/application/useApplication";
import { Typography } from "@/components/typography/typography";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { statusColorMap } from "@/utils/status-color-map";
import { useSortable } from "@dnd-kit/react/sortable";

import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";

import { ApplicationContextMenu } from "./application-context-menu";
import { useNavigate } from "react-router";

type CardProps = {
  id: string;
  index: number;
  column: string;
  cardData: Application;
  refetch: () => void;
};

export function DraggableCard({
  id,
  index,
  column,
  cardData,
  refetch,
}: CardProps) {
  const navigate = useNavigate();
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "draggableCard",
    accept: "draggableCard",
    group: column,
  });

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      data-slot="card"
      className="flex flex-row cursor-pointer"
      onClick={() => navigate(`/application/view/${id}`)}
    >
      <Popover>
        <div
          className={`${statusColorMap[column]}  w-2 rounded-l-xl border-l border-y `}
        ></div>
        <div className="bg-card! text-card-foreground flex flex-col gap-6 rounded-r-md py-2!  w-60 border-r border-y! border-border!">
          <CardHeader className="flex justify-between items-start">
            <CardTitle className="ml-2 pt-1.5 text-sm">
              {cardData.title}
            </CardTitle>
            <PopoverTrigger onClick={(e) => e.stopPropagation()}>
              <Button
                variant={"ghost"}
                className="w-8 h-8 rounded-lg m-0"
                asTrigger
              >
                <EllipsisVertical size={16} className="text-text-secondary" />
              </Button>
            </PopoverTrigger>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <Typography variant="muted" className="text-xs">
                {cardData.position + " @ " + cardData.companyName}
              </Typography>
              {cardData.appliedAt && (
                <Typography variant="muted" className="text-xs mt-2">
                  applied at:{" "}
                  {format(new Date(cardData.appliedAt ?? ""), "MM/dd/yyyy")}
                </Typography>
              )}
            </CardDescription>
          </CardContent>
        </div>
        <ApplicationContextMenu id={id} refetch={refetch} />
      </Popover>
    </div>
  );
}
