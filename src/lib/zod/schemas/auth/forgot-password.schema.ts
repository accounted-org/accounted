import z from "zod";

export const createForgotPasswordSchema = (t: (k: string) => string) =>
  z.object({
    email: z.email({ error: t("errors.email.invalid") }),
  });

export type ForgotPasswordSchemaData = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;
