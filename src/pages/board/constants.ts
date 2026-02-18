import type { GetApplicationsResponse } from "@/api/application/types";

export const INITIAL_APPLICATIONS: GetApplicationsResponse["applications"] = {
  applied: [],
  interview: [],
  inProgress: [],
  offer: [],
  rejected: [],
  accepted: [],
};
