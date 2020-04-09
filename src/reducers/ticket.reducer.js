import { TICKET } from "../actions";

const initState = {
	ticket: {},
	tickets: [],
};
const ticketReducer = (state = initState, action) => {
	switch (action.type) {
		case TICKET:
			return {
				ticket: action.payload.ticket,
				tickets: action.payload.tickets,
			};
		default:
			return state;
	}
};

export default ticketReducer;
