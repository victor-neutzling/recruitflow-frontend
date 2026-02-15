import type { AxiosResponse } from "axios";
import { useApi } from "../infra/useApi";
import type { GetApplicationsResponse, MoveApplicationsPayload } from "./types";

export const useApplicationRoutes = () => {
  const { get, patch } = useApi();

  const getApplications = async () => {
    const response = await get<GetApplicationsResponse>("/applications");

    return response.data;
  };

  const moveApplications = async (data: MoveApplicationsPayload) => {
    const response = await patch<MoveApplicationsPayload, AxiosResponse<void>>(
      "/applications",
      data,
    );

    return response.data;
  };

  return { getApplications, moveApplications };
};

// type BatchEditApplicationPayload = {
//     id: string;
//     status: "applied" | "reply" | "interview" | "offer" | "rejected" | "accepted";
//     columnIndex: number;
// }[]
