import type { GetApplicationsResponse } from "@/api/application/types";

export const INITIAL_APPLICATIONS: GetApplicationsResponse = {
  applied: [],
  reply: [],
  interview: [],
  offer: [],
  rejected: [],
  accepted: [],
};
