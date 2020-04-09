import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../actions/auth";

function NavLayout() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();

	const handleClick = async (event) => {
		try {
			event.preventDefault();
			await dispatch(logout());
			history.push("/login");
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div>
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="/">
					<img
						alt=""
						src="/logo512.png"
						width="30"
						height="30"
						className="d-inline-block align-top"
						to="/"
					/>{" "}
					React Beta
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					{auth.isAuth ? (
						<Nav className="ml-auto">
							<Nav className="text-light mr-2 pt-1">
								{auth.user.email.toUpperCase()}
							</Nav>
							<Button
								variant="light btn-sm"
								onClick={handleClick}
							>
								Logout
							</Button>
						</Nav>
					) : (
						""
					)}
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
}

export default NavLayout;
