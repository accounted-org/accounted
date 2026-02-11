"use client";

import { Checkbox } from "@/components/ui/checkbox";
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
import { crteateResetPasswordSchema, ResetPasswordSchemaData } from "@/src/lib";
import { cn } from "@/src/lib/utils";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  token: string;
}

export function ResetPasswordPage({ token }: Readonly<Props>) {
  const t = useTranslations("reset_password");
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { resetPassword } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResetPasswordSchemaData>({
    resolver: zodResolver(crteateResetPasswordSchema(t)),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = useCallback(
    async (data: ResetPasswordSchemaData) => {
      setLoading(true);
      setError(false);

      const success = await resetPassword({
        token,
        newPassword: data.password,
      });

      if (!success) {
        setLoading(false);
        setError(true);
        return;
      }

      toast.success("Você alterou sua senha. Faça login para continuar.");

      router.replace("/login");
    },
    [resetPassword, router, token],
  );

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-[70vh]">
      <h1>{t("title")}</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="reset-password-form"
        className="w-full max-w-2xl space-y-4"
      >
        <FieldGroup>
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">
                  {t("password_label")}
                </FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  type={showPassword ? "text" : "password"}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Field>
            <span className="text-sm italic">{t("description")}</span>
          </Field>
          <Field orientation="horizontal" className="w-max">
            <Checkbox
              checked={showPassword}
              onCheckedChange={(checked) => setShowPassword(checked === true)}
              name="show-password-checkbox"
              id="show-password-checkbox"
              className="cursor-pointer"
            />
            <FieldLabel
              htmlFor="show-password-checkbox"
              className="cursor-pointer"
            >
              {t("checkbox")}
            </FieldLabel>
          </Field>
          <Field className={cn(!isValid && "cursor-not-allowed")}>
            <Button
              variant="default"
              disabled={!isValid || loading}
              className="tracking-wider transition-all ease-in-out duration-300 w-full enabled:cursor-pointer enabled:hover:bg-[#A66CFF] enabled:bg-[#8B5CF6]"
              type="submit"
              form="reset-password-form"
              isLoading={loading}
              loaderColor="#fff"
            >
              {t("submit_button")}
            </Button>
          </Field>
        </FieldGroup>
        <div>{error && <ErrorLabel text={t("errors.server")} />}</div>
      </form>
    </div>
  );
}
