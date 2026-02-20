"use client";

import { createLoginSchema, LoginSchemaData } from "@/src/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/hooks";
import { ErrorLabel } from "@/src/components";
import Link from "next/link";

interface Props {
  onFinish: (shouldEnableMfa: boolean) => void;
}

export function LoginForm({ onFinish }: Readonly<Props>) {
  const t = useTranslations("login");
  const { login, error, loading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: LoginSchemaData) => {
      const response = await login(data);
      if (response.error) {
        return;
      }

      onFinish(response.shouldEnableMfa);
    },
    [login, onFinish],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-2/3 sm:w-2/4 lg:w-1/3 2xl:w-1/5 space-y-4"
      id="signin-form"
    >
      <FieldGroup>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t("email_label")}</FieldLabel>
              <Input {...field} id="email" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t("password_label")}</FieldLabel>
              <Input
                type="password"
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Link href="/forgot-password">
            <span className="text-end block hover:underline text-[#8B5CF6]">
              {t("forgot_password")}
            </span>
          </Link>
        </Field>

        <Field className={cn(!isValid && "cursor-not-allowed")}>
          <Button
            variant="default"
            disabled={!isValid || loading}
            className="tracking-wider transition-all ease-in-out duration-300 w-full enabled:cursor-pointer enabled:hover:bg-[#A66CFF] enabled:bg-[#8B5CF6]"
            type="submit"
            form="signin-form"
            isLoading={loading}
          >
            {t("submit_button")}
          </Button>
        </Field>
      </FieldGroup>

      <div>
        {error && <ErrorLabel text={t("errors.invalid_credentials")} />}
      </div>

      <div className="text-center">
        <span>
          Não possui uma conta?{" "}
          <Link href="/signup">
            <span className="underline">Registre-se</span>
          </Link>
        </span>
      </div>
    </form>
  );
}
