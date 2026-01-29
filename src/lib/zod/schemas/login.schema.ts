import z from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string({ message: 'Password is required' }),
});

export type LoginSchemaData = z.infer<typeof loginSchema>;
