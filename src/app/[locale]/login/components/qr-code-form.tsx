import { Button } from "@/src/components/ui/button";
import { copy2Clipboard } from "@/src/utils";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback } from "react";
import { OTPForm } from "./otp-form";
import { Separator } from "@/src/components/ui/separator";

interface Props {
  url: string;
  manualCode: string;
  handleEnableMfa: (code: string) => void;
  error: boolean;
}

export function QrCodeForm({
  url,
  manualCode,
  error,
  handleEnableMfa,
}: Readonly<Props>) {
  const t = useTranslations("login");

  const handleCopyCode = useCallback(() => {
    copy2Clipboard(manualCode);
  }, [manualCode]);

  const handleFinish = useCallback(
    async (code: string) => {
      handleEnableMfa(code);
    },
    [handleEnableMfa],
  );

  return (
    <div className="flex gap-10 items-stretch">
      <div className="flex flex-col items-center justify-center gap-4 flex-1">
        <span>{t("messages.otp.qr_code_text")}</span>

        <Image src={url} alt="QR Code" width={200} height={200} unoptimized />

        <Button onClick={handleCopyCode} className="cursor-pointer">
          <span>{manualCode}</span>
          <Copy />
        </Button>
      </div>

      <Separator orientation="vertical" />

      <div className="flex flex-col justify-center gap-4   flex-1">
        <OTPForm onFinish={handleFinish} error={error} />
      </div>
    </div>
  );
}
