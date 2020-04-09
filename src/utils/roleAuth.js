export const USER = "Usuario";
export const ADMIN = "Administrador";
export const HOME_USER = "/ticket-user";
export const HOME_ADMIN = "/tickets";

const setPath = (user, history) => {
	user.type_user.name === USER
		? history.push(HOME_USER)
		: history.push(HOME_ADMIN);
};

export default setPath;
