import Axios from "axios";
import { TICKET } from ".";

export const setCurrent = (item, items) => {
	return {
		type: TICKET,
		payload: { ticket: item, tickets: items },
	};
};

export const all = () => {
	return (dispatch) => {
		return Axios.get("http://localhost:8000/api/tickets").then((res) => {
			dispatch(setCurrent(null, res.data));
		});
	};
};

export const show = (data) => {
	return (dispatch) => {
		return Axios.get(`http://localhost:8000/api/tickets/${data}`).then(
			(res) => {
				dispatch(setCurrent(res.data, []));
			}
		);
	};
};

export const store = (data) => {
	return (dispatch) => {
		return Axios.post(
			`http://localhost:8000/api/tickets`,
			data
		).then((res) => {});
	};
};

export const update = (data) => {
	return (dispatch) => {
		return Axios.put(
			`http://localhost:8000/api/tickets/${data.id}`,
			data
		).then((res) => {});
	};
};

export const destroy = (data) => {
	return (dispatch) => {
		return Axios.delete(
			`http://localhost:8000/api/tickets/${data.id}`,
			data
		).then((res) => dispatch(all()));
	};
};

export const allUser = () => {
	return (dispatch) => {
		return Axios.get("http://localhost:8000/api/tickets_user").then(
			(res) => {
				dispatch(setCurrent(null, res.data));
			}
		);
	};
};

export const updateUserTicket = (data) => {
	return (dispatch) => {
		return Axios.put(
			`http://localhost:8000/api/tickets_user/${data.id}`,
			data
		).then((res) => {
			dispatch(allUser());
		});
	};
};

export const reset = () => {
	return (dispatch) => {
		dispatch(setCurrent({}, []));
	};
};
