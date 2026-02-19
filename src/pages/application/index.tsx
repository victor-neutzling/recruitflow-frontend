import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import PageBase from "@/components/ui/page-base";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link, useNavigate, useParams } from "react-router";
import { applicationFormSchema, type ApplicationFormData } from "./schema";
import { APPLICATION_FORM_INITIAL_VALUES } from "./constants";
import { useApplicationRoutes } from "@/api/application/useApplication";
import { useQuery } from "@tanstack/react-query";
import { Typography } from "@/components/typography/typography";
import { Badge } from "@/components/ui/badge";
import { mapWorkModelNames } from "@/utils/map-work-model-names";
import { mapStatusNames } from "@/utils/map-status-names";
import { statusColorMap } from "@/utils/status-color-map";
import { useState } from "react";
import { Description } from "@/components/ui/description";
import { format } from "date-fns";
import { Pencil, Plus, Rocket, Send, Trash } from "lucide-react";
import { normalizeUrl } from "@/utils/normalize-url";
import { getFaviconUrl } from "@/utils/get-favicon";

export default function Application() {
  const { getApplicationById } = useApplicationRoutes();
  const { mode, id } = useParams<{
    mode: string;
    id: string | undefined;
  }>();

  const navigate = useNavigate();
  const form = useForm<ApplicationFormData>({
    mode: "onSubmit",
    resolver: zodResolver(applicationFormSchema),
    defaultValues: APPLICATION_FORM_INITIAL_VALUES,
  });

  const { data: applicationData, isPending } = useQuery({
    queryKey: ["get-application"],
    queryFn: () => getApplicationById(id),
  });

  if (isPending) return <div>loading</div>;

  return (
    <PageBase>
      <Navbar>
        <Input placeholder="search..." type="search" />
        <Button variant={"link"}>Statistics</Button>
        <Button variant={"link"}>List View</Button>
        <Button variant={"link"} onClick={() => navigate("/board")}>
          board
        </Button>
      </Navbar>
      <div className="pl-6 pr-2.5 mt-21 h-16 max-w-284 w-full bg-surface rounded-xl border shadow flex items-center justify-between">
        <Typography variant="muted">
          {" "}
          application id: {applicationData?.id}
        </Typography>
        <div className="flex gap-2">
          <Button variant={"destructive"}>
            <Trash />
            delete
          </Button>
          <Button variant={"outline"}>
            <Pencil />
            edit
          </Button>
          <Button>
            <Rocket />
            Move to next stage
          </Button>
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
                    <Typography>{applicationData?.salary}</Typography>
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
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-2 items-center justify-between">
              <Typography variant="p" className="font-bold text-xl">
                Links
              </Typography>
              <Button variant={"outline"} className="rounded-full w-9">
                <Plus />
              </Button>
            </div>
            {applicationData?.applicationLinks.length ? (
              <div>
                <div className="flex gap-4 flex-wrap">
                  {applicationData.applicationLinks.map((appLink) => (
                    <div className="py-4 px-4 pl-6 border rounded-xl w-80 flex flex-col gap-4 items-start">
                      <div className="flex justify-between w-full">
                        <div className="flex gap-2 items-center">
                          <img
                            src={getFaviconUrl(appLink.url)}
                            alt="favicon"
                            className="w-5 h-5 rounded-sm"
                          />{" "}
                          <Typography>{appLink.label}</Typography>
                        </div>
                        <Button
                          className="w-9 rounded-full text-destructive"
                          variant={"ghost"}
                        >
                          <Trash />
                        </Button>
                      </div>
                      <div className="w-full pr-2">
                        <Button
                          variant={"link"}
                          className="flex justify-start p-0 truncate w-full"
                          onClick={() =>
                            window.open(normalizeUrl(appLink.url), "_blank")
                          }
                        >
                          {appLink.url}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full border-b my-4" />
              </div>
            ) : (
              <div className="w-full py-2 flex justify-center">
                <Typography variant="muted">
                  there are no links registered on this application
                </Typography>
              </div>
            )}
          </div>
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
    </PageBase>
  );
}
