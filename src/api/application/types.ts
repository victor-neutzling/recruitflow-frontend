export type Application = {
  id: string;
  title: string;
  position: string | null;
  companyName: string | null;
  appliedAt: string | null;
  columnIndex: number;
  status: "applied" | "reply" | "interview" | "offer" | "rejected" | "accepted";
};

// Grouped applications type
export type GetApplicationsResponse = {
  applied: Application[];
  reply: Application[];
  interview: Application[];
  offer: Application[];
  rejected: Application[];
  accepted: Application[];
};

export type MoveApplicationsPayload = {
  id: string;
  status: "applied" | "reply" | "interview" | "offer" | "rejected" | "accepted";
  columnIndex: number;
}[];
