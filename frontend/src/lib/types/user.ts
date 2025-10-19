import type { Role } from './role';

export interface PersonalInfoBase {
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

export interface TeacherInfo extends PersonalInfoBase {
	hiringDate: string;
	dismissalDate: string | null;
}

export interface EmployeeInfo extends PersonalInfoBase {
	hiringDate: string;
	dismissalDate: string | null;
	position: string;
}

export type PersonalInfo = TeacherInfo | EmployeeInfo;

export interface User {
	id: number;
	username: string;
	email: string;
	profilePicture: string | null;
	roleId: number;
	role: Role | null;
	employeeId: number | null;
	studentId: number | null;
	teacherId: number | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
	token: { abilities: string[] };
	personalInfo: PersonalInfo | null;
}
