import { LOGIN } from "../actions";

const initState = {
	user: {},
	isAuth: false,
	error: null,
};
const authReducer = (state = initState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				user: action.payload,
				isAuth: action.payload ? true : false,
				error: action.error,
			};
		default:
			return state;
	}
};

export default authReducer;
