import { useApplicationRoutes } from "@/api/application/useApplication";
import { Typography } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { mapStatusNames } from "@/utils/map-status-names";
import { statusColorMap } from "@/utils/status-color-map";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { ApplicationContextMenu } from "../board/components/application-context-menu";
import { CirclePlus, EllipsisVertical } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { CreateApplicationModal } from "../board/components/create-application-modal";
import type { Application } from "@/api/application/types";
import { ListSkeleton } from "./skeleton";

export default function List() {
  const navigate = useNavigate();
  const { getApplications } = useApplicationRoutes();
  const [open, setOpen] = useState(false);

  const [dialogData, setDialogData] = useState({ title: "", sectionLength: 0 });

  const applicationsQuery = useQuery({
    queryKey: ["get-applications"],
    queryFn: () => getApplications(),
  });

  function handleOpenDialog(title: string, sectionLength: number) {
    setDialogData({ title, sectionLength });
    setOpen(true);
  }

  return (
    <PageBase>
      <Dialog open={open} onOpenChange={setOpen}>
        <Navbar>
          <Input placeholder="search..." type="search" />
          <Button variant={"link"}>Statistics</Button>
          <Button variant={"link"} onClick={() => navigate("/board")}>
            Board
          </Button>
        </Navbar>
        {applicationsQuery.isFetching ? (
          <ListSkeleton />
        ) : (
          <div className="h-full w-full mt-16 flex justify-center">
            <div className="max-w-350 w-full h-full p-4 mx-16 gap-4 flex flex-col bg-surface shadow-md">
              {applicationsQuery &&
                Object.entries(applicationsQuery.data?.applications ?? {}).map(
                  ([title, section]) => (
                    <div className="w-full border rounded-2xl flex flex-col min-h-24 shadow">
                      <div className="w-full py-2 px-4 flex gap-4 items-center justify-between">
                        <div className="flex gap-4 items-center">
                          <div
                            className={`w-4 h-4 ${statusColorMap[title]} rounded-full`}
                          />
                          <Typography variant="p" className="font-bold">
                            {mapStatusNames[title]}
                          </Typography>
                        </div>
                        <Button
                          variant={"ghost"}
                          className="w-8 h-8 rounded-lg m-0"
                          onClick={() =>
                            handleOpenDialog(title, section.length)
                          }
                        >
                          <CirclePlus
                            size={16}
                            className="text-text-secondary"
                          />
                        </Button>
                      </div>
                      {section.length ? (
                        section.map((application) => (
                          <div
                            className="flex width-full px-4 py-3 items-center border-t justify-between cursor-pointer"
                            onClick={() =>
                              navigate(`/application/view/${application.id}`)
                            }
                          >
                            <Popover>
                              <div className="flex items-center gap-2">
                                <Typography variant="p">
                                  {application.title}
                                </Typography>
                                <Typography variant="muted">
                                  {application.position} @{" "}
                                  {application.companyName}
                                </Typography>
                              </div>
                              <div className="flex items-center gap-2">
                                {application.appliedAt && (
                                  <Typography variant="muted">
                                    applied at:{" "}
                                    {format(
                                      application.appliedAt,
                                      "MM/dd/yyyy",
                                    )}
                                  </Typography>
                                )}
                                <PopoverTrigger
                                  onClick={(e) => e.stopPropagation()}
                                  asChild
                                >
                                  <Button
                                    variant={"ghost"}
                                    className="w-8 h-8 rounded-lg m-0"
                                  >
                                    <EllipsisVertical
                                      size={16}
                                      className="text-text-secondary"
                                    />
                                  </Button>
                                </PopoverTrigger>
                              </div>
                              <ApplicationContextMenu id={application.id} />
                            </Popover>
                          </div>
                        ))
                      ) : (
                        <div className="flex justify-center w-full py-4 px-4">
                          <Typography variant="muted">
                            There are no applications under this status.
                          </Typography>
                        </div>
                      )}
                    </div>
                  ),
                )}
            </div>
          </div>
        )}
        <CreateApplicationModal
          columnLength={dialogData.sectionLength}
          columnName={dialogData.title as Application["status"]}
          setOpen={(value: boolean) => setOpen(value)}
        />
      </Dialog>
    </PageBase>
  );
}
