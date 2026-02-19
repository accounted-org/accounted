"use client";

import { useCallback, useState } from "react";
import { LoginForm, OTPForm, QrCodeForm } from "./components";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/src/lib";
import { useAuth } from "@/src/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const t = useTranslations("login");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [enableMfaError, setEnableMfaError] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const { qrCode } = useAuthStore();
  const { enableMfa, verifyOtp } = useAuth();

  const router = useRouter();

  const handleFinishLogin = useCallback((shouldEnableMfa: boolean) => {
    if (shouldEnableMfa) {
      setShowQrCode(true);
    } else {
      setShowOtpForm(!shouldEnableMfa);
    }
  }, []);

  const handleVerifyOtp = useCallback(
    async (code: string) => {
      try {
        setOtpError(false);
        await verifyOtp(code);

        toast.success(t("messages.otp.success_otp"));
        router.replace("/dashboard");
      } catch {
        setOtpError(true);
      }
    },
    [verifyOtp, router, t],
  );

  const handleEnableMfa = useCallback(
    async (code: string) => {
      try {
        setEnableMfaError(false);
        const success = await enableMfa(code);

        if (!success) {
          setEnableMfaError(true);
          return;
        }
        toast.success(t("messages.otp.success_mfa"));
        setShowQrCode(false);
        setShowOtpForm(true);
      } catch {
        setEnableMfaError(true);
      }
    },
    [enableMfa, t],
  );

  return (
    <div className="flex flex-col items-center justify-center w-full h-[70vh] space-y-3 sm:space-y-18">
      <h1 className="font-bold text-lg sm:text-3xl">{t("title")}</h1>
      {!showOtpForm && !showQrCode && (
        <LoginForm onFinish={handleFinishLogin} />
      )}

      {showOtpForm && <OTPForm onFinish={handleVerifyOtp} error={otpError} />}
      {showQrCode && (
        <QrCodeForm
          handleEnableMfa={handleEnableMfa}
          error={enableMfaError}
          {...qrCode}
        />
      )}
    </div>
  );
}
