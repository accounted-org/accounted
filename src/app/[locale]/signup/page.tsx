import { SignupForm } from "./components";
import {useTranslations} from "next-intl";

export default function LoginPage() {
  const t = useTranslations("signup");

  return (
    <div className="flex flex-col items-center justify-center w-full h-[70vh] space-y-3 sm:space-y-16">
      <h1 className='font-bold text-lg sm:text-3xl'>{t('title')}</h1>
      <SignupForm />
    </div>
  );
}
