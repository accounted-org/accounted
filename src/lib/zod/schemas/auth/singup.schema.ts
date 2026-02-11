import z from "zod";

export const createSignupSchema = (t: (k: string) => string) =>
  z.object({
    email: z.email({ error: t("errors.email.invalid") }),
    password: z.string({ error: t("errors.password.required") }).min(1, { error: t("errors.password.required")}),
    birthDate: z.date().optional(),
    name: z.string({ error: t("errors.name.required") }),
  });

export type SignupSchemaData = z.infer<ReturnType<typeof createSignupSchema>>;
