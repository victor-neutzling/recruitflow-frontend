import type { GetApplicationsParams } from "@/api/application/types";
import { useState, type Dispatch, type SetStateAction } from "react";
import { Field, FieldGroup, FieldLabel } from "../../components/ui/field";
import { Typography } from "@/components/typography";
import {
  Briefcase,
  Calendar as CalendarIcon,
  ChevronLeft,
  CircleDollarSign,
  Filter,
} from "lucide-react";
import { Button } from "../../components/ui/button";

import { Controller, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FILTER_FORM_INITIAL_VALUES,
  REGIME_ITEMS,
  WORK_MODEL_ITEMS,
} from "./constants";
import { filterFormSchema, type FilterFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { MoneyInput } from "@/components/ui/money-input";

type SidebarProps = {
  filters: GetApplicationsParams;
  setFilters: Dispatch<SetStateAction<GetApplicationsParams>>;
};

export function Sidebar({ filters, setFilters }: SidebarProps) {
  const { isSidebarOpen, setSidebarOpen } = useSidebarStore();

  const [fromDate, setFromDate] = useState<Date | undefined>(
    filters.appliedFrom ? parseISO(filters.appliedFrom) : undefined,
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    filters.appliedTo ? parseISO(filters.appliedTo) : undefined,
  );

  const form = useForm<FilterFormData>({
    mode: "onSubmit",
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      regime: filters.regime || "",
      workModel: filters.workModel || "",
      salaryMin: filters.salaryMin,
      salaryMax: filters.salaryMax,
    },
  });
  function toggleExpanded() {
    setSidebarOpen(!isSidebarOpen);
  }

  function hasAnyFilters(values: FilterFormData): boolean {
    const anyValueFilled = Object.values(values).some((value) => {
      if (typeof value === "string") {
        return value.trim() !== "";
      }

      if (typeof value === "number") {
        return !isNaN(value);
      }

      return false;
    });

    const anyDateFilled = fromDate !== undefined || toDate !== undefined;

    return anyValueFilled || anyDateFilled;
  }

  function handleFormReset() {
    form.reset(FILTER_FORM_INITIAL_VALUES);
    setFromDate(undefined);
    setToDate(undefined);

    const data = form.getValues();

    setFilters({
      regime: data.regime ?? undefined,
      workModel: data.workModel ?? undefined,
      salaryMin: data.salaryMin ?? undefined,
      salaryMax: data.salaryMax ?? undefined,
      appliedFrom: undefined,
      appliedTo: undefined,
    });
  }

  function handleSubmit(data: FilterFormData, hasClearedDate?: boolean) {
    setFilters({
      regime: data.regime ?? undefined,
      workModel: data.workModel ?? undefined,
      salaryMin: data.salaryMin ?? undefined,
      salaryMax: data.salaryMax ?? undefined,
      appliedFrom: hasClearedDate ? undefined : fromDate?.toISOString(),
      appliedTo: hasClearedDate ? undefined : toDate?.toISOString(),
    });
  }

  return (
    <form
      className={`${isSidebarOpen ? "w-64" : "w-17.5"} border-l shadow-md flex flex-col items-center bg-surface/50 mr-2 pt-16 h-full`}
      onSubmit={form.handleSubmit((data) => handleSubmit(data))}
    >
      <div className="flex justify-between items-center px-4 h-16.5 border-b bg-surface  w-full">
        {isSidebarOpen && (
          <div className="flex gap-2 items-center">
            <>
              <Filter className="text-text-primary" size={15} />
              <Typography className="font-bold">Filters</Typography>
            </>
          </div>
        )}
        <Button
          onClick={toggleExpanded}
          className="rounded-full w-9 flex items-center justify-center"
          variant={"outline"}
          type="button"
        >
          {isSidebarOpen ? (
            <ChevronLeft className="mr-0.5 text-primary" />
          ) : (
            <Filter className="w-4! text-primary" />
          )}
        </Button>
      </div>

      <FieldGroup
        className={`${!isSidebarOpen && "hidden!"} p-4 flex flex-col gap-4 border rounded-lg mt-2 w-56 mx-2 bg-surface`}
      >
        <Typography className="font-bold">Salary range</Typography>
        <Field>
          <FieldLabel htmlFor="salary-min">Minimum salary</FieldLabel>
          <Controller
            control={form.control}
            name="salaryMin"
            render={({ field }) => (
              <MoneyInput
                {...field}
                id="salary-min"
                placeholder="e.g. 3000.00"
              />
            )}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="salary-max">Maximum salary</FieldLabel>
          <Controller
            control={form.control}
            name="salaryMax"
            render={({ field }) => (
              <MoneyInput
                {...field}
                id="salary-max"
                placeholder="e.g. 9000.00"
              />
            )}
          />
        </Field>
      </FieldGroup>
      <FieldGroup
        className={`${!isSidebarOpen && "hidden!"} p-4 flex flex-col gap-4 border rounded-lg mt-2 w-56 mx-2 bg-surface`}
      >
        <Typography className="font-bold">Work arrangement</Typography>
        <Field>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <FieldLabel htmlFor="work-model">Work Model</FieldLabel>
            </div>
          </div>
          <Controller
            control={form.control}
            name="workModel"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="work-model">
                  <SelectValue placeholder={"Select a work model..."} />
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
        <Field>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <FieldLabel htmlFor="regime">Regime</FieldLabel>
            </div>
          </div>
          <Controller
            control={form.control}
            name="regime"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="regime">
                  <SelectValue placeholder={"Select a regime..."} />
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
      </FieldGroup>
      <FieldGroup
        className={`${!isSidebarOpen && "hidden!"} p-4 flex flex-col gap-4 border rounded-lg mt-2 w-56 mx-2 bg-surface`}
      >
        <Typography className="font-bold">Date</Typography>
        <Field>
          <div className="flex gap-2">
            <FieldLabel htmlFor="applied-from">Posted after</FieldLabel>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="applied-from"
                variant="outline"
                data-empty={!fromDate}
                className="data-[empty=true]:text-muted-foreground w-70 justify-start text-left font-normal"
              >
                <CalendarIcon />
                {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
              />
            </PopoverContent>
          </Popover>
        </Field>
        <Field>
          <div className="flex gap-2">
            <FieldLabel htmlFor="applied-to">Posted before</FieldLabel>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="applied-to"
                variant="outline"
                data-empty={!toDate}
                className="data-[empty=true]:text-muted-foreground w-70 justify-start text-left font-normal"
              >
                <CalendarIcon />
                {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={toDate} onSelect={setToDate} />
            </PopoverContent>
          </Popover>
        </Field>
      </FieldGroup>
      <div className={`${!isSidebarOpen && "hidden!"} flex gap-2 w-56 mt-2`}>
        <Button
          type="button"
          className="w-22"
          variant={"outline"}
          onClick={handleFormReset}
        >
          Clear
        </Button>
        <Button type="submit" className="w-32">
          Apply filters
        </Button>
      </div>
      <div
        className={`${
          isSidebarOpen || !hasAnyFilters(form.getValues()) ? "hidden" : ""
        } flex flex-col gap-4 mt-4 text-primary rounded-full border p-2 bg-surface`}
      >
        <CircleDollarSign
          size={20}
          className={` hover:text-destructive cursor-pointer ${!(form.getValues().salaryMin || form.getValues().salaryMax) && "hidden"}`}
          onClick={() => {
            form.setValue("salaryMax", undefined);
            form.setValue("salaryMin", undefined);
            handleSubmit(form.getValues());
          }}
        />
        <Briefcase
          size={20}
          className={` hover:text-destructive cursor-pointer ${!(form.getValues().workModel || form.getValues().regime) && "hidden"}`}
          onClick={() => {
            form.setValue("regime", "");
            form.setValue("workModel", "");
            handleSubmit(form.getValues());
          }}
        />
        <CalendarIcon
          size={20}
          className={` hover:text-destructive cursor-pointer ${!(toDate || fromDate) && "hidden"}`}
          onClick={() => {
            setToDate(undefined);
            setFromDate(undefined);
            handleSubmit(form.getValues(), true);
          }}
        />
      </div>
    </form>
  );
}
