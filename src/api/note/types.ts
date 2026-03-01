export type Note = {
  id: string;
  applicationId: string;

  label: string;
  date: string;
};

export type CreateNotePayload = {
  text: string;
  date: string;
};
