import api from '$lib/api';
import { Pagination, type PaginationMeta } from '$lib/types/pagination';
import type { Student } from '$lib/types/student';

export interface StudentQueryParams {
	page?: number;
	limit?: number;
	search?: string;
	searchBy?: string;
	status?: string;
	orderBy?: string;
	orderDir?: 'asc' | 'desc';
}

class StudentService {
	private baseUrl = '/student';

	async fetchStudents({
		page = 1,
		limit = 10,
		search = '',
		searchBy = 'all',
		status = 'available',
		orderBy = 'id',
		orderDir = 'asc'
	}: StudentQueryParams = {}): Promise<Pagination<Student>> {
		try {
			const params = {
				page,
				limit,
				search,
				searchBy,
				status,
				orderBy,
				orderDir
			};

			const res = await api.get(this.baseUrl, { params });
			const json = res.data;

			return new Pagination<Student>(json.meta as PaginationMeta, json.data as Student[]);
		} catch (error: any) {
			const message = error.response?.data?.message || 'Error durante la carga de alumnos.';
			throw new Error(message);
		}
	}
}

export const studentService = new StudentService();
