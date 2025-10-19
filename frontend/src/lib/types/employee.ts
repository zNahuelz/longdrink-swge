import type { User } from './user';

export interface Employee {
	id: number;
	names: string;
	paternalSurname: string;
	maternalSurname: string;
	citizenId: string;
	citizenIdType: string;
	phone: string;
	address: string;
	birthDate: string;
	hiringDate: string;
	dismissalDate: string | null;
	position: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	user: User | null;
}
