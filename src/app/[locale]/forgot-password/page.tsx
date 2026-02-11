"use client";

import { ErrorLabel } from "@/src/components";
import { Button } from "@/src/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { useAuth } from "@/src/hooks";
import {
  createForgotPasswordSchema,
  ForgotPasswordSchemaData,
} from "@/src/lib";
import { cn } from "@/src/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const t = useTranslations("forgot_password");
  const { requestForgotPassword, error, loading } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ForgotPasswordSchemaData>({
    resolver: zodResolver(createForgotPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useCallback(
    async (data: ForgotPasswordSchemaData) => {
      const success = await requestForgotPassword(data);

      if (!success) {
        return;
      }

      router.replace("/password-reset-sent");
    },
    [router, requestForgotPassword],
  );

  return (
    <div className="flex flex-col items-center justify-center space-y-10 min-h-[70vh]">
      <div>
        <h1 className="font-bold text-lg">{t("title")}</h1>
        <span>{t("description")}</span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-2/4 lg:w-1/3 2xl:w-2/6 space-y-4"
        id="signin-form"
      >
        <FieldGroup>
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">{t("email_label")}</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Field className={cn(!isValid && "cursor-not-allowed")}>
            <Button
              variant="default"
              disabled={!isValid || loading}
              className="tracking-wider transition-all ease-in-out duration-300 w-full enabled:cursor-pointer enabled:hover:bg-[#A66CFF] enabled:bg-[#8B5CF6]"
              type="submit"
              form="signin-form"
              isLoading={loading}
              loaderColor="#fff"
            >
              {t("submit_button")}
            </Button>
          </Field>
          <Field>{error && <ErrorLabel text={t("errors.server")} />}</Field>
        </FieldGroup>
      </form>
      <Link href="/login">
        <div className="flex items-center gap-2">
          <ArrowLeft size={16} />
          <span className="text-sm underline">Voltar para o login</span>
        </div>
      </Link>
    </div>
  );
}
