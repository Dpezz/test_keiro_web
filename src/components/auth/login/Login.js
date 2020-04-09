import React, { useState, useEffect } from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "./Login.css";
import { login, setCurrent } from "../../../actions/auth";
import { Link } from "react-router-dom";

const Login = (props) => {
	const [item, setItem] = useState({ email: "", password: "" });
	const [error, setError] = useState();
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		await dispatch(setCurrent(null, null));
	};

	const handleClick = async (event) => {
		try {
			dispatch(login(item, props.history));
		} catch (err) {
			setError(err.response.data.message);
		}
	};

	const handleChange = (event) => {
		setItem({ ...item, [event.target.name]: event.target.value });
	};

	return (
		<Form className="form text-center mt-5">
			<Image
				className="mb-2"
				src="/logo512.png"
				width="84"
				height="84"
				rounded
			/>
			<h1 className="h3 mb-3 font-weight-normal">Login</h1>
			<Form.Group controlId="formBasicEmail">
				<Form.Control
					type="email"
					name="email"
					placeholder="Enter email"
					value={item.email}
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Control
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
					required
				/>
			</Form.Group>

			<Button
				variant="primary btn-block"
				type="button"
				onClick={handleClick}
			>
				Login
			</Button>

			<small className="text-danger">{error || auth.error}</small>
			<p className="mt-3">
				<Link to={"/register"}>Register user</Link>
			</p>
		</Form>
	);
};

export default Login;
