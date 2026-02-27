export type Deadline = {
  id: string;
  applicationId: string;

  label: string;
  date: string;
};

export type GetDeadlinesResponse = {
  deadlines: Deadline[];
  count: number;
};

export type CreateDeadlinePayload = {
  label: string;
  date: string;
};
