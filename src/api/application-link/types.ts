export type CreateApplicationLinkPayload = {
  label: string;
  url: string;
};

export type CreateApplicationLinkResponse = {
  id: string;
  applicationId: string;

  label: string;
  url: string;
};
