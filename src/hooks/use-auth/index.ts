import { api, useAuthStore } from "@/src/lib";
import { useCallback, useState } from "react";
import { GenerateMfaResponse, LoginDto, LoginResponse } from "./types";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setQrCodeData, setTempToken, tempToken, setAccessToken } =
    useAuthStore();

  const login = useCallback(
    async (dto: LoginDto) => {
      try {
        setError(false);
        setLoading(true);

        const loginReponse = await api.post<LoginResponse>(
          "/auth/signin/step-one",
          dto,
        );

        const { mfaEnabled, tempToken } = loginReponse.data;

        setTempToken(tempToken);

        if (!mfaEnabled) {
          const mfaReponse = await api.post<{ data: GenerateMfaResponse }>(
            "/mfa/generate",
            { tempToken },
          );

          console.log(mfaReponse);

          const {
            data: { qrCode, manualCode },
          } = mfaReponse.data;

          setQrCodeData(qrCode, manualCode);

          return { shouldEnableMfa: true };
        }

        setLoading(false);

        return {
          shouldEnableMfa: false,
        };
      } catch {
        setError(true);
        setLoading(false);

        return {
          error: true,
          shouldEnableMfa: false,
        };
      }
    },
    [setTempToken, setQrCodeData],
  );

  const enableMfa = useCallback(
    async (code: string) => {
      try {
        await api.post("/mfa/enable", {
          tempToken,
          code,
        });

        return true;
      } catch {
        return false;
      }
    },
    [tempToken],
  );

  const verifyOtp = useCallback(
    async (code: string) => {
      try {
        const response = await api.post("/auth/signin/step-two", {
          tempToken,
          code,
        });

        const {
          data: { accessToken },
        } = response.data;

        console.log(accessToken);

        setAccessToken(accessToken);

        return true;
      } catch {
        return false;
      }
    },
    [setAccessToken, tempToken],
  );

  return {
    login,
    enableMfa,
    verifyOtp,
    loading,
    error,
  };
}
