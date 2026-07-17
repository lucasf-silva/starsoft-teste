import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Informe seu e-mail.').email('Informe um e-mail valido.'),
  password: z.string().trim().min(6, 'A senha deve ter no minimo 6 caracteres.'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type AuthUser = {
  email: string;
};
