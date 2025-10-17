import api from '$lib/api';
import { Pagination, type PaginationMeta } from '$lib/types/pagination';
import type { Teacher } from '$lib/types/teacher';

export interface TeacherQueryParams {
	page?: number;
	limit?: number;
	search?: string;
	searchBy?: string;
	status?: 'available' | 'deleted' | 'all';
	orderBy?: string;
	orderDir?: 'asc' | 'desc';
}

class TeacherService {
	private baseUrl = '/teacher';

	async fetchTeachers({
		page = 1,
		limit = 10,
		search = '',
		searchBy = 'all',
		status = 'available',
		orderBy = 'id',
		orderDir = 'asc'
	}: TeacherQueryParams = {}): Promise<Pagination<Teacher>> {
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

			return new Pagination<Teacher>(json.meta as PaginationMeta, json.data as Teacher[]);
		} catch (error: any) {
			const message = error.response?.data?.message || 'Error durante la carga de docentes.';
			throw new Error(message);
		}
	}
}

export const teacherService = new TeacherService();
