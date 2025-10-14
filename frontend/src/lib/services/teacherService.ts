import { PUBLIC_API_BASE_URL } from '$env/static/public';
import api from '$lib/api';
import { Pagination, type PaginationMeta } from '$lib/types/pagination';
import type { Teacher } from '$lib/types/teacher';

export interface TeacherQueryParams {
	page?: number;
	limit?: number;
	search?: string;
	status?: 'available' | 'deleted' | 'all';
	orderBy?: string;
	orderDir?: 'asc' | 'desc';
}

class TeacherService {
	private baseUrl = '/teacher'; // baseURL already handled by axios instance

	async fetchTeachers({
		page = 1,
		limit = 10,
		search = '',
		status = 'available',
		orderBy = 'names',
		orderDir = 'asc'
	}: TeacherQueryParams = {}): Promise<Pagination<Teacher>> {
		try {
			const params = {
				page,
				limit,
				search,
				status,
				orderBy,
				orderDir
			};

			const res = await api.get(this.baseUrl, { params });

			const json = res.data;
			return new Pagination<Teacher>(json.meta as PaginationMeta, json.data as Teacher[]);
		} catch (error: any) {
			const message = error.response?.data?.message || 'Failed to fetch teachers';
			throw new Error(message);
		}
	}
}

export const teacherService = new TeacherService();
