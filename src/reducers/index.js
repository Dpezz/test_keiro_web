import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import ticketReducer from "./ticket.reducer";
import userReducer from "./user.reducer";
import typeUserReducer from "./typeUser.reducer";

const allReducers = combineReducers({
	auth: authReducer,
	ticket: ticketReducer,
	user: userReducer,
	typeUser: typeUserReducer,
});

export default allReducers;
