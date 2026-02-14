export type AuthCallbackPayload = {
  name: string;
  email: string;
};
export type AuthCallbackResponse = {
  name: string;
  email: string;
  auth0Id: string;
  id: string;
};
