import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { register, setCurrent } from "../../../actions/auth";
import { all } from "../../../actions/typeUser";

import "./Register.css";

const Register = (props) => {
	const [item, setItem] = useState({
		name: "",
		email: "",
		password: "",
		type_user_id: 1,
	});
	const [error, setError] = useState();
	const types = useSelector((state) => state.typeUser);
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		await dispatch(all());
		await dispatch(setCurrent(null, null));
	};

	const options = types.map((data) => (
		<option key={data.id} value={data.id}>
			{data.name}
		</option>
	));

	const handleClick = async () => {
		try {
			await dispatch(register(item, props.history));
		} catch (err) {
			setError(err.response.data.message);
		}
	};

	const handleChange = (event) => {
		setItem({ ...item, [event.target.name]: event.target.value });
	};

	return (
		<Form className="form text-center mt-5">
			<h1 className="h3 mb-3 font-weight-normal">Register</h1>
			<Form.Group controlId="formBasicName">
				<Form.Control
					type="text"
					name="name"
					placeholder="Enter name"
					value={item.name}
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group controlId="formBasicEmail">
				<Form.Control
					type="email"
					name="email"
					placeholder="Enter email"
					value={item.email}
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
				<Form.Control
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
				/>
			</Form.Group>
			<Form.Group controlId="exampleForm.SelectCustomSizeSm">
				<Form.Control
					as="select"
					name="type_user_id"
					value={item.type_user_id}
					onChange={handleChange}
				>
					{options}
				</Form.Control>
			</Form.Group>
			<Button
				variant="primary btn-block"
				type="button"
				onClick={handleClick}
			>
				Register
			</Button>
			<p className="text-danger">{error || auth.error}</p>
			<p className="mt-3">
				<Link to={"/login"}>
					<FontAwesomeIcon icon={faLongArrowAltLeft} />
					&nbsp; back
				</Link>
			</p>
		</Form>
	);
};

export default Register;
