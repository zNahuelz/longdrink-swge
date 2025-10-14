export interface Teacher {
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
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
