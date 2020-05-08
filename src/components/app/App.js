import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import Login from "../auth/login/Login";
import Register from "../auth/register/Register";
import NavLayout from "../layout/nav";
import Tickets from "../ticket/Tickets";
import Ticket from "../ticket/Ticket";
import UserTickets from "../ticket/UserTickets";
import PrivateRoute from "../../utils/PrivateRoute";
import PublicRoute from "../../utils/PublicRoute";
import setAuthorizationToken from "../../utils/setAuthorizationToken";
import { ADMIN, USER } from "../../utils/roleAuth";

function App() {
	setAuthorizationToken();

	return (
		<Router>
			<NavLayout />
			<div>
				<Container className="mt-3">
					<Switch>
						<PublicRoute path="/" exact component={Login} />
						<PublicRoute path="/login" component={Login} />
						<PublicRoute path="/register" component={Register} />

						<PrivateRoute
							path="/tickets"
							component={Tickets}
							role={ADMIN}
						/>

						<PrivateRoute
							path="/ticket/:id"
							component={Ticket}
							role={ADMIN}
						/>
						<PrivateRoute
							path="/ticket"
							component={Ticket}
							role={ADMIN}
						/>
						<PrivateRoute
							path="/ticket-user"
							component={UserTickets}
							role={USER}
						/>
					</Switch>
				</Container>
			</div>
		</Router>
	);
}

export default App;
