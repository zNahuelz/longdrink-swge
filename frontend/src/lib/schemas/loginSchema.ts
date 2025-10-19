import { z } from 'zod';

export const LoginSchema = z.object({
	username: z
		.string()
		.min(5, 'El nombre de usuario debe tener al menos 5 caracteres.')
		.max(20, 'El nombre de usuario no puede exceder los 20 caracteres.'),
	password: z
		.string()
		.min(5, 'La contraseña debe tener al menos 5 caracteres.')
		.max(20, 'La contraseña no puede exceder los 20 caracteres.'),
	rememberMe: z.boolean().optional().default(false)
});

export type LoginSchema = z.infer<typeof LoginSchema>;
