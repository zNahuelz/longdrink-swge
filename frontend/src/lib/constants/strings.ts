export const ERROR_MESSAGES = {
	ERROR_TAG: 'Oops! Ha sucedido un error.',
	API_CONN_ERROR: 'Falló la conexión con el servidor. Vuelva a intentarlo.',
	TEACHERS_NOT_FOUND: 'No se encontraron docentes con el criterío de busqueda ingresado.'
};

export const tableElementsMessage = (
	singularName: string,
	pluralName: string,
	total: number,
	elements: number
) => {
	return `Mostrando ${elements} ${elements >= 1 ? pluralName : singularName} de un total de ${total}.`;
};
