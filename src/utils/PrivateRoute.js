import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER, HOME_USER, HOME_ADMIN } from "./roleAuth";

function PrivateRoute({ component: Component, role: Role, ...rest }) {
	const isAuthenticated = localStorage.getItem("token");
	const auth = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					Role === auth?.user?.type_user?.name ? (
						<Component {...props} />
					) : (
						<Redirect
							to={
								auth?.user?.type_user?.name === USER
									? HOME_USER
									: HOME_ADMIN
							}
						/>
					)
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
}

export default PrivateRoute;
