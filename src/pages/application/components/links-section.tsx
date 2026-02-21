import { Typography } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ApplicationLink } from "./application-link";

import { CreateApplicationLinkModal } from "./create-link-modal";
import type { GetApplicationByIdResponse } from "@/api/application/types";
import { useParams } from "react-router";
import { Dialog } from "@/components/ui/dialog";

type LinksSectionProps = {
  links: GetApplicationByIdResponse["applicationLinks"] | undefined;
};

export function LinksSection({ links }: LinksSectionProps) {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);
  const { id } = useParams<{
    mode: string;
    id: string | undefined;
  }>();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full gap-2 items-center justify-between">
        <Typography variant="p" className="font-bold text-xl">
          Links
        </Typography>
        <Button
          variant={"outline"}
          className="rounded-full w-9"
          onClick={() => setIsCreateLinkModalOpen(true)}
        >
          <Plus />
        </Button>
      </div>
      {links?.length ? (
        <div>
          <div className="flex gap-4 flex-wrap">
            {links?.map((applicationLink) => (
              <ApplicationLink
                applicationLink={applicationLink}
                applicationId={id!}
              />
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
      <Dialog
        open={isCreateLinkModalOpen}
        onOpenChange={setIsCreateLinkModalOpen}
      >
        <CreateApplicationLinkModal
          applicationId={id!}
          setOpen={setIsCreateLinkModalOpen}
        />
      </Dialog>
    </div>
  );
}
