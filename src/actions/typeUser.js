import Axios from "axios";
import { TYPEUSER } from ".";

export function setCurrent(items) {
	return {
		type: TYPEUSER,
		payload: items,
	};
}

export const all = () => {
	return (dispatch) => {
		return Axios.get("http://localhost:8000/api/types_user").then((res) => {
			dispatch(setCurrent(res.data));
		});
	};
};
