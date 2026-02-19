import z from "zod";

export const crteateResetPasswordSchema = (t: (k: string) => string) =>
  z.object({
    password: z
      .string({ error: t("errors.password.required") })
      .min(8, { error: t("errors.password.required") }),
  });

export type ResetPasswordSchemaData = z.infer<
  ReturnType<typeof crteateResetPasswordSchema>
>;
