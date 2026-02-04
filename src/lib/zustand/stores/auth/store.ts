import { createStore, useStore } from "zustand";

import { AuthStore } from "./types";
import { authActions } from "./actions";

export const authStore = createStore<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  tempToken: null,
  accessToken: null,
  qrCode: {
    url: "",
    manualCode: "",
  },

  ...authActions(set, get),
}));

export function useAuthStore() {
  return useStore(authStore);
}
