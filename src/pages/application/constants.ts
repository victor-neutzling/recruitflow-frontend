export const APPLICATION_FORM_INITIAL_VALUES = {
  title: "",
  companyName: "",
  position: "",
  salary: "",
  salaryType: "" as const,
  currency: "",
  workModel: "" as const,
  regime: "" as const,
  description: "",
  appliedAt: "",
};

export const APPLICATION_LINK_FORM_INITIAL_VALUES = {
  label: "",
  url: "",
};

export const CURRENCY_ITEMS = ["offered", "expected"];

export const REGIME_ITEMS = [
  { label: "CLT", value: "clt" },
  { label: "PJ", value: "pj" },
  { label: "other", value: "other" },
];

export const WORK_MODEL_ITEMS = [
  { label: "remote", value: "remote" },
  { label: "hybrid", value: "hybrid" },
  { label: "on site", value: "onsite" },
];

export const REGIME_ITEMS_RECORD: Record<
  string,
  { label: string; value: string }
> = {
  clt: { label: "CLT", value: "clt" },
  pj: { label: "PJ", value: "pj" },
  other: { label: "other", value: "other" },
};

export const WORK_MODEL_ITEMS_RECORD: Record<
  string,
  { label: string; value: string }
> = {
  remote: { label: "remote", value: "remote" },
  hybrid: { label: "hybrid", value: "hybrid" },
  onsite: { label: "on site", value: "onsite" },
};
