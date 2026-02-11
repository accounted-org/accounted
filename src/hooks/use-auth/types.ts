export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  mfaEnabled: true;
  tempToken: string;
};

export type GenerateMfaResponse = {
  manualCode: string;
  qrCode: string;
};

export type ResetPasswordPayload = {
  newPassword: string;
  token: string | null;
};

export type ForgotPasswordPayload = {
  email: string;
};
