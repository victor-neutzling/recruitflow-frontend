import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { deadlineFormSchema, type deadlineFormData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { APPLICATION_LINK_FORM_INITIAL_VALUES } from "../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useDeadlineRoutes } from "@/api/deadline/useDeadline";
import type { CreateDeadlinePayload } from "@/api/deadline/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

type CreateApplicationModalProps = {
  applicationId: string;
  setOpen: (value: boolean) => void;
};

export function CreateDeadlineModal({
  applicationId,
  setOpen,
}: CreateApplicationModalProps) {
  const { createDeadline } = useDeadlineRoutes();
  const queryClient = useQueryClient();

  const [open, setPopoverOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("10:30:00");
  const [dateTimeError, setDateTimeError] = useState<string | null>(null);

  const form = useForm<deadlineFormData>({
    mode: "onSubmit",
    resolver: zodResolver(deadlineFormSchema),
    defaultValues: APPLICATION_LINK_FORM_INITIAL_VALUES,
  });

  const createDeadlineMutation = useMutation({
    mutationKey: ["create-application-link"],
    mutationFn: (data: CreateDeadlinePayload) =>
      createDeadline(data, applicationId),
    onSuccess: () => {
      toast("Deadline created successfully.", {
        position: "top-right",
      });
      queryClient.refetchQueries({
        queryKey: ["get-application-by-id"],
      });
      setOpen(false);
      form.reset();
      form.clearErrors();
      setDate(undefined);
      setTime("10:30:00");
      setDateTimeError(null);
    },
    onError: () => {
      toast("Deadline creation failed.", {
        position: "top-right",
      });
    },
  });

  function handleClose() {
    setOpen(false);
    form.reset();
    form.clearErrors();
    setDate(undefined);
    setTime("10:30:00");
    setDateTimeError(null);
  }

  function handleSubmit(data: deadlineFormData) {
    if (!date || !time) {
      setDateTimeError("Date and time are required");
      return;
    }

    setDateTimeError(null);

    const [hours, minutes, seconds] = time.split(":").map(Number);

    const combinedDate = new Date(date);
    combinedDate.setHours(hours);
    combinedDate.setMinutes(minutes);
    combinedDate.setSeconds(seconds || 0);
    combinedDate.setMilliseconds(0);

    const payload: CreateDeadlinePayload = {
      label: data.label,
      date: combinedDate.toISOString(),
    };

    createDeadlineMutation.mutate(payload);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create link</DialogTitle>
      </DialogHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Field>
            <div className="flex w-full justify-between">
              <FieldLabel htmlFor="label">Label</FieldLabel>
              <FieldError>
                {form.getFieldState("label").error?.message}
              </FieldError>
            </div>
            <Controller
              control={form.control}
              name="label"
              render={({ field }) => (
                <Input {...field} id="label" placeholder="e.g. Interview" />
              )}
            />
          </Field>
          <div className="flex w-full gap-2">
            <Field>
              <FieldLabel htmlFor="date-picker-optional">Date</FieldLabel>
              <Popover open={open} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker-optional"
                    className="w-32 justify-between font-normal"
                  >
                    {date ? format(date, "PPP") : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    defaultMonth={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      setPopoverOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
            <Field className="w-32">
              <FieldLabel htmlFor="time-picker-optional">Time</FieldLabel>
              <Input
                type="time"
                id="time-picker-optional"
                step="1"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </Field>
          </div>
          <FieldError>{dateTimeError}</FieldError>
        </FieldGroup>
        <DialogFooter className="pt-4">
          <Button variant="outline" type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
