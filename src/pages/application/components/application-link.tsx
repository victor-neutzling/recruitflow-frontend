import { useApplicationLinkRoutes } from "@/api/application-link/useApplicationLink";
import type { GetApplicationByIdResponse } from "@/api/application/types";
import { Typography } from "@/components/typography/typography";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import { getFaviconUrl } from "@/utils/get-favicon";
import { normalizeUrl } from "@/utils/normalize-url";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { toast } from "sonner";

type ApplicationLinkProps = {
  applicationLink: GetApplicationByIdResponse["applicationLinks"][number];
  applicationId: string;
};

export function ApplicationLink({
  applicationId,
  applicationLink,
}: ApplicationLinkProps) {
  const { deleteApplicationLink } = useApplicationLinkRoutes();
  const queryClient = useQueryClient();

  const deleteApplicationLinkMutation = useMutation({
    mutationKey: ["delete-application-link"],
    mutationFn: () => deleteApplicationLink(applicationId, applicationLink.id),
    onSuccess: () => {
      toast("Application link deleted successfully.", {
        position: "top-right",
      });
      queryClient.refetchQueries({
        queryKey: ["get-application-by-id"],
      });
    },
    onError: () => {
      toast("Failed to delete application link, please try again.", {
        position: "top-right",
      });
    },
  });

  return (
    <div
      key={applicationLink.id}
      className="py-4 px-4 pl-6 border rounded-xl w-80 flex flex-col gap-4 items-start"
    >
      <div className="flex justify-between w-full">
        <div className="flex gap-2 items-center">
          <img
            src={getFaviconUrl(applicationLink.url)}
            alt="favicon"
            className="w-5 h-5 rounded-sm"
          />{" "}
          <Typography>{applicationLink.label}</Typography>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="w-9 rounded-full text-destructive"
              variant={"ghost"}
            >
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <ConfirmDeleteModal
            customText="Are you sure you want to delete this link?"
            handleDelete={() => deleteApplicationLinkMutation.mutate()}
          />
        </AlertDialog>
      </div>
      <div className="w-full pr-2">
        <Button
          variant={"link"}
          className="flex justify-start p-0 truncate w-full"
          onClick={() =>
            window.open(normalizeUrl(applicationLink.url), "_blank")
          }
        >
          {applicationLink.url}
        </Button>
      </div>
    </div>
  );
}
