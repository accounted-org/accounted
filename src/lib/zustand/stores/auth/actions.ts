import { GetFunction, SetFunction } from "../../common";
import { AuthStore, AuthStoreActions } from "./types";

export const authActions = (
  set: SetFunction<AuthStore>,
  get: GetFunction<AuthStore>,
): AuthStoreActions => ({
  clearMfa: () => set({ tempToken: null }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      tempToken: null,
    }),
  setTempToken: (tempToken) =>
    set({
      tempToken,
    }),
  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
      tempToken: null,
    }),
  setQrCodeData: (url, manualCode) => set({ qrCode: { url, manualCode } }),
  setAccessToken: (accessToken) => set({ accessToken }),
});
