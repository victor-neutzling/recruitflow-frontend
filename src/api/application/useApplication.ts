import type { AxiosResponse } from "axios";
import { useApi } from "../infra/useApi";
import type {
  Application,
  CreateApplicationPayload,
  GetApplicationByIdResponse,
  GetApplicationsResponse,
  MoveApplicationsPayload,
} from "./types";
import { throwParameterError } from "@/utils/throw-parameter-error";

export const useApplicationRoutes = () => {
  const api = useApi();

  const getApplications = async () => {
    const response = await api.get<GetApplicationsResponse>("/applications");

    return response.data;
  };

  const getApplicationById = async (id?: string) => {
    if (!id) throwParameterError("id");

    const response = await api.get<GetApplicationByIdResponse>(
      `/applications/${id}`,
    );

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

  const deleteApplication = async (id?: string) => {
    if (!id) throwParameterError("id");

    const response = await api.delete(`/applications/${id}`);

    return response.data;
  };
  return {
    getApplications,
    getApplicationById,
    createApplication,
    moveApplications,
    deleteApplication,
  };
};
