import { throwParameterError } from "@/utils/throw-parameter-error";
import { useApi } from "../infra/useApi";
import type {
  CreateApplicationLinkPayload,
  CreateApplicationLinkResponse,
} from "./types";
import type { AxiosResponse } from "axios";

export const useApplicationLinkRoutes = () => {
  const api = useApi();

  const createApplicationLink = async (
    data?: CreateApplicationLinkPayload,
    applicationId?: string,
  ) => {
    if (!applicationId) throwParameterError("applicationId");
    if (!data) throwParameterError("data");

    const response = await api.post<
      CreateApplicationLinkPayload,
      AxiosResponse<CreateApplicationLinkResponse>
    >(`/applications/${applicationId}/links`, data);

    return response.data;
  };

  const deleteApplicationLink = async (
    applicationId?: string,
    applicationLinkId?: string,
  ) => {
    if (!applicationId) throwParameterError("applicationId");
    if (!applicationLinkId) throwParameterError("applicationLinkId");

    const response = await api.delete(
      `/applications/${applicationId}/links/${applicationLinkId}`,
    );

    return response.data;
  };

  return { createApplicationLink, deleteApplicationLink };
};
