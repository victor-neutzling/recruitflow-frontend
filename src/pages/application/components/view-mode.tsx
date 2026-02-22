import { useApplicationRoutes } from "@/api/application/useApplication";
import { Typography } from "@/components/typography/typography";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import { Description } from "@/components/ui/description";
import { Input } from "@/components/ui/input";
import { mapStatusNames } from "@/utils/map-status-names";
import { mapWorkModelNames } from "@/utils/map-work-model-names";
import { statusColorMap } from "@/utils/status-color-map";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Pencil, Plus, Rocket, Send, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { LinksSection } from "./links-section";

export function ViewMode() {
  const { getApplicationById, deleteApplication, moveApplicationForward } =
    useApplicationRoutes();
  const navigate = useNavigate();

  const { id } = useParams<{
    mode: string;
    id: string | undefined;
  }>();

  const {
    data: applicationData,
    isPending,
    refetch: refetchApplication,
  } = useQuery({
    queryKey: ["get-application-by-id"],
    queryFn: () => getApplicationById(id),
  });

  const deleteApplcationMutation = useMutation({
    mutationKey: ["delete-application"],
    mutationFn: () => deleteApplication(id),
    onSuccess: () => {
      toast("Application deleted successfully", { position: "top-right" });
      navigate("/board");
    },
    onError: () => {
      toast("Failed to delete application", { position: "top-right" });
    },
  });

  const moveApplicationForwardMutation = useMutation({
    mutationKey: ["move-application-forward"],
    mutationFn: () => moveApplicationForward(applicationData?.id),
    onSuccess: () => {
      toast("Application moved succesfully!", { position: "top-right" });
      refetchApplication();
    },
    onError: () => {
      toast("Failed to move application, please try again.", {
        position: "top-right",
      });
    },
  });

  if (isPending) return <div>loading</div>;

  return (
    <>
      <div className="pl-6 pr-2.5 mt-21 h-16 max-w-284 w-full bg-surface rounded-xl border shadow flex items-center justify-between">
        <Typography variant="muted">
          {" "}
          application id: {applicationData?.id}
        </Typography>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>
                <Trash />
                Delete
              </Button>
            </AlertDialogTrigger>
            <ConfirmDeleteModal
              handleDelete={() => deleteApplcationMutation.mutate()}
            />
          </AlertDialog>
          <Button
            variant={"outline"}
            onClick={() => navigate(`/application/edit/${id}`)}
          >
            <Pencil />
            Edit
          </Button>
          {applicationData?.status !== "accepted" && (
            <Button onClick={() => moveApplicationForwardMutation.mutate()}>
              <Rocket />
              Move to next stage
            </Button>
          )}
        </div>
      </div>
      <div className="w-full h-full flex justify-center gap-4">
        <div className="flex flex-col gap-4 max-w-200 w-full bg-surface border shadow pt-16 pb-24 px-16 ml-16 mt-4 mb-8 rounded-xl">
          <div className="flex w-full">
            <div className="w-1/2 flex flex-col gap-4">
              <div>
                <Typography variant="h2">{applicationData?.title}</Typography>
                <Typography variant="p" className="font-bold">
                  {applicationData?.position} at {applicationData?.companyName}
                </Typography>
              </div>
              <div className="flex gap-2">
                <Badge className={`${statusColorMap[applicationData!.status]}`}>
                  {mapStatusNames[applicationData!.status]}
                </Badge>
                {applicationData?.workModel && (
                  <Badge>{mapWorkModelNames[applicationData.workModel]}</Badge>
                )}
                {applicationData?.regime && (
                  <Badge>regime: {applicationData.regime}</Badge>
                )}
              </div>
            </div>
            <div className="w-1/2 flex flex-col gap-2 items-end">
              {applicationData!.salary && (
                <>
                  <div className="flex gap-2 items-center">
                    <Typography className="font-bold">salary:</Typography>
                    <Typography>
                      {applicationData?.salary.toString().replace(".", ",")}
                    </Typography>
                    <Typography className="text-primary">
                      {applicationData?.currency}
                    </Typography>
                    <Typography variant="muted" className="mb-0.5">
                      ({applicationData?.salaryType})
                    </Typography>
                  </div>
                </>
              )}
              {applicationData?.appliedAt && (
                <Typography variant="muted">
                  applied at: {format(applicationData.appliedAt, "MM/dd/yyyy")}
                </Typography>
              )}
            </div>
          </div>
          <div className="w-full border-b my-4" />
          <div className="flex flex-col gap-4">
            <Typography variant="p" className="font-bold text-xl">
              Description
            </Typography>
            <Description
              description={applicationData!.description ?? ""}
              limit={200}
            />
          </div>
          <LinksSection links={applicationData!.applicationLinks} />
          <div className="flex flex-col gap-4">
            <Typography variant="p" className="font-bold text-xl">
              Notes
            </Typography>
            placeholder!!
            <div className="flex w-full gap-2">
              <Input className="w-full" />
              <Button className="text-surface w-16">
                <Send />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-8 mr-16 flex flex-col gap-4">
          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-xl">
            <div className="flex pt-2 px-4 justify-between items-center">
              <Typography className="font-bold">Deadlines</Typography>
              <Button size={"xs"} variant={"outline"}>
                <Plus />
              </Button>
            </div>
            <div className="w-full border-b" />
          </div>
          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-2xl">
            <div className="flex pt-2 px-4 justify-between items-center">
              <Typography className="font-bold">Activity</Typography>
              <Button size={"xs"} variant={"outline"}>
                <Plus />
              </Button>
            </div>
            <div className="w-full border-b" />
          </div>
        </div>
      </div>
    </>
  );
}
