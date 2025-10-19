import api from '$lib/api';
import type { Role } from '$lib/types/role';

export interface RoleQueryParams {
	status?: string;
}

class RoleService {
	private baseUrl = '/role';

	async fetchRoles({ status = 'available' }: RoleQueryParams = {}): Promise<Role[]> {
		try {
			const res = await api.get(this.baseUrl, { params: { status } });
			return res.data as Role[];
		} catch (error: any) {
			const message = error.response?.data?.message || 'Error durante la carga de roles.';
			throw new Error(message);
		}
	}
}

export const roleService = new RoleService();
