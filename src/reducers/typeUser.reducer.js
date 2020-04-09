import { TYPEUSER } from "../actions";

const typeUserReducer = (state = [], action) => {
	switch (action.type) {
		case TYPEUSER:
			return action.payload;
		default:
			return state;
	}
};

export default typeUserReducer;
