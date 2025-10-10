import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const token = cookies.get('JWT_TOKEN');
	if (!token) {
		throw redirect(303, '/');
	}
	return {};
};