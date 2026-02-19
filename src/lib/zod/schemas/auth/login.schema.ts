import z from 'zod'

export const createLoginSchema = (t: (k: string) => string) =>
  z.object({
    email: z.email({ error: t('errors.email.invalid') }),
    password: z
      .string({ error: t('errors.password.required') })
      .min(1, { error: t('errors.password.required') }),
  })

export type LoginSchemaData = z.infer<ReturnType<typeof createLoginSchema>>
