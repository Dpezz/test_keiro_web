import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER, HOME_USER, HOME_ADMIN } from "./roleAuth";

function PublicRoute({ component: Component, ...rest }) {
	const isAuthenticated = localStorage.getItem("token");
	const auth = useSelector((state) => state.auth);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Redirect
						to={
							auth?.user?.type_user?.name === USER
								? HOME_USER
								: HOME_ADMIN
						}
					/>
				) : (
					<Component {...props} />
				)
			}
		/>
	);
}

export default PublicRoute;
