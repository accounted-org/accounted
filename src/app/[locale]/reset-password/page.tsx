import { redirect } from "next/navigation";
import { ResetPasswordPage } from "./reset-password-page";

interface Props {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function Page({ searchParams }: Readonly<Props>) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return redirect("/login");
  }

  return <ResetPasswordPage token={token} />;
}
