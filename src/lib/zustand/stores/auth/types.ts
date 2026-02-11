import { User } from "@/src/@types";

export type AuthStoreActions = {
  setUser: (user: User) => void;
  setQrCodeData: (url: string, manualCode: string) => void;
  setTempToken: (token: string) => void;
  clearMfa: () => void;
  logout: () => void;
  setAccessToken: (accessToken: string) => void;
};

export type AuthStoreState = {
  user: User | null;
  isAuthenticated: boolean;
  tempToken: string | null;
  accessToken: string | null;
  qrCode: {
    url: string;
    manualCode: string;
  };
};

export type AuthStore = AuthStoreState & AuthStoreActions;
