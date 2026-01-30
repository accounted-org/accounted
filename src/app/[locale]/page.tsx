import { Link } from "@/src/lib/i18n";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("home");
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex flex-col space-y-4 items-center">
        <span>{t("title")}</span>
        <Link href="/transactions">Transactions page</Link>
      </div>
    </div>
  );
}
