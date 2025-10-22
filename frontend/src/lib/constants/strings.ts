export const ERROR_MESSAGES = {
	ERROR_TAG: 'Oops! Ha sucedido un error.',
	API_CONN_ERROR: 'Falló la conexión con el servidor. Vuelva a intentarlo.',
	TEACHERS_NOT_FOUND: 'No se encontraron docentes con el criterío de busqueda ingresado.',
	STUDENTS_NOT_FOUND: 'No se encontraron alumnos con el criterío de busqueda ingresado.',
	EMPLOYEES_NOT_FOUND: 'No se encontraron empleados con el criterío de busqueda ingresado.',
	ROLE_LF_EMPLOYEE_C_DISABLED:
		'Falló la carga de roles. El registro de empleados requiere la existencia previa de roles, registre algunos o intente nuevamente.',
	ROLE_LF_EMPLOYEE_E_DISABLED:
		'Falló la carga de roles. La modificación de empleados requiere la existencia previa de roles, registre algunos o intente nuevamente.',
	SERVER_ERROR: 'Ha ocurrido un error en el servidor. Por favor, inténtelo de nuevo más tarde.',
	ROLE_WITHOUT_ABILITIES: 'El rol seleccionado no tiene permisos asociados.',
	EMPLOYEE_NOT_FOUND: 'No se encontro el empleado con ID proporcionado.',
	ROLE_WITHOUT_ABILITIES_UD: 'El rol asignado no cuenta con permisos asociados.',
	EMPLOYEE_WITHOUT_USER: 'El empleado no posee con una cuenta de usuario asignada.',
	LOCKED_EMPLOYEE_ROLE:
		'El empleado posee un rol eliminado o prohibido. Vuelva a intentarlo o comuniquese con administración.'
};

export const INFO_MESSAGES = {
	SUCCESS_TAG: 'Operación completada.',
	EMPLOYEE_CREATED: 'Empleado registrado exitosamente.',
	EMPLOYEE_UPDATED: 'Empleado actualizado exitosamente.',
	EMPLOYEE_DELETED: 'Empleado eliminado exitosamente.',
	CONFIRM_EMPLOYEE_UPDATE:
		'<strong>¿Está seguro de modificar el empleado?</strong> </br> Al modificar el Doc. de Identidad, se actualizará el usuario vinculado y el empleado deberá iniciar sesión nuevamente en el sistema. </br> <strong>¿Desea continuar?</strong>'
};

export const STRINGS = {
	EMAIL_TAKEN: 'El correo electrónico ingresado ya está en uso.',
	CITIZEN_ID_TAKEN: 'El documento de identidad ingresado ya está en uso.',
	SAVE: 'Guardar',
	SAVING_DOTS: 'Guardando...',
	CLEAR: 'Limpiar',
	CANCEL: 'Cancelar',
	UPDATE: 'Actualizar',
	UPDATING_DOTS: 'Actualizando...',
	RESET: 'Reiniciar',
	BACK: 'Atrás'
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
