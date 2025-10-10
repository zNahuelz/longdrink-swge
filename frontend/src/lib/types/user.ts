export interface Role {
	id: number;
	name: string;
}

export interface PersonalInfoBase {
	type: 'TEACHER' | 'STUDENT' | 'EMPLOYEE';
	id: number;
	names: string;
	paternalSurname: string;
	maternalSurname: string;
	citizenId: string;
	citizenIdType: string;
	phone: string;
	address: string;
	birthDate: string;
}

export interface TeacherInfo extends PersonalInfoBase {
	type: 'TEACHER';
	hiringDate: string;
	dismissalDate: string | null;
}

export interface StudentInfo extends PersonalInfoBase {
	type: 'STUDENT';
}

export interface EmployeeInfo extends PersonalInfoBase {
	type: 'EMPLOYEE';
	hiringDate: string;
	dismissalDate: string | null;
	position: string;
}

export type PersonalInfo = TeacherInfo | StudentInfo | EmployeeInfo;

export interface User {
	id: number;
	username: string;
	email: string;
	profilePicture: string | null;
	role: Role;
	permissions: string[];
	personalInfo: PersonalInfo | null;
}
