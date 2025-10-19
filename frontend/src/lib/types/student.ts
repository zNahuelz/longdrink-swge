export interface Student {
	id: number;
	names: string;
	paternalSurname: string;
	maternalSurname: string;
	citizenId: string;
	citizenIdType: string;
	phone: string;
	address: string;
	birthDate: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
