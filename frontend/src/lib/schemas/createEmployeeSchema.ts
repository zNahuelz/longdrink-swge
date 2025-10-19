import { DEFAULT_CITIZEN_ID_TYPES, DEFAULT_EMPLOYEE_POSITIONS } from '$lib/constants/constants';
import { z } from 'zod';

const currentYear = new Date().getFullYear();
const minYear = currentYear - 17;

export const CreateEmployeeSchema = z.object({
	names: z
		.string()
		.min(2, 'El nombre debe tener entre 2 y 30 caracteres.')
		.max(30, 'El nombre debe tener entre 2 y 30 caracteres.')
		.regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,30}$/, 'Debe ingresar un nombre válido.')
		.regex(/^\S.*$/, 'El nombre no puede comenzar con espacios en blanco o estar vacío.')
		.regex(/^.*\S.*$/, 'El nombre no puede comenzar con espacios en blanco o estar vacío.'),
	paternalSurname: z
		.string()
		.min(2, 'El apellido paterno debe tener entre 2 y 30 caracteres.')
		.max(30, 'El apellido paterno debe tener entre 2 y 30 caracteres.')
		.regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,30}$/, 'Debe ingresar un apellido paterno válido.')
		.regex(/^\S.*$/, 'El apellido paterno no puede comenzar con espacios en blanco o estar vacío.')
		.regex(
			/^.*\S.*$/,
			'El apellido paterno no puede comenzar con espacios en blanco o estar vacío.'
		),
	maternalSurname: z
		.string()
		.min(2, 'El apellido materno debe tener entre 2 y 30 caracteres.')
		.max(30, 'El apellido materno debe tener entre 2 y 30 caracteres.')
		.regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]{2,30}$/, 'Debe ingresar un apellido materno válido.')
		.regex(/^\S.*$/, 'El apellido materno no puede comenzar con espacios en blanco o estar vacío.')
		.regex(
			/^.*\S.*$/,
			'El apellido materno no puede comenzar con espacios en blanco o estar vacío.'
		),
	citizenId: z
		.string()
		.min(8, 'El documento de identidad debe tener entre 8 y 15 caracteres.')
		.max(15, 'El documento de identidad debe tener entre 8 y 15 caracteres.')
		.regex(/^[0-9]{8,15}$/, 'El documento de identidad debe ser numérico.'),
	citizenIdType: z.enum(DEFAULT_CITIZEN_ID_TYPES.map((e) => e.value) as [string, ...string[]]),
	phone: z
		.string()
		.min(6, 'El numero de telefono debe tener entre 6 y 15 caracteres.')
		.max(15, 'El numero de telefono debe tener entre 6 y 15 caracteres.')
		.regex(/^\+?\d{6,15}$/, 'El numero de telefono debe ser numérico.'),
	address: z
		.string()
		.min(5, 'La direccion debe tener entre 5 y 150 caracteres.')
		.max(150, 'La direccion debe tener entre 5 y 150 caracteres.')
		.regex(/^\S.*$/, 'La direccion no puede comenzar con espacios en blanco o estar vacía.')
		.regex(/^.*\S.*$/, 'La direccion no puede terminar con espacios en blanco o estar vacía'),
	birthDate: z.coerce
		.date({
			invalid_type_error: 'La fecha de nacimiento no es válida.'
		})
		.refine(
			(date) => {
				return date < new Date();
			},
			{
				message: 'La fecha de nacimiento debe ser anterior a la fecha actual.'
			}
		)
		.refine(
			(date) => {
				const birthYear = date.getFullYear();
				return birthYear <= minYear;
			},
			{
				message: 'Debe tener al menos 18 años.'
			}
		),

	hiringDate: z.coerce
		.date({
			invalid_type_error: 'La fecha de contratación no es válida.'
		})
		.refine((date) => date < new Date(), {
			message: 'La fecha de contratación debe ser anterior a la fecha actual.'
		}),
	position: z.enum(DEFAULT_EMPLOYEE_POSITIONS.map((e) => e.value) as [string, ...string[]]),
	email: z.string().email('Debe ingresar un correo electrónico válido.'),
	roleId: z.coerce.number().int({ message: 'Debe seleccionar un rol válido.' })
});
export type CreateEmployeeSchema = z.infer<typeof CreateEmployeeSchema>;
