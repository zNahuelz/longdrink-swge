import api from '$lib/api';
import type { Employee } from '$lib/types/employee';
import { Pagination, type PaginationMeta } from '$lib/types/pagination';

export interface EmployeeQueryParams {
	page?: number;
	limit?: number;
	search?: string;
	searchBy?: string;
	status?: string;
	orderBy?: string;
	orderDir?: 'asc' | 'desc';
}

class EmployeeService {
	private baseUrl = '/employee';

	async fetchEmployees({
		page = 1,
		limit = 10,
		search = '',
		searchBy = 'all',
		status = 'available',
		orderBy = 'id',
		orderDir = 'asc'
	}: EmployeeQueryParams = {}): Promise<Pagination<Employee>> {
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

			return new Pagination<Employee>(json.meta as PaginationMeta, json.data as Employee[]);
		} catch (error: any) {
			const message = error.response?.data?.message || 'Error durante la carga de empleados.';
			throw new Error(message);
		}
	}

	async createEmployee(data: any): Promise<Employee> {
		try {
			const res = await api.post(this.baseUrl, data);
			return res.data.employee as Employee;
		} catch (error: any) {
			const backendErrors = error.response?.data?.errors;
			if (Array.isArray(backendErrors)) {
				const fieldErrors: Record<string, string> = {};
				backendErrors.forEach((err: any) => {
					fieldErrors[err.field] = err.message;
				});
				throw fieldErrors;
			}
			const message = error.response?.data?.message || 'Error al registrar el empleado.';
			throw new Error(message);
		}
	}
}

export const employeeService = new EmployeeService();
