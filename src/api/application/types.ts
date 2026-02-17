export type Application = {
  id: string;
  title: string;
  position: string | null;
  companyName: string | null;
  appliedAt: string | null;
  columnIndex: number;
  status:
    | "applied"
    | "interview"
    | "inProgress"
    | "offer"
    | "rejected"
    | "accepted";
};

// Grouped applications type
export type GetApplicationsResponse = {
  applied: Application[];
  interview: Application[];
  inProgress: Application[];
  offer: Application[];
  rejected: Application[];
  accepted: Application[];
};

export type MoveApplicationsPayload = {
  id: string;
  status:
    | "applied"
    | "interview"
    | "inProgress"
    | "offer"
    | "rejected"
    | "accepted";
  columnIndex: number;
}[];
