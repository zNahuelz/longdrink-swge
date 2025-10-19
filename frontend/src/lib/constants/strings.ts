export const ERROR_MESSAGES = {
	ERROR_TAG: 'Oops! Ha sucedido un error.',
	API_CONN_ERROR: 'Falló la conexión con el servidor. Vuelva a intentarlo.',
	TEACHERS_NOT_FOUND: 'No se encontraron docentes con el criterío de busqueda ingresado.',
	STUDENTS_NOT_FOUND: 'No se encontraron alumnos con el criterío de busqueda ingresado.',
	EMPLOYEES_NOT_FOUND: 'No se encontraron empleados con el criterío de busqueda ingresado.',
	ROLE_LF_EMPLOYEE_C_DISABLED:
		'Falló la carga de roles. El registro de empleados requiere la existencia previa de roles, registre algunos o intente nuevamente.',
	SERVER_ERROR: 'Ha ocurrido un error en el servidor. Por favor, inténtelo de nuevo más tarde.',
	ROLE_WITHOUT_ABILITIES: 'El rol seleccionado no tiene permisos asociadas.'
};

export const INFO_MESSAGES = {
	SUCCESS_TAG: 'Operación completada.',
	EMPLOYEE_CREATED: 'Empleado registrado exitosamente.',
	EMPLOYEE_UPDATED: 'Empleado actualizado exitosamente.',
	EMPLOYEE_DELETED: 'Empleado eliminado exitosamente.'
};

export const STRINGS = {
	EMAIL_TAKEN: 'El correo electrónico ingresado ya está en uso.',
	CITIZEN_ID_TAKEN: 'El documento de identidad ingresado ya está en uso.'
};

export const tableElementsMessage = (
	singularName: string,
	pluralName: string,
	total: number,
	elements: number
) => {
	return `Mostrando ${elements} ${elements >= 1 ? pluralName : singularName} de un total de ${total}.`;
};

export const loadingMessage = (name: string) => {
	return `Cargando ${name}...`;
};
