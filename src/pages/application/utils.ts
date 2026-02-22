import type {
  EditApplicationPayload,
  GetApplicationByIdResponse,
} from "@/api/application/types";
import type { ApplicationFormData } from "./schema";

const emptyToUndefined = <T>(value: T | ""): T | undefined =>
  value === "" ? undefined : value;

export function normalizeApplicationFormData(
  data: ApplicationFormData,
  status: EditApplicationPayload["status"],
  columnIndex: EditApplicationPayload["columnIndex"],
  appliedAt?: string,
): EditApplicationPayload {
  return {
    companyName: data.companyName.trim(),
    position: data.position.trim(),

    title: data.title?.length
      ? data.title?.trim()
      : `${data.position} @ ${data.companyName}`,
    salary:
      parseFloat(data.salary?.trim().replace(",", ".") ?? "") || undefined,
    description: data.description?.trim() || undefined,
    currency: data.currency?.trim() || undefined,

    salaryType: emptyToUndefined(data.salaryType),
    workModel: emptyToUndefined(data.workModel),
    regime: emptyToUndefined(data.regime),
    appliedAt,
    status,
    columnIndex,
  };
}

export function normalizeApplicationToForm(
  data: GetApplicationByIdResponse,
): ApplicationFormData {
  return {
    title: data.title ?? "",
    companyName: data.companyName ?? "",
    position: data.position ?? "",
    salary: data.salary?.toString() ?? "",
    salaryType: data.salaryType ?? "",
    currency: data.currency ?? "",
    workModel: data.workModel ?? "",
    regime: data.regime ?? "",
    description: data.description ?? "",
  };
}
