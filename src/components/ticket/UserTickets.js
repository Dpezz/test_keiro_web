import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Table, Button } from "react-bootstrap";
import { allUser, updateUserTicket } from "../../actions/ticket";

function UserTickets() {
	const item = useSelector((state) => state.ticket);
	const dispatch = useDispatch();

	useEffect(() => {
		fetchItems();
	}, []);

	const fetchItems = async () => {
		await dispatch(allUser());
	};

	const handleClick = async (item) => {
		dispatch(updateUserTicket(item));
	};

	return (
		<div>
			<h1>Tickets</h1>

			<Table striped hover>
				<thead>
					<tr>
						<th>#</th>
						<th>User Name</th>
						<th>Date</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{item.tickets.map((item, key) => (
						<tr key={item.id}>
							<td>{item.id}</td>
							<td>{item.user?.name}</td>
							<td>{item.created_at}</td>
							<td>
								{item.ticket_pedido ? (
									""
								) : (
									<Button
										variant="success"
										type="button"
										onClick={() => handleClick(item)}
									>
										Pedir Ticket
									</Button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
}

export default UserTickets;
