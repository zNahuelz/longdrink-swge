export interface Ability {
	id: number;
	name: string;
	key: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}
