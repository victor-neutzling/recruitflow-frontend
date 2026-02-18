import type { AxiosResponse } from "axios";
import { useApi } from "../infra/useApi";
import type {
  Application,
  CreateApplicationPayload,
  GetApplicationsResponse,
  MoveApplicationsPayload,
} from "./types";

export const useApplicationRoutes = () => {
  const api = useApi();

  const getApplications = async () => {
    const response = await api.get<GetApplicationsResponse>("/applications");

    return response.data;
  };

  const createApplication = async (data: CreateApplicationPayload) => {
    const response = await api.post<
      CreateApplicationPayload,
      AxiosResponse<Application>
    >("/applications", data);

    return response.data;
  };

  const moveApplications = async (data: MoveApplicationsPayload) => {
    const response = await api.patch<
      MoveApplicationsPayload,
      AxiosResponse<void>
    >("/applications", data);

    return response.data;
  };

  const deleteApplication = async (id: string) => {
    const response = await api.delete(`/applications/${id}`);

    return response.data;
  };
  return {
    getApplications,
    moveApplications,
    deleteApplication,
    createApplication,
  };
};
