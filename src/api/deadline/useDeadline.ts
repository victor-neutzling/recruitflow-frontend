import { throwParameterError } from "@/utils/throw-parameter-error";
import { useApi } from "../infra/useApi";
import type {
  CreateDeadlinePayload,
  Deadline,
  GetDeadlinesResponse,
} from "./types";
import type { AxiosResponse } from "axios";

export const useDeadlineRoutes = () => {
  const api = useApi();

  const getDeadlines = async () => {
    const response = await api.get<GetDeadlinesResponse>(
      `/applications/deadlines`,
    );

    return response.data;
  };

  const createDeadline = async (
    data?: CreateDeadlinePayload,
    applicationId?: string,
  ) => {
    if (!data) throwParameterError("data");
    if (!applicationId) throwParameterError("applicationId");

    const response = await api.post<
      CreateDeadlinePayload,
      AxiosResponse<Deadline>
    >(`/applications/deadlines/${applicationId}`, data);

    return response.data;
  };

  const deleteDeadline = async (deadlineId?: string) => {
    if (!deadlineId) throwParameterError("deadlineId");

    const response = await api.delete(`/applications/deadlines/${deadlineId}`);

    return response.data;
  };

  return {
    getDeadlines,
    createDeadline,
    deleteDeadline,
  };
};
