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
  applications: {
    applied: Application[];
    interview: Application[];
    inProgress: Application[];
    offer: Application[];
    rejected: Application[];
    accepted: Application[];
  };
  total: number;
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

export type CreateApplicationPayload = {
  title: string;
  position: string;
  companyName?: string;
  appliedAt?: string;
  columnIndex: number;
  status:
    | "applied"
    | "interview"
    | "inProgress"
    | "offer"
    | "rejected"
    | "accepted";
};

export type EditApplicationPayload = {
  companyName: string;
  position: string;
  title?: string;
  salary?: number;
  salaryType?: "expected" | "offered";
  currency?: string;
  workModel?: "remote" | "hybrid" | "onsite";
  regime?: "clt" | "pj" | "other";
  description?: string;
  appliedAt?: string;
  status:
    | "applied"
    | "interview"
    | "inProgress"
    | "offer"
    | "rejected"
    | "accepted";
  columnIndex: number;
};

export type GetApplicationByIdResponse = {
  id: string;
  title: string;
  companyName: string;
  position: string | null;
  salary: number | null;
  salaryType: "expected" | "offered" | null;
  currency: string | null;
  workModel: "remote" | "hybrid" | "onsite" | null;
  regime: "clt" | "pj" | "other" | null;
  description: string | null;
  status:
    | "applied"
    | "interview"
    | "inProgress"
    | "offer"
    | "rejected"
    | "accepted";
  columnIndex: number;
  appliedAt: string | null;
  applicationLinks: {
    id: string;
    label: string | null;
    url: string;
  }[];
};
