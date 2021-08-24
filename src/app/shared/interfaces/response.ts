
export interface BaseResponse<T> {
	data: T;
	meta : any;
	message: string;
	status: string;
}
export interface Response<T> {
	data: T;
	message?: string;
	meta?: Meta;
}

export interface Meta {
	page?: Page;
}

export interface Page {
	currentPage?: number;
	lastPage?: number;
	perPage?: number; // Registros por página
	total?: number; // Total de registros
}