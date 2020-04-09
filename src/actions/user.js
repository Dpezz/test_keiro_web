import Axios from "axios";
import { USER } from ".";

export function setCurrent(items) {
	return {
		type: USER,
		payload: items,
	};
}

export const all = () => {
	return (dispatch) => {
		return Axios.get("http://localhost:8000/api/users").then((res) => {
			dispatch(setCurrent(res.data));
		});
	};
};
