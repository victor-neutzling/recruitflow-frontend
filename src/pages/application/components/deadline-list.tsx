import { useDeadlineRoutes } from "@/api/deadline/useDeadline";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import { getDeadlineStatus } from "@/utils/get-deadline-status";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Plus, Trash } from "lucide-react";

import { toast } from "sonner";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { CreateDeadlineModal } from "./create-deadline-modal";
import { useState } from "react";

type DeadlineListProps = {
  applicationId: string;
  deadlines: {
    id: string;
    label: string;
    date: string;
  }[];
};

export function DeadlineList({ applicationId, deadlines }: DeadlineListProps) {
  const [isCreateDeadlineModalOpen, setIsCreateDeadlineModalOpen] =
    useState(false);

  const { deleteDeadline } = useDeadlineRoutes();
  const queryClient = useQueryClient();

  const deleteDeadlineMutation = useMutation({
    mutationKey: ["delete-deadline"],
    mutationFn: (id: string) => deleteDeadline(id),
    onSuccess: () => {
      toast("Deadline deleted successfully.", { position: "top-right" });
      queryClient.refetchQueries({ queryKey: ["get-application-by-id"] });
    },
    onError: () => {
      toast("Deadline deletion failed, please try again.", {
        position: "top-right",
      });
    },
  });

  return (
    <div className="flex flex-col gap-2 pb-2 w-80 bg-surface border shadow rounded-xl">
      <div className="flex pt-2 px-4 justify-between items-center">
        <Typography className="font-bold">Deadlines</Typography>
        <Button
          size={"xs"}
          variant={"outline"}
          onClick={() => setIsCreateDeadlineModalOpen(true)}
        >
          <Plus />
        </Button>
      </div>
      <div className="w-full border-b" />
      {deadlines.length ? (
        deadlines.map((deadline) => (
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
                {format(deadline.date, "MM/dd/yyyy - hh:mm a")}
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
                handleDelete={() => deleteDeadlineMutation.mutate(deadline.id)}
              />
            </AlertDialog>
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center p-4">
          <Typography variant="muted" className="text-center">
            You have no deadlines under this application, click the plus button
            to register a deadline.
          </Typography>
        </div>
      )}
      <Dialog
        open={isCreateDeadlineModalOpen}
        onOpenChange={setIsCreateDeadlineModalOpen}
      >
        <CreateDeadlineModal
          applicationId={applicationId}
          setOpen={setIsCreateDeadlineModalOpen}
        />
      </Dialog>
    </div>
  );
}
