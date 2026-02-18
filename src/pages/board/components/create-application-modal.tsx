import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { APPLICATION_FORM_INITIAL_VALUES } from "@/pages/application/constants";
import {
  applicationFormSchema,
  type ApplicationFormData,
} from "@/pages/application/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type CreateApplicationModalProps = {
  columnLength: number;

  setOpen: (value: boolean) => void;
};

export function CreateApplicationModal({
  columnLength,

  setOpen,
}: CreateApplicationModalProps) {
  const form = useForm<ApplicationFormData>({
    mode: "onSubmit",
    resolver: zodResolver(applicationFormSchema),
    defaultValues: APPLICATION_FORM_INITIAL_VALUES,
  });
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create application</DialogTitle>
      </DialogHeader>

      <FieldGroup>
        <Field>
          <FieldLabel className="text-text-primary" htmlFor="position">
            * Position
          </FieldLabel>
          <Input
            id="position"
            placeholder="e.g. Frontend Developer, Sales Associate"
            className="text-text-primary"
          />
        </Field>
        <Field>
          <FieldLabel className="text-text-primary" htmlFor="companyName">
            * Company name
          </FieldLabel>
          <Input
            id="companyName"
            placeholder="e.g. ABC Company, XYZ Ltd."
            className="text-text-primary"
          />
        </Field>
        <Field>
          <div className="flex gap-2 ">
            <FieldLabel className="text-text-primary font-" htmlFor="title">
              Application label
            </FieldLabel>
            <FieldDescription>(Optional)</FieldDescription>
          </div>
          <Input
            id="title"
            placeholder="e.g. Summer internship – Remote"
            className="text-text-primary"
          />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button variant={"outline"} onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
