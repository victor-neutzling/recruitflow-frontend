import { useForm, Controller } from "react-hook-form";
import { applicationFormSchema, type ApplicationFormData } from "../schema";
import {
  APPLICATION_FORM_INITIAL_VALUES,
  CURRENCY_ITEMS,
  REGIME_ITEMS,
  WORK_MODEL_ITEMS,
} from "../constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Typography } from "@/components/typography/typography";
import {
  BookOpen,
  CalendarIcon,
  Info,
  Pencil,
  Plus,
  Send,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useApplicationRoutes } from "@/api/application/useApplication";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ConfirmDeleteModal } from "@/components/ui/confirm-delete-modal";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { LinksSection } from "./links-section";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  normalizeApplicationFormData,
  normalizeApplicationToForm,
} from "../utils";
import { EditModeSkeleton } from "../skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function EditMode() {
  const { getApplicationById, deleteApplication, editApplication } =
    useApplicationRoutes();
  const navigate = useNavigate();

  const [date, setDate] = useState<Date>();

  const { id } = useParams<{
    mode: string;
    id: string | undefined;
  }>();

  const { data: applicationData, isFetching } = useQuery({
    queryKey: ["get-application-by-id"],
    queryFn: async () => {
      const response = await getApplicationById(id);

      form.reset(normalizeApplicationToForm(response));

      if (response.appliedAt) setDate(new Date(response.appliedAt));

      return response;
    },
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

  const editApplicationMutation = useMutation({
    mutationKey: ["move-application-forward"],
    mutationFn: async (data: ApplicationFormData) => {
      return editApplication(
        id,
        normalizeApplicationFormData(
          data,
          applicationData?.status ?? "applied",
          applicationData?.columnIndex ?? 0,
          date?.toISOString(),
        ),
      );
    },
    onSuccess: () => {
      toast("Application edited successfully!", { position: "top-right" });
      navigate(`/application/view/${id}`);
    },
    onError: () => {
      toast("Failed to edit application, please try again.", {
        position: "top-right",
      });
    },
  });

  const form = useForm<ApplicationFormData>({
    mode: "onSubmit",
    resolver: zodResolver(applicationFormSchema),
    defaultValues: APPLICATION_FORM_INITIAL_VALUES,
  });

  function handleSubmit() {
    editApplicationMutation.mutate(form.getValues());
  }

  if (isFetching) return <EditModeSkeleton />;

  return (
    <form
      className="flex flex-col items-center px-16 w-full"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <div className="pl-6 pr-2.5 mt-21 h-16 max-w-284 w-full bg-surface rounded-xl border shadow flex items-center justify-between">
        <Typography variant="muted">
          {" "}
          application id: {applicationData?.id}
        </Typography>
        <div className="flex gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} type="button">
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
            type="button"
            onClick={() => navigate(`/application/view/${id}`)}
          >
            <BookOpen />
            View
          </Button>

          <Button type="submit">
            <Pencil />
            Submit
          </Button>
        </div>
      </div>

      <div className="w-full h-full flex justify-center gap-4">
        <div className="flex flex-col gap-4 max-w-200 w-full bg-surface border shadow pt-16 pb-24 px-16 mt-4 mb-8 rounded-xl">
          <Field>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <FieldDescription>(Optional)</FieldDescription>
                <Tooltip>
                  <TooltipTrigger>
                    <Info size={15} className="text-primary" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <Typography className="text-surface">
                      Custom title for the card/application, if not filled,
                      title will default to position @ company name
                    </Typography>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FieldError>{form.formState.errors.title?.message}</FieldError>
            </div>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input
                  id="title"
                  {...field}
                  placeholder="e.g. Senior Frontend Engineer - remote"
                />
              )}
            />
          </Field>
          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex justify-between">
                  <FieldLabel htmlFor="position">Position</FieldLabel>
                  <FieldError>
                    {form.formState.errors.position?.message}
                  </FieldError>
                </div>
                <Controller
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <Input
                      id="position"
                      {...field}
                      placeholder="e.g. Front-end Engineer"
                    />
                  )}
                />
              </Field>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex justify-between">
                  <FieldLabel htmlFor="company">Company name</FieldLabel>
                  <FieldError>
                    {form.formState.errors.companyName?.message}
                  </FieldError>
                </div>
                <Controller
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <Input
                      id="company"
                      {...field}
                      placeholder="e.g. XYZ Corp"
                    />
                  )}
                />
              </Field>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <FieldLabel htmlFor="salary">Salary</FieldLabel>
                    <FieldDescription>(Optional)</FieldDescription>
                  </div>
                  <FieldError>
                    {form.formState.errors.salary?.message}
                  </FieldError>
                </div>
                <Controller
                  control={form.control}
                  name="salary"
                  render={({ field }) => (
                    <Input
                      id="salary"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9.,]/g, "");
                        field.onChange(value);
                      }}
                      placeholder="e.g. 6900.00"
                    />
                  )}
                />
              </Field>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <FieldLabel htmlFor="currency">Currency</FieldLabel>
                    <FieldDescription>(Optional)</FieldDescription>
                  </div>
                  <FieldError>
                    {form.formState.errors.currency?.message}
                  </FieldError>
                </div>
                <Controller
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <Input id="currency" {...field} placeholder="e.g. USD" />
                  )}
                />
              </Field>
            </div>
          </div>
          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <FieldLabel htmlFor="salary-type">Salary type</FieldLabel>
                    <FieldDescription>(Optional)</FieldDescription>
                  </div>
                  <FieldError>
                    {form.formState.errors.salaryType?.message}
                  </FieldError>
                </div>
                <Controller
                  control={form.control}
                  name="salaryType"
                  render={({ field }) => {
                    return (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id="salary-type">
                          <SelectValue
                            placeholder={"Select a salary type..."}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {CURRENCY_ITEMS.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </Field>
            </div>

            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <FieldLabel htmlFor="work-model">Work Model</FieldLabel>
                    <FieldDescription>(Optional)</FieldDescription>
                  </div>
                  <FieldError>
                    {form.formState.errors.workModel?.message}
                  </FieldError>
                </div>
                <Controller
                  control={form.control}
                  name="workModel"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="work-model">
                        <SelectValue
                          placeholder={"Select a salary work model..."}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {WORK_MODEL_ITEMS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <FieldLabel htmlFor="regime">Regime</FieldLabel>
                    <FieldDescription>(Optional)</FieldDescription>
                  </div>
                  <FieldError>
                    {form.formState.errors.regime?.message}
                  </FieldError>
                </div>

                <Controller
                  control={form.control}
                  name="regime"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="regime">
                        <SelectValue placeholder={"Select a work regime..."} />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIME_ITEMS.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>
            <div className="w-1/2 flex flex-col gap-4">
              <Field>
                <div className="flex gap-2">
                  <FieldLabel htmlFor="applied-at">
                    Date of application
                  </FieldLabel>
                  <FieldDescription>(Optional)</FieldDescription>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="applied-at"
                      variant="outline"
                      data-empty={!date}
                      className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                    >
                      <CalendarIcon />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
            </div>
          </div>
          <div className="w-full border-b my-4" />

          <div className="flex flex-col gap-4">
            <Field>
              <div className="flex gap-2">
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <FieldDescription>(Optional)</FieldDescription>
              </div>

              <Controller
                control={form.control}
                name="description"
                render={({ field }) => (
                  <Textarea {...field} placeholder="Enter description" />
                )}
              />
            </Field>
          </div>

          <LinksSection links={applicationData?.applicationLinks} />

          <div className="flex flex-col gap-4">
            <Typography variant="p" className="font-bold text-xl">
              Notes
            </Typography>

            <div className="flex w-full gap-2">
              <Input className="w-full" placeholder="Add a note..." />
              <Button className="text-surface w-16">
                <Send />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-xl">
            <div className="flex pt-2 px-4 justify-between items-center">
              <Typography className="font-bold">Deadlines</Typography>
              <Button size="xs" variant="outline" type="button">
                <Plus />
              </Button>
            </div>
            <div className="w-full border-b" />
          </div>

          <div className="flex flex-col gap-2 h-40 w-80 bg-surface border shadow rounded-2xl">
            <div className="flex pt-2 px-4 justify-between items-center">
              <Typography className="font-bold">Activity</Typography>
              <Button size="xs" variant="outline" type="button">
                <Plus />
              </Button>
            </div>
            <div className="w-full border-b" />
          </div>
        </div>
      </div>
    </form>
  );
}
