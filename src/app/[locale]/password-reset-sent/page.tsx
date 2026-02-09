import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PasswordResetSent() {
  const t = useTranslations("password_reset_sent");

  return (
    <div className="flex flex-col items-center justify-center space-y-10 min-h-[70vh] text-center">
      <h1 className="font-bold text-lg">{t("title")}</h1>
      <p className="max-w-lg">{t("description")}</p>
      <Link href="/login">
        <div className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span className="text-sm underline">Voltar para o login</span>
        </div>
      </Link>
    </div>
  );
}
