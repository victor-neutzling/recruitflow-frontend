import type { Application } from "@/api/application/types";
import { useApplicationRoutes } from "@/api/application/useApplication";
import { Typography } from "@/components/typography/typography";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { statusColorMap } from "@/utils/status-color-map";
import { useSortable } from "@dnd-kit/react/sortable";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { BookOpen, EllipsisVertical, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";

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
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "draggableCard",
    accept: "draggableCard",
    group: column,
  });

  const { deleteApplication } = useApplicationRoutes();

  const deleteApplicationMutation = useMutation({
    mutationKey: ["delete-application"],
    mutationFn: (data: string) => deleteApplication(data),
    onSuccess: () => {
      toast("Application deleted successfully!", { position: "top-right" });
      refetch();
    },
    onError: () => {
      toast("Failed to delete application, try again.");
    },
  });

  function handleDeleteApplication() {
    deleteApplicationMutation.mutate(id);
    refetch();
  }

  return (
    <div
      ref={ref}
      data-dragging={isDragging}
      data-slot="card"
      className="flex flex-row"
    >
      <AlertDialog>
        <Popover>
          <div
            className={`${statusColorMap[column]}  w-2 rounded-l-xl border-l border-y `}
          ></div>
          <div className="bg-card! text-card-foreground flex flex-col gap-6 rounded-r-md py-2!  w-60 border-r border-y! border-border!">
            <CardHeader className="flex justify-between items-start">
              <CardTitle className="ml-2 pt-1.5 text-sm">
                {cardData.title}
              </CardTitle>
              <PopoverTrigger>
                <Button variant={"ghost"} className="w-8 h-8 rounded-lg m-0">
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
          <PopoverContent align="end" className="w-56 p-2! flex flex-col gap-2">
            <Typography variant="muted" className="text-xs">
              Options
            </Typography>
            <div className="flex flex-col border-t py-2 gap-1">
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full justify-start gap-2"
              >
                <BookOpen /> View more
              </Button>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="w-full justify-start gap-2"
              >
                <Pencil /> Edit
              </Button>
              <AlertDialogTrigger>
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="w-full justify-start gap-2 text-destructive"
                >
                  <Trash /> Delete
                </Button>
              </AlertDialogTrigger>
            </div>
          </PopoverContent>
        </Popover>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this application?
            </AlertDialogTitle>
            <AlertDialogDescription>
              this action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteApplication}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
