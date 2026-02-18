import { Typography } from "@/components/typography/typography";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { PopoverContent } from "@/components/ui/popover";
import { BookOpen, Pencil, Trash } from "lucide-react";

import { useNavigate } from "react-router";
import { ConfirmDeleteModal } from "./confirm-delete-modal";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useApplicationRoutes } from "@/api/application/useApplication";

type ApplicationContextMenuProps = {
  id: string;
  refetch: () => void;
};

export function ApplicationContextMenu({
  id,
  refetch,
}: ApplicationContextMenuProps) {
  const navigate = useNavigate();
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
  }

  return (
    <PopoverContent
      align="end"
      className="w-56 p-2! flex flex-col gap-2"
      onClick={(e) => e.stopPropagation()}
    >
      <Typography variant="muted" className="text-xs">
        Options
      </Typography>
      <div className="flex flex-col border-t py-2 gap-1">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-full justify-start gap-2"
          onClick={() => navigate(`/application/view/${id}`)}
        >
          <BookOpen /> View more
        </Button>
        <Button
          variant={"ghost"}
          size={"sm"}
          className="w-full justify-start gap-2"
          onClick={() => navigate(`/application/edit/${id}`)}
        >
          <Pencil /> Edit
        </Button>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button
              variant={"ghost"}
              size={"sm"}
              className="w-full justify-start gap-2 text-destructive"
              asTrigger
            >
              <Trash /> Delete
            </Button>
          </AlertDialogTrigger>
          <ConfirmDeleteModal
            handleDeleteApplication={handleDeleteApplication}
          />
        </AlertDialog>
      </div>
    </PopoverContent>
  );
}
