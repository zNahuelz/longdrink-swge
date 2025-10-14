export interface PaginationMeta {
	total: number;
	perPage: number;
	currentPage: number;
	lastPage: number;
	firstPage: number;
	firstPageUrl: string;
	lastPageUrl: string;
	nextPageUrl: string | null;
	previousPageUrl: string | null;
}

export class Pagination<T> {
	constructor(
		public meta: PaginationMeta,
		public data: T[]
	) {}

	hasNextPage(): boolean {
		return !!this.meta.nextPageUrl;
	}

	hasPreviousPage(): boolean {
		return !!this.meta.previousPageUrl;
	}

	isFirstPage(): boolean {
		return this.meta.currentPage === this.meta.firstPage;
	}

	isLastPage(): boolean {
		return this.meta.currentPage === this.meta.lastPage;
	}
}
