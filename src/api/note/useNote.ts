import { throwParameterError } from "@/utils/throw-parameter-error";
import { useApi } from "../infra/useApi";
import type { CreateNotePayload, Note } from "./types";
import type { AxiosResponse } from "axios";

export const useNoteRoutes = () => {
  const api = useApi();

  const createNote = async (
    data?: CreateNotePayload,
    applicationId?: string,
  ) => {
    if (!data) throwParameterError("data");
    if (!applicationId) throwParameterError("applicationId");

    console.log("here");

    const response = await api.post<CreateNotePayload, AxiosResponse<Note>>(
      `/applications/notes/${applicationId}`,
      data,
    );

    return response.data;
  };

  const deleteNote = async (noteId?: string) => {
    if (!noteId) throwParameterError("noteId");

    const response = await api.delete(`/applications/notes/${noteId}`);

    return response.data;
  };

  return {
    createNote,
    deleteNote,
  };
};
