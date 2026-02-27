import { useDeadlineRoutes } from "@/api/deadline/useDeadline";
import { Typography } from "@/components/typography";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { getDeadlineStatus } from "@/utils/get-deadline-status";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Clock, Trash } from "lucide-react";
import { toast } from "sonner";

export function DeadlinePanel() {
  const { getDeadlines, deleteDeadline } = useDeadlineRoutes();

  const deadlinesQuery = useQuery({
    queryKey: ["get-deadlines"],
    queryFn: () => getDeadlines(),
  });

  const deleteDeadlineMutation = useMutation({
    mutationKey: ["delete-deadline"],
    mutationFn: (id: string) => deleteDeadline(id),
    onSuccess: () => {
      toast("Deadline deleted successfully.", { position: "top-right" });
      deadlinesQuery.refetch();
    },
    onError: () => {
      toast("Deadline deletion failed, please try again.", {
        position: "top-right",
      });
    },
  });

  return (
    <Sheet>
      <SheetTrigger className="absolute bottom-4 right-4" asChild>
        <Button size={"lg"}>
          Deadlines <Clock></Clock>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto pb-2">
        <SheetHeader className="mt-16">Deadlines</SheetHeader>
        <div className="w-full flex flex-col gap-2">
          {deadlinesQuery.isFetching ? (
            <div className="w-full flex justify-center p-6">
              <Spinner />
            </div>
          ) : (
            deadlinesQuery.data?.deadlines.map((deadline) => (
              <div
                className={`pl-4 pr-2  py-2 flex justify-between rounded-2xl border mx-2 ${getDeadlineStatus(deadline.date) === "today" ? "bg-accent/15" : "bg-surface"}`}
              >
                <div>
                  <Typography
                    className={`${getDeadlineStatus(deadline.date) === "expired" && "text-destructive"}`}
                  >
                    {deadline.label}
                  </Typography>
                  <Typography
                    variant="muted"
                    className={`${getDeadlineStatus(deadline.date) === "expired" && "text-destructive"}`}
                  >
                    {format(deadline.date, "MM/dd/yyyy - hh:mm")}
                  </Typography>
                  <Typography
                    variant="muted"
                    className={`${getDeadlineStatus(deadline.date) === "expired" && "text-destructive"}`}
                  >
                    status: {getDeadlineStatus(deadline.date)}
                  </Typography>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      className="w-8 rounded-full text-destructive!"
                      variant={"ghost"}
                      size={"sm"}
                      type="button"
                    >
                      <Trash />
                    </Button>
                  </AlertDialogTrigger>
                  <ConfirmDeleteModal
                    customText="Are you sure you want to delete this deadline?"
                    handleDelete={() =>
                      deleteDeadlineMutation.mutate(deadline.id)
                    }
                  />
                </AlertDialog>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
