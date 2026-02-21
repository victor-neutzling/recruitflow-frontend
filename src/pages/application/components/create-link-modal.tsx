import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import {
  applicationLinkFormSchema,
  type ApplicationLinkFormData,
} from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { APPLICATION_LINK_FORM_INITIAL_VALUES } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApplicationLinkRoutes } from "@/api/application-link/useApplicationLink";
import { extractDomainName } from "@/utils/extract-domain-name";
import { toast } from "sonner";

type CreateApplicationModalProps = {
  applicationId: string;
  setOpen: (value: boolean) => void;
};

export function CreateApplicationLinkModal({
  applicationId,
  setOpen,
}: CreateApplicationModalProps) {
  const { createApplicationLink } = useApplicationLinkRoutes();
  const queryClient = useQueryClient();

  const form = useForm<ApplicationLinkFormData>({
    mode: "onSubmit",
    resolver: zodResolver(applicationLinkFormSchema),
    defaultValues: APPLICATION_LINK_FORM_INITIAL_VALUES,
  });

  const createApplicationLinkMutation = useMutation({
    mutationKey: ["create-application-link"],
    mutationFn: () => {
      const formValues = form.getValues();
      const payload = {
        url: formValues.url,
        label: formValues.label
          ? formValues.label
          : extractDomainName(formValues.url),
      };

      return createApplicationLink(payload, applicationId);
    },
    onSuccess: () => {
      toast("Application link created successfully.", {
        position: "top-right",
      });
      queryClient.refetchQueries({
        queryKey: ["get-application-by-id"],
      });
      setOpen(false);
      form.reset();
      form.clearErrors();
    },
    onError: () => {
      toast("Application link creation failed.", {
        position: "top-right",
      });
    },
  });

  function handleClose() {
    setOpen(false);
    form.reset();
    form.clearErrors();
  }

  function handleSubmit() {
    createApplicationLinkMutation.mutate();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create link</DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Field>
            <div className="flex gap-2">
              <FieldLabel htmlFor="link-label">Label</FieldLabel>
              <FieldDescription>(Optional)</FieldDescription>
            </div>
            <Controller
              control={form.control}
              name="label"
              render={({ field }) => (
                <Input
                  {...field}
                  id="link-label"
                  placeholder="e.g. Linkedin Page"
                />
              )}
            />
          </Field>
          <Field>
            <div className="flex justify-between">
              <FieldLabel htmlFor="link-url">URL</FieldLabel>
              <FieldError>{form.formState.errors.url?.message}</FieldError>
            </div>
            <Controller
              control={form.control}
              name="url"
              render={({ field }) => (
                <Input
                  {...field}
                  id="link-url"
                  placeholder="e.g. https://www.linkedin.com/..."
                />
              )}
            />
          </Field>
        </FieldGroup>
        <DialogFooter className="pt-4">
          <Button variant={"outline"} type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
