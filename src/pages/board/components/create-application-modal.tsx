import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { APPLICATION_FORM_INITIAL_VALUES } from "@/pages/application/constants";
import { applicationFormSchema, type ApplicationFormData } from "../schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateApplicationPayload } from "@/api/application/types";
import { useApplicationRoutes } from "@/api/application/useApplication";

import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Typography } from "@/components/typography/typography";

type CreateApplicationModalProps = {
  columnLength: number;
  columnName:
    | "applied"
    | "interview"
    | "inProgress"
    | "offer"
    | "rejected"
    | "accepted";
  setOpen: (value: boolean) => void;
};

export function CreateApplicationModal({
  columnName,
  columnLength,
  setOpen,
}: CreateApplicationModalProps) {
  const { createApplication } = useApplicationRoutes();
  const queryClient = useQueryClient();

  const form = useForm<ApplicationFormData>({
    mode: "onSubmit",
    resolver: zodResolver(applicationFormSchema),
    defaultValues: APPLICATION_FORM_INITIAL_VALUES,
  });

  const createApplicationMutation = useMutation({
    mutationKey: ["create-application"],
    mutationFn: (data: CreateApplicationPayload) => createApplication(data),
    onSuccess: () => {
      toast(
        "Your application has been created successfully. Click on it to view or add more details.",
        { position: "top-right" },
      );
      queryClient.refetchQueries({
        queryKey: ["get-applications"],
      });
      setOpen(false);
    },
    onError: () => {
      toast("Application creation has failed, please try again.", {
        position: "top-right",
      });
    },
  });

  function handleSubmit(data: ApplicationFormData) {
    createApplicationMutation.mutate({
      title: data.title || `${data.position} @ ${data.companyName}`,
      position: data.position,
      companyName: data.companyName,
      columnIndex: columnLength,
      status: columnName,
      appliedAt: new Date().toISOString(),
    });
    form.reset();
    form.clearErrors();
  }

  function handleClose() {
    form.reset();
    form.clearErrors();
    setOpen(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create application</DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Field>
            <div className="flex justify-between">
              <FieldLabel className="text-text-primary" htmlFor="position">
                Position
              </FieldLabel>
              <FieldError>{form.formState.errors.position?.message}</FieldError>
            </div>
            <Controller
              control={form.control}
              name="position"
              render={({ field }) => (
                <Input
                  {...field}
                  id="position"
                  placeholder="e.g. Frontend Developer, Sales Associate"
                  className="text-text-primary"
                />
              )}
            />
          </Field>
          <Field>
            <div className="flex justify-between">
              <FieldLabel className="text-text-primary" htmlFor="companyName">
                Company name
              </FieldLabel>
              <FieldError>
                {form.formState.errors.companyName?.message}
              </FieldError>
            </div>
            <Controller
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <Input
                  {...field}
                  id="companyName"
                  placeholder="e.g. ABC Company, XYZ Ltd."
                  className="text-text-primary"
                />
              )}
            />
          </Field>
          <Field>
            <div className="flex gap-2 items-center">
              <FieldLabel className="text-text-primary font-" htmlFor="title">
                Application label
              </FieldLabel>

              <FieldDescription>(Optional)</FieldDescription>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={15} className="text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <Typography className="text-surface">
                    Custom title for the card/application, if not filled, title
                    will default to position @ company name
                  </Typography>
                </TooltipContent>
              </Tooltip>
            </div>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input
                  {...field}
                  id="title"
                  placeholder="e.g. Summer internship – Remote"
                  className="text-text-primary"
                />
              )}
            />
          </Field>
        </FieldGroup>
        <DialogFooter className="pt-4">
          <Button variant={"outline"} type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={createApplicationMutation.isPending}>
            Create
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
