import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

import { show, reset, store, update } from "../../actions/ticket";
import { all } from "../../actions/user";

function Ticket(props) {
	const users = useSelector((state) => state.user);
	const ticket = useSelector((state) => state.ticket);
	const [item, setItem] = useState();
	const [error, setError] = useState();
	const dispatch = useDispatch();

	useEffect(() => {
		fetchItem();
	}, []);

	const fetchItem = async () => {
		await dispatch(all());
		if (props.match.params.id) await dispatch(show(props.match.params.id));
		else dispatch(reset());
	};

	const options = users.map((data) => (
		<option key={data.id} value={data.id}>
			{data.name} - {data.email}
		</option>
	));

	const handleChange = (event) => {
		ticket.ticket.user_id = event.target.value;
		setItem({ [event.target.name]: event.target.value });
	};

	const handleClick = async () => {
		try {
			if (props.match.params.id) dispatch(update(ticket.ticket));
			else dispatch(store(ticket.ticket));
			props.history.push("/tickets");
		} catch (err) {
			setError(err);
		}
	};

	return (
		<div>
			<h1>
				Ticket: <small>{ticket.ticket?.id}</small>
			</h1>
			<Form>
				<Form.Group controlId="exampleForm.SelectCustomSizeSm">
					<Form.Control
						as="select"
						name="user_id"
						value={ticket.ticket?.user_id}
						onChange={handleChange}
					>
						<option>- select user -</option>
						{options}
					</Form.Control>
				</Form.Group>

				<Button
					variant="primary btn-block"
					type="button"
					onClick={handleClick}
				>
					Save
				</Button>
				<p className="text-danger">{error}</p>

				<p className="mt-3">
					<Link to={"/tickets"}>
						<FontAwesomeIcon icon={faLongArrowAltLeft} />
						&nbsp; back
					</Link>
				</p>
			</Form>
		</div>
	);
}

export default Ticket;
