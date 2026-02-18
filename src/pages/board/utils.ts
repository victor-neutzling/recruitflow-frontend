import type {
  GetApplicationsResponse,
  MoveApplicationsPayload,
} from "@/api/application/types";

export function mapApplicationsToPayload(
  data: GetApplicationsResponse["applications"],
): MoveApplicationsPayload {
  const payload: MoveApplicationsPayload = [];

  for (const status of Object.keys(
    data,
  ) as (keyof GetApplicationsResponse["applications"])[]) {
    const applications = data[status];

    applications.forEach((app, index) => {
      payload.push({
        id: app.id,
        status,
        columnIndex: index + 1,
      });
    });
  }

  return payload;
}
