import axios from "axios";

const setAuthorizationToken = (token) => {
	if (localStorage.getItem("token")) {
		axios.defaults.headers.common[
			"Authorization"
		] = `Bearer ${localStorage.getItem("token")}`;
	} else {
		delete axios.defaults.headers.common["Authorization"];
	}
};
export default setAuthorizationToken;
